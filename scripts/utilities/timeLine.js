function createTimelineChart(data, id,colorTitle,id2018,widthDef) {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = widthDef - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;
    var parseTime = d3.timeParse("%d-%b-%y");
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var positionText = 0;

    var area = d3.area()
        .x(function (d) {
            return x(d.date);
        })
        .y0(height)
        .y1(function (d) {
            positionText = y(d.close);
            return y(d.close);
        });

    var valueline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.close);
        });

    var svg = d3.select(id)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-60 -28 610 250")
        .append("g")
        .classed("svg-content-responsive", true);

    data.forEach(function (d) {
        d.dateAux = d.date;
        d.date = parseTime(d.date);

    });

    data = data.sort(sortByDateAscending);
    var totalAmount = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].close = +data[i].close;
        totalAmount += data[i].close;
        if (i > 0) {
            data[i]['CumulativeAmount'] = data[i].close + data[i - 1].close;
        } else {
            data[i]['CumulativeAmount'] = data[i].close;
        }
    }

    for (var i = 0; i < data.length; i++) {
        data[i]['CumulativePercentage'] = (data[i]['CumulativeAmount'] / totalAmount);
        data[i]['CumulativePercentage'] = parseFloat(data[i]['CumulativePercentage'].toFixed(2));
    }

    var lineGen = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.CumulativeAmount);
        });
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.close;
    })]);

    svg.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    //calculate path do not delete it
    // svg.append('svg:path')
    //     .attr('d', lineGen(data))
    //     .attr('stroke', '#c3c3c3')
    //     .attr("stroke-dasharray", "4")
    //     .attr('stroke-width', 2)
    //     .attr('fill', 'none');

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .style('stroke-width', '3px')
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisBottom(x)
            .ticks(d3.timeDay.filter(function (d) {
                return $(id2018).prop("checked") ? d3.timeDay.count(0, d) % 60 === 0 : d3.timeDay.count(0, d) % 300 === 0
            }))
            .ticks(7)
            .tickSizeOuter(0)
        )

    svg.append("g")
        .attr("class", "y-axis")
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisLeft(y)
            .ticks(3)
            .tickFormat(function (x) {
                var value = setSettingsNumber(x);
                return Math.floor(value.valueNumber) + value.suffixNumber;
            }));

    var textOfTotal = setSettingsNumber(totalAmount);

    svg.append("text")
        .attr("x", (width - (margin.left / 2)))
        .attr("y", positionText)
        .style("font-size", "16px")
        .style("font-family", "Gotham-Bold")
        .text(textOfTotal.valueNumber + textOfTotal.suffixNumber);
    svg.append("text")
        .attr("x", (width - (margin.left / 2)))
        .attr("y", positionText + 20)
        .style("font-size", "14px")
        .style("font-family", "Gotham-Book")
        .text("TOTAL");

        var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
    focus.append("rect")
        .attr("x", -100)
        .attr("y", -18)
        .attr("class", "tooltip-bg")
        .attr("width", 150)
        .attr("height", 50)
        .attr("fill", "#fff")

    var textFocus = focus.append("text")
        .attr("x", -100)
        .attr("dy", ".35em")
        .style("font-size", 15)
        .style("font-family", "Gotham-Book");

    textFocus.append("tspan")
        .attr("x", -100)
        .attr("dy", ".35em")
        .attr("class", "value")
        .style("font-size", 16)
        .style("font-family", "Gotham-Book")
        .attr("fill", colorTitle);

    textFocus.append("tspan")
        .attr("x", -100)
        .attr("y", 17)
        .attr("dy", ".35em")
        .attr("class", "date")
        .style("font-size", 14)
        .style("font-family", "Gotham-Book");

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function () {
            focus.style("display", null);
        })
        .on("mouseout", function () {
            focus.style("display", "none");
        })
        .on("mousemove", mousemove);
    var bisectDate = d3.bisector(function (d) {
        return d.date;
    }).left;

    function mousemove() {

        var x0 = x.invert(d3.mouse(this)[0]),

            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        if (x(d.date) < 300) {
            focus.select("rect").attr("x", -10)
            focus.selectAll("text").attr("x", -5)
            focus.selectAll("tspan").attr("x", -5)
        } else {
            focus.select("rect").attr("x", -140)
            focus.selectAll("text").attr("x", -135)
            focus.selectAll("tspan").attr("x", -135)
        }

        var depl = parseFloat(d.close);

        focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");

        focus.select(".value").text(moment(d.date).format("MMM-YY"));
        focus.select(".date").text(d.close.toLocaleString() + " downloads");
    }
}