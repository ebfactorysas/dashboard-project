/**
 * Start distribution-moocs
 *  */


// var dataDistribution = [{
//     "name": "Other/Not Reported",
//     "value": 20
// }, {
//     "name": "Elementary",
//     "value": 0
// }, {
//     "name": "High School",
//     "value": 3
// }, {
//     "name": "Associate",
//     "value": 4
// }, {
//     "name": "Bachelor",
//     "value": 14
// }, {
//     "name": "Master",
//     "value": 9
// }, {
//     "name": "Doctorate",
//     "value": 1
// }];

// drawDistributionChart(dataDistribution);
drawDistributionChart(moocsEducationArrays.educationLevelIDB);

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
        .attr("width", xDistribution.bandwidth() - 15)
        .attr("rx", 15)
        .attr("ry", 15)
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

            return (Math.round(d.value / 1000).toFixed(0)) + "K";
        })
        .attr("y", function (d) {
            return yDistribution(1);
        })
        .attr("x", function (d, i) {
            return i * xDistribution.bandwidth() + 21; //Bar width of 20 plus 1 for padding
        })
        .attr("font-family", "Gotham-Bold")
        .attr("padding-bottom", "10px")
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

// var dataMoocs = [{
//         "name": "La realidad del desarrollo social latinoamericano (2ed.)",
//         "value": 15.9,
//     },
//     {
//         "name": "Políticas efectivas del desarrollo infantil (5ed.)",
//         "value": 9.7,
//     },
//     {
//         "name": "La realidad del desarrollo social latinoamericano (1ed.)",
//         "value": 2.3,
//     },
//     {
//         "name": "Políticas efectivas del desarrollo infantil (1ed.)",
//         "value": 0.1,
//     },
//     {
//         "name": "Asociaciones Publico Privadas: Implementando Soluciones en Latinoamérica y el Caribe (2ed.)",
//         "value": 0.0,
//     }
// ];

function orderTopMoocs(data) {
    var dataMoocs = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });
    return dataMoocs;
}




drawMoocsRegistrationsChart(orderTopMoocs(moocsTopArrays.IDBAlltime));

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

/**
 * Start timelines
 *  */
// var dataTimeline = [{
//         "date": "1-Jul-18",
//         "close": 60000
//     },
//     {
//         "date": "30-Apr-18",
//         "close": 50000
//     },
//     {
//         "date": "27-Jan-18",
//         "close": 45000
//     },
//     {
//         "date": "26-Dec-17",
//         "close": 35000
//     },
//     {
//         "date": "24-Jul-17",
//         "close": 20000
//     },
//     {
//         "date": "20-Dec-16",
//         "close": 30000
//     }, {
//         "date": "16-Jul-16",
//         "close": 25000
//     },
//     {
//         "date": "27-Mar-14",
//         "close": 12000
//     },
//     {
//         "date": "26-Jan-13",
//         "close": 5000
//     }
// ]

function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return new Date(b.date) - new Date(a.date);
}
var registrationTimelineIDB = $.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB);

createChart(registrationTimelineIDB);

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

    // var svg = d3.select("#timeline-moocs")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var svg = d3.select("#timeline-moocs")
        .append("div")
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 400")
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
        // .call(d3.axisBottom(x));
        .call(d3.axisBottom(x)
            .ticks(d3.timeDay.filter(d => d3.timeDay.count(0, d) % 300 === 0))
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
                if ($("#2018Radio").prop("checked")) {
                    if (mon <= 2 && yr == 2018) {
                        return yr;
                    } else if (mon <= 5 && yr == 2018) {
                        return yr;
                    } else if (mon <= 8 && yr == 2018) {
                        return yr;
                    } else if (yr == 2018) {
                        return yr;
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
        );
    // add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisLeft(y)
            .tickFormat(d3.format(".2s")));
}


// var chart = $("#timeline-moocs"),
//     aspect = chart.width() / chart.height(),
//     container = chart.parent();
// $(window).on("resize", function() {
//     var targetWidth = container.width();
//     chart.attr("width", targetWidth);
//     chart.attr("height", Math.round(targetWidth / aspect));
// }).trigger("resize");
/**
 * End timelines
 *  */

var aspect = width / height,
    chart = d3.select('#timeline-moocs svg');
d3.select(window)
    .on("resize", function () {
        var targetWidth = chart.node().getBoundingClientRect().width;
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    });

//click radiobutton drawChart(id del click)
$("input[name*='moocsTrend']").click(function () {

    var test = $.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB);


    d3.select("#moocs-registrations svg").remove();
    d3.select("#timeline-moocs svg").remove();

    if ($(this).val() === 'all') {
        drawMoocsRegistrationsChart(orderTopMoocs(moocsTopArrays.IDBAlltime));

    } else {
        drawMoocsRegistrationsChart(orderTopMoocs(moocsTopArrays.IDB2018));

    }
    console.log("change ", test);
    createChart(test);

    //name -> codeTrend -> 2018 ->
    /*if(active dpto o division){
        value de ese select
        data.filter(value)
    }else{
        codetrend2018 o all time "IDB";
    }*/
    // drawChartCodeTrend(codetrendArrays[this.id]);

    //graph #4
    // d3.select("#timeline-code svg").remove();
    // createChartTimeline(pageViewsTimeLine[this.id]);

});