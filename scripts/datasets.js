/**
 * Start data-trend
 *  */

function drawDataTrendChart(dataDataTrend) {
    dataDataTrend = dataDataTrend.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    })
    var marginDataTrend = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 300
    };

    var widthDataTrend = 560 - marginDataTrend.left - marginDataTrend.right,
        heightDataTrend = 400 - marginDataTrend.top - marginDataTrend.bottom;


    var svgDataTrend = d3.select("#data-trend").append("svg")
        .attr("width", widthDataTrend + marginDataTrend.left + marginDataTrend.right)
        .attr("height", heightDataTrend + marginDataTrend.top + marginDataTrend.bottom)
        .append("g")
        .attr("transform", "translate(" + marginDataTrend.left + "," + marginDataTrend.top + ")");

    var xDataTrend = d3.scaleLinear()
        .range([0, widthDataTrend])
        .domain([0, d3.max(dataDataTrend, function (d) {
            return d.value;
        })]);

    var yDataTrend = d3.scaleBand()
        .rangeRound([heightDataTrend, 0], .1)
        .domain(dataDataTrend.map(function (d) {
            return d.name;
        }));

    var yAxisDataTrend = d3.axisLeft(yDataTrend)
        //no tick marks
        .tickPadding(200)
        .tickSize(0);

    var gyDataTrend = svgDataTrend.append("g")
        .style("text-anchor", "start")
        .style("color", "#45509b")
        .attr("class", "y-data")
        .call(yAxisDataTrend)

    var barsDataTrend = svgDataTrend.selectAll(".bar")
        .data(dataDataTrend)
        .enter()
        .append("g")

    barsDataTrend.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return yDataTrend(d.name);
        })
        .attr("fill", "#d3d3d3")
        .attr("height", yDataTrend.bandwidth() - 2)
        .attr("x", 8)
        .attr("width", function (d) {
            return xDataTrend(d.value);
        });

    barsDataTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yDataTrend(d.name) + yDataTrend.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 12;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .text(function (d) {
            return d.value + "K";
        });

    svgDataTrend.selectAll(".tick text")
        .attr("width", "248")
        .attr("x", -290)
        .attr("y", -5)
        .attr("text-anchor", "start")
        .call(wrapData);
}

function wrapData(text) {
    text.each(function () {
        var text = d3.select(this);
        var words = text.text().split(/\s+/).reverse();
        var lineHeight = 15;
        var width = parseFloat(text.attr('width'));
        var y = parseFloat(text.attr('y'));
        var x = text.attr('x');
        var anchor = text.attr('text-anchor');

        var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('text-anchor', anchor);
        var lineNumber = 0;
        var line = [];
        var word = words.pop();

        while (word) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
                lineNumber += 1;
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan').attr('x', x).attr('y', y + lineNumber * lineHeight).attr('anchor', anchor).text(word);
            }
            word = words.pop();
        }
    });
}

/**
 * End data-trend
 *  */


/**
 * Start tree
 *  */

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

drawTree(dataTree);

function drawTree(dataTree) {
    const marginTree = {
            top: 40,
            right: 10,
            bottom: 10,
            left: 10
        },
        widthTree = 935 - marginTree.left - marginTree.right,
        heightTree = 200 - marginTree.top - marginTree.bottom,
        colorTree = d3.scaleOrdinal().range(["#424488", "#726ea5", "#a19cc3", "#cfcce1", "#f1f1f1"]);

    const treemap = d3.treemap().size([widthTree, heightTree]);

    const divTree = d3.select("#downloads-dataset").append("div")
        .style("position", "relative")
        .style("width", (widthTree + marginTree.left + marginTree.right) + "px")
        .style("height", (heightTree + marginTree.top + marginTree.bottom) + "px")
        .style("left", marginTree.left + "px")
        .style("top", marginTree.top + "px");
    const root = d3.hierarchy(dataTree, function(d) {return d.children} )
        .sum(function(d) {return d.size} );

    const tree = treemap(root);

    const node = divTree.datum(root).selectAll(".node")
        .data(tree.leaves())
        .enter().append("div")
        .attr("class", "node")
        .style("left", function(d) {return  d.x0 + "px"})
        .style("top", function(d) {return d.y0 + "px"} )
        .style("width", function(d) {return Math.max(0, d.x1 - d.x0) + "px"} )
        .style("height", function(d) {return Math.max(0, d.y1 - d.y0) + "px"} )
        .style("background", function(d) {return colorTree(d.parent.data.name)} )
        .text(function(d) {return d.data.name} );

    d3.selectAll("input").on("change", function change() {
        const value = this.value === "count" ?
            function(d) {return d.size ? 1 : 0;
            } :
            function(d) {
                return d.size;
            };

        const newRoot = d3.hierarchy(dataTree, function(d) {return  d.children})
            .sum(value);

        node.data(treemap(newRoot).leaves())
            .transition()
            .duration(1500)
            .style("left", function(d) {return d.x0 + "px"} )
            .style("top", function(d) {return d.y0 + "px"} )
            .style("width", function(d) {return Math.max(0, d.x1 - d.x0 - 1) + "px"} )
            .style("height", function(d) {return Math.max(0, d.y1 - d.y0 - 1) + "px" } )
    });
}
/**
 * End tree
 *  */


/**
 * Start timelines
 *  */




function createChartTimeLineDataSet(data) {
    if ($("#dataSet2018").prop("checked")) {
        data = data.filter(function(data) {return data.date.indexOf("-18") > -1} );
    }

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
    var svg = d3.select("#timeline-dataset").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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
        .call(d3.axisBottom(x)
            //.ticks(d3.timeDay.filter(d {return } d3.timeDay.count(0, d) % 100 === 0))
            .ticks(d3.timeDay.filter(function(d) {return $("#dataSet2018").prop("checked") ? d3.timeDay.count(0, d) % 60 === 0 : d3.timeDay.count(0, d) % 300 === 0} ))
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
                if ($("#dataSet2018").prop("checked")) {
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
                        return yr;
                    } else if (mon <= 5) {
                        return yr;
                    } else if (mon <= 8) {
                        return yr;
                    } else {
                        return yr;
                    }
                }


            })
            .tickSizeOuter(0)
        )
        //.call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisLeft(y)
            .tickFormat(d3.format(".2s")));
}

/**
 * End timelines
 *  */


/** 
 * Start Gauges
 */

var dataGauge = {
    "code": {
        "total": 100,
        "allocated": 76
    },
    "pageview": {
        "total": 1000,
        "allocated": 113
    },
    "lac": {
        "total": 100,
        "allocated": 9
    }
}

drawGaugeDatasetChart(dataGauge)

function drawGaugeDatasetChart(dataGauge) {
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

    var svg = d3.selectAll("#gauge-datasets").append("svg")
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
        .text(dataGauge.code.allocated);;


    var i = d3.interpolate(progress, dataGauge.code.allocated / dataGauge.code.total);
    foreground.attr("d", arc.endAngle(twoPi * i(1)));
    //gauge K

    var arc2 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg2 = d3.selectAll("#gauge-download-d").append("svg")
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
        .text(dataGauge.pageview.allocated + "k");;


    var i2 = d3.interpolate(progress2, dataGauge.pageview.allocated / dataGauge.pageview.total);
    foreground2.attr("d", arc2.endAngle(twoPi * i2(1)));
    //gauge %

    var arc3 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg3 = d3.selectAll("#gauge-lac-d").append("svg")
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
}


/**
 * End Gauges
 */

//init
var ObjectTimeLineDataSet = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);

createChartTimeLineDataSet(ObjectTimeLineDataSet);
drawDataTrendChart(datasetsTopArrays.topIDBAllTime);

//click radiobutton drawChart(id del click)
$("input[name*='dataSetTrend']").click(function () {
    var ObjectTimeLineDataSet = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
    d3.select("#timeline-dataset svg").remove();
    d3.select("#data-trend svg").remove();
    

    if (this.id == "dataSetAllTime") {
        createChartTimeLineDataSet(ObjectTimeLineDataSet);
        drawDataTrendChart(datasetsTopArrays.topIDBAllTime);
    } else {
        createChartTimeLineDataSet(ObjectTimeLineDataSet);
        drawDataTrendChart(datasetsTopArrays.topIDB2018);
    }
});