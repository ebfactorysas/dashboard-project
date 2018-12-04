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

    var widthDistribution = 650 - marginDistribution.left - marginDistribution.right;
    var heightDistribution = 400 - marginDistribution.top - marginDistribution.bottom;
    var svgDistribution = d3.select('#distribution-moocs')
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 500 500")
        .append("g")
        // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")")

        //class to make it responsive
        .classed("svg-content-responsive", true);

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
            var formatNumber = setSettingsNumber(d.registrations);
            return formatNumber.valueNumber + formatNumber.suffixNumber;
        })
        .attr("y", function (d) {
            return yDistribution(0.01);
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
/**
 * Start age-distribution-moocs
 */
drawMoocsAgeDistributionChart(topAllMoocs);

var data = [{
    value: 0,
    name: "<18"
}]

function drawMoocsAgeDistributionChart(dataMoocs) {

    var marginMoocs = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 55
    };

    var widthMoocs = 560 - marginMoocs.left - marginMoocs.right,
        heightMoocs = 200 - marginMoocs.top - marginMoocs.bottom;


    var svgMoocs = d3.select("#age-distribution-moocs")
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
 * End age-distribution-moocs
 */


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
    if (typeof dataStudents == "undefined" || typeof dataStudents.registrations == "undefined") {
        $('#student1-title').html("0");
        return
    };

    if ($("input[name*='moocsTrend']:checked").val() === "2018") {
        var students2018 = dataStudents.registrations.years.filter(function (values) {
            return values.name === "2018";
        });
        dataStudents.registrations.years = students2018;
        dataStudents.registrations.value = students2018[0].value;
    }

    var formatNumber = setSettingsNumber(dataStudents.registrations ? dataStudents.registrations.value : 0 );
    $('#student1-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

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
            var value = setSettingsNumber(d.value);
            return value.valueNumber + value.suffixNumber;
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
    if (typeof dataStudents == "undefined" || typeof dataStudents.participants == "undefined") {
        $('#student2-title').html("0");
        return
    };

    if ($("input[name*='moocsTrend']:checked").val() === "2018") {
        var students2018 = dataStudents.participants.years.filter(function (values) {
            return values.name === "2018";
        });
        dataStudents.participants.years = students2018;
        dataStudents.participants.value = students2018[0].value;
    }

    var formatNumber = setSettingsNumber(dataStudents.participants.value);
    $('#student2-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

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
            var value = setSettingsNumber(d.value);
            return value.valueNumber + value.suffixNumber;
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
    if (typeof dataStudents == "undefined" || typeof dataStudents.completed == "undefined") {
        $('#student3-title').html("0");
        return
    };

    if ($("input[name*='moocsTrend']:checked").val() === "2018") {
        var students2018 = dataStudents.completed.years.filter(function (values) {
            return values.name === "2018";
        });
        dataStudents.completed.years = students2018;
        dataStudents.completed.value = students2018[0].value;
    }

    var formatNumber = setSettingsNumber(dataStudents.completed.value);
    $('#student3-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

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
            var value = setSettingsNumber(d.value);
            return value.valueNumber + value.suffixNumber;
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
    if (typeof dataStudents == "undefined" || typeof dataStudents.certified == "undefined") {
        $('#student4-title').html("0");
        return
    };


    if ($("input[name*='moocsTrend']:checked").val() === "2018") {
        var students2018 = dataStudents.certified.years.filter(function (values) {
            return values.name === "2018";
        });
        dataStudents.certified.years = students2018;
        dataStudents.certified.value = students2018[0].value;
    }

    var formatNumber = setSettingsNumber(dataStudents.certified.value);
    $('#student4-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

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
            var value = setSettingsNumber(d.value);
            return value.valueNumber + value.suffixNumber;
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
// var TimeLineIDB = $.extend([], moocsRegistrationTimeline.registrationTimelineIDB);
var TimeLineIDB = $.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB);
createChart(TimeLineIDB);

function createChart(data) {
    if ($("#moocs2018").prop("checked")) {
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
    var svg = d3.select("#timeline-moocs").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-60 -28 600 300")
    .append("g")
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
    /*svg.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', '#c3c3c3')
        .attr("stroke-dasharray", "4")
        .attr('stroke-width', 2)
        .attr('fill', 'none');*/

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .style('stroke-width', '3px')
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisBottom(x)
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
            return value.valueNumber + suffixNumber;
        }));
}

/**
 * End timelines
 *  */

/** 
 * Start Gauges
 */


var dataGaugeMoocs = {
    "code": {
        "total": getPercentageTotal(moocsAllTotalGlobal),
        "allocated": moocsAllTotalGlobal
    },
    "pageview": {
        "total": getPercentageTotal(moocsAllDownloads),
        "allocated": moocsAllDownloads
    },
    "lac": {
        "total": 100,
        "allocated": moocsAllDownloadsLac
    }
}
var dataGaugeMoocs2018 = {
    "code": {
        "total": getPercentageTotal(moocs2018TotalGlobal),
        "allocated": moocs2018TotalGlobal
    },
    "pageview": {
        "total": getPercentageTotal(moocs2018Downloads),
        "allocated": moocs2018Downloads
    },
    "lac": {
        "total": 100,
        "allocated": moocs2018DownloadsLac
    }
}

drawGaugeMoocsChart(dataGaugeMoocs)

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
        .text(setSettingsNumber(dataGauge.code.allocated).valueNumber + setSettingsNumber(dataGauge.code.allocated).suffixNumber);


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
        .text(setSettingsNumber(dataGauge.pageview.allocated).valueNumber + setSettingsNumber(dataGauge.pageview.allocated).suffixNumber);


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
        /*percentComplete3.text((dataGauge.lac.allocated + "%"));*/
        .text(setSettingsNumber(dataGauge.lac.allocated).valueNumber + setSettingsNumber(dataGauge.lac.allocated).suffixNumber);


    var i3 = d3.interpolate(progress3, dataGauge.lac.allocated / dataGauge.lac.total);
    foreground3.attr("d", arc3.endAngle(twoPi * i3(1)));
}


/**
 * End Gauges
 */
// var datapoints = [{
//     "age": "red",
//     "population": 68
// }, {
//     "age": "gray",
//     "population": 32
// }]

function moocsGenderFilter(moocsJson, gender) {
    return moocsJson.filter(function (entry) {
        return entry.gender === gender;
    });
}

function moocsGenderAddGray(moocsJson) {
    if (moocsJson.length === 0) {
        return [{
            "age": "red",
            "population": 0,
            "registrations": 0
        }, {
            "age": "gray",
            "population": 100
        }];

    }
    if ($("input[name*='moocsTrend']:checked").val() === "all") {
        moocsJson[0].registrations = moocsJson[0].all_registrations;
        moocsJson[0].realpopulation = moocsJson[0].all_population;
        moocsJson[0].population = (moocsJson[0].all_population * 100).toFixed(0);
    } else {
        moocsJson[0].registrations = moocsJson[0]["2018_registrations"];
        moocsJson[0].realpopulation = moocsJson[0]["2018_population"];
        moocsJson[0].population = (moocsJson[0]["2018_population"] * 100).toFixed(0);
    }

    var gray = {
        "age": "gray",
        "population": 100 - moocsJson[0].population
    }
    moocsJson.push(gray);
    return moocsJson;
}
// console.log()
points(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Female")));
points1(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")));
points2(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Not Available")));
points3(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Other")));

function points(data) {
    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle-gender').html("Female 0%");
    } else {
        $('#waffle-gender').html(data[0].gender + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }

    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 50,
        theData = [];



    //total
    total = d3.sum(data, function (d) {
        return d.population;
    });


    //value of a square
    squareValue = total / (widthSquares * heightSquares);
    //remap data
    data.forEach(function (d, i) {
        d.population = +d.population;
        d.units = Math.floor(d.population / squareValue);
        theData = theData.concat(
            Array(d.units + 1).join(1).split('').map(function () {
                return {
                    squareValue: squareValue,
                    units: d.units,
                    population: d.population,
                    groupIndex: i
                };
            })
        );
    });


    width = (squareSize * widthSquares) + widthSquares * gap;
    height = (squareSize * heightSquares) + heightSquares * gap;

    var waffle = d3.select("#waffle")
        //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-40 -300 600 1000")
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .append("g")
        .selectAll("div")
        .data(theData)
        .enter()
        .append("circle")
        .attr('r', squareSize)

        .attr("fill", function (d) {
            if (d.groupIndex == 1) {
                return "#d3d3d3"
            } else {
                return "#ea2f01"
            }


        })
        .attr("cx", function (d, i) {
            //group n squares for column

            row = i % heightSquares;
            return (row * squareSize) + (row * gap) + 5;
        })
        .attr("cy", function (d, i) {
            col = Math.floor(i / heightSquares);
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * gap)) + 5
        })
}



function points1(data) {
    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle1-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle1-gender').html("Male 0%");
    } else {
        $('#waffle1-gender').html(data[0].gender + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }

    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 50,
        theData = [];






    //total
    total = d3.sum(data, function (d) {
        return d.population;
    });


    //value of a square
    squareValue = total / (widthSquares * heightSquares);
    //remap data
    data.forEach(function (d, i) {
        d.population = +d.population;
        d.units = Math.floor(d.population / squareValue);
        theData = theData.concat(
            Array(d.units + 1).join(1).split('').map(function () {
                return {
                    squareValue: squareValue,
                    units: d.units,
                    population: d.population,
                    groupIndex: i
                };
            })
        );
    });


    width = (squareSize * widthSquares) + widthSquares * gap;
    height = (squareSize * heightSquares) + heightSquares * gap;

    var waffle = d3.select("#waffle1")
        //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-40 -300 600 1000")
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .append("g")
        .selectAll("div")
        .data(theData)
        .enter()
        .append("circle")
        .attr('r', squareSize)

        .attr("fill", function (d) {
            if (d.groupIndex == 1) {
                return "#d3d3d3"
            } else {
                return "#ea2f01"
            }


        })
        .attr("cx", function (d, i) {
            //group n squares for column

            row = i % heightSquares;
            return (row * squareSize) + (row * gap) + 5;
        })
        .attr("cy", function (d, i) {
            col = Math.floor(i / heightSquares);
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * gap)) + 5
        })
}

function points2(data) {
    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle2-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle2-gender').html("Not Available 0%");
    } else {
        $('#waffle2-gender').html(data[0].gender + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }
    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 50,
        theData = [];





    //total
    total = d3.sum(data, function (d) {
        return d.population;
    });


    //value of a square
    squareValue = total / (widthSquares * heightSquares);
    //remap data
    data.forEach(function (d, i) {
        d.population = +d.population;
        d.units = Math.floor(d.population / squareValue);
        theData = theData.concat(
            Array(d.units + 1).join(1).split('').map(function () {
                return {
                    squareValue: squareValue,
                    units: d.units,
                    population: d.population,
                    groupIndex: i
                };
            })
        );
    });


    width = (squareSize * widthSquares) + widthSquares * gap;
    height = (squareSize * heightSquares) + heightSquares * gap;

    var waffle = d3.select("#waffle2")
        //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-40 -300 600 1000")
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .append("g")
        .selectAll("div")
        .data(theData)
        .enter()
        .append("circle")
        .attr('r', squareSize)

        .attr("fill", function (d) {
            if (d.groupIndex == 1) {
                return "#d3d3d3"
            } else {
                return "#ea2f01"
            }


        })
        .attr("cx", function (d, i) {
            //group n squares for column

            row = i % heightSquares;
            return (row * squareSize) + (row * gap) + 5;
        })
        .attr("cy", function (d, i) {
            col = Math.floor(i / heightSquares);
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * gap)) + 5
        })
}

function points3(data) {
    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle3-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle3-gender').html("Not Available 0%");
    } else {
        $('#waffle3-gender').html(data[0].gender + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }

    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 50,
        theData = [];



    //total
    total = d3.sum(data, function (d) {
        return d.population;
    });


    //value of a square
    squareValue = total / (widthSquares * heightSquares);
    //remap data
    data.forEach(function (d, i) {
        d.population = +d.population;
        d.units = Math.floor(d.population / squareValue);
        theData = theData.concat(
            Array(d.units + 1).join(1).split('').map(function () {
                return {
                    squareValue: squareValue,
                    units: d.units,
                    population: d.population,
                    groupIndex: i
                };
            })
        );
    });


    width = (squareSize * widthSquares) + widthSquares * gap;
    height = (squareSize * heightSquares) + heightSquares * gap;

    var waffle = d3.select("#waffle3")
        //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-40 -300 600 1000")
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .append("g")
        .selectAll("div")
        .data(theData)
        .enter()
        .append("circle")
        .attr('r', squareSize)

        .attr("fill", function (d) {
            if (d.groupIndex == 1) {
                return "#d3d3d3"
            } else {
                return "#ea2f01"
            }


        })
        .attr("cx", function (d, i) {
            //group n squares for column

            row = i % heightSquares;
            return (row * squareSize) + (row * gap) + 5;
        })
        .attr("cy", function (d, i) {
            col = Math.floor(i / heightSquares);
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * gap)) + 5
        })
}

/**
 * Start Filters
 */
function removeMoocsSvg() {

    d3.select("#timeline-moocs svg").remove();
    d3.select("#moocs-registrations svg").remove();
    d3.select("#distribution-moocs svg").remove();
    d3.select("#student1 svg").remove();
    d3.select("#student2 svg").remove();
    d3.select("#student3 svg").remove();
    d3.select("#student4 svg").remove();

    d3.select("#waffle svg").remove();
    d3.select("#waffle1 svg").remove();
    d3.select("#waffle2 svg").remove();
    d3.select("#waffle3 svg").remove();

    d3.select("#gauge-moocs svg").remove();
    d3.select("#gauge-registrations-m svg").remove();
    d3.select("#gauge-lac-m svg").remove();



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
            removeMoocsSvg();
            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0 && $("select[id*='divisionSelect']").val() !== "IDB") {
                drawGaugeMoocsChart(dataGaugeMoocs);
                var timelineDivisions = divisionFilter($.extend(true, [], moocsRegistrationTimeline.registrationTimelineDivisions), $("select[id*='divisionSelect']").val());
                if (timelineDivisions.length > 0) createChart(timelineDivisions[0].data);


                drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisionsAlltime, $("select[id*='divisionSelect']").val())));
                drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions, $("select[id*='divisionSelect']").val())));

                var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, $("select[id*='divisionSelect']").val());
                drawStudentRegistrationsChart($.extend(true, [], students[0]));
                drawStudentParticipantsChart($.extend(true, [], students[0]));
                drawStudentCompletedsChart($.extend(true, [], students[0]));
                drawStudentCertifiedsChart($.extend(true, [], students[0]));

                // Gender
                var gender = divisionFilter($.extend(true, [], moocsGenderArrays.genderDivisions), $("select[id*='divisionSelect']").val());
                points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
                points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
                points2(moocsGenderAddGray(moocsGenderFilter(gender, "Not Available")));
                points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));

                // Por ahora se deshabilita
                // } else if ( $("select[id*='deparmentSelect']").val().length > 0) {
                //     drawGaugeMoocsChart(dataGaugeMoocs);
                //     var timelineDivisions = orderTopMoocs(departmentFilter($.extend(true, [], moocsRegistrationTimeline.registrationTimelineDepartments), $("select[id*='deparmentSelect']").val()));
                //     if (timelineDivisions.length > 0) createChart(timelineDivisions[0].data);

                //     drawMoocsRegistrationsChart(orderTopMoocs(departmentFilter(moocsTopArrays.departmentsAllTime, $("select[id*='deparmentSelect']").val())));
                //     drawDistributionChart(orderTopMoocs(departmentFilter(moocsEducationArrays.educationLevelDepartments, $("select[id*='deparmentSelect']").val())));

                //     var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, $("select[id*='deparmentSelect']").val());
                //     drawStudentRegistrationsChart($.extend(true, [], students[0]));
                //     drawStudentParticipantsChart($.extend(true, [], students[0]));
                //     drawStudentCompletedsChart($.extend(true, [], students[0]));
                //     drawStudentCertifiedsChart($.extend(true, [], students[0]));

                //     // Gender
                //     var gender = departmentFilter($.extend(true, [], moocsGenderArrays.genderDepartments), $("select[id*='deparmentSelect']").val());
                //     points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
                //     points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
                //     points2(moocsGenderAddGray(moocsGenderFilter(gender, "Not Available")));
                //     points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));
            } else {
                drawGaugeMoocsChart(dataGaugeMoocs);
                createChart($.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB));

                drawMoocsRegistrationsChart(topAllMoocs);
                drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // same data for all and 2018
                drawStudentRegistrationsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                drawStudentParticipantsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                drawStudentCompletedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                drawStudentCertifiedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));

                // Gender
                points(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Female")));
                points1(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")));
                points2(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Not Available")));
                points3(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Other")));
            }
            break;
        default:
            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0 && $("select[id*='divisionSelect']").val() !== "IDB") {
                var timelineDivisions = divisionFilter($.extend(true, [], moocsRegistrationTimeline.registrationTimelineDivisions), $("select[id*='divisionSelect']").val());
                if (timelineDivisions.length > 0) createChart(timelineDivisions[0].data);

                drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisions2018, $("select[id*='divisionSelect']").val())));
                drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions, $("select[id*='divisionSelect']").val())));

                var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, $("select[id*='divisionSelect']").val());
                drawStudentRegistrationsChart($.extend(true, [], students[0]));
                drawStudentParticipantsChart($.extend(true, [], students[0]));
                drawStudentCompletedsChart($.extend(true, [], students[0]));
                drawStudentCertifiedsChart($.extend(true, [], students[0]));


                drawGaugeMoocsChart(dataGaugeMoocs2018);

                // Gender
                var gender = divisionFilter($.extend(true, [], moocsGenderArrays.genderDivisions), $("select[id*='divisionSelect']").val());
                points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
                points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
                points2(moocsGenderAddGray(moocsGenderFilter(gender, "Not Available")));
                points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));

                // Por ahora se deshabilita
                // } else if ($("select[id*='deparmentSelect']").val().length > 0) {
                //     drawGaugeMoocsChart(dataGaugeMoocs2018);

                //     var timelineDivisions = orderTopMoocs(departmentFilter($.extend(true, [], moocsRegistrationTimeline.registrationTimelineDepartments), $("select[id*='deparmentSelect']").val()));
                //     if (timelineDivisions.length > 0) createChart(timelineDivisions[0].data);

                //     drawMoocsRegistrationsChart(orderTopMoocs(departmentFilter(moocsTopArrays.departments2018, $("select[id*='deparmentSelect']").val())));
                //     drawDistributionChart(orderTopMoocs(departmentFilter(moocsEducationArrays.educationLevelDepartments, $("select[id*='deparmentSelect']").val())));

                //     var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, $("select[id*='deparmentSelect']").val());
                //     drawStudentRegistrationsChart($.extend(true, [], students[0]));
                //     drawStudentParticipantsChart($.extend(true, [], students[0]));
                //     drawStudentCompletedsChart($.extend(true, [], students[0]));
                //     drawStudentCertifiedsChart($.extend(true, [], students[0]));

                //     // Gender
                //     var gender = departmentFilter($.extend(true, [], moocsGenderArrays.genderDepartments), $("select[id*='deparmentSelect']").val());
                //     points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
                //     points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
                //     points2(moocsGenderAddGray(moocsGenderFilter(gender, "Not Available")));
                //     points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));
            } else {
                drawGaugeMoocsChart(dataGaugeMoocs2018);

                createChart($.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB));

                drawMoocsRegistrationsChart(top2018Moocs);
                drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // same data for all and 2018
                drawStudentRegistrationsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                drawStudentParticipantsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                drawStudentCompletedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                drawStudentCertifiedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));

                // Gender
                points(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Female")));
                points1(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")));
                points2(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Not Available")));
                points3(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Other")));
            }
            break;
    }



}
// Divisions select filter
$("select[id*='divisionSelect']").change(function () {
    moocsFilter();
});

// // Deparment select filter
// $("select[id*='deparmentSelect']").change(function () {
//     $("select[id*='divisionSelect']").val("");
//     moocsFilter();
// });

// $("#idbLink").click(function () {
//     $("select[id*='deparmentSelect']").val("");
//     $("select[id*='divisionSelect']").val("");
//     moocsFilter();
// });



$("input[name*='moocsTrend']").click(function () {
    moocsFilter();
});


/**
 * End Filters
 */