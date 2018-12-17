
function setCodeGauge(isIdb) {
    var dataGaugeCode = {
        "code": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(codeAllTotalGlobal),
            "allocated": codeAllTotalGlobal
        },
        "pageview": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(codeAllDownloads),
            "allocated": codeAllDownloads
        },
        "lac": {
            "total": 100,
            "allocated": codeAllDownloadsLac
        }
    }
    return dataGaugeCode;
}

function setCodeGauge2018(isIdb) {
    
    var dataGaugeCode2018 = {
        "code": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(code2018TotalGlobal),
            "allocated": code2018TotalGlobal
        },
        "pageview": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(code2018Downloads),
            "allocated": code2018Downloads
        },
        "lac": {
            "total": 100,
            "allocated": code2018DownloadsLac
        }
    }
    return dataGaugeCode2018;
}

var dataLines = [{
        "date": 201801,
        "Paul Productive Code": 4.1 + 10,
        "Paul Raw Code": 3.2 + 20,
        "Michelle Productive Code": 2.2 + 30,
        "Michelle Raw Code": 1.9 + 40,
        "mario pro code": 7 + 50,
        "mario raw code": 3 + 60
    },
    {
        "date": 201802,
        "Paul Productive Code": 6 + 10,
        "Paul Raw Code": 3.5 + 20,
        "Michelle Productive Code": 3.4 + 30,
        "Michelle Raw Code": 1.9 + 40,
        "mario pro code": 2 + 50,
        "mario raw code": 3 + 60
    },
    {
        "date": 201803,
        "Paul Productive Code": 0 + 10,
        "Paul Raw Code": 3.1 + 20,
        "Michelle Productive Code": 3.1 + 30,
        "Michelle Raw Code": 1.9 + 40,
        "mario pro code": 2 + 50,
        "mario raw code": 9 + 60
    },
    {
        "date": 201804,
        "Paul Productive Code": 7 + 10,
        "Paul Raw Code": 3.8 + 20,
        "Michelle Productive Code": 3.2 + 30,
        "Michelle Raw Code": 2.3 + 40,
        "mario pro code": 9 + 50,
        "mario raw code": 0 + 60
    },
    {
        "date": 201805,
        "Paul Productive Code": 4 + 10,
        "Paul Raw Code": 4.7 + 20,
        "Michelle Productive Code": 3.7 + 30,
        "Michelle Raw Code": 2.7 + 40,
        "mario pro code": 5 + 50,
        "mario raw code": 4 + 60
    },
    {
        "date": 201806,
        "Paul Productive Code": 9 + 10,
        "Paul Raw Code": 5.5 + 20,
        "Michelle Productive Code": 3.2 + 30,
        "Michelle Raw Code": 2.2 + 40,
        "mario pro code": 6 + 50,
        "mario raw code": 2 + 60
    }
];

function drawChartCodeTrend(codeTrend) {

    dataCodeTrend = codeTrend.sort(function (a, b) {
        return d3.descending(a.value, b.value);
    });
    dataCodeTrend = dataCodeTrend.slice(0, 10);
    dataCodeTrend = dataCodeTrend.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });
    var marginCodeTrend = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 205
    };

    var widthCodeTrend = 750 - marginCodeTrend.left - marginCodeTrend.right,
        heightCodeTrend = 520 - marginCodeTrend.top - marginCodeTrend.bottom;


    var svgCodeTrend = d3.select("#code-trend").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-245 -28 800 550")
        .append("g")
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var xCodeTrend = d3.scaleLinear()
        .range([0, widthCodeTrend])
        .domain([0, d3.max(dataCodeTrend, function (d) {
            return d.value;
        })]);

    var yCodeTrend = d3.scaleBand()
        .rangeRound([48*dataCodeTrend.length, 0], .1)
        .domain(dataCodeTrend.map(function (d) {
            return d.name;
        }));

    var yAxisCodeTrend = d3.axisLeft(yCodeTrend)
        //no tick marks
        .tickPadding(240)
        .tickSize(0);

    var gyCodeTrend = svgCodeTrend.append("g")
        .style("text-anchor", "start")
        .style("color", "#f0b600")
        .style("font-family", "Gotham-Medium")
        .style("font-size", "13px")
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
        .attr("height", 45)
        .attr("x", 8)
        .attr("width", function (d) {
            return xCodeTrend(d.value);
        });

    barsCodeTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yCodeTrend(d.name) + 45 / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 16;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .style("color", "#858585")
        .attr("font-size", "13px")
        .text(function (d) {
            var value = setSettingsNumber(d.value)
            return value.valueNumber + value.suffixNumber;
        });
}

function drawTreeCode(dataTree, filtertype) {
    if ($("#code2018").prop("checked")) {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.value2018, b.value2018);
        });
    } else {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.valueAllTheTime, b.valueAllTheTime);
        });
    }
    var numbType =  d3.format('.0%');
    colours = chroma.scale(['#ebb203', '#ffffff'])
        .mode('lch').colors(dataTree.length)

    dataTree.forEach(function (element, i) {
        element.color = colours[i]
    });
        var visualization = d3plusOld.viz()
        .container("#downloads-code") // container DIV to hold the visualization
        .data({
            "value": dataTree, // results in larger padding between 'groups' in treemap
            "stroke": {
                "width": 2
            } // gives each shape a border
        }) // data to use with the visualization
        .type("tree_map") // visualization type
        .id("name") // key for which our data is unique on
        .size({
            value: "value" + filtertype,
            fill: "blue"
        }) // sizing of blocks
        .legend(false)
        .color(function (d) {
            return d.color;
        })
        .labels({
            align: "left",
            valign: "top",
            value: true,
            font: {
                family: "Gotham-Bold",
                size: "17"
            },
            resize: false
        })
        .tooltip({
            font: {
                family: "Gotham-Book"
            },
            value: ["value" + filtertype]
        })
        .format({
            "text": function (text, params) {
                if (text === "share") {
                    return "Percentage";
                } else if (text === "value" + filtertype) {
                    return "Value"
                } else {
                    return d3plusOld.string.title(text, params);
                }
            }
        })
        .text(function (d) {
            var current_id = visualization.id();
            return d[current_id] + "\n" + numbType(d.d3plusOld.share.toFixed(2));
        })

    visualization.draw()    

}

function createChartTimeline(data) {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 580 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var positionText = 0;
    // define the area
    var area = d3.area()
        .x(function (d) {
            return x(d.date);
        })
        .y0(height)
        .y1(function (d) {
            positionText = y(d.close);
            return y(d.close);
        });

    // define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.close);
        });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#timeline-code")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-60 -28 600 250")
        .append("g")
        // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")")

        //class to make it responsive
        .classed("svg-content-responsive", true);
    var totalAmount = 0;
    // format the data
    data.forEach(function (d) {
        d.date = parseTime(d.date);

    });

    data = data.sort(sortByDateAscending);

    for (var i = 0; i < data.length; i++) {
        data[i].close = +data[i].close;
        totalAmount += data[i].close;
        if (i > 0) {
            data[i]['CumulativeAmount'] = data[i].close + data[i - 1].close;
        } else {
            data[i]['CumulativeAmount'] = data[i].close;
        }
    }
    //now calculate cumulative % from the cumulative amounts & total, round %
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

    // scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.close;
    })]);

    // add the area
    svg.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area);

    // add the valueline path.
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

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .style('stroke-width', '3px')
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisBottom(x)
            .ticks(d3.timeDay.filter(function (d) {
                return $("#publication2018").prop("checked") ? d3.timeDay.count(0, d) % 60 === 0 : d3.timeDay.count(0, d) % 300 === 0
            }))
            .ticks(7)
            .tickSizeOuter(0)
        )

    // add the Y Axis
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
        // .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .style("font-family", "Gotham-Bold")
        .text(textOfTotal.valueNumber + textOfTotal.suffixNumber);
    svg.append("text")
        .attr("x", (width - (margin.left / 2)))
        .attr("y", positionText + 20)
        // .attr("text-anchor", "middle")  
        .style("font-size", "14px")
        .style("font-family", "Gotham-Book")
        .text("TOTAL");
}

function drawPlotChart(data) {
   //console.log(data)
    var margin = {
        top: 30,
        right: 50,
        bottom: 60,
        left: 100
    };
    var width = 750 - margin.left - margin.right;
    var height = 580 - margin.top - margin.bottom;
    var valueOfFilter = $('#idbLink')[0].text;
    var arrayAux = [];
    var arrayElements = [];
    for (let i = 0; i < data.length; i++) {
        if (valueOfFilter == data[i].departmentCode) {
            arrayElements.push(data[i])
        } else {
            arrayAux.push(data[i])
        }
    }
    data = arrayAux.concat(arrayElements);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var svg = d3.select('#code-plot')
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-100 -60 750 650")
        .append("g")
        .classed("svg-content-responsive", true);

    var opacityScale = d3.scaleLinear()
        .domain([0.0, 30.0])
        .range([0.10, .80]);

    // The API for scales have changed in v4. There is a separate module d3-scale which can be used instead. The main change here is instead of d3.scale.linear, we have d3.scaleLinear.
    var xScale = d3.scaleLinear()
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .range([height, 0]);

    // square root scale.
    var radius = d3.scaleSqrt()
        .range([2, 5]);

    // the axes are much cleaner and easier now. No need to rotate and orient the axis, just call axisBottom, axisLeft etc.
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickPadding(40)
        .tickSize(0)
        .ticks(8)
        .tickFormat(function (x) {
            var value = setSettingsNumber(x);
            return value.valueNumber + value.suffixNumber;
        });

    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickPadding(40)
        .tickSize(0)
        .ticks(8)
        .tickFormat(function (x) {
            var value = setSettingsNumber(x);
            return value.valueNumber + value.suffixNumber;
        });

    data.forEach(function (d) {
        d.pageviews = +d.pageviews;
        d.daysPublished = +d.daysPublished;
        
    });

    xScale.domain(d3.extent(data, function (d) {
        return d.daysPublished;
    })).nice();

    yScale.domain(d3.extent(data, function (d) {
        return d.pageviews;
    })).nice();

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'x axis')
        .style("stroke-dasharray", "5,5")
        .call(xAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 70)
        .attr('x', 300)
        .attr('fill', 'black')
        .text("Total Days Published");

    // y-axis is translated to (0,0)
    svg.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'y axis')
        .style("stroke-dasharray", "5,5")
        .call(yAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', -80)
        .attr('x', -180)
        .attr('fill', 'black')
        .attr('transform', "rotate(-90)")
        .attr('text-anchor', 'middle')
        .text("Pageviews");

    var mouseOver = function (d) {
        d3.select(this).attr("stroke", "#555555").attr("stroke-width", "2");
        div.transition()
            .duration(0)
            .style("opacity", .9);
        div.html(
                "<div><h4 class='text-center'><b>CODE DETAILS</b></h4><p class='pb-2'>" +
                d.Code + "</p><p><b>" +
                d.departmentCode + "</b></p><div class='pl-0'><p><span>Pageviews:</span>&nbsp;&nbsp;&nbsp;<b>" + d.pageviews + "</b></p><p><span>Published Days:</span><b>" + d.daysPublished + "</b></p></div></div>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");

    }

    var mouseOut = function (d) {
        d3.select(this).attr("stroke-width", "0");
        div.transition()
            .duration(0)
            .style("opacity", 0);
    }
    var bubble = svg.selectAll('.bubble')
        .data(data)
        .enter().append('circle')
        .attr('class', 'bubble')
        .attr('cx', function (d) {
            return xScale(d.daysPublished);
        })
        .attr('cy', function (d) {
            return yScale(d.pageviews);
        })
        .attr('r', function (d) {
            return radius(20);
        })
        .style('fill', function (d) {

            if (d.departmentCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return "#efb823"
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
}

function drawGaugeCodeChart(dataGauge) {
    var width = 150,
        height = 150,
        progress = 0,
        progress3 = 0,
        progress2 = 0,
        formatPercent = d3.format(".0%");
    const twoPi = 2 * Math.PI;

    var arc = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg = d3.selectAll("#gauge-code").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var meter = svg.append("g")
        .attr("class", "funds-allocated-meter");

    meter.append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(twoPi));

    var foreground = meter.append("path")
        .attr("class", "foreground");

    var percentComplete = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0.3em")
        .text(setSettingsNumber(dataGauge.code.allocated).valueNumber + setSettingsNumber(dataGauge.code.allocated).suffixNumber);


    var i = d3.interpolate(progress, dataGauge.code.allocated / dataGauge.code.total);
    foreground.attr("d", arc.endAngle(twoPi * i(1)));
    //gauge K

    var arc2 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg2 = d3.selectAll("#gauge-pageview").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var meter2 = svg2.append("g")
        .attr("class", "funds-allocated-meter");

    meter2.append("path")
        .attr("class", "background")
        .attr("d", arc2.endAngle(twoPi));

    var foreground2 = meter2.append("path")
        .attr("class", "foreground");

    var percentComplete2 = meter2.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0.3em")
        .text(setSettingsNumber(dataGauge.pageview.allocated).valueNumber + setSettingsNumber(dataGauge.pageview.allocated).suffixNumber);


    var i2 = d3.interpolate(progress2, dataGauge.pageview.allocated / dataGauge.pageview.total);
    foreground2.attr("d", arc2.endAngle(twoPi * i2(1)));
    //gauge %

    var arc3 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg3 = d3.selectAll("#gauge-lac").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var meter3 = svg3.append("g")
        .attr("class", "funds-allocated-meter");

    meter3.append("path")
        .attr("class", "background")
        .attr("d", arc3.endAngle(twoPi));

    var foreground3 = meter3.append("path")
        .attr("class", "foreground");

    var percentComplete3 = meter3.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0.3em")
        .text(dataGauge.lac.allocated + "%");

    var i3 = d3.interpolate(progress3, dataGauge.lac.allocated / dataGauge.lac.total);
    foreground3.attr("d", arc3.endAngle(twoPi * i3(1)));
    // d3.transition().duration(1000).tween("progress", function () {
    //     return function (t) {
    //         progress = i(t);
    //         foreground.attr("d", arc.endAngle(twoPi * progress));
    //         percentComplete.text((progress * 100).toFixed(0));
    //         progress2 = i2(t);
    //         foreground2.attr("d", arc2.endAngle(twoPi * progress2));
    //         percentComplete2.text((progress2 * 1000).toFixed(0) + "K");
    //         progress3 = i3(t);
    //         foreground3.attr("d", arc3.endAngle(twoPi * progress3));
    //         percentComplete3.text((progress3 * 100).toFixed(0) + "%");

    //     };
    // });
}



function drawLinesChart(data) {
    var svg = d3.select("#lines-code"),
        margin = {
            top: 20,
            right: 0,
            bottom: 0,
            left: 0
        },
        margin2 = {
            top: 0,
            right: 20,
            bottom: 30,
            left: 0
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;


    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "transparent")

    var parseTime = d3.timeParse("%Y%m");

    var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
        .extent([
            [0, 0],
            [width, height2]
        ])
        .on("brush end", brushed);


    var line = d3.line()
        .x(function (d) {
            return x(new Date(d.date));
        })
        .y(function (d) {
            return y(d.hours);
        });

    var line2 = d3.line()
        .x(function (d) {
            return x2(new Date(d.date));
        })
        .y(function (d) {
            return y2(d.hours);
        })

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);


    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



    var colors = [];
    for (var i = 0; i < 50; i++) {
        var xx = "#e4e4e4";
        colors.push(xx);
        colors.push(xx);
    }




    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks()
    }

    z.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "date";
    }));

    data.forEach(function (d) {
        d.date = parseTime(d.date);
    });

    var employees = z.domain().map(function (id) {
        return {
            id: id,
            values: data.map(function (d) {
                return {
                    date: d.date,
                    hours: +d[id]
                };
            })
        };
    });


    var o1 = 0;
    var o2 = 0;

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));

    y.domain([
        0,
        d3.max(employees, function (c) {
            return d3.max(c.values, function (d) {
                return d.hours;
            });
        })
    ]);
    x2.domain(x.domain());
    y2.domain(y.domain());
    z.domain(employees.map(function (c) {
        return c.id;
    }));

    var focuslineGroups = focus.selectAll("g")
        .data(employees)
        .enter().append("g");

    var focuslines = focuslineGroups.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.values);
        })
        .style("stroke", function (d) {
            return colors[o1++]
        })
        .attr("clip-path", "url(#clip)");

    // focus.append("g")
    //     .attr("class", "grid")
    //     .call(make_y_gridlines()
    //         .tickSize(-width)
    //         .tickFormat("")
    //     )


    function brushed() {
        var extent = d3.event.selection;
        var s = extent.map(x2.invert, x2);
        x.domain(s);
        focuslines.attr("d", function (d) {
            return line(d.values)
        });
        focus.select(".axis--x").call(xAxis);
        focus.select(".axis--y").call(yAxis);
    }
}


//init
function initCode() {
    var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.codeTrendIADBA2018);
    var ObjectPageViewsTimeLineAllTime = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineIDB);
    var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);

    drawLinesChart(dataLines);
    drawTreeCode(codePageviewsSourceArrays.pageviewSourceIDB, "2018");
    dataGaugeCode2018 = setCodeGauge2018('IDB');
    drawGaugeCodeChart(dataGaugeCode2018);
    drawPlotChart(ObjectcodeScatterploArrays);
    drawChartCodeTrend(ObjectTopIdb2018);
    createChartTimeline(ObjectPageViewsTimeLineAllTime);
}

function removeCodeSvg() {
    d3.select("#downloads-code svg").remove();
    d3.select("#code-trend svg").remove();
    // d3.select("#timeline-code svg").remove();
    // d3.select("#code-plot svg").remove();
}

function removeCodeSvgAll() {
    d3.select("#downloads-code svg").remove();
    d3.select("#code-trend svg").remove();
    d3.select("#timeline-code svg").remove();
    d3.select("#code-plot svg").remove();
}
function removeGaugeCode() {
    d3.select("#gauge-code svg").remove();
    d3.select("#gauge-pageview svg").remove();
    d3.select("#gauge-lac svg").remove();
}
//click radiobutton drawChart(id del click)
$("input[name*='codeTrend']").click(function () {
    
    removeCodeSvg();
    removeGaugeCode();
    if ($("select[id*='divisionSelect']").val() == "IDB") {
        var ObjectTopIdbAllTime = $.extend(true, [], codeTopArrays.codeTrendIADBAllTime);
        var ObjectPageViewsTimeLineAllTime = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineIDB);
        var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.codeTrendIADBA2018);
        var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);
        if (this.id == "codeAllTime") {
            drawTreeCode(codePageviewsSourceArrays.pageviewSourceIDB, "AllTheTime");
            drawChartCodeTrend(ObjectTopIdbAllTime);
            // createChartTimeline(ObjectPageViewsTimeLineAllTime);
            // drawPlotChart(ObjectcodeScatterploArrays);
            dataGaugeCode = setCodeGauge();
            drawGaugeCodeChart(dataGaugeCode);
        } else {
            drawTreeCode(codePageviewsSourceArrays.pageviewSourceIDB, "2018");
            drawChartCodeTrend(ObjectTopIdb2018);
            // createChartTimeline(ObjectPageViewsTimeLineAllTime);
            // drawPlotChart(ObjectcodeScatterploArrays);
            dataGaugeCode2018 = setCodeGauge2018();
            drawGaugeCodeChart(dataGaugeCode2018);
        }
    }
    else {
        jsondataCode = codeIndicatorsArrays.indicatorsDivisions.filter(function (data) {
            return data.division_codes == $("select[id*='divisionSelect']").val()
        });
        var ObjectPageViewsTimeLine = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineDivisions);
        ObjectPageViewsTimeLine = ObjectPageViewsTimeLine.filter(function (data) {
            return data.division_codes == $("select[id*='divisionSelect']").val()
        });
        var ObjectCodePageViewSource = $.extend(true, [], codePageviewsSourceArrays.pageviewSourceDivisions);
        ObjectCodePageViewSource = ObjectCodePageViewSource.filter(function (data) {
            return data.division_codes == $("select[id*='divisionSelect']").val()
        });
        if (this.id == "codeAllTime") {
            removeCodeSvg();
            removeGaugeCode();
            var ObjectTopIdbAllTime = $.extend(true, [], codeTopArrays.codeTrendAllTimeDivisions);
            ObjectTopIdbAllTime = ObjectTopIdbAllTime.filter(function (data) {
                return data.divisionCodes == $("select[id*='divisionSelect']").val()
            });
            drawChartCodeTrend(ObjectTopIdbAllTime);
            // createChartTimeline(ObjectPageViewsTimeLineAllTime);
            // drawPlotChart(ObjectcodeScatterploArrays);
            codeAllTotalGlobal = (jsondataCode.length > 0) ? jsondataCode[0].all_the_time_code : '0',
            codeAllDownloads = (jsondataCode.length > 0) ? jsondataCode[0]['all_the_time_pageviews'] : '0',
            codeAllDownloadsLac = (jsondataCode.length > 0) ? ((jsondataCode[0]['porcent_total_lac'] * 100 >= 100) ? "100%" : (jsondataCode[0]['porcent_total_lac'] * 100).toFixed(1)) : '',
            dataGaugeCode = setCodeGauge();
            drawGaugeCodeChart(dataGaugeCode);
            drawTreeCode(ObjectCodePageViewSource, "AllTheTime");
        }
        else {
            removeCodeSvgAll();
            removeGaugeCode();
            var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.codeTrend2018Divisions);
            ObjectTopIdb2018 = ObjectTopIdb2018.filter(function (data) {
                return data.divisionCodes == $("select[id*='divisionSelect']").val()
            });
            code2018TotalGlobal = (jsondataCode.length > 0) ? jsondataCode[0]['2018_code'] : '0',
            code2018Downloads = (jsondataCode.length > 0) ? jsondataCode[0]['2018_pageviews'] : '0',
            code2018DownloadsLac = (jsondataCode.length > 0) ? ((jsondataCode[0]['porcent_total_lac'] * 100 >= 100) ? "100%" : (jsondataCode[0]['porcent_total_lac'] * 100).toFixed(1)) : '',
            
            setDataCodeByDivisions($("select[id*='divisionSelect']").val());
            // dataGaugeCode2018 = setCodeGauge2018();
            
            // drawGaugeCodeChart(dataGaugeCode2018);
            // drawChartCodeTrend(ObjectTopIdb2018);
            // drawTreeCode(ObjectCodePageViewSource, "2018");
        }
    }
    //drawChartCodeTrend(codetrendArrays[this.id]);

    //graph #4
    //createChartTimeline(pageViewsTimeLine[this.id]);

});