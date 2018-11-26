/**
 * Start institution-suscribers
 *  */

function drawInstitutionsChart(dataInstitution) {
    var dataInstitutionSum = d3.sum(dataInstitution, function (d) {
        return d.value;
    });

    var marginInstitution = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var widthInstitution = 650 - marginInstitution.left - marginInstitution.right;
    var heightInstitution = 400 - marginInstitution.top - marginInstitution.bottom;
    var svgInstitution = d3.select('#institution-suscribers').append("svg")
        .attr("width", widthInstitution + marginInstitution.left + marginInstitution.right)
        .attr("height", heightInstitution + marginInstitution.top + marginInstitution.bottom)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + marginInstitution.top + ")");

    var xInstitution = d3.scaleBand()
        .range([0, widthInstitution]);
    var yInstitution = d3.scaleLinear()
        .range([heightInstitution, 0]);

    xInstitution.domain(dataInstitution.map(function (d) {
        return d.name
    }));
    yInstitution.domain([0, d3.max(dataInstitution, function (d) {
        return d.value
    })]);

    svgInstitution.selectAll(".bar")
        .data(dataInstitution)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xInstitution(d.name);
        })
        .attr("width", xInstitution.bandwidth() - 15)
        .attr("y", function (d) {
            return yInstitution(d.value + 3);
        })
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 10; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#9ebbc2")
        .attr("stroke-width", 1)
        .attr("stroke", "#337384")
        .attr("height", function (d) {
            return heightInstitution - yInstitution(d.value + 3);
        });

    svgInstitution.selectAll("text")
        .data(dataInstitution)
        .enter()
        .append("text")
        .text(null)
        .attr("y", function (d) {
            return yInstitution(d.value + 5);
        })
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 12; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#336577")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 12; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {

            return d.value + "K";
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 12; //Bar width of 20 plus 1 for padding
        })
        .attr("dy", "1.2em")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "10px")
        .text(function (d) {
            return parseFloat(Math.round(d.value * 100 / dataInstitutionSum * 100) / 100).toFixed(1) +
                "%";
        });

    svgInstitution.append("g")
        .attr("transform", "translate(0," + heightInstitution + ")")
        .attr("class", "institution-chart")
        .call(d3.axisBottom(xInstitution));

    svgInstitution.selectAll(".tick text")
        .call(wrap, xInstitution.bandwidth())
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "9px")
        .attr("fill", "#336577");

}

/**
 * End institution-suscribers
 *  */

/**
 * Start age-suscribers
 *  */


var dataAgeSuscribers = [{
    "name": "0-19",
    "value": 2.7
}, {
    "name": "20-39",
    "value": 29.3
}, {
    "name": "40-59",
    "value": 22.4
}, {
    "name": "60-79",
    "value": 2.5
}, {
    "name": "80-99",
    "value": 0
}, {
    "name": "100-119",
    "value": 2.1
}, {
    "name": "Not Reported",
    "value": 67.5
}];

drawAgeSuscribersChart(dataAgeSuscribers);

function drawAgeSuscribersChart(dataAgeSuscribers) {
    var marginAgeSuscribers = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var widthAgeSuscribers = 450 - marginAgeSuscribers.left - marginAgeSuscribers.right;
    var heightAgeSuscribers = 400 - marginAgeSuscribers.top - marginAgeSuscribers.bottom;

    var sumDataAgeSuscribers = d3.sum(dataAgeSuscribers, function (d) {
        return d.value;
    });
    var svgAgeSuscribers = d3.select('#age-suscribers').append("svg")
        .attr("width", widthAgeSuscribers + marginAgeSuscribers.left + marginAgeSuscribers.right)
        .attr("height", heightAgeSuscribers + marginAgeSuscribers.top + marginAgeSuscribers.bottom)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + marginAgeSuscribers.top + ")");

    var xAgeSuscribers = d3.scaleBand()
        .range([0, widthAgeSuscribers]);
    var yAgeSuscribers = d3.scaleLinear()
        .range([heightAgeSuscribers, 0]);

    xAgeSuscribers.domain(dataAgeSuscribers.map(function (d) {
        return d.name
    }));
    yAgeSuscribers.domain([0, d3.max(dataAgeSuscribers, function (d) {
        return d.value
    })]);

    svgAgeSuscribers.selectAll(".bar")
        .data(dataAgeSuscribers)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xAgeSuscribers(d.name);
        })
        .attr("width", xAgeSuscribers.bandwidth() - 15)
        .attr("y", function (d) {
            return yAgeSuscribers(d.value + 3);
        })
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 10; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#9ebbc2")
        .attr("stroke-width", 1)
        .attr("stroke", "#337384")
        .attr("height", function (d) {
            return heightAgeSuscribers - yAgeSuscribers(d.value + 3);
        });

    svgAgeSuscribers.selectAll("text")
        .data(dataAgeSuscribers)
        .enter()
        .append("text")
        .text(null)
        .attr("y", function (d) {
            return yAgeSuscribers(d.value + 7);
        })
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 20; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#336577")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 20; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {

            return d.value + "K";
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 20; //Bar width of 20 plus 1 for padding
        })
        .attr("dy", "1.2em")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "10px")
        .text(function (d) {
            return parseFloat(Math.round((d.value * 100 / sumDataAgeSuscribers) * 100) / 100).toFixed(2) +
                "%";
        });

    svgAgeSuscribers.append("g")
        .attr("transform", "translate(0," + heightAgeSuscribers + ")")
        .attr("class", "suscriber-AgeChart")
        .call(d3.axisBottom(xAgeSuscribers));

    svgAgeSuscribers.selectAll(".tick text")
        .call(wrap, xAgeSuscribers.bandwidth())
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "9px")
        .attr("fill", "#336577");
}



/**
 * End age-suscribers
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
                    "name": "Not Reported",
                    "size": 66
                }]
            },
            {
                "name": "optimization",
                "children": [{
                    "name": "Male",
                    "size": 18
                }]
            }, {
                "name": "graph",
                "children": [{
                    "name": "Female",
                    "size": 66
                }]
            }
        ]
    }]
}

function drawTree(dataTree) {
    const marginTree = {
            top: 40,
            right: 10,
            bottom: 10,
            left: 10
        },
        widthTree = 500 - marginTree.left - marginTree.right,
        heightTree = 200 - marginTree.top - marginTree.bottom,
        colorTree = d3.scaleOrdinal().range(["#518a81", "#9abfba", "#aeccc7"]);

    const treemap = d3.treemap().size([widthTree, heightTree]);

    const divTree = d3.select("#demographics-suscribers").append("div")
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

    var svg = d3.selectAll("#gauge-suscribers").append("svg")
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

    var svg2 = d3.selectAll("#gauge-lac-s").append("svg")
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

    var svg3 = d3.selectAll("#gauge-2018").append("svg")
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

/**
 * Start suscribers-interested
 */

var testData = [{
        "name": "Education",
        "value": 75000,
    },
    {
        "name": "Early Childhood Development",
        "value": 60300,
    },
    {
        "name": "Social Protection and Poverty",
        "value": 58700,
    },
    {
        "name": "Labor and Pensions",
        "value": 41700,
    },
    {
        "name": "Health",
        "value": 41200,
    },
    {
        "name": "Gender and diversity",
        "value": 36900,
    }
];

function orderTopDataSuscribers(data) {
    var dataSet = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });
    return dataSet;
}



function drawSuscribersChart(data) {


    dataSet = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });

    dataSet = dataSet.slice(0,6);

    var marginSuscriber = {
        top: 15,
        right: 50,
        bottom: 15,
        left: 15
    };

    var widthSuscriber = 560 - marginSuscriber.left - marginSuscriber.right,
        heightSuscriber = 250 - marginSuscriber.top - marginSuscriber.bottom;

    var svgSuscribers = d3.select("#suscribers-interested").append("svg")
        .attr("width", widthSuscriber + marginSuscriber.left + marginSuscriber.right)
        .attr("height", heightSuscriber + marginSuscriber.top + marginSuscriber.bottom)
        .append("g")
        .attr("transform", "translate(" + marginSuscriber.left + "," + marginSuscriber.top + ")");

    var xSuscribers = d3.scaleLinear()
        .range([0, widthSuscriber])
        .domain([0, d3.max(dataSet, function (d) {
            return d.value;
        })]);

    var ySuscribers = d3.scaleBand()

        .rangeRound([heightSuscriber, 0], .1)
        .domain(dataSet.map(function (d) {
            return d.value;
        }));

    var yAxisSuscribers = d3.axisLeft(ySuscribers)
        //no tick marks
        .tickPadding(55)
        .tickSize(0);

    var barsSuscribers = svgSuscribers.selectAll(".bar")
        .data(dataSet)
        .enter()
        .append("g")

    barsSuscribers.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return ySuscribers(d.value);
        })
        .attr("fill", "#9ebbc2")
        .attr("stroke-width", 1)
        .attr("stroke", "#337384")
        .attr("height", ySuscribers.bandwidth() - 5)
        .attr("x", 8)
        .attr("width", function (d) {
            return xSuscribers(d.value);
        });

    barsSuscribers.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return ySuscribers(d.value) + ySuscribers.bandwidth() / 2 + 4;
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
    barsSuscribers.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return ySuscribers(d.value) + ySuscribers.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return xSuscribers(d.value) + 10;
        })
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .text(function (d) {
            return d.value/1000+"K";
        });
}


/**
 * End suscribers-interested
 */

//init

drawSuscribersChart(orderTopDataSuscribers(subscribersTopics));
drawTree(dataTree);
drawInstitutionsChart(subscribersInstitution.institutionIDB);
