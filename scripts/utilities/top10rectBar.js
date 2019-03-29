function drawTrendChart(data, id, colorY, colorClass, inBar, textColor) {
    var tickPaddingValue =200;
    if (screen.width <= 480) {
      tickPaddingValue = 100;
    }
    var marginDataTrend = {
    top: 15,
    right: 48,
    bottom: 15,
    left: tickPaddingValue
  };
  
  var indices = d3.range(0, data.length);
  var widthInherith = $(id).width();
  var heightInherith = $(id).height();

  var widthDataTrend =
      widthInherith - marginDataTrend.left - marginDataTrend.right,
    heightDataTrend =
      heightInherith - marginDataTrend.top - marginDataTrend.bottom;
  var valueOfFilter = $("#divisionSelect")[0].value;

  var svgDataTrend = d3
    .select(id)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", (-1*tickPaddingValue) +" -28 " + widthInherith + " " + heightInherith)
    .append("g")
    .classed("svg-content-responsive", true);

  var xDataTrend = d3
    .scaleLinear()
    .range([0, widthDataTrend])
    .domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);

  var heightOfBar = heightDataTrend / 10;

  var yDataTrend = d3
    .scaleBand()
    .rangeRound([heightOfBar * data.length, 0], 0.1)
    .domain(indices);

  var yAxisDataTrend = d3
    .axisLeft(yDataTrend)
    .tickPadding(tickPaddingValue)
    .tickSize(0)
    .tickFormat(function(x){
        return data[x].name;
    });

  var gyDataTrend = svgDataTrend
    .append("g")
    .style("text-anchor", "start")
    .style("color", colorY)
    .attr("class", "y-data")
    .call(yAxisDataTrend);

  var barsDataTrend = svgDataTrend
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("g");

  barsDataTrend
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(value, index) {
      return yDataTrend(index);
    })
    .attr("fill", function(d) {
      var divisionSelected = $("#idbLink")[0].text;

      if (
        divisionSelected == "IDB Group" ||
        divisionSelected == d.Division ||
        (valueOfFilter == "department" && d.Department == divisionSelected)
      ) {
        return colorY;
      }
      return "#d3d3d3";
    })
    .style("opacity", 0.8)
    .attr("height", 45)
    .attr("x", 8)
    .attr("width", function(d) {
      return xDataTrend(d.value);
    });

  barsDataTrend
    .append("text")
    .attr("class", "label")
    .attr("y", function(value, index) {
      return yDataTrend(index) + 45 / 2 + 4;
    })
    .attr("x", function(d) {
      if (inBar == true) {
        return 25;
      }
      return xDataTrend(d.value) + 10;
    })
    .attr("class", "text-inside")
    .attr("fill", textColor)
    .style("opacity", 0.8)
    .attr("font-family", "Gotham-Bold")
    .attr("font-size", "1.1rem")
    .text(function(d) {
      var value = setSettingsNumber(d.value);
      return value.valueNumber + value.suffixNumber;
    });

  svgDataTrend
    .selectAll(".tick text")
    .attr("width", tickPaddingValue)
    .attr("x", tickPaddingValue*-1)
    .attr("y", -5)
    .attr("text-anchor", "start")
    .style("font-family", "Gotham-Medium")
    .style("font-size", "1.1rem")
    .call(wrapData);

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip")
    .style("font-size", "1rem")
    .style("width", "450px");

  var tooltipBar = d3Old
    .selectAll(id + " .bar")
    .on("mouseover", function(d) {
      var textHtml =
        "<div class='col tooltip-gauges'><h3 class='row " +
        colorClass +
        "'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Downloads</span><span class='col text-right' >{{value}}</div>";
      textHtml = textHtml.replace("{{title}}", d.name);
      textHtml = textHtml.replace("{{value}}", d.value.toLocaleString());
      if (d.Department) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Department");
        addText = addText.replace("{{code}}", d.Department);
        textHtml = textHtml + addText;
      }
      if (d.Division) {
        var addText =
          "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>";
        addText = addText.replace("{{type}}", "Division");
        addText = addText.replace("{{code}}", d.Division);
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
          .style("left", d3Old.event.pageX + 5 + "px")
          .style("top", d3Old.event.pageY - 28 + 5 + "px");
      }
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(0)
        .style("display", "none");
    });
}
