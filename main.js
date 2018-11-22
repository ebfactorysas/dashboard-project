var width = 150,
    height = 150,

    progress = 0,
    progress3 = 0,
    progress2 = 0,
    allocated = 76,
    total = 100,
    allocated3 = 9,
    total3 = 100,
    allocated2 = 113,
    total2 = 1000,
    formatPercent = d3.format(".0%");
const twoPi = 2 * Math.PI;

var arc = d3.arc()
    .startAngle(0)
    .innerRadius(70)
    .outerRadius(64);

var svg = d3.selectAll(".gauge").append("svg")
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
    .attr("dy", "0.3em");


var i = d3.interpolate(progress, allocated / total);

//gauge K

var arc2 = d3.arc()
    .startAngle(0)
    .innerRadius(70)
    .outerRadius(64);

var svg2 = d3.selectAll(".gauge-k").append("svg")
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
    .attr("dy", "0.3em");


var i2 = d3.interpolate(progress2, allocated2 / total2);

d3.transition().duration(1000).tween("progress", function () {
    return function (t) {
        progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress));
        percentComplete.text((progress * 100).toFixed(0));
        progress2 = i2(t);
        foreground2.attr("d", arc.endAngle(twoPi * progress2));
        percentComplete2.text((progress2 * 1000).toFixed(0) + "K");

    };
});


//gauge %

var arc3 = d3.arc()
    .startAngle(0)
    .innerRadius(70)
    .outerRadius(64);

var svg3 = d3.selectAll(".gauge-p").append("svg")
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
    .attr("dy", "0.3em");


var i3 = d3.interpolate(progress3, allocated3 / total3);

d3.transition().duration(1000).tween("progress", function () {
    return function (t) {
        progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress));
        percentComplete.text((progress * 100).toFixed(0));
        progress2 = i2(t);
        foreground2.attr("d", arc2.endAngle(twoPi * progress2));
        percentComplete2.text((progress2 * 1000).toFixed(0) + "K");
        progress3 = i3(t);
        foreground3.attr("d", arc3.endAngle(twoPi * progress3));
        percentComplete3.text((progress3 * 100).toFixed(0) + "%");

    };
});


// var data = {
//     "name": "Max",
//     "value": 100,
//     "children": [{
//         "name": "Sylvia",
//         "value": 100,
//         "children": [{
//                 "name": "Craig",
//                 "value": 100
//             },
//             {
//                 "name": "Robin",
//                 "value": 100
//             },
//             {
//                 "name": "Anna",
//                 "value": 100
//             }
//         ]
//     }]
// };

// var partitionLayout = d3.partition()
//     .size([200, 935]);

// var rootNode = d3.hierarchy(data)

// rootNode.sum(function (d) {
//     return d.value;
// });

// partitionLayout(rootNode);
// var test = d3.select('#downloads')
//     .selectAll('rect')
//     .data(rootNode.descendants())
//     .enter();
// test.append('text')
//     .attr('x', function (d) {
//         return d.y0 + 10;
//     })
//     .attr('y', function (d) {
//         return d.x0 + 20;
//     })
//     .text(function (d) {
//         return d.data.name + d.data.value;
//     })
// test.append('rect')
//     .attr('x', function (d) {
//         return d.y0;
//     })
//     .attr('y', function (d) {
//         return d.x0;
//     })
//     .attr('width', function (d) {
//         return d.y1 - d.y0;
//     })
//     .attr('height', function (d) {
//         return d.x1 - d.x0;
//     })
//     .style("fill", function (d) {
//         return 'rgba(209,65,90,0.' + d.depth + 3 + ')'
//     });

//Bubbles
var bubbleData = [{
        "name": "file1",
        "PublishedDays": 5,
        "downloads": 500

    },
    {
        "name": "file2",
        "PublishedDays": 50,
        "downloads": 200

    },
    {
        "name": "file3",
        "PublishedDays": 25,
        "downloads": 1500,

    }, {
        "name": "file4",
        "PublishedDays": 56,
        "downloads": 5000

    }, {
        "name": "file5",
        "PublishedDays": 10,
        "downloads": 3000

    }, {
        "name": "file6",
        "PublishedDays": 100,
        "downloads": 100

    }, {
        "name": "file7",
        "PublishedDays": 6,
        "downloads": 0

    }, {
        "name": "file8",
        "PublishedDays": 47,
        "downloads": 150

    }, {
        "name": "file9",
        "PublishedDays": 95,
        "downloads": 500

    }, {
        "name": "file10",
        "PublishedDays": 105,
        "downloads": 550

    }, {
        "name": "file11",
        "PublishedDays": 65,
        "downloads": 96

    }
]
var marginBubble = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30
};
var widthBubble = 350 + marginBubble.left + marginBubble.right;
var heightBubble = 300 + marginBubble.top + marginBubble.bottom;
var svgBubble = d3.select('#publications')
    .append('svg')
    .attr('width', widthBubble + marginBubble.left + marginBubble.right)
    .attr('height', heightBubble + marginBubble.top + marginBubble.bottom)
    //.call(responsivefy)
    .append('g')
//.attr('transform', 'translate(' + marginBubble.left + ' ' + marginBubble.top + ' ' + marginBubble.right + ' ' + marginBubble.bottom + ')');



var yScale = d3.scaleLinear()
    .domain(d3.extent(bubbleData, function (d) {
        return d.PublishedDays;
    }))
    .range([300, 0])
    .nice();

var yAxis = d3.axisLeft(yScale);
svgBubble.call(yAxis);

var xScale = d3.scaleLinear()
    .domain(d3.extent(bubbleData, function (d) {
        return d.downloads;
    }))
    .range([0, 300])
    .nice();

var xAxis = d3.axisBottom(xScale)
    .ticks(5);
svgBubble.append('g')
    .attr('transform', 'translate(0,300)')
    .call(xAxis);

var marginDistribution = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
}

var widthDistribution = 520 - marginDistribution.left - marginDistribution.right;
var heightDistribution = 280 - marginDistribution.top - marginDistribution.bottom;
var dataDistribution = [{
    "name": "Other/Not Reported",
    "value": 20
}, {
    "name": "Elementary",
    "value": 0
}, {
    "name": "High School",
    "value": 3
}, {
    "name": "Associate",
    "value": 4
}, {
    "name": "Bachelor",
    "value": 14
}, {
    "name": "Master",
    "value": 9
}, {
    "name": "Doctorate",
    "value": 1
}]
var svgDistribution = d3.select('#distribution').append("svg")
    .attr("width", widthDistribution + marginDistribution.left + marginDistribution.right)
    .attr("height", heightDistribution + marginDistribution.top + marginDistribution.bottom)
    .append("g")
    .attr("transform", "translate(" + 30 + "," + marginDistribution.top + ")");

var xDistribution = d3.scaleBand()
    .range([0, widthDistribution]);
var yDistribution = d3.scaleLinear()
    .range([heightDistribution, 0]);

xDistribution.domain(dataDistribution.map(function (d) {
    return d.name
}));
yDistribution.domain([0, d3.max(dataDistribution, function (d) {
    return d.value
})]);

svgDistribution.selectAll(".bar")
    .data(dataDistribution)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
        return xDistribution(d.name);
    })
    .attr("width", xDistribution.bandwidth() - 25)
    .attr("rx", 25)
    .attr("ry", 25)
    .attr("y", function (d) {
        return yDistribution(d.value + 3);
    })
    .attr("x", function (d, i) {
        return i * xDistribution.bandwidth() + 15; //Bar width of 20 plus 1 for padding
    })
    .attr("fill", "#eea08d")
    .attr("height", function (d) {
        return heightDistribution - yDistribution(d.value + 3);
    });

svgDistribution.selectAll("text")
    .data(dataDistribution)
    .enter()
    .append("text")
    .text(function (d) {

        return d.value + "K";
    })
    .attr("y", function (d) {
        return yDistribution(1);
    })
    .attr("x", function (d, i) {
        return i * xDistribution.bandwidth() + 21; //Bar width of 20 plus 1 for padding
    })
    .attr("font-family", "Gotham-Bold")
    .attr("font-size", "12px");

svgDistribution.append("g")
    .attr("transform", "translate(0," + heightDistribution + ")")
    .attr("class", "distribution-chart")
    .call(d3.axisBottom(xDistribution));

svgDistribution.selectAll(".tick text")
    .call(wrap, xDistribution.bandwidth())
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "10px");





function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
        while (word = words.pop()) {
            line.push(word)
            tspan.text(line.join(" "))
            if (tspan.node().getComputedTextLength() > width) {
                line.pop()
                tspan.text(line.join(" "))
                line = [word]
                var number = ++lineNumber * lineHeight + dy;
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", number + "em").text(word)
            }
        }
    })
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
 * Inicio code-trend
 *  */

// d3.json("json/top_10/Top10CodeAllTheTimeIDB_JSON.json").then(function (codeTrend) {

//     dataCodeTrend = codeTrend.sort(function (a, b) {
//         return d3.ascending(a.value, b.value);
//     });
//     drawChartCodeTrend(dataCodeTrend);
// });

// function drawChartCodeTrend(dataCodeTrend) {
//     var marginCodeTrend = {
//         top: 15,
//         right: 25,
//         bottom: 15,
//         left: 205
//     };

//     var widthCodeTrend = 520 - marginCodeTrend.left - marginCodeTrend.right,
//         heightCodeTrend = 400 - marginCodeTrend.top - marginCodeTrend.bottom;


//     var svgCodeTrend = d3.select("#code-trend").append("svg")
//         .attr("width", widthCodeTrend + marginCodeTrend.left + marginCodeTrend.right)
//         .attr("height", heightCodeTrend + marginCodeTrend.top + marginCodeTrend.bottom)
//         .append("g")
//         .attr("transform", "translate(" + marginCodeTrend.left + "," + marginCodeTrend.top + ")");

//     var xCodeTrend = d3.scaleLinear()
//         .range([0, widthCodeTrend])
//         .domain([0, d3.max(dataCodeTrend, function (d) {
//             return d.value;
//         })]);

//     var yCodeTrend = d3.scaleBand()
//         .rangeRound([heightCodeTrend, 0], .1)
//         .domain(dataCodeTrend.map(function (d) {
//             return d.name;
//         }));

//     var yAxisCodeTrend = d3.axisLeft(yCodeTrend)
//         //no tick marks
//         .tickPadding(205)
//         .tickSize(0);

//     var gyCodeTrend = svgCodeTrend.append("g")
//         .style("text-anchor", "start")
//         .style("color", "#f0b600")
//         .attr("class", "y-code")
//         .call(yAxisCodeTrend)

//     var barsCodeTrend = svgCodeTrend.selectAll(".bar")
//         .data(dataCodeTrend)
//         .enter()
//         .append("g")

//     barsCodeTrend.append("rect")
//         .attr("class", "bar")
//         .attr("y", function (d) {
//             return yCodeTrend(d.name);
//         })
//         .attr("fill", "#d3d3d3")
//         .attr("height", yCodeTrend.bandwidth() - 2)
//         .attr("x", 8)
//         .attr("width", function (d) {
//             return xCodeTrend(d.value);
//         });

//     barsCodeTrend.append("text")
//         .attr("class", "label")
//         //y position of the label is halfway down the bar
//         .attr("y", function (d) {
//             return yCodeTrend(d.name) + yCodeTrend.bandwidth() / 2 + 4;
//         })
//         //x position is 3 pixels to the right of the bar
//         .attr("x", function (d) {
//             return 12;
//         })
//         .attr("class", "text-inside")
//         .attr("font-family", "Gotham-Bold")
//         .attr("font-size", "12px")
//         .text(function (d) {
//             return (d.value/1000) + "K";
//         });
// }

// /**
//  * Fin code-trend
//  *  */

var dataDataTrend = [{
        "name": "The Database of Political Institutions 2017(DPI2017)",
        "value": 2.6,
    },
    {
        "name": "FINLAC Data:Datos de desempeño e insclusión financiera de América Latina y el Ca...",
        "value": .3,
    },
    {
        "name": "National Women's Health Survey for Trinidad and Tobago",
        "value": .3,
    },
    {
        "name": "Datos asociados al 'Panorama de enevejeciemiento y depenedencia en América La...",
        "value": .2,
    },
    {
        "name": "Suriname Survey of Living Conditions: 2016-2017",
        "value": .2,
    },
    {
        "name": "Standarized Public Debt Database",
        "value": .2,
    },
    {
        "name": "Primary Healthcare Access, Experience, and Coordination in Latin America and the Caribb...",
        "value": .1,
    }, {
        "name": "Barbados Survey of Living Conditions:2016",
        "value": .1,
    }, {
        "name": "Guyana Labor Force Survey: Fourth Quater 2017",
        "value": .1,
    },
    {
        "name": "Guyana Labor Force Survey: Third Quater 2017",
        "value": .1,
    }
];

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

var dataMoocs = [{
        "name": "La realidad del desarrollo social latinoamericano (2ed.)",
        "value": 15.9,
    },
    {
        "name": "Políticas efectivas del desarrollo infantil (5ed.)",
        "value": 9.7,
    },
    {
        "name": "La realidad del desarrollo social latinoamericano (1ed.)",
        "value": 2.3,
    },
    {
        "name": "Políticas efectivas del desarrollo infantil (1ed.)",
        "value": 0.1,
    },
    {
        "name": "Asociaciones Publico Privadas: Implementando Soluciones en Latinoamérica y el Caribe (2ed.)",
        "value": 0.0,
    }
];

dataMoocs = dataMoocs.sort(function (a, b) {
    return d3.ascending(a.value, b.value);
})

var marginMoocs = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 55
};

var widthMoocs = 560 - marginMoocs.left - marginMoocs.right,
    heightMoocs = 200 - marginMoocs.top - marginMoocs.bottom;


var svgMoocs = d3.select("#moocs").append("svg")
    .attr("width", widthMoocs + marginMoocs.left + marginMoocs.right)
    .attr("height", heightMoocs + marginMoocs.top + marginMoocs.bottom)
    .append("g")
    .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")");

var xMoocs = d3.scaleLinear()
    .range([0, widthMoocs])
    .domain([0, d3.max(dataMoocs, function (d) {
        return d.value;
    })]);

var yMoocs = d3.scaleBand()

    .rangeRound([heightMoocs, 0], .1)
    .domain(dataMoocs.map(function (d) {
        return d.value;
    }));

var yAxisMoocs = d3.axisLeft(yMoocs)
    //no tick marks
    .tickPadding(55)
    .tickSize(0);

var gyMoocs = svgMoocs.append("g")
    .style("text-anchor", "start")
    .style("color", "#555555")
    .attr("class", "y-data")

    .call(yAxisMoocs)

var barsMoocs = svgMoocs.selectAll(".bar")
    .data(dataMoocs)
    .enter()
    .append("g")

barsMoocs.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yMoocs(d.value);
    })
    .attr("rx", 25)
    .attr("ry", 25)
    .attr("fill", "#dea692")
    .attr("height", yMoocs.bandwidth() - 2)
    .attr("x", 8)
    .attr("width", function (d) {
        return xMoocs(d.value);
    });

barsMoocs.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return yMoocs(d.value) + yMoocs.bandwidth() / 2 + 4;
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


//Institutions suscribers
var marginInstitution = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
}

var widthInstitution = 650 - marginInstitution.left - marginInstitution.right;
var heightInstitution = 400 - marginInstitution.top - marginInstitution.bottom;
var dataInstitution = [{
    "name": "Not Reported",
    "value": 40.3
}, {
    "name": "Government",
    "value": 19.5
}, {
    "name": "Academia",
    "value": 17.4
}, {
    "name": "Private Sector",
    "value": 17.2
}, {
    "name": "General Public",
    "value": 16.1
}, {
    "name": "Civil Society",
    "value": 10.1
}, {
    "name": "Research Center",
    "value": 2.6
}, {
    "name": "Multilateral Organization",
    "value": 2.3
}, {
    "name": "Media",
    "value": 1.2
}];

var dataInstitutionSum = d3.sum(dataInstitution, function (d) {
    return d.value;
});
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
        console.log(d)
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

//Institutions suscribers
var marginAgeSuscribers = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
}

var widthAgeSuscribers = 450 - marginAgeSuscribers.left - marginAgeSuscribers.right;
var heightAgeSuscribers = 400 - marginAgeSuscribers.top - marginAgeSuscribers.bottom;
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

//Moocs students flow

var dataStudents = {
    registrations: {
        years: [{
            name: "2016",
            value: 25.6
        }, {
            name: "2017",
            value: 68.3
        }, {
            name: "2018",
            value: 55
        }],
        value: 55
    },
    participants: {
        years: [{
            name: "2016",
            value: 13
        }, {
            name: "2017",
            value: 32
        }, {
            name: "2018",
            value: 23
        }],
        value: 23
    },
    completed: {
        years: [{
            name: "2016",
            value: 2.4
        }, {
            name: "2017",
            value: 5.8
        }, {
            name: "2018",
            value: 2.3
        }],
        value: 2
    },
    certified: {
        years: [{
            name: "2016",
            value: 1.32
        }, {
            name: "2017",
            value: 3.25
        }, {
            name: "2018",
            value: .92
        }],
        value: 1
    }
};



var marginStudents = {
    top: 2,
    right: 20,
    bottom: 2,
    left: 20
};

var widthStudents = 80 - marginStudents.left - marginStudents.right,
    heightStudents = 80 - marginStudents.top - marginStudents.bottom;


var svgStudent1 = d3.select("#student1").append("svg")
    .attr("width", widthStudents + marginStudents.left + marginStudents.right)
    .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
    .append("g")
    .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

var svgStudent2 = d3.select("#student2").append("svg")
    .attr("width", widthStudents + marginStudents.left + marginStudents.right)
    .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
    .append("g")
    .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

var svgStudent3 = d3.select("#student3").append("svg")
    .attr("width", widthStudents + marginStudents.left + marginStudents.right)
    .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
    .append("g")
    .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

var svgStudent4 = d3.select("#student4").append("svg")
    .attr("width", widthStudents + marginStudents.left + marginStudents.right)
    .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
    .append("g")
    .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

var xStudent1 = d3.scaleLinear()
    .range([0, widthStudents])
    .domain([0, d3.max(dataStudents.registrations.years, function (d) {
        return d.value;
    })]);

var yStudent1 = d3.scaleBand()
    .rangeRound([heightStudents, 0], .1)
    .domain(dataStudents.registrations.years.map(function (d) {
        return d.name;
    }));

var xStudent2 = d3.scaleLinear()
    .range([0, widthStudents])
    .domain([0, d3.max(dataStudents.participants.years, function (d) {
        return d.value;
    })]);

var yStudent2 = d3.scaleBand()
    .rangeRound([heightStudents, 0], .1)
    .domain(dataStudents.participants.years.map(function (d) {
        return d.name;
    }));

var xStudent3 = d3.scaleLinear()
    .range([0, widthStudents])
    .domain([0, d3.max(dataStudents.completed.years, function (d) {
        return d.value;
    })]);

var yStudent3 = d3.scaleBand()
    .rangeRound([heightStudents, 0], .1)
    .domain(dataStudents.completed.years.map(function (d) {
        return d.name;
    }));

var xStudent4 = d3.scaleLinear()
    .range([0, widthStudents])
    .domain([0, d3.max(dataStudents.certified.years, function (d) {
        return d.value;
    })]);

var yStudent4 = d3.scaleBand()
    .rangeRound([heightStudents, 0], .1)
    .domain(dataStudents.certified.years.map(function (d) {
        return d.name;
    }));

var yAxisStudent1 = d3.axisLeft(yStudent1)
    .tickPadding(20)
    .tickSize(0);

var yAxisStudent2 = d3.axisLeft(yStudent2)
    .tickPadding(20)
    .tickSize(0);

var yAxisStudent3 = d3.axisLeft(yStudent3)
    .tickPadding(20)
    .tickSize(0);

var yAxisStudent4 = d3.axisLeft(yStudent4)
    .tickPadding(20)
    .tickSize(0);

var gyStudent1 = svgStudent1.append("g")
    .style("text-anchor", "start")
    .style("color", "#000")
    .attr("class", "y-data")
    .call(yAxisStudent1)

var gyStudent2 = svgStudent2.append("g")
    .style("text-anchor", "start")
    .style("color", "#000")
    .attr("class", "y-data")
    .call(yAxisStudent2)

var gyStudent3 = svgStudent3.append("g")
    .style("text-anchor", "start")
    .style("color", "#000")
    .attr("class", "y-data")
    .call(yAxisStudent3)

var gyStudent4 = svgStudent4.append("g")
    .style("text-anchor", "start")
    .style("color", "#000")
    .attr("class", "y-data")
    .call(yAxisStudent4)

var barsStudent1 = svgStudent1.selectAll(".bar")
    .data(dataStudents.registrations.years)
    .enter()
    .append("g")

barsStudent1.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yStudent1(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", yStudent1.bandwidth() - 8)
    .attr("x", 8)
    .attr("width", function (d) {
        return xStudent1(d.value);
    });

barsStudent1.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return yStudent1(d.name) + yStudent1.bandwidth() / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return xStudent1(d.value) - 6;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "10px")
    .text(function (d) {
        return d.value + "K";
    });

var barsStudent2 = svgStudent2.selectAll(".bar")
    .data(dataStudents.participants.years)
    .enter()
    .append("g")

barsStudent2.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yStudent2(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", yStudent2.bandwidth() - 8)
    .attr("x", 8)
    .attr("width", function (d) {
        return xStudent2(d.value);
    });

barsStudent2.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return yStudent2(d.name) + yStudent2.bandwidth() / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return xStudent2(d.value) - 6;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "10px")
    .text(function (d) {
        return d.value + "K";
    });

var barsStudent3 = svgStudent3.selectAll(".bar")
    .data(dataStudents.completed.years)
    .enter()
    .append("g")

barsStudent3.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yStudent3(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", yStudent3.bandwidth() - 8)
    .attr("x", 8)
    .attr("width", function (d) {
        return xStudent3(d.value);
    });

barsStudent3.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return yStudent3(d.name) + yStudent3.bandwidth() / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return xStudent3(d.value) - 6;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "10px")
    .text(function (d) {
        return d.value + "K";
    });

var barsStudent4 = svgStudent4.selectAll(".bar")
    .data(dataStudents.certified.years)
    .enter()
    .append("g")

barsStudent4.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yStudent4(d.name);
    })
    .attr("fill", "#fff")
    .attr("height", yStudent4.bandwidth() - 8)
    .attr("x", 8)
    .attr("width", function (d) {
        return xStudent4(d.value);
    });

barsStudent4.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return yStudent4(d.name) + yStudent4.bandwidth() / 2;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return xStudent4(d.value) - 6;
    })
    .attr("class", "text-inside")
    .attr("font-family", "Gotham-Book")
    .attr("font-size", "10px")
    .text(function (d) {
        return d.value + "K";
    });

//treeMap

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

const divTree = d3.select("#downloads").append("div")
    .style("position", "relative")
    .style("width", (widthTree + marginTree.left + marginTree.right) + "px")
    .style("height", (heightTree + marginTree.top + marginTree.bottom) + "px")
    .style("left", marginTree.left + "px")
    .style("top", marginTree.top + "px");

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