/**
 * Start distribution-moocs
 *  */


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
}];

drawDistributionChart(dataDistribution);

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

function drawDistributionChart(dataDistribution) {
    var marginDistribution = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var widthDistribution = 520 - marginDistribution.left - marginDistribution.right;
    var heightDistribution = 280 - marginDistribution.top - marginDistribution.bottom;
    var svgDistribution = d3.select('#distribution-moocs').append("svg")
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

}


/**
 * End distribution-moocs
 *  */


/**
 * Start registration-moocs
 */

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

drawMoocsRegistrationsChart(dataMoocs)

function drawMoocsRegistrationsChart(dataMoocs) {

    var marginMoocs = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 55
    };

    var widthMoocs = 560 - marginMoocs.left - marginMoocs.right,
        heightMoocs = 200 - marginMoocs.top - marginMoocs.bottom;


    var svgMoocs = d3.select("#moocs-registrations").append("svg")
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
}


/**
 * End registration-moocs
 */


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

/**
 * Start student-registrations-moocs
 */

drawStudentRegistrationsChart(dataStudents);

function drawStudentRegistrationsChart(dataStudents) {
    var svgStudent1 = d3.select("#student1").append("svg")
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

    var yAxisStudent1 = d3.axisLeft(yStudent1)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent1 = svgStudent1.append("g")
        .style("text-anchor", "start")
        .style("color", "#000")
        .attr("class", "y-data")
        .call(yAxisStudent1)


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
}


/**
 * End student-registrations-moocs
 */


/**
 * Start student-participants-moocs
 */

drawStudentParticipantsChart(dataStudents);

function drawStudentParticipantsChart(dataStudents) {
    var svgStudent2 = d3.select("#student2").append("svg")
        .attr("width", widthStudents + marginStudents.left + marginStudents.right)
        .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
        .append("g")
        .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

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

    var yAxisStudent2 = d3.axisLeft(yStudent2)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent2 = svgStudent2.append("g")
        .style("text-anchor", "start")
        .style("color", "#000")
        .attr("class", "y-data")
        .call(yAxisStudent2)

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
}


/**
 * End student-participants-moocs
 */


/**
 * Start student-completed-moocs
 */

drawStudentCompletedsChart(dataStudents);

function drawStudentCompletedsChart(dataStudents) {
    var svgStudent3 = d3.select("#student3").append("svg")
        .attr("width", widthStudents + marginStudents.left + marginStudents.right)
        .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
        .append("g")
        .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

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

    var yAxisStudent3 = d3.axisLeft(yStudent3)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent3 = svgStudent3.append("g")
        .style("text-anchor", "start")
        .style("color", "#000")
        .attr("class", "y-data")
        .call(yAxisStudent3)

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
}



/**
 * End student-completed-moocs
 */


/**
 * Start student-certified-moocs 
 */

drawStudentCertifiedsChart(dataStudents);

function drawStudentCertifiedsChart(dataStudents) {
    var svgStudent4 = d3.select("#student4").append("svg")
        .attr("width", widthStudents + marginStudents.left + marginStudents.right)
        .attr("height", heightStudents + marginStudents.top + marginStudents.bottom)
        .append("g")
        .attr("transform", "translate(" + marginStudents.left + "," + marginStudents.top + ")");

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


    var yAxisStudent4 = d3.axisLeft(yStudent4)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent4 = svgStudent4.append("g")
        .style("text-anchor", "start")
        .style("color", "#000")
        .attr("class", "y-data")
        .call(yAxisStudent4)

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
}



/**
 * End student-certified-moocs
 */