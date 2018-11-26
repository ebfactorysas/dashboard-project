function orderTopMoocs(data) {
    var dataMoocs = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });
    return dataMoocs;
}

var topAllMoocs = orderTopMoocs(moocsTopArrays.IDBAlltime)
var top2018Moocs = orderTopMoocs(moocsTopArrays.IDB2018)

/**
 * Start distribution-moocs
 **/

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





drawMoocsRegistrationsChart(topAllMoocs);

function drawMoocsRegistrationsChart(dataMoocs) {

    var marginMoocs = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 55
    };

    var widthMoocs = 560 - marginMoocs.left - marginMoocs.right,
        heightMoocs = 200 - marginMoocs.top - marginMoocs.bottom;


    var svgMoocs = d3.select("#moocs-registrations")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-55 -25 700 200")
        .append("g")
        // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")")

        //class to make it responsive
        .classed("svg-content-responsive", true);
    // .append("svg")
    // .attr("width", widthMoocs + marginMoocs.left + marginMoocs.right)
    // .attr("height", heightMoocs + marginMoocs.top + marginMoocs.bottom)
    // .append("g")
    // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")");

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

drawStudentRegistrationsChart(moocsStudentsFlowArrays.studentsFlowIDB);

function drawStudentRegistrationsChart(dataStudents) {
    if(typeof dataStudents == "undefined") return;
    $('#student1-title').html(dataStudents.registrations.value < 1000 ? dataStudents.registrations.value : (Math.round(dataStudents.registrations.value / 1000).toFixed(0)) + "K");
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
            return d.value < 1000 ? d.value : (Math.round(d.value / 1000).toFixed(0)) + "K";
        });
}


/**
 * End student-registrations-moocs
 */


/**
 * Start student-participants-moocs
 */

drawStudentParticipantsChart(moocsStudentsFlowArrays.studentsFlowIDB);

function drawStudentParticipantsChart(dataStudents) {
    if(typeof dataStudents == "undefined") return;
    $('#student2-title').html(dataStudents.participants.value < 1000 ? dataStudents.participants.value : (Math.round(dataStudents.participants.value / 1000).toFixed(0)) + "K");
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
            return d.value < 1000 ? d.value : (Math.round(d.value / 1000).toFixed(0)) + "K";
        });
}


/**
 * End student-participants-moocs
 */


/**
 * Start student-completed-moocs
 */

drawStudentCompletedsChart(moocsStudentsFlowArrays.studentsFlowIDB);

function drawStudentCompletedsChart(dataStudents) {
    if(typeof dataStudents == "undefined") return;
    $('#student3-title').html(dataStudents.completed.value <1000 ? dataStudents.completed.value : (Math.round(dataStudents.completed.value / 1000).toFixed(0)) + "K");
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
            return d.value < 1000 ? d.value : (Math.round(d.value / 1000).toFixed(0)) + "K";
        });
}

/**
 * End student-completed-moocs
 */


/**
 * Start student-certified-moocs 
 */

drawStudentCertifiedsChart(moocsStudentsFlowArrays.studentsFlowIDB);

function drawStudentCertifiedsChart(dataStudents) {
    if(typeof dataStudents == "undefined") return;
    $('#student4-title').html(dataStudents.certified.value < 1000 ? dataStudents.certified.value : (Math.round(dataStudents.certified.value / 1000).toFixed(0)) + "K");
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
            return d.value < 1000 ? d.value : (Math.round(d.value / 1000).toFixed(0)) + "K";
        });
}


/**
 * End student-certified-moocs
 */

/**
 * Start timelines
 *  */

function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return new Date(b.date) - new Date(a.date);
}
var TimeLineIDB = $.extend([], moocsRegistrationTimeline.registrationTimelineIDB);

createChart(moocsRegistrationTimeline.registrationTimelineIDB);

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
        .attr("viewBox", "0 0 500 200")
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

/**
 * End timelines
 *  */

//click radiobutton drawChart(id del click)



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

drawGaugeMoocsChart(dataGauge)

function drawGaugeMoocsChart(dataGauge) {
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

    var svg = d3.selectAll("#gauge-moocs").append("svg")
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
        .text((dataGauge.code.allocated));;


    var i = d3.interpolate(progress, dataGauge.code.allocated / dataGauge.code.total);
    foreground.attr("d", arc.endAngle(twoPi * i(1)));
    //gauge K

    var arc2 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg2 = d3.selectAll("#gauge-registrations-m").append("svg")
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
        .text((dataGauge.pageview.allocated + "k"));


    var i2 = d3.interpolate(progress2, dataGauge.pageview.allocated / dataGauge.pageview.total);
    foreground2.attr("d", arc2.endAngle(twoPi * i2(1)));
    //gauge %

    var arc3 = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg3 = d3.selectAll("#gauge-lac-m").append("svg")
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
    percentComplete3.text((dataGauge.lac.allocated + "%"));


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


/**
 * End Gauges
 */



/**
 * Start Filters
 */
function removeMoocsSvg() {
    d3.select("#moocs-registrations svg").remove();
    d3.select("#distribution-moocs svg").remove();
    d3.select("#student1 svg").remove();
    d3.select("#student2 svg").remove();
    d3.select("#student3 svg").remove();
    d3.select("#student4 svg").remove();
}

function divisionFilter(moocsJson, filterBy) {
    return moocsJson.filter(function (entry) {
        return entry.code === filterBy;
    });
}

function departmentFilter(moocsJson, filterBy) {
    return moocsJson.filter(function (entry) {
        return entry.code === filterBy;
    });
}

function moocsFilter() {
    removeMoocsSvg();
    //Load the json
    switch ($("input[name*='moocsTrend']:checked").val()) {
        case 'all':

            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0) {
                drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisionsAlltime, $("select[id*='divisionSelect']").val())));
                drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions, $("select[id*='divisionSelect']").val())));

                var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, $("select[id*='divisionSelect']").val());
                drawStudentRegistrationsChart(students[0]);
                drawStudentParticipantsChart(students[0]);
                drawStudentCompletedsChart(students[0]);
                drawStudentCertifiedsChart(students[0]);
            } else if ($("select[id*='deparmentSelect']").val().length > 0) {
                drawMoocsRegistrationsChart(orderTopMoocs(departmentFilter(moocsTopArrays.departmentsAllTime, $("select[id*='deparmentSelect']").val())));
                drawDistributionChart(orderTopMoocs(departmentFilter(moocsEducationArrays.educationLevelDepartments, $("select[id*='deparmentSelect']").val())));
            
                var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, $("select[id*='deparmentSelect']").val());
                drawStudentRegistrationsChart(students[0]);
                drawStudentParticipantsChart(students[0]);
                drawStudentCompletedsChart(students[0]);
                drawStudentCertifiedsChart(students[0]);
            } else {
                drawMoocsRegistrationsChart(topAllMoocs);
                drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // same data for all and 2018
                drawStudentRegistrationsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawStudentParticipantsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawStudentCompletedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawStudentCertifiedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
            }


            break;

        default:
            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0) {
                drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisions2018, $("select[id*='divisionSelect']").val())));
                drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions, $("select[id*='divisionSelect']").val())));
                
                var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, $("select[id*='divisionSelect']").val());
                drawStudentRegistrationsChart(students[0]);
                drawStudentParticipantsChart(students[0]);
                drawStudentCompletedsChart(students[0]);
                drawStudentCertifiedsChart(students[0]);
            } else if ($("select[id*='deparmentSelect']").val().length > 0) {
                drawMoocsRegistrationsChart(orderTopMoocs(departmentFilter(moocsTopArrays.departments2018, $("select[id*='deparmentSelect']").val())));
                drawDistributionChart(orderTopMoocs(departmentFilter(moocsEducationArrays.educationLevelDepartments, $("select[id*='deparmentSelect']").val())));
            
                var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, $("select[id*='deparmentSelect']").val());
                drawStudentRegistrationsChart(students[0]);
                drawStudentParticipantsChart(students[0]);
                drawStudentCompletedsChart(students[0]);
                drawStudentCertifiedsChart(students[0]);
            } else {
                drawMoocsRegistrationsChart(top2018Moocs);
                drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // same data for all and 2018
                drawStudentRegistrationsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawStudentParticipantsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawStudentCompletedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawStudentCertifiedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
            }
            break;
    }



}
// Divisions select filter
$("select[id*='divisionSelect']").change(function () {
    $("select[id*='deparmentSelect']").val("");
    moocsFilter();
});

// Deparment select filter
$("select[id*='deparmentSelect']").change(function () {
    $("select[id*='divisionSelect']").val("");
    moocsFilter();
});

$("#idbLink").click(function () {
    $("select[id*='deparmentSelect']").val("");
    $("select[id*='divisionSelect']").val("");
    moocsFilter();
});



$("input[name*='moocsTrend']").click(function () {
    moocsFilter();
});


/**
 * End Filters
 */