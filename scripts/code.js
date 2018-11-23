/**
 * Start code-trend
 *  */



//init
drawChartCodeTrend(codetrendArrays.codeTrendIADBAllTime);

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

/**
 * End code-trend
 *  
 * */

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
        colorTree = d3.scaleOrdinal().range(["#ebb203", "#ebb817", "#edc959", "#f0e9eb", "#f1ede2", "#f1f1f1"]);

    const treemap = d3.treemap().size([widthTree, heightTree]);

    const divTree = d3.select("#downloads-code").append("div")
        .style("position", "relative")
        .style("width", (widthTree + marginTree.left + marginTree.right) + "px")
        .style("height", (heightTree + marginTree.top + marginTree.bottom) + "px")
        .style("left", marginTree.left + "px")
        .style("top", marginTree.top + "px");
    const root = d3.hierarchy(dataTree, (d) => d.children)
        .sum((d) => d.size);

    const tree = treemap(root);

    const node = divTree.datum(root).selectAll(".node")
        .data(tree.leaves())
        .enter().append("div")
        .attr("class", "node")
        .style("left", (d) => d.x0 + "px")
        .style("top", (d) => d.y0 + "px")
        .style("width", (d) => Math.max(0, d.x1 - d.x0) + "px")
        .style("height", (d) => Math.max(0, d.y1 - d.y0) + "px")
        .style("background", (d) => colorTree(d.parent.data.name))
        .text((d) => d.data.name);

    d3.selectAll("input").on("change", function change() {
        const value = this.value === "count" ?
            (d) => {
                return d.size ? 1 : 0;
            } :
            (d) => {
                return d.size;
            };

        const newRoot = d3.hierarchy(dataTree, (d) => d.children)
            .sum(value);

        node.data(treemap(newRoot).leaves())
            .transition()
            .duration(1500)
            .style("left", (d) => d.x0 + "px")
            .style("top", (d) => d.y0 + "px")
            .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
            .style("height", (d) => Math.max(0, d.y1 - d.y0 - 1) + "px")
    });
}
/**
 * End tree
 *  */

/**
 * Start timelines
 *  */

function createChartTimeline(data) {
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
            .ticks(d3.timeDay.filter(d => d3.timeDay.count(0, d) % 100 === 0))
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
                if (mon <= 2) {
                    return "Q1 " + yr;
                } else if (mon <= 5) {
                    return "Q2 " + yr;
                } else if (mon <= 8) {
                    return "Q3 " + yr;
                } else {
                    return "Q4 " + yr;
                }
            })
            .tickSizeOuter(0)
        )


    // .tickFormat(function(x){
    //     // get the milliseconds since Epoch for the date
    //     var milli = (x.getTime() - 10000);

    //     // calculate new date 10 seconds earlier. Could be one second, 
    //     // but I like a little buffer for my neuroses
    //     var vanilli = new Date(milli);

    //     // calculate the month (0-11) based on the new date
    //     var mon = vanilli.getMonth();
    //     var yr = vanilli.getFullYear();

    //     // return appropriate quarter for that month
    //     if ( mon <= 2 ) {
    //         return  "Q1 " + yr;
    //     } else if ( mon <= 5 ) {
    //         return  "Q2 " + yr;
    //     } else if ( mon <= 8 ) {
    //         return  "Q3 " + yr;
    //     } else {
    //         return "Q4 " + yr;
    //     }
    // });

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

//init
drawChartCodeTrend(codetrendArrays.codeTrendAllTimeIDB);
createChartTimeline(pageViewsTimeLine.dataTimelineAllTime);


//click radiobutton drawChart(id del click)
$("input[name*='codeTrend']").click(function () {
    
    //graph #3
    d3.select("#code-trend svg").remove();
    //name -> codeTrend -> 2018 ->
    /*if(active dpto o division){
        value de ese select
        data.filter(value)
    }else{
        codetrend2018 o all time "IDB";
    }*/
    drawChartCodeTrend(codetrendArrays[this.id]);

    //graph #4
    d3.select("#timeline-code svg").remove();
    createChartTimeline(pageViewsTimeLine[this.id]);

});