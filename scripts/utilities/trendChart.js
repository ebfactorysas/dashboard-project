function drawTrendChartRectBar(
  data,
  id,
  color,
  colorClass,
  indicator,
  valueName,
  radius
) {
  data = data.sort(function (a, b) {
    return d3.ascending(a[valueName], b[valueName]);
  });
  var indices = d3.range(0, data.length);
  var marginPublicationTrend = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 40
  };
  var widthInherith = $(id).width();
  var heightInherith = $(id).height();

  var widthPublicationTrend =
    widthInherith -
    marginPublicationTrend.left -
    marginPublicationTrend.right,
    heightPublicationTrend =
    heightInherith -
    marginPublicationTrend.top -
    marginPublicationTrend.bottom;

  var svgPublicationTrend = d3
    .select(id)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-40 -20 " + widthInherith + " " + heightInherith + "")
    .append("g")
    .classed("svg-content-responsive", true);

  var xPublicationTrend = d3
    .scaleLinear()
    .range([0, widthPublicationTrend])
    .domain([
      0,
      d3.max(data, function (d) {
        return d[valueName];
      })
    ]);

  var heightOfBar = 0;
  if ($(".body").width() < 500) {
    heightOfBar = heightPublicationTrend / data.length;
  } else {
    if (id == "#moocs-registrations") {
      heightOfBar = 43;
    }else{
      heightOfBar = 53;
    }
    
  }



  var yPublicationTrend = d3
    .scaleBand()
    .rangeRound([heightOfBar * data.length, 0], 0.1)
    .domain(indices);

  var yAxisPublicationTrend = d3
    .axisLeft(yPublicationTrend)
    .tickFormat(function (x) {
      var value = setSettingsNumber(data[x][valueName].toFixed(0));
      return value.valueNumber + suffixNumber;
    })
    .tickPadding(40)
    .tickSize(0);

  var gyPublicationTrend = svgPublicationTrend
    .append("g")
    .style("text-anchor", "start")
    .style("color", "#555555")
    .attr("class", "y-data")
    .call(yAxisPublicationTrend);

  var textInAxis = d3.selectAll(id + " .y-data text").attr("dy", ".2em");

  var barsPublicationTrend = svgPublicationTrend
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("g");

  barsPublicationTrend
    .append("rect")
    .attr("class", "bar")
    .attr("y", function (value, index) {
      return yPublicationTrend(index);
    })
    .attr("rx", radius)
    .attr("ry", radius)
    .attr("fill", color)
    .attr("height", function (d) {
      return heightOfBar - data.length;
    })
    .attr("x", 16)
    .attr("width", function (d) {
      return xPublicationTrend(d[valueName]);
    });

  barsPublicationTrend
    .append("text")
    .attr("class", "label")
    .attr("y", function (value, index) {
      if (id == "#moocs-registrations") {
        return yPublicationTrend(index) + 40 / 2 + 4;
      }
      if (id == "#institution-suscribers") {
        return yPublicationTrend(index) + 30;
      }
      // if(data.length==9){
      //   return yPublicationTrend(index) + 15 ;
      // }
      return yPublicationTrend(index) + 40 / 2 + 7;
    })
    // .attr("y", function (d) {
    //     return yPublicationTrend(d.value) + 40 / 2 + 2;
    // })
    .attr("x", function (d) {
      return 25;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Bold")
    .attr("font-size", "1.4rem")
    .text(function (d) {
      if (d.name.length > 90) {
        return d.name.slice(0, 90) + "...";
      }
      return d.name;
    });
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip")
    .style("font-size", "12px")
    .style("width", "450px");
  var tooltipText = d3Old
    .selectAll(id + " .text-inside")
    .on("mouseover", function (d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row " +
        colorClass +
        "'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>" +
        indicator +
        "</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d[valueName].toFixed(0).toLocaleString()
      );
      if (d.division_codes) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Division");
        addText = addText.replace("{{code}}", d.division_codes);
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
        .style("display", "inline-block")
        .style("font-family", "Gotham-Book");
      if (screen.width <= 480) {
        div
          .html(textHtml)
          .style("left", "0px")
          .style("top", d3Old.event.pageY - 28 + 5 + "px")
          .style("width", screen.width + "px");
      } else {
        div
          .html(textHtml)
          .style("left", d3Old.event.pageX + 5 + "px")
          .style("top", d3Old.event.pageY - 28 + 5 + "px");
      }
    })
    .on("mouseout", function (d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });

  var tooltipBar = d3Old
    .selectAll(id + " .bar")
    .on("mouseover", function (d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row " +
        colorClass +
        "'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>" +
        indicator +
        "</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace(
        "{{value}}",
        d[valueName].toFixed(0).toLocaleString()
      );
      if (d.division_codes) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Division");
        addText = addText.replace("{{code}}", d.division_codes);
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
          .style("width", screen.width + "px");
      } else {
        div
          .html(textHtml)
          .style("left", d3Old.event.pageX + 5 + "px")
          .style("top", d3Old.event.pageY - 28 + 5 + "px");
      }
    })
    .on("mouseout", function (d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });
}