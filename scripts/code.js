/**
 * Start code-trend
 *  */
d3.json("json/code/Top10CodeAllTheTimeIDB_JSON.json").then(function (codeTrend) {

    dataCodeTrend = codeTrend.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });
    drawChartCodeTrend(dataCodeTrend);
});

function drawChartCodeTrend(dataCodeTrend) {
    var marginCodeTrend = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 205
    };

    var widthCodeTrend = 520 - marginCodeTrend.left - marginCodeTrend.right,
        heightCodeTrend = 400 - marginCodeTrend.top - marginCodeTrend.bottom;


    var svgCodeTrend = d3.select("#code-trend").append("svg")
        .attr("width", widthCodeTrend + marginCodeTrend.left + marginCodeTrend.right)
        .attr("height", heightCodeTrend + marginCodeTrend.top + marginCodeTrend.bottom)
        .append("g")
        .attr("transform", "translate(" + marginCodeTrend.left + "," + marginCodeTrend.top + ")");

    var xCodeTrend = d3.scaleLinear()
        .range([0, widthCodeTrend])
        .domain([0, d3.max(dataCodeTrend, function (d) {
            return d.value;
        })]);

    var yCodeTrend = d3.scaleBand()
        .rangeRound([heightCodeTrend, 0], .1)
        .domain(dataCodeTrend.map(function (d) {
            return d.name;
        }));

    var yAxisCodeTrend = d3.axisLeft(yCodeTrend)
        //no tick marks
        .tickPadding(205)
        .tickSize(0);

    var gyCodeTrend = svgCodeTrend.append("g")
        .style("text-anchor", "start")
        .style("color", "#f0b600")
        .attr("class", "y-code")
        .call(yAxisCodeTrend)

    var barsCodeTrend = svgCodeTrend.selectAll(".bar")
        .data(dataCodeTrend)
        .enter()
        .append("g")

    barsCodeTrend.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return yCodeTrend(d.name);
        })
        .attr("fill", "#d3d3d3")
        .attr("height", yCodeTrend.bandwidth() - 2)
        .attr("x", 8)
        .attr("width", function (d) {
            return xCodeTrend(d.value);
        });

    barsCodeTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yCodeTrend(d.name) + yCodeTrend.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 12;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .text(function (d) {
            return (d.value/1000) + "K";
        });
}

/**
 * End code-trend
 *  
 * */