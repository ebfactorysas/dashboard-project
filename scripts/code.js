var dataTree = {
    "name": "flare",
    "children": [{
        "name": "analytics",
        "children": [{
                "name": "graph",
                "children": [{
                    "name": "Google",
                    "size": 66
                }]
            },
            {
                "name": "optimization",
                "children": [{
                    "name": "IDB Publications",
                    "size": 18
                }]
            }, {
                "name": "graph",
                "children": [{
                    "name": "Google",
                    "size": 66
                }]
            },
            {
                "name": "optimization",
                "children": [{
                    "name": "IDB Publications",
                    "size": 18
                }]
            },
            {
                "name": "optimization",
                "children": [{
                    "name": "AspectRatioBanker",
                    "children": [{
                        "children": [{
                            "name": "Others",
                            "size": 6
                        }, {
                            "name": "",
                            "size": 3
                        }],
                        "name": "Others"
                    }, {
                        "children": [{
                            "name": "IDB Blogs",
                            "size": 3
                        }, {
                            "name": "",
                            "size": 1
                        }, {
                            "name": "",
                            "size": 1
                        }, {
                            "name": "",
                            "size": 1
                        }, {
                            "name": "",
                            "size": 1
                        }, {
                            "name": "",
                            "size": 1
                        }],
                        "name": "IDB Blogs"
                    }]
                }]
            }
        ]
    }]
}

// var dataGauge = {
//     "code": {
//         "total": 100,
//         "allocated": 76
//     },
//     "pageview": {
//         "total": 1000,
//         "allocated": 113
//     },
//     "lac": {
//         "total": 100,
//         "allocated": 9
//     }
// }
var dataGaugeCode = {
    "code": {
        "total": (codeAllTotalGlobal > 0) ? ((codeAllTotalGlobal > 100) ? 1000 : 100) : 100,
        "allocated": codeAllTotalGlobal
    },
    "pageview": {
        "total": (codeAllDownloads > 0) ? ((codeAllDownloads > 100) ? 1000 : 100) : 100,
        "allocated": codeAllDownloads
    },
    "lac": {
        "total": (codeAllDownloadsLac > 0) ? ((codeAllDownloadsLac > 100) ? 1000 : 100) : 100,
        "allocated": codeAllDownloadsLac
    }
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
        return d3.ascending(a.value, b.value);
    });

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
            return (d.value / 1000) + "K";
        });
}


function drawTree(data) {
    data = data[0];

    const marginTree = {
            top: 40,
            right: 10,
            bottom: 10,
            left: 10
        },
        widthTree = 935 - marginTree.left - marginTree.right,
        heightTree = 200 - marginTree.top - marginTree.bottom,
        colorTree = d3.scaleOrdinal().range(["#ebb203", "#ebb817", "#edc959", "#f0e9eb", "#f1ede2", "#f1f1f1"]);

    const treemap = d3.treemap().size([widthTree, heightTree]);

    const divTree = d3.select("#downloads-code").append("div")
        .style("position", "relative")
        .style("width", (widthTree + marginTree.left + marginTree.right) + "px")
        .style("height", (heightTree + marginTree.top + marginTree.bottom) + "px")
        .style("left", marginTree.left + "px")
        .style("top", marginTree.top + "px");
    const root = d3.hierarchy(data, function (d) {
            return d.children
        })
        .sum(function (d) {
            return d.data2018
        });

    const tree = treemap(root);

    const node = divTree.datum(root).selectAll(".node")
        .data(tree.leaves())
        .enter().append("div")
        .attr("class", "node")
        .style("left", function (d) {
            return d.x0 + "px"
        })
        .style("top", function (d) {
            return d.y0 + "px"
        })
        .style("width", function (d) {
            return Math.max(0, d.x1 - d.x0) + "px"
        })
        .style("height", function (d) {
            return Math.max(0, d.y1 - d.y0) + "px"
        })
        .style("background", function (d) {
            return colorTree(d.parent.data.name)
        })
        .text(function (d) {
            return d.data.name
        });

    d3.selectAll("input").on("change", function change() {
        const value = this.value === "count" ?
            function (d) {
                return d.data2018 ? 1 : 0;
            } :
            function (d) {
                return d.data2018;
            };

        const newRoot = d3.hierarchy(data, function (d) {
                return d.children
            })
            .sum(value);

        node.data(treemap(newRoot).leaves())
            .transition()
            .duration(1500)
            .style("left", function (d) {
                return d.x0 + "px"
            })
            .style("top", function (d) {
                return d.y0 + "px"
            })
            .style("width", function (d) {
                return Math.max(0, d.x1 - d.x0 - 1) + "px"
            })
            .style("height", function (d) {
                return Math.max(0, d.y1 - d.y0 - 1) + "px"
            })
    });
}

function createChartTimeline(data) {
    if ($("#code2018").prop("checked")) {
        data = data.filter(function (data) {
            return data.date.indexOf("-18") > -1
        });
    }

    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 520 - margin.left - margin.right,
        height = 240 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the area
    var area = d3.area()
        .x(function (d) {
            return x(d.date);
        })
        .y0(height)
        .y1(function (d) {
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
    var svg = d3.select("#timeline-code").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var totalAmount = 0;
    // format the data
    data.forEach(function (d) {
        d.date = parseTime(d.date);
    });

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
            return y(d.CumulativeAmount); //review function
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
    //
    svg.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', '#c3c3c3')
        .attr("stroke-dasharray", "4")
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .style('stroke-width', '3px')
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        //.call(d3.axisBottom(x))
        .call(d3.axisBottom(x)
            //.ticks(d3.timeDay.filter(d => d3.timeDay.count(0, d) % 100 === 0))
            .ticks(d3.timeDay.filter(function (d) {
                return $("#code2018").prop("checked") ? d3.timeDay.count(0, d) % 60 === 0 : d3.timeDay.count(0, d) % 100 === 0;
            }))
            .tickFormat(function (x) {
                // get the milliseconds since Epoch for the date
                var milli = (x.getTime() - 10000);

                // calculate new date 10 seconds earlier. Could be one second, 
                // but I like a little buffer for my neuroses
                var vanilli = new Date(milli);

                // calculate the month (0-11) based on the new date
                var mon = vanilli.getMonth();
                var yr = vanilli.getFullYear();

                // return appropriate quarter for that month
                if ($("#code2018").prop("checked")) {
                    if (mon <= 2 && yr == 2018) {
                        return "Q1 " + yr;
                    } else if (mon <= 5 && yr == 2018) {
                        return "Q2 " + yr;
                    } else if (mon <= 8 && yr == 2018) {
                        return "Q3 " + yr;
                    } else if (yr == 2018) {
                        return "Q4 " + yr;
                    }
                } else {
                    if (mon <= 2) {
                        return "Q1 " + yr;
                    } else if (mon <= 5) {
                        return "Q2 " + yr;
                    } else if (mon <= 8) {
                        return "Q3 " + yr;
                    } else {
                        return "Q4 " + yr;
                    }
                }


            })
            .tickSizeOuter(0)
        );

    // add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisLeft(y)
            .tickFormat(d3.format(".2s")));
}

function drawPlotChart(data) {
    if ($("#code2018").prop("checked")) {
        data = data.filter(function (data) {
            return data.publishedDate.indexOf("-18") > -1
        });
    }
    data.forEach(function (d) {
        d.daysPublished = +d.daysPublished;
        d.departmentCode = +d.departmentCode;
        d.Code = +d.Code;
        d.publishedDate = +d.publishedDate;
    });


    const width = 350;
    const height = 300;



    const xValue = function (d) {
        d.pageviews
    };
    const xAxisLabel = 'Total Days Published';

    const yValue = function (d) {
        d.daysPublished
    };
    const circleRadius = 10;
    const yAxisLabel = 'PageViews';

    const margin = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 50
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select("#code-plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = svg.append('g')
        .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

    const xAxis = d3.axisBottom(xScale)
        .scale(xScale)
        .tickSize(0)
        .tickPadding(30);

    const yAxis = d3.axisLeft(yScale)
        .scale(yScale)
        .tickSize(0)
        .tickPadding(30);

    const yAxisG = g.append('g').call(yAxis);


    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', "rotate(-90)")
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', "translate(0," + innerHeight + ")");

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cy', function (d) {
            yScale(yValue(d))
        })
        .attr('cx', function (d) {
            xScale(xValue(d))
        })
        .attr('r', circleRadius)
        .attr('fill', function (d) {
            if (d.daysPublished >= 200 && d.pageviews >= 1000) {
                return 'yellow'
            } else {
                return 'gray'
            }
        });
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
        .text(dataGauge.code.allocated);


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
        .text(dataGauge.pageview.allocated + "k");


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

drawLinesChart(dataLines);

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
var ObjectTopIdbAllTime = $.extend(true, [], codeTopArrays.codeTrendIADBAllTime);
var ObjectPageViewsTimeLineAllTime = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineIDB);
var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);

//aca
drawTree(codePageviewsSourceArrays.pageviewSourceIDB);
//aca

drawGaugeCodeChart(dataGaugeCode);
drawPlotChart(ObjectcodeScatterploArrays);
drawChartCodeTrend(ObjectTopIdbAllTime);
createChartTimeline(ObjectPageViewsTimeLineAllTime);

//click radiobutton drawChart(id del click)
$("input[name*='codeTrend']").click(function () {
    var ObjectTopIdbAllTime = $.extend(true, [], codeTopArrays.codeTrendIADBAllTime);
    var ObjectPageViewsTimeLineAllTime = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineIDB);
    var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.codeTrendIADBA2018);
    var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);

    d3.select("#code-trend svg").remove();
    d3.select("#timeline-code svg").remove();
    d3.select("#code-plot svg").remove();

    if (this.id == "codeAllTime") {
        drawChartCodeTrend(ObjectTopIdbAllTime);
        createChartTimeline(ObjectPageViewsTimeLineAllTime);
        drawPlotChart(ObjectcodeScatterploArrays);
    } else {
        drawChartCodeTrend(ObjectTopIdb2018);
        createChartTimeline(ObjectPageViewsTimeLineAllTime);
        drawPlotChart(ObjectcodeScatterploArrays);
    }

    //drawChartCodeTrend(codetrendArrays[this.id]);

    //graph #4
    //createChartTimeline(pageViewsTimeLine[this.id]);

});