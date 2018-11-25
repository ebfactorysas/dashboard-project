/**
 * Start timelines
 *  */
var dataTimeline = [{
    "date": "1-Jul-18",
    "close": 60000
},
{
    "date": "30-Apr-18",
    "close": 50000
},
{
    "date": "27-Jan-18",
    "close": 45000
},
{
    "date": "26-Dec-17",
    "close": 35000
},
{
    "date": "24-Jul-17",
    "close": 20000
},
{
    "date": "20-Dec-16",
    "close": 30000
}, {
    "date": "16-Jul-16",
    "close": 25000
},
{
    "date": "27-Mar-14",
    "close": 12000
},
{
    "date": "26-Jan-13",
    "close": 5000
}
]

createChart(publicationsDownloadTimelineArray.downloadTimelineIDB);
//createChart(dataTimeline);

function sortByDateAscending(a, b) {
// Dates will be cast to numbers automagically:
return a.date - b.date;
}

function createChart(data) {
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
var svg = d3.select("#timeline-publication").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var totalAmount = 0;
// format the data
data.forEach(function (d) {
    d.date = parseTime(d.date);
});

console.log(data);

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
    //.call(d3.axisBottom(x));
    .call(d3.axisBottom(x)
        .ticks(d3.timeDay.filter(d => d3.timeDay.count(0, d) % 12 === 0))
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
            // if ($("#code2018").prop("checked")) {
            if (1==1) {
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
    colorTree = d3.scaleOrdinal().range(["#d1415a", "#e8bcc3", "#eedfe2", "#f0e9eb", "#f1eff0", "#f1f0f0"]);

const treemap = d3.treemap().size([widthTree, heightTree]);

const divTree = d3.select("#downloads-publications").append("div")
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
*  Start trend
*/

var dataPublicationTrend = [{
    "name": "Profesión: Profesor en América Latina ¿Por qué se perdió el prestigio docente y cómo rec",
    "value": 26.2,
},
{
    "name": "Social Services for Digital Citizens: Opportunities for Latin America and the Caribbean",
    "value": 23.6,
},
{
    "name": "La priorización en salud paso a paso: Cómo articulan sus procesos México, Brasil y Colomb",
    "value": 15.9,
},
{
    "name": "Datos asociados al 'Panorama de enevejeciemiento y depenedencia en América La...",
    "value": 12.7,
},
{
    "name": "Suriname Survey of Living Conditions: 2016-2017",
    "value": 8.6,
},
{
    "name": "Standarized Public Debt Database",
    "value": 7.6,
},
{
    "name": "Primary Healthcare Access, Experience, and Coordination in Latin America and the Caribb...",
    "value": 3.9,
}, {
    "name": "Barbados Survey of Living Conditions:2016",
    "value": 3.0,
}, {
    "name": "Guyana Labor Force Survey: Fourth Quater 2017",
    "value": .7,
},
{
    "name": "Should I Stay or Should I Go?",
    "value": .6,
}
];

dataPublicationTrend = dataPublicationTrend.sort(function (a, b) {
return d3.ascending(a.value, b.value);
})

drawTrendPublicationChart(dataPublicationTrend);

function drawTrendPublicationChart(dataPublicationTrend) {
var marginPublicationTrend = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 40
};

var widthPublicationTrend = 560 - marginPublicationTrend.left - marginPublicationTrend.right,
    heightPublicationTrend = 400 - marginPublicationTrend.top - marginPublicationTrend.bottom;


var svgPublicationTrend = d3.select("#publication-trend").append("svg")
    .attr("width", widthPublicationTrend + marginPublicationTrend.left + marginPublicationTrend.right)
    .attr("height", heightPublicationTrend + marginPublicationTrend.top + marginPublicationTrend.bottom)
    .append("g")
    .attr("transform", "translate(" + marginPublicationTrend.left + "," + marginPublicationTrend.top + ")");

var xPublicationTrend = d3.scaleLinear()
    .range([0, widthPublicationTrend])
    .domain([0, d3.max(dataPublicationTrend, function (d) {
        return d.value;
    })]);

var yPublicationTrend = d3.scaleBand()

    .rangeRound([heightPublicationTrend, 0], .1)
    .domain(dataPublicationTrend.map(function (d) {
        return d.value;
    }));

var yAxisPublicationTrend = d3.axisLeft(yPublicationTrend)
    //no tick marks
    .tickPadding(40)
    .tickSize(0);

var gyPublicationTrend = svgPublicationTrend.append("g")
    .style("text-anchor", "start")
    .style("color", "#555555")
    .attr("class", "y-data")

    .call(yAxisPublicationTrend)

var barsPublicationTrend = svgPublicationTrend.selectAll(".bar")
    .data(dataPublicationTrend)
    .enter()
    .append("g")

barsPublicationTrend.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yPublicationTrend(d.value);
    })
    .attr("rx", 25)
    .attr("ry", 25)
    .attr("fill", "#dea6b0")
    .attr("height", yPublicationTrend.bandwidth() - 2)
    .attr("x", 8)
    .attr("width", function (d) {
        return xPublicationTrend(d.value);
    });

barsPublicationTrend.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return yPublicationTrend(d.value) + yPublicationTrend.bandwidth() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return 12;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Bold")
    .attr("font-size", "12px")
    .text(function (d) {
        return d.name;
    });
}



/**
* End trend
*/


/** 
 * Start Gauges
 */

var dataPublicationGauge = {
    "publication": {
        "total": 100,
        "allocated": 76
    },
    "download": {
        "total": 1000,
        "allocated": 113
    },
    "lac": {
        "total": 100,
        "allocated": 9
    }
}

drawGaugePublicationChart(dataPublicationGauge)

function drawGaugePublicationChart(dataGauge) {
    var width = 150,
        height = 150,
        progress4 = 0,
        progress3 = 0,
        progress2 = 0,
        formatPercent = d3.format(".0%");
    const twoPi = 2 * Math.PI;

    var arc4 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg4 = d3.selectAll("#gauge-publications").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var meter4 = svg4.append("g")
        .attr("class", "funds-allocated-meter");

    meter4.append("path")
        .attr("class", "background")
        .attr("d", arc4.endAngle(twoPi));

    var foreground4 = meter4.append("path")
        .attr("class", "foreground");

    var percentComplete4 = meter4.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0.3em")
        .text( dataGauge.publication.allocated+ "k");


    var i4 = d3.interpolate(progress4, dataGauge.publication.allocated / dataGauge.publication.total);

    //gauge K

    var arc2 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg2 = d3.selectAll("#gauge-download-p").append("svg")
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
        .text( dataGauge.download.allocated+ "k");


    var i2 = d3.interpolate(progress2, dataGauge.download.allocated / dataGauge.download.total);

    //gauge %

    var arc3 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg3 = d3.selectAll("#gauge-lac-p").append("svg")
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
        .text( dataGauge.lac.allocated+ "%");


    var i3 = d3.interpolate(progress3, dataGauge.lac.allocated / dataGauge.lac.total);

    // d3.transition().duration(1000).tween("progress", function () {
    //     return function (t) {
    //         progress4 = i4(t);
    //         foreground4.attr("d", arc4.endAngle(twoPi * progress4));
    //         percentComplete4.text((progress4 * 100).toFixed(0));
    //         progress2 = i2(t);
    //         foreground2.attr("d", arc2.endAngle(twoPi * progress2));
    //         percentComplete2.text((progress2 * 1000).toFixed(0) + "K");
    //         progress3 = i3(t);
    //         foreground3.attr("d", arc3.endAngle(twoPi * progress3));
    //         percentComplete3.text((progress3 * 100).toFixed(0) + "%");

    //     };
    // });
}


 /**
  * End Gauges
  */