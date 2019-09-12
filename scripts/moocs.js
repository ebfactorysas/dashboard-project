function orderTopMoocs(data) {
  var dataMoocs = data.sort(function(a, b) {
    return d3.ascending(a.value, b.value);
  });
  return dataMoocs;
}

/**
 * Start distribution-moocs
 **/

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        var number = ++lineNumber * lineHeight + dy;
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", number + "em")
          .text(word);
      }
    }
  });
}

function drawDistributionChart(dataDistribution) {
  d3.select("#distribution-moocs svg").remove();
  var widthInherith = $("#distribution-moocs").width();
  var heightInherith = $("#distribution-moocs").height();
  if($('.body').width()< 500){
    drawTrendChartRectBar(
      dataDistribution,
      "#distribution-moocs",
      "#f1a592",
      "orange",
      "Registrations",
      "registrations",
      25
    );    
  }else{
    var marginDistribution = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };
    
  
  
    var widthDistribution =
      800 - marginDistribution.left - marginDistribution.right;
    var heightDistribution =
      400 - marginDistribution.top - marginDistribution.bottom;
    var svgDistribution = d3
      .select("#distribution-moocs")
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 720 500")
      .append("g")
      // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")")
  
      //class to make it responsive
      .classed("svg-content-responsive", true);
  
    var xDistribution = d3.scaleBand().range([0, widthDistribution]);
    var yDistribution = d3.scaleLinear().range([heightDistribution, 0]);
  
    xDistribution.domain(
      dataDistribution.map(function(d) {
        return d.name;
      })
    );
    yDistribution.domain([
      0,
      d3.max(dataDistribution, function(d) {
        return d.registrations;
      })
    ]);
  
    svgDistribution
      .selectAll(".bar")
      .data(dataDistribution)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return xDistribution(d.name);
      })
      .attr("width", xDistribution.bandwidth() - 35)
      .attr("rx", 25)
      .attr("ry", 25)
      .attr("y", function(d) {
        return yDistribution(d.registrations + 3);
      })
      .attr("x", function(d, i) {
        return i * xDistribution.bandwidth() + 15; //Bar width of 20 plus 1 for padding
      })
      .attr("fill", "#eea08d")
      .attr("height", function(d) {
        return heightDistribution - yDistribution(d.registrations + 3);
      });
  
    svgDistribution
      .selectAll("text")
      .data(dataDistribution)
      .enter()
      .append("text")
      .text(function(d) {
        var formatNumber = setSettingsNumber(d.registrations);
        return formatNumber.valueNumber + formatNumber.suffixNumber;
      })
      .attr("y", function(d) {
        return yDistribution(0.01);
      })
      .attr("x", function(d, i) {
        return i * xDistribution.bandwidth() + 21; //Bar width of 20 plus 1 for padding
      })
      .attr("font-family", "Gotham-Bold")
      .attr("class", "textInsideDist")
      .attr("padding-bottom", "10px")
      .attr("font-size", "1.3rem");
  
    svgDistribution
      .append("g")
      .attr("transform", "translate(0," + heightDistribution + ")")
      .attr("class", "distribution-chart")
      .call(d3.axisBottom(xDistribution));
  
    svgDistribution
      .selectAll(".tick text")
      .call(wrap, xDistribution.bandwidth())
      .attr("font-family", "Gotham-Bold")
      .attr("font-size", "1.3rem");
  
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "toolTip")
      .style("font-size", "12px")
      .style("width", "250px");
  
    var tooltipBarText = d3Old
      .selectAll("#distribution-moocs .textInsideDist")
      .on("mouseover", function(d) {
        var textHtml =
          "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Amount</span><span class='col text-right' >{{value}}</div>";
        textHtml = textHtml.replace("{{title}}", d.name);
        textHtml = textHtml.replace(
          "{{value}}",
          d.registrations.toFixed(0).toLocaleString()
        );
        if (d.value) {
          var addText =
            "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
          addText = addText.replace("{{type}}", "Percentage");
          addText = addText.replace("{{code}}", d.value);
          textHtml = textHtml + addText;
        } else if (d.department_codes) {
          var addText =
            "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>";
          addText = addText.replace("{{type}}", "Department");
          addText = addText.replace("{{code}}", d.department_codes);
          textHtml = textHtml + addText;
        }
        textHtml = textHtml + "</div>";
        div
          .transition()
          .duration(0)
          .style("font-family", "Gotham-Book")
          .style("display", "inline-block");
        // div.html(d.value + "<br/>" + d.name)
        if (screen.width <= 480) {
          div
            .html(textHtml)
            .style("left", "0px")
            .style("top", d3Old.event.pageY - 28 + 5 + "px")
            .style("width", screen.width+"px");
        } else {
          div
          .html(textHtml)
          .style("left", d3Old.event.pageX - 200 + 35 + "px")
          .style("top", d3Old.event.pageY - 28 + 35 + "px");
        }
      })
      .on("mouseout", function(d) {
        div
          .transition()
          .duration(0)
          .style("display", "none");
      });
  
    var tooltipBar = d3Old
      .selectAll("#distribution-moocs .bar")
      .on("mouseover", function(d) {
        var textHtml =
          "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Amount</span><span class='col text-right' >{{value}}</div>";
        textHtml = textHtml.replace("{{title}}", d.name);
        textHtml = textHtml.replace(
          "{{value}}",
          d.registrations.toFixed(0).toLocaleString()
        );
        if (d.value) {
          var addText =
            "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
          addText = addText.replace("{{type}}", "Percentage");
          addText = addText.replace("{{code}}", d.value);
          textHtml = textHtml + addText;
        } else if (d.department_codes) {
          var addText =
            "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>";
          addText = addText.replace("{{type}}", "Department");
          addText = addText.replace("{{code}}", d.department_codes);
          textHtml = textHtml + addText;
        }
        textHtml = textHtml + "</div>";
        div
          .transition()
          .duration(0)
          .style("font-family", "Gotham-Book")
          .style("display", "inline-block");
        // div.html(d.value + "<br/>" + d.name)
        if (screen.width <= 480) {
          div
            .html(textHtml)
            .style("left", "0px")
            .style("top", d3Old.event.pageY - 28 + 5 + "px")
            .style("width", screen.width+"px");
        } else {
          div
          .html(textHtml)
          .style("left", d3Old.event.pageX - 200 + 35 + "px")
          .style("top", d3Old.event.pageY - 28 + 35 + "px");
        }
      })
      .on("mouseout", function(d) {
        div
          .transition()
          .duration(0)
          .style("display", "none");
      });
  }
  
}
/**
 * End distribution-moocs
 *  */

/**
 * Start registration-moocs
 */

function drawMoocsRegistrationsChart(dataMoocs) {
  d3.select("#moocs-registrations svg").remove();
  drawTrendChartRectBar(
    dataMoocs,
    "#moocs-registrations",
    "#f1a592",
    "orange",
    "Registrations",
    "value",
    25
  );
}

/**
 * End registration-moocs
 */
/**
 * Start age-distribution-moocs
 */

function drawMoocsAgeDistributionChart(data) {
  d3.select("#age-distribution-moocs svg").remove();
  data = data.sort(function(a, b) {
    return d3.descending(a.id, b.id);
  });

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 100
  };
  var widthInherith = $("#age-distribution-moocs").width();
  var heightInherith = $("#age-distribution-moocs").height();

  var width = widthInherith - margin.left - margin.right,
    height = heightInherith - margin.top - margin.bottom;

  var svg = d3
    .select("#age-distribution-moocs")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-90 -20 " + widthInherith + " " + heightInherith + "")
    .append("g")
    .classed("svg-content-responsive", true);

  var x = d3
    .scaleLinear()
    .range([0, width])
    .domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);

  var y = d3
    .scaleBand()
    .rangeRound([height, 0], 0.1)
    .domain(
      data.map(function(d) {
        return d.name;
      })
    );
  var bars = svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("g");
  bars
    .append("rect")
    .attr("class", "bar-back")
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.bandwidth() - 15)
    .attr("x", 0)
    .attr("fill", "#efefef")
    .attr("width", function(d) {
      return width;
    });

  bars
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.bandwidth() - 15)
    .attr("x", 0)
    .attr("width", function(d) {
      if (x(d.value) - 20 <= 0) {
        return 0;
      } else {
        return x(d.value) - 20;
      }
    });

  //append rects
  bars
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.bandwidth() - 15)
    .attr("x", 0)
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("width", function(d) {
      return x(d.value) + 10;
    });

  //make y axis to show bar names
  var yAxis = d3
    .axisLeft(y)
    .tickPadding(50)
    //no tick marks
    .tickSize(0);

  var gy = svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr("transform", "translate(-10,-12 )");

  var path = svg.select(".y .domain").attr("transform", "translate(10,0 )");

  //add a value label to the right of each bar
  bars
    .append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return y(d.name) + y.bandwidth() / 2 - 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      return 10;
    })
    .text(function(d) {
      var value = setSettingsNumber(d.value);
      return value.valueNumber + value.suffixNumber;
    })
    .style("font-family", "Gotham-Bold");

  svg
    .selectAll(".tick text")
    .call(wrap, y.bandwidth(), 10)
    .attr("y", function(d) {
      if(data[0].name== d){
        console.log("im in",d)
        return  y.bandwidth() / 2 -20;  
      }
      return  y.bandwidth() / 2 -15;
    })
    .attr("font-family", "Gotham-Bold")
    .attr("font-size", "12px");

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip")
    .style("font-size", "12px")
    .style("width", "250px");

  var tooltipBarText = d3Old
    .selectAll("#age-distribution-moocs .label")
    .on("mouseover", function(d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Amount</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d.value.toFixed(0).toLocaleString()
      );
      if (d.percentage) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Percentage");
        addText = addText.replace("{{code}}", d.percentage);
        textHtml = textHtml + addText;
      } else if (d.department_codes) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Department");
        addText = addText.replace("{{code}}", d.department_codes);
        textHtml = textHtml + addText;
      }
      textHtml = textHtml + "</div>";
      div
        .transition()
        .duration(0)
        .style("font-family", "Gotham-Book")
        .style("display", "inline-block");
      // div.html(d.value + "<br/>" + d.name)
      div
        .html(textHtml)
        .style("left", d3Old.event.pageX - 200 + 35 + "px")
        .style("top", d3Old.event.pageY - 28 + 35 + "px");
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });

  var tooltipBar = d3Old
    .selectAll("#age-distribution-moocs .bar")
    .on("mouseover", function(d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Amount</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d.value.toFixed(0).toLocaleString()
      );
      if (d.percentage) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Percentage");
        addText = addText.replace("{{code}}", d.percentage);
        textHtml = textHtml + addText;
      } else if (d.department_codes) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Department");
        addText = addText.replace("{{code}}", d.department_codes);
        textHtml = textHtml + addText;
      }
      textHtml = textHtml + "</div>";
      div
        .transition()
        .duration(0)
        .style("font-family", "Gotham-Book")
        .style("display", "inline-block");
      // div.html(d.value + "<br/>" + d.name)
      div
        .html(textHtml)
        .style("left", d3Old.event.pageX - 200 + 35 + "px")
        .style("top", d3Old.event.pageY - 28 + 35 + "px");
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });
  var tooltipBarBack = d3Old
    .selectAll("#age-distribution-moocs .bar-back")
    .on("mouseover", function(d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Amount</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d.value.toFixed(0).toLocaleString()
      );
      if (d.percentage) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Percentage");
        addText = addText.replace("{{code}}", d.percentage);
        textHtml = textHtml + addText;
      } else if (d.department_codes) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Department");
        addText = addText.replace("{{code}}", d.department_codes);
        textHtml = textHtml + addText;
      }
      textHtml = textHtml + "</div>";
      div
        .transition()
        .duration(0)
        .style("font-family", "Gotham-Book")
        .style("display", "inline-block");
      // div.html(d.value + "<br/>" + d.name)
      div
        .html(textHtml)
        .style("left", d3Old.event.pageX - 200 + 35 + "px")
        .style("top", d3Old.event.pageY - 28 + 35 + "px");
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });
}
/**
 * End age-distribution-moocs
 */

var marginStudents = {
  top: 2,
  right: 20,
  bottom: 2,
  left: 20
};

var widthStudents = 100 - marginStudents.left - marginStudents.right,
  heightStudents = 60 - marginStudents.top - marginStudents.bottom;

/**
 * Start student-registrations-moocs
 */

function tooltipStudentFlow(id, type) {
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip")
    .style("font-size", "12px")
    .style("width", "200px");

  var tooltipBarText = d3Old
    .selectAll(id + " .text-inside")
    .on("mouseover", function(d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>" +
        type +
        "</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d.value.toFixed(0).toLocaleString()
      );

      textHtml = textHtml + "</div>";
      div
        .transition()
        .duration(0)
        .style("font-family", "Gotham-Book")
        .style("display", "inline-block");
      // div.html(d.value + "<br/>" + d.name)
      div
        .html(textHtml)
        .style("left", d3Old.event.pageX + 5 + "px")
        .style("top", d3Old.event.pageY - 28 + 5 + "px");
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });

  var tooltipBar = d3Old
    .selectAll(id + " .bar")
    .on("mouseover", function(d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row orange'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>" +
        type +
        "</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d.value.toFixed(0).toLocaleString()
      );
      textHtml = textHtml + "</div>";
      div
        .transition()
        .duration(0)
        .style("font-family", "Gotham-Book")
        .style("display", "inline-block");
      // div.html(d.value + "<br/>" + d.name)
      div
        .html(textHtml)
        .style("left", d3Old.event.pageX + 5 + "px")
        .style("top", d3Old.event.pageY - 28 + 5 + "px");
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });
}

function drawStudentRegistrationsChart(dataStudents) {
  d3.select("#student1 svg").remove();
  
  var widthInherith = $("#student1").width()-50;
  var heightInherith = $("#student1").height();
  if (
    typeof dataStudents == "undefined" ||
    typeof dataStudents.registrations == "undefined"
  ) {
    $("#student1-title").html("0");
    return;
  }
  dataStudents.registrations.value = 0;
  dataStudents.registrations.years.forEach(function(element) {
    dataStudents.registrations.value =
      dataStudents.registrations.value + element.value;
  });

  var formatNumber = setSettingsNumber(
    dataStudents.registrations ? dataStudents.registrations.value : 0
  );
  $("#student1-title").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );

  var svgStudent1 = d3
    .select("#student1")
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-20 -7 "+ widthInherith+ " "+ heightInherith)
    .append("g");

  var xStudent1 = d3
    .scaleLinear()
    .range([0, widthStudents])
    .domain([
      0,
      d3.max(dataStudents.registrations.years, function(d) {
        return d.value;
      })
    ]);

  var yStudent1 = d3
    .scaleBand()
    .rangeRound([18 * dataStudents.registrations.years.length, 0], 0.1)
    .domain(
      dataStudents.registrations.years.map(function(d) {
        return d.name;
      })
    );

  var yAxisStudent1 = d3
    .axisLeft(yStudent1)
    .tickPadding(20)
    .tickSize(0);

  var gyStudent1 = svgStudent1
    .append("g")
    .style("text-anchor", "start")
    .style("color", "#fff")
    .style("font-family", "Gotham-Book")
    .style("font-size", "9px")
    .attr("class", "y-data")
    .attr("transform", "translate(0,-4 )")
    .call(yAxisStudent1);

  var barsStudent1 = svgStudent1
    .selectAll(".bar")
    .data(dataStudents.registrations.years)
    .enter()
    .append("g");

  barsStudent1
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return yStudent1(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", 10)
    .attr("x", 8)
    .attr("width", function(d) {
      return xStudent1(d.value);
    });

  barsStudent1
    .append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return yStudent1(d.name) + 16 / 2;
    })
    .attr("x", function(d) {
        return 8;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "8px")
    .text(function(d) {
      var value = setSettingsNumber(d.value);
      return value.valueNumber + value.suffixNumber;
    });

  setTooltipToPoints(
    "#student1-title",
    false,
    dataStudents.registrations ? dataStudents.registrations.value : 0,
    undefined,
    "Registrations"
  );
  tooltipStudentFlow("#student1", "Registrations");
}
/**
 * End student-registrations-moocs
 */

/**
 * Start student-participants-moocs
 */

function drawStudentParticipantsChart(dataStudents) {
  d3.select("#student2 svg").remove();
  var widthInherith = $("#student2").width()-50;
  var heightInherith = $("#student2").height();
  if (
    typeof dataStudents == "undefined" ||
    typeof dataStudents.participants == "undefined"
  ) {
    $("#student2-title").html("0");
    return;
  }
  dataStudents.participants.value = 0;
  dataStudents.participants.years.forEach(function(element) {
    dataStudents.participants.value =
      dataStudents.participants.value + element.value;
  });

  var formatNumber = setSettingsNumber(dataStudents.participants.value);
  $("#student2-title").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );

  var svgStudent2 = d3
    .select("#student2")
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-20 -7 "+ widthInherith+ " "+ heightInherith)
    .append("g");

  var xStudent2 = d3
    .scaleLinear()
    .range([0, widthStudents])
    .domain([
      0,
      d3.max(dataStudents.participants.years, function(d) {
        return d.value;
      })
    ]);

  var yStudent2 = d3
    .scaleBand()
    .rangeRound([18 * dataStudents.participants.years.length, 0], 0.1)
    .domain(
      dataStudents.participants.years.map(function(d) {
        return d.name;
      })
    );

  var yAxisStudent2 = d3
    .axisLeft(yStudent2)
    .tickPadding(20)
    .tickSize(0);

  var gyStudent2 = svgStudent2
    .append("g")
    .style("text-anchor", "start")
    .style("color", "#fff")
    .style("font-family", "Gotham-Book")
    .style("font-size", "9px")
    .attr("class", "y-data")
    .attr("transform", "translate(0,-4 )")
    .call(yAxisStudent2);

  var barsStudent2 = svgStudent2
    .selectAll(".bar")
    .data(dataStudents.participants.years)
    .enter()
    .append("g");

  barsStudent2
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return yStudent2(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", 10)
    .attr("x", 8)
    .attr("width", function(d) {
      return xStudent2(d.value);
    });

  barsStudent2
    .append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return yStudent2(d.name) + 16 / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      return 8;
  })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "8px")
    .text(function(d) {
      var value = setSettingsNumber(d.value);
      return value.valueNumber + value.suffixNumber;
    });

  setTooltipToPoints(
    "#student2-title",
    false,
    dataStudents.participants.value,
    undefined,
    "Participants"
  );
  tooltipStudentFlow("#student2", "Participants");
}
/**
 * End student-participants-moocs
 */

/**
 * Start student-completed-moocs
 */

function drawStudentCompletedsChart(dataStudents) {
  d3.select("#student3 svg").remove();
  var widthInherith = $("#student3").width()-50;
  var heightInherith = $("#student3").height();
  if (
    typeof dataStudents == "undefined" ||
    typeof dataStudents.completed == "undefined"
  ) {
    $("#student3-title").html("0");
    return;
  }
  dataStudents.completed.value = 0;
  dataStudents.completed.years.forEach(function(element) {
    dataStudents.completed.value = dataStudents.completed.value + element.value;
  });

  var formatNumber = setSettingsNumber(dataStudents.completed.value);
  $("#student3-title").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );

  var svgStudent3 = d3
    .select("#student3")
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-20 -7 "+ widthInherith+ " "+ heightInherith)
    .append("g");

  var xStudent3 = d3
    .scaleLinear()
    .range([0, widthStudents])
    .domain([
      0,
      d3.max(dataStudents.completed.years, function(d) {
        return d.value;
      })
    ]);

  var yStudent3 = d3
    .scaleBand()
    .rangeRound([18 * dataStudents.completed.years.length, 0], 0.1)
    .domain(
      dataStudents.completed.years.map(function(d) {
        return d.name;
      })
    );

  var yAxisStudent3 = d3
    .axisLeft(yStudent3)
    .tickPadding(20)
    .tickSize(0);

  var gyStudent3 = svgStudent3
    .append("g")
    .style("text-anchor", "start")
    .style("color", "#000")
    .style("font-family", "Gotham-Book")
    .style("font-size", "9px")
    .attr("class", "y-data")
    .attr("transform", "translate(0,-4 )")
    .call(yAxisStudent3);

  var barsStudent3 = svgStudent3
    .selectAll(".bar")
    .data(dataStudents.completed.years)
    .enter()
    .append("g");

  barsStudent3
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return yStudent3(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", 10)
    .attr("x", 8)
    .attr("width", function(d) {
      return xStudent3(d.value);
    });

  barsStudent3
    .append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return yStudent3(d.name) + 16 / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      return 8;
  })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "8px")
    .text(function(d) {
      var value = setSettingsNumber(d.value);
      return value.valueNumber + value.suffixNumber;
    });

  setTooltipToPoints(
    "#student3-title",
    false,
    dataStudents.completed.value,
    undefined,
    "Completed"
  );
  tooltipStudentFlow("#student3", "Completed");
}

/**
 * End student-completed-moocs
 */

/**
 * Start student-certified-moocs
 */

function drawStudentCertifiedsChart(dataStudents) {
  d3.select("#student4 svg").remove();
  var widthInherith = $("#student4").width()-50;
  var heightInherith = $("#student4").height();
  if (
    typeof dataStudents == "undefined" ||
    typeof dataStudents.certified == "undefined"
  ) {
    $("#student4-title").html("0");
    return;
  }

  dataStudents.certified.value = 0;
  dataStudents.certified.years.forEach(function(element) {
    dataStudents.certified.value = dataStudents.certified.value + element.value;
  });

  var formatNumber = setSettingsNumber(dataStudents.certified.value);
  $("#student4-title").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );

  var svgStudent4 = d3
    .select("#student4")
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "-20 -7 "+ widthInherith+ " "+ heightInherith)
    //.append("g");

  var xStudent4 = d3
    .scaleLinear()
    .range([0, widthStudents])
    .domain([
      0,
      d3.max(dataStudents.certified.years, function(d) {
        return d.value;
      })
    ]);

  var yStudent4 = d3
    .scaleBand()
    .rangeRound([(heightInherith/dataStudents.certified.years.length*2), 0], 0.1)
    .domain(
      dataStudents.certified.years.map(function(d) {
        return d.name;
      })
    );

  var yAxisStudent4 = d3
    .axisLeft(yStudent4)
    .tickPadding(20)
    .tickSize(0);

  var gyStudent4 = svgStudent4
    .append("g")
    .style("text-anchor", "start")
    .style("color", "#000")
    .style("font-family", "Gotham-Book")
    .style("font-size", "9px")
    .attr("class", "y-data")
    .attr("transform", "translate(0,-4 )")
    .call(yAxisStudent4);

  var barsStudent4 = svgStudent4
    .selectAll(".bar")
    .data(dataStudents.certified.years)
    .enter()
    .append("g");

  barsStudent4
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return yStudent4(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", 10)
    .attr("x", 8)
    .attr("width", function(d) {
      return xStudent4(d.value);
    });

  barsStudent4
    .append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return yStudent4(d.name) + 16 / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      return 8;
  })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "8px")
    .text(function(d) {
      var value = setSettingsNumber(d.value);
      return value.valueNumber + value.suffixNumber;
    });

  setTooltipToPoints(
    "#student4-title",
    false,
    dataStudents.certified.value,
    undefined,
    "Certified"
  );
  tooltipStudentFlow("#student4", "Certified");
}
/**
 * End student-certified-moocs
 */

/**
 * Start timelines
 *  */
function createChartTimelineMoocs(data, typeload) {
  d3.select("#timeline-moocs svg").remove();
  createTimelineChart(data, "#timeline-moocs", "#f1a592","Registrations", "#moocs2018", 800);
}

/**
 * End timelines
 *  */

function setEmptyGaugesMoocs() {
  return {
    courses: 0,
    percentageCourses: 0,
    registrations: 0,
    percentageRegistrations: 0,
    percentageLAC: 0
  };
}

function drawGaugeMoocsChart(dataGauge) {
  removeGauges(["#gauge-moocs", "#gauge-registrations-m", "#gauge-lac-m"]);

  if (dataGauge == undefined) {
    dataGauge = setEmptyGaugesMoocs();
  }

  var code = $("#idbLink")[0].text;
  drawGauge(
    dataGauge.courses,
    dataGauge.percentageCourses,
    "",
    "#gauge-moocs",
    code,
    "Moocs",
    "#fa2e00"
  );
  drawGauge(
    dataGauge.registrations,
    dataGauge.percentageRegistrations,
    "",
    "#gauge-registrations-m",
    code,
    "Registrations",
    "#fa2e00"
  );
  drawGauge(
    dataGauge.percentageLAC,
    dataGauge.percentageLAC,
    "%",
    "#gauge-lac-m",
    code,
    "Registrations",
    "#fa2e00"
  );
}

function moocsGenderFilter(moocsJson, gender) {
  return moocsJson.filter(function(entry) {
    return entry.gender === gender;
  });
}

function moocsGenderAddGray(moocsJson) {
  if (moocsJson.length === 0) {
    return [
      {
        age: "red",
        population: 0,
        registrations: 0
      },
      {
        age: "gray",
        population: 100
      }
    ];
  }
  if ($("input[name*='moocsTrend']:checked").val() === "all") {
    moocsJson[0].registrations = moocsJson[0].all_registrations;
    moocsJson[0].realpopulation = moocsJson[0].all_population;
    moocsJson[0].population = (moocsJson[0].all_population * 100).toFixed(0);
  } else {
    moocsJson[0].registrations = moocsJson[0]["2018_registrations"];
    moocsJson[0].realpopulation = moocsJson[0]["2018_population"];
    moocsJson[0].population = (moocsJson[0]["2018_population"] * 100).toFixed(
      0
    );
  }

  var gray = {
    age: "gray",
    population: 100 - moocsJson[0].population
  };
  moocsJson.push(gray);
  return moocsJson;
}

function points(data) {
  d3.select("#waffle svg").remove();

  var formatNumber = setSettingsNumber(data[0].registrations);
  $("#waffle-registrations").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );
  if (typeof data[0].gender == "undefined") {
    $("#waffle-gender").html("FEMALE 0%");
  } else {
    $("#waffle-gender").html(
      data[0].gender.toUpperCase() +
        " " +
        (data[0].realpopulation * 100).toFixed(2) +
        "%"
    );
  }

  var total = 100;
  var widthSquares = 10,
    heightSquares = 10,
    squareSize = 10,
    squareValue = 0,
    gap = 35,
    theData = [];

  //total
  total = d3.sum(data, function(d) {
    return d.population;
  });

  //value of a square
  squareValue = total / (widthSquares * heightSquares);
  //remap data
  data.forEach(function(d, i) {
    d.population = +d.population;
    d.units = Math.floor(d.population / squareValue);
    theData = theData.concat(
      Array(d.units + 1)
        .join(1)
        .split("")
        .map(function() {
          return {
            squareValue: squareValue,
            units: d.units,
            population: d.population,
            groupIndex: i
          };
        })
    );
  });

  width = squareSize * widthSquares + widthSquares * gap;
  height = squareSize * heightSquares + heightSquares * gap;

  var waffle = d3
    .select("#waffle")
    //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-120 -140 650 1000")
    //class to make it responsive
    .classed("svg-content-responsive", true)
    .append("g")
    .selectAll("div")
    .data(theData)
    .enter()
    .append("circle")
    .attr("r", squareSize)

    .attr("fill", function(d) {
      if (d.groupIndex == 1) {
        return "#d3d3d3";
      } else {
        return "#ea2f01";
      }
    })
    .attr("cx", function(d, i) {
      //group n squares for column

      row = i % heightSquares;
      return row * squareSize + row * gap + 5;
    })
    .attr("cy", function(d, i) {
      col = Math.floor(i / heightSquares);
      return -(heightSquares * squareSize) + (col * squareSize + col * 50) + 5;
    });
  setTooltipToPoints(
    "#waffle",
    true,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Female"
  );
  setTooltipToPoints(
    "#waffle-registrations",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Female"
  );
  setTooltipToPoints(
    "#waffle-gender",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Female"
  );
}

function setTooltipToPoints(id, isSvg, value, percentage, name) {
  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip")
    .style("position", "absolute")
    .style("padding", "5px")
    .style("background-color", "white")
    .style("z-index", "100")
    .attr("width", "1000")
    .style("width", "1000")
    .style("font-size", "12px")
    .style("font-family", "Gotham-Book");
  var root;
  var selected;
  if (isSvg) {
    selected = d3Old.selectAll(id + " svg");
    root = d3Old.select(id + " svg");
  } else {
    root = d3Old.select(id);
    selected = d3Old.selectAll(id);
  }

  var scr = {
    x: window.scrollX,
    y: window.scrollY,
    w: window.innerWidth,
    h: window.innerHeight
  };

  var body_sel = d3Old.select("body");
  var body = {
    w: body_sel.node().offsetWidth,
    h: body_sel.node().offsetHeight
  };
  var doc = {
    w: document.width,
    h: document.height
  };
  var svgpos = getNodePos(root.node());
  selected
    .on("mousemove", function() {
      var textInnerHtml =
        "<div class='col tooltip-gauges'><h3 class='row orange'>" +
        name +
        "</h3> <div class='row  pb-1'><span class='col pl-0 pr-0'>Value</span><span class='col text-right' >{{value}}</div>";
      textInnerHtml = textInnerHtml.replace("{{value}}", value);
      if (percentage) {
        var textToAppend =
          "<div class='row pt-1 border-top'> <span class='col pl-0 pr-0'> Percentage</span><span  class='col-3 text-right'>{{percentage}}%</span>";
        textToAppend = textToAppend.replace("{{percentage}}", percentage);
        textInnerHtml = textInnerHtml + textToAppend;
      }

      textInnerHtml = textInnerHtml + "</div>";

      var m = d3Old.mouse(root.node());
      scr.x = d3Old.event.pageX;
      scr.y = d3Old.event.pageY;
      m[0] += svgpos.x;
      m[1] += svgpos.y;
      tooltip.style("right", "");
      tooltip.style("left", "");
      tooltip.style("bottom", "");
      tooltip.style("top", "");
      tooltip.style("left", scr.x + 5 + "px");
      tooltip.style("top", scr.y + 5 + "px");

      tooltip.html(textInnerHtml).style("display", "inline-block");
    })
    .on("mouseout", function() {
      tooltip
        .transition()
        .duration(0)
        .style("display", "none");
    });
}

function points1(data) {
  d3.select("#waffle1 svg").remove();

  var formatNumber = setSettingsNumber(data[0].registrations);
  $("#waffle1-registrations").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );
  if (typeof data[0].gender == "undefined") {
    $("#waffle1-gender").html("MALE 0%");
  } else {
    $("#waffle1-gender").html(
      data[0].gender.toUpperCase() +
        " " +
        (data[0].realpopulation * 100).toFixed(2) +
        "%"
    );
  }

  var total = 100;
  var widthSquares = 10,
    heightSquares = 10,
    squareSize = 10,
    squareValue = 0,
    gap = 35,
    theData = [];

  //total
  total = d3.sum(data, function(d) {
    return d.population;
  });

  //value of a square
  squareValue = total / (widthSquares * heightSquares);
  //remap data
  data.forEach(function(d, i) {
    d.population = +d.population;
    d.units = Math.floor(d.population / squareValue);
    theData = theData.concat(
      Array(d.units + 1)
        .join(1)
        .split("")
        .map(function() {
          return {
            squareValue: squareValue,
            units: d.units,
            population: d.population,
            groupIndex: i
          };
        })
    );
  });

  width = squareSize * widthSquares + widthSquares * gap;
  height = squareSize * heightSquares + heightSquares * gap;

  var waffle = d3
    .select("#waffle1")
    //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-120 -140 650 1000")
    //class to make it responsive
    .classed("svg-content-responsive", true)
    .append("g")
    .selectAll("div")
    .data(theData)
    .enter()
    .append("circle")
    .attr("r", squareSize)

    .attr("fill", function(d) {
      if (d.groupIndex == 1) {
        return "#d3d3d3";
      } else {
        return "#ea2f01";
      }
    })
    .attr("cx", function(d, i) {
      //group n squares for column

      row = i % heightSquares;
      return row * squareSize + row * gap + 5;
    })
    .attr("cy", function(d, i) {
      col = Math.floor(i / heightSquares);
      return -(heightSquares * squareSize) + (col * squareSize + col * 50) + 5;
    });

  setTooltipToPoints(
    "#waffle1",
    true,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Male"
  );
  setTooltipToPoints(
    "#waffle1-registrations",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Male"
  );
  setTooltipToPoints(
    "#waffle1-gender",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Male"
  );
}

function points2(data) {
  d3.select("#waffle2 svg").remove();

  var formatNumber = setSettingsNumber(data[0].registrations);
  $("#waffle2-registrations").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );
  if (typeof data[0].gender == "undefined") {
    $("#waffle2-gender").html("NOT INFORMED 0%");
  } else {
    $("#waffle2-gender").html(
      data[0].gender.toUpperCase() +
        " " +
        (data[0].realpopulation * 100).toFixed(2) +
        "%"
    );
  }
  var total = 100;
  var widthSquares = 10,
    heightSquares = 10,
    squareSize = 10,
    squareValue = 0,
    gap = 35,
    theData = [];

  //total
  total = d3.sum(data, function(d) {
    return d.population;
  });

  //value of a square
  squareValue = total / (widthSquares * heightSquares);
  //remap data
  data.forEach(function(d, i) {
    d.population = +d.population;
    d.units = Math.floor(d.population / squareValue);
    theData = theData.concat(
      Array(d.units + 1)
        .join(1)
        .split("")
        .map(function() {
          return {
            squareValue: squareValue,
            units: d.units,
            population: d.population,
            groupIndex: i
          };
        })
    );
  });

  width = squareSize * widthSquares + widthSquares * gap;
  height = squareSize * heightSquares + heightSquares * gap;

  var waffle = d3
    .select("#waffle2")
    //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-120 -140 650 1000")
    //class to make it responsive
    .classed("svg-content-responsive", true)
    .append("g")
    .selectAll("div")
    .data(theData)
    .enter()
    .append("circle")
    .attr("r", squareSize)

    .attr("fill", function(d) {
      if (d.groupIndex == 1) {
        return "#d3d3d3";
      } else {
        return "#ea2f01";
      }
    })
    .attr("cx", function(d, i) {
      //group n squares for column

      row = i % heightSquares;
      return row * squareSize + row * gap + 5;
    })
    .attr("cy", function(d, i) {
      col = Math.floor(i / heightSquares);
      return -(heightSquares * squareSize) + (col * squareSize + col * 50) + 5;
    });
  setTooltipToPoints(
    "#waffle2",
    true,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Not Available"
  );
  setTooltipToPoints(
    "#waffle2-registrations",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Not Available"
  );
  setTooltipToPoints(
    "#waffle2-gender",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Not Available"
  );
}

function points3(data) {
  d3.select("#waffle3 svg").remove();
  var formatNumber = setSettingsNumber(data[0].registrations);
  $("#waffle3-registrations").html(
    formatNumber.valueNumber + formatNumber.suffixNumber
  );
  if (typeof data[0].gender == "undefined") {
    $("#waffle3-gender").html("OTHER 0%");
  } else {
    $("#waffle3-gender").html(
      data[0].gender.toUpperCase() +
        " " +
        (data[0].realpopulation * 100).toFixed(2) +
        "%"
    );
  }

  var total = 100;
  var widthSquares = 10,
    heightSquares = 10,
    squareSize = 10,
    squareValue = 0,
    gap = 35,
    theData = [];

  //total
  total = d3.sum(data, function(d) {
    return d.population;
  });

  //value of a square
  squareValue = total / (widthSquares * heightSquares);
  //remap data
  data.forEach(function(d, i) {
    d.population = +d.population;
    d.units = Math.floor(d.population / squareValue);
    theData = theData.concat(
      Array(d.units + 1)
        .join(1)
        .split("")
        .map(function() {
          return {
            squareValue: squareValue,
            units: d.units,
            population: d.population,
            groupIndex: i
          };
        })
    );
  });

  width = squareSize * widthSquares + widthSquares * gap;
  height = squareSize * heightSquares + heightSquares * gap;

  var waffle = d3
    .select("#waffle3")
    //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-120 -140 650 1000")
    //class to make it responsive
    .classed("svg-content-responsive", true)
    .append("g")
    .selectAll("div")
    .data(theData)
    .enter()
    .append("circle")
    .attr("r", squareSize)

    .attr("fill", function(d) {
      if (d.groupIndex == 1) {
        return "#d3d3d3";
      } else {
        return "#ea2f01";
      }
    })
    .attr("cx", function(d, i) {
      //group n squares for column

      row = i % heightSquares;
      return row * squareSize + row * gap + 5;
    })
    .attr("cy", function(d, i) {
      col = Math.floor(i / heightSquares);
      return -(heightSquares * squareSize) + (col * squareSize + col * 50) + 5;
    });
  setTooltipToPoints(
    "#waffle3",
    true,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Other"
  );
  setTooltipToPoints(
    "#waffle3-registrations",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Other"
  );
  setTooltipToPoints(
    "#waffle3-gender",
    false,
    data[0].registrations.toLocaleString(),
    checkDecimal(data[0].realpopulation * 100),
    "Other"
  );
}

/**
 * Start Filters
 */

function divisionFilter(moocsJson, filterBy) {
  return moocsJson.filter(function(entry) {
    return entry.code === filterBy;
  });
}

function departmentFilter(moocsJson, filterBy) {
  return moocsJson.filter(function(entry) {
    return entry.code === filterBy;
  });
}

function moocsFilter() {
  $("#moocs2018").attr("checked");
  //Load the json
  switch ($("input[name*='moocsTrend']:checked").val()) {
    case "all":
      //top registration chart
      if (
        $("select[id*='divisionSelect']").val().length > 0 &&
        $("select[id*='divisionSelect']").val() !== "IDB"
      ) {
        if ($("select[id*='divisionSelect']").val() == "department") {
          var sltValue = $("#divisionSelect option:selected").text();
          var jsonGaugesMoocs = $.extend(
            true,
            [],
            moocsGaugesIndicators.indicatorsDepartmentsAllTheTime
          );

          jsonGaugesMoocs = jsonGaugesMoocs.filter(function(dataP) {
            return dataP.departmentCode == sltValue;
          });
          drawGaugeMoocsChart(jsonGaugesMoocs[0]);

          var jsonAgeMoocs = $.extend(
            true,
            [],
            moocsAgeArrays.ageDepartmentsAllTheTime
          );
          jsonAgeMoocs = jsonAgeMoocs.filter(function(dataP) {
            return dataP.departmentCode == sltValue;
          });
          drawMoocsAgeDistributionChart(jsonAgeMoocs);

          drawMoocsRegistrationsChart(
            orderTopMoocs(
              divisionFilter(moocsTopArrays.departmentsAllTime, sltValue)
            )
          );
          drawDistributionChart(
            orderTopMoocs(
              divisionFilter(
                moocsEducationArrays.educationLevelDepartmentsAllTheTime,
                sltValue
              )
            )
          );

          // Gender
          var gender = divisionFilter(
            $.extend(true, [], moocsGenderArrays.genderDepartments),
            sltValue
          );
          points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
          points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
          points2(
            moocsGenderAddGray(moocsGenderFilter(gender, "Not Available"))
          );
          points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));
        } else {
          var sltValue = $("select[id*='divisionSelect']").val();
          var jsonGaugesMoocs = $.extend(
            true,
            [],
            moocsGaugesIndicators.indicatorsDivisionsAllTheTime
          );

          jsonGaugesMoocs = jsonGaugesMoocs.filter(function(dataP) {
            return dataP.divisionCode == sltValue;
          });
          drawGaugeMoocsChart(jsonGaugesMoocs[0]);

          var jsonAgeMoocs = $.extend(
            true,
            [],
            moocsAgeArrays.ageDivisionAllTheTime
          );
          jsonAgeMoocs = jsonAgeMoocs.filter(function(dataP) {
            return dataP.divisionCode == sltValue;
          });
          drawMoocsAgeDistributionChart(jsonAgeMoocs);

          drawMoocsRegistrationsChart(
            orderTopMoocs(
              divisionFilter(moocsTopArrays.divisionsAlltime, sltValue)
            )
          );
          drawDistributionChart(
            orderTopMoocs(
              divisionFilter(
                moocsEducationArrays.educationLevelDivisionsAllTheTime,
                sltValue
              )
            )
          );

          // Gender
          var gender = divisionFilter(
            $.extend(true, [], moocsGenderArrays.genderDivisions),
            sltValue
          );
          points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
          points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
          points2(
            moocsGenderAddGray(moocsGenderFilter(gender, "Not Available"))
          );
          points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));
        }
      } else {
        drawGaugeMoocsChart(
          $.extend(true, {}, moocsGaugesIndicators.indicatorsIDBAllTheTime[0])
        );
        //createChartTimelineMoocs($.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB));
        drawMoocsRegistrationsChart(
          $.extend(true, [], moocsTopArrays.IDBAlltime)
        );
        drawMoocsAgeDistributionChart(
          $.extend(true, [], moocsAgeArrays.ageIDBAllTheTime)
        );
        drawDistributionChart(moocsEducationArrays.educationLevelIDBAllTheTime);

        // Gender
        points(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Female"
            )
          )
        );
        points1(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Male"
            )
          )
        );
        points2(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Not Available"
            )
          )
        );
        points3(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Other"
            )
          )
        );
      }
      break;
    default:
      //top registration chart
      if (
        $("select[id*='divisionSelect']").val().length > 0 &&
        $("select[id*='divisionSelect']").val() !== "IDB"
      ) {
        if ($("select[id*='divisionSelect']").val() == "department") {
          setDataMoocsByDepartment($("#divisionSelect option:selected").text());
        } else {
          setDataMoocsByDivisions($("select[id*='divisionSelect']").val());
        }
      } else {
        drawGaugeMoocsChart(
          $.extend(true, {}, moocsGaugesIndicators.indicatorsIDB2018[0])
        );
        drawDistributionChart(moocsEducationArrays.educationLevelIDB2018);
        drawMoocsRegistrationsChart($.extend(true, [], moocsTopArrays.IDB2018));
        drawMoocsAgeDistributionChart(
          $.extend(true, [], moocsAgeArrays.ageIDB2018)
        );
        points(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Female"
            )
          )
        );
        points1(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Male"
            )
          )
        );
        points2(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Not Available"
            )
          )
        );
        points3(
          moocsGenderAddGray(
            moocsGenderFilter(
              $.extend(true, [], moocsGenderArrays.genderIDB),
              "Other"
            )
          )
        );
      }
      break;
  }
}

function initMoocs() {
  $("#moocs2018").prop("checked", true);
  drawGaugeMoocsChart(
    $.extend(true, {}, moocsGaugesIndicators.indicatorsIDB2018[0])
  );
  drawDistributionChart(moocsEducationArrays.educationLevelIDB2018);
  drawMoocsRegistrationsChart($.extend(true, [], moocsTopArrays.IDB2018));
  drawMoocsAgeDistributionChart($.extend(true, [], moocsAgeArrays.ageIDB2018));
  drawStudentRegistrationsChart(
    $.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB)
  );
  drawStudentParticipantsChart(
    $.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB)
  );
  drawStudentCompletedsChart(
    $.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB)
  );
  drawStudentCertifiedsChart(
    $.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB)
  );
  createChartTimelineMoocs(
    $.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB)
  );
  points(
    moocsGenderAddGray(
      moocsGenderFilter(
        $.extend(true, [], moocsGenderArrays.genderIDB),
        "Female"
      )
    )
  );
  points1(
    moocsGenderAddGray(
      moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")
    )
  );
  points2(
    moocsGenderAddGray(
      moocsGenderFilter(
        $.extend(true, [], moocsGenderArrays.genderIDB),
        "Not Available"
      )
    )
  );
  points3(
    moocsGenderAddGray(
      moocsGenderFilter(
        $.extend(true, [], moocsGenderArrays.genderIDB),
        "Other"
      )
    )
  );
}

$("input[name*='moocsTrend']").click(function() {
  moocsFilter();
});

/**
 * End Filters
 */
