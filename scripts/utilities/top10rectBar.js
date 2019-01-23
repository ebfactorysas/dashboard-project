function drawTrendChart(data, id, colorY, colorClass, inBar, textColor) {
    var marginDataTrend = {
        top: 15,
        right: 48,
        bottom: 15,
        left: 300
    };

    var widthDataTrend = 800 - marginDataTrend.left - marginDataTrend.right,
        heightDataTrend = 520 - marginDataTrend.top - marginDataTrend.bottom;
    var valueOfFilter = $("#divisionSelect")[0].value;

    var svgDataTrend = d3.select(id)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-290 -28 800 550")
        .append("g")
        .classed("svg-content-responsive", true);

    var xDataTrend = d3.scaleLinear()
        .range([0, widthDataTrend])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var yDataTrend = d3.scaleBand()
        .rangeRound([50 * data.length, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));

    var yAxisDataTrend = d3.axisLeft(yDataTrend)
        .tickPadding(200)
        .tickSize(0);

    var gyDataTrend = svgDataTrend.append("g")
        .style("text-anchor", "start")
        .style("color", colorY)
        .attr("class", "y-data")
        .call(yAxisDataTrend)

    var barsDataTrend = svgDataTrend.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    barsDataTrend.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return yDataTrend(d.name);
        })
        .attr("fill", function (d) {
            var divisionSelected = $('#idbLink')[0].text;

            if (divisionSelected == "IDB Group" || divisionSelected == d.Division || (valueOfFilter == "department" && d.Department == divisionSelected)) {
                return colorY;
            }
            return "#d3d3d3";
        })
        .style("opacity", .8)
        .attr("height", 45)
        .attr("x", 8)
        .attr("width", function (d) {
            return xDataTrend(d.value);
        });

    barsDataTrend.append("text")
        .attr("class", "label")
        .attr("y", function (d) {
            return yDataTrend(d.name) + 45 / 2 + 4;
        })
        .attr("x", function (d) {
            if (inBar == true) {
                return 25;
            }
            return xDataTrend(d.value) + 10;
        })
        .attr("class", "text-inside")
        .attr("fill", textColor)
        .style("opacity", .8)
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "13px")
        .text(function (d) {
            var value = setSettingsNumber(d.value)
            return value.valueNumber + value.suffixNumber;
        });

    svgDataTrend.selectAll(".tick text")
        .attr("width", "290")
        .attr("x", -290)
        .attr("y", -5)
        .attr("text-anchor", "start")
        .style("font-family", "Gotham-Medium")
        .style("font-size", "13px")
        .call(wrapData);

    var div = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("font-size", "12px")
        .style("width", "450px");


    var tooltipBar = d3Old.selectAll(id + " .bar")
        .on("mouseover", function (d) {
            var textHtml = "<div class='col tooltip-gauges'><h3 class='row " + colorClass + "'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Downloads</span><span class='col text-right' >{{value}}</div>";
            textHtml = textHtml.replace('{{title}}', d.name)
            textHtml = textHtml.replace('{{value}}', d.value.toLocaleString())
            if (d.Department) {
                var addText = "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Department")
                addText = addText.replace('{{code}}', d.Department);
                textHtml = textHtml + addText;
            }
            if (d.Division) {
                var addText = "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Division")
                addText = addText.replace('{{code}}', d.Division)
                textHtml = textHtml + addText;
            }

            textHtml = textHtml + "</div>";
            div.transition()
                .duration(0)
                .style("font-family", "Gotham-Book")
                .style("display", "inline-block");
            // div.html(d.value + "<br/>" + d.name)
            div.html(textHtml)
                .style("left", (d3Old.event.pageX) + 5 + "px")
                .style("top", (d3Old.event.pageY - 28) + 5 + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("display", "none");
        });
}