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
    d3.select("#distribution-moocs svg").remove();
    var marginDistribution = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var widthDistribution = 800 - marginDistribution.left - marginDistribution.right;
    var heightDistribution = 400 - marginDistribution.top - marginDistribution.bottom;
    var svgDistribution = d3.select('#distribution-moocs')
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 720 500")
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
        .attr("width", xDistribution.bandwidth() - 35)
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
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px");

}
/**
 * End distribution-moocs
 *  */


/**
 * Start registration-moocs
 */


function drawMoocsRegistrationsChart(dataMoocs) {
    d3.select("#moocs-registrations svg").remove();
    var marginMoocs = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 55
    };

    var widthMoocs = 800 - marginMoocs.left - marginMoocs.right,
        heightMoocs = 230 - marginMoocs.top - marginMoocs.bottom;


    var svgMoocs = d3.select("#moocs-registrations")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-55 0 800 200")
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
        .tickPadding(50)
        .tickSize(0)
        .tickFormat(function (x) {
            var value = setSettingsNumber(x);
            return value.valueNumber + value.suffixNumber;
        });

    var gyMoocs = svgMoocs.append("g")
        .style("text-anchor", "start")
        .style("color", "#555555")
        .style("font-family", "Gotham-Bold")
        .style("font-size", "14px")
        .attr("class", "y-data")
        .attr("transform", "translate( 0 ,-7)")
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
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", "#f1a592")
        .attr("height", 26)
        .attr("x", 8)
        .attr("width", function (d) {
            return xMoocs(d.value);
        });

    barsMoocs.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yMoocs(d.value) + yMoocs.bandwidth() / 2 - 2;
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


var data = [{
    value: 0,
    name: "<18",
    id: 0
}, {
    value: 5000,
    name: "18 - 25",
    id: 1
}, {
    value: 16000,
    name: "26 - 39",
    id: 2
}, {
    value: 10000,
    name: "40 - 62",
    id: 3
}, {
    value: 0,
    name: "> 63",
    id: 4
}, {
    value: 19000,
    name: "Not Reported",
    id: 5
}];


function drawMoocsAgeDistributionChart(data) {
    data = data.sort(function (a, b) {
        return d3.descending(a.id, b.id);
    })

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 100
    };


    var width = 625 - margin.left - margin.right,
        height = 290 - margin.top - margin.bottom;

    var svg = d3.select("#age-distribution-moocs").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var y = d3.scaleBand()
        .rangeRound([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));
    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")
    bars.append("rect")
        .attr("class", "bar-back")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth() - 15)
        .attr("x", 0)
        .attr("fill", "#efefef")
        .attr("width", function (d) {
            return width;
        });

    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth() - 15)
        .attr("x", 0)
        .attr("width", function (d) {
            if ((x(d.value) - 20) <= 0) {
                return 0;
            } else {
                return x(d.value) - 20;
            }
        });


    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth() - 15)
        .attr("x", 0)
        .attr("rx", 30)
        .attr("ry", 30)
        .attr("width", function (d) {
            return x(d.value) + 10;
        });

    //make y axis to show bar names
    var yAxis = d3.axisLeft(y)
        .tickPadding(50)
        //no tick marks
        .tickSize(0);


    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .attr("transform", "translate(-10,-12 )")

    var path = svg.select(".y .domain")
        .attr("transform", "translate(10,0 )")



    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.name) + y.bandwidth() / 2 - 5;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 10;
        })
        .text(function (d) {
            var value = setSettingsNumber(d.value);
            return value.valueNumber + value.suffixNumber;
        })
        .style("font-family", "Gotham-Bold");

    svg.selectAll(".tick text")
        .call(wrap, y.bandwidth(), 10)
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px");
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

var widthStudents = 100 - marginStudents.left - marginStudents.right,
    heightStudents = 60 - marginStudents.top - marginStudents.bottom;

/**
 * Start student-registrations-moocs
 */


function drawStudentRegistrationsChart(dataStudents) {
    d3.select("#student1 svg").remove();

    if (typeof dataStudents == "undefined" || typeof dataStudents.registrations == "undefined") {
        $('#student1-title').html("0");
        return
    };
    dataStudents.registrations.value = 0;
    dataStudents.registrations.years.forEach(function (element) {
        dataStudents.registrations.value = dataStudents.registrations.value + element.value;
    });

    var formatNumber = setSettingsNumber(dataStudents.registrations ? dataStudents.registrations.value : 0);
    $('#student1-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

    var svgStudent1 = d3.select("#student1")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -7 100 60")
        .append("g")

    var xStudent1 = d3.scaleLinear()
        .range([0, widthStudents])
        .domain([0, d3.max(dataStudents.registrations.years, function (d) {
            return d.value;
        })]);

    var yStudent1 = d3.scaleBand()
        .rangeRound([18 * dataStudents.registrations.years.length, 0], .1)
        .domain(dataStudents.registrations.years.map(function (d) {
            return d.name;
        }));

    var yAxisStudent1 = d3.axisLeft(yStudent1)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent1 = svgStudent1.append("g")
        .style("text-anchor", "start")
        .style("color", "#fff")
        .style("font-family", "Gotham-Book")
        .style("font-size", "9px")
        .attr("class", "y-data")
        .attr("transform", "translate(0,-4 )")
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
        .attr("height", 10)
        .attr("x", 8)
        .attr("width", function (d) {
            return xStudent1(d.value);
        });

    barsStudent1.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yStudent1(d.name) + 16 / 2;
        })
        .attr("x", function (d) {
            return xStudent1(d.value) - 6;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "8px")
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



function drawStudentParticipantsChart(dataStudents) {
    d3.select("#student2 svg").remove();

    if (typeof dataStudents == "undefined" || typeof dataStudents.participants == "undefined") {
        $('#student2-title').html("0");
        return
    };
    dataStudents.participants.value = 0;
    dataStudents.participants.years.forEach(function (element) {
        dataStudents.participants.value = dataStudents.participants.value + element.value;
    });

    var formatNumber = setSettingsNumber(dataStudents.participants.value);
    $('#student2-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

    var svgStudent2 = d3.select("#student2")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -7 100 60")
        .append("g");

    var xStudent2 = d3.scaleLinear()
        .range([0, widthStudents])
        .domain([0, d3.max(dataStudents.participants.years, function (d) {
            return d.value;
        })]);

    var yStudent2 = d3.scaleBand()
        .rangeRound([18 * dataStudents.participants.years.length, 0], .1)
        .domain(dataStudents.participants.years.map(function (d) {
            return d.name;
        }));

    var yAxisStudent2 = d3.axisLeft(yStudent2)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent2 = svgStudent2.append("g")
        .style("text-anchor", "start")
        .style("color", "#fff")
        .style("font-family", "Gotham-Book")
        .style("font-size", "9px")
        .attr("class", "y-data")
        .attr("transform", "translate(0,-4 )")
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
        .attr("height", 10)
        .attr("x", 8)
        .attr("width", function (d) {
            return xStudent2(d.value);
        });

    barsStudent2.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yStudent2(d.name) + 16 / 2;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return xStudent2(d.value) - 6;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "8px")
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



function drawStudentCompletedsChart(dataStudents) {
    d3.select("#student3 svg").remove();

    if (typeof dataStudents == "undefined" || typeof dataStudents.completed == "undefined") {
        $('#student3-title').html("0");
        return
    };
    dataStudents.completed.value = 0;
    dataStudents.completed.years.forEach(function (element) {
        dataStudents.completed.value = dataStudents.completed.value + element.value;
    });

    var formatNumber = setSettingsNumber(dataStudents.completed.value);
    $('#student3-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

    var svgStudent3 = d3.select("#student3")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -7 100 60")
        .append("g")

    var xStudent3 = d3.scaleLinear()
        .range([0, widthStudents])
        .domain([0, d3.max(dataStudents.completed.years, function (d) {
            return d.value;
        })]);

    var yStudent3 = d3.scaleBand()
        .rangeRound([18 * dataStudents.completed.years.length, 0], .1)
        .domain(dataStudents.completed.years.map(function (d) {
            return d.name;
        }));

    var yAxisStudent3 = d3.axisLeft(yStudent3)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent3 = svgStudent3.append("g")
        .style("text-anchor", "start")
        .style("color", "#000")
        .style("font-family", "Gotham-Book")
        .style("font-size", "9px")
        .attr("class", "y-data")
        .attr("transform", "translate(0,-4 )")
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
        .attr("height", 10)
        .attr("x", 8)
        .attr("width", function (d) {
            return xStudent3(d.value);
        });

    barsStudent3.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yStudent3(d.name) + 16 / 2;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return xStudent3(d.value) - 6;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "8px")
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



function drawStudentCertifiedsChart(dataStudents) {
    d3.select("#student4 svg").remove();
    if (typeof dataStudents == "undefined" || typeof dataStudents.certified == "undefined") {
        $('#student4-title').html("0");
        return
    };

    dataStudents.certified.value = 0;
    dataStudents.certified.years.forEach(function (element) {
        dataStudents.certified.value = dataStudents.certified.value + element.value;
    });

    var formatNumber = setSettingsNumber(dataStudents.certified.value);
    $('#student4-title').html(formatNumber.valueNumber + formatNumber.suffixNumber);

    var svgStudent4 = d3.select("#student4")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -7 100 60")
        .append("g")

    var xStudent4 = d3.scaleLinear()
        .range([0, widthStudents])
        .domain([0, d3.max(dataStudents.certified.years, function (d) {
            return d.value;
        })]);

    var yStudent4 = d3.scaleBand()
        .rangeRound([18 * dataStudents.certified.years.length, 0], .1)
        .domain(dataStudents.certified.years.map(function (d) {
            return d.name;
        }));


    var yAxisStudent4 = d3.axisLeft(yStudent4)
        .tickPadding(20)
        .tickSize(0);

    var gyStudent4 = svgStudent4.append("g")
        .style("text-anchor", "start")
        .style("color", "#000")
        .style("font-family", "Gotham-Book")
        .style("font-size", "9px")
        .attr("class", "y-data")
        .attr("transform", "translate(0,-4 )")
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
        .attr("height", 10)
        .attr("x", 8)
        .attr("width", function (d) {
            return xStudent4(d.value);
        });

    barsStudent4.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yStudent4(d.name) + 16 / 2;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return xStudent4(d.value) - 6;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "8px")
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


function createChart(data) {
    // if ($("#moocs2018").prop("checked")) {
    //     data = data.filter(function (data) {
    //         return data.date.indexOf("-18") > -1
    //     });
    // }
    d3.select("#timeline-moocs svg").remove();
    if (data !== "Nodata") {
        var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            width = 850 - margin.left - margin.right,
            height = 230 - margin.top - margin.bottom;

        // parse the date / time
        var parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        var positionText = 0;
        // define the area
        var area = d3.area()
            .x(function (d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function (d) {
                positionText = y(d.close);
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
            .attr("viewBox", "-50 -22 850 300")
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
                .ticks(8)
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
                    return Math.floor(value.valueNumber) + suffixNumber;
                }));
        var textOfTotal = setSettingsNumber(totalAmount);
        svg.append("text")
            .attr("x", (width - (40)))
            .attr("y", positionText - 10)
            // .attr("text-anchor", "middle")  
            .style("font-size", "16px")
            .style("font-family", "Gotham-Bold")
            .text(textOfTotal.valueNumber + textOfTotal.suffixNumber);
        svg.append("text")
            .attr("x", (width - (40)))
            .attr("y", positionText + 5)
            // .attr("text-anchor", "middle")  
            .style("font-size", "14px")
            .style("font-family", "Gotham-Book")
            .text("TOTAL");
    }

}

/**
 * End timelines
 *  */

function setEmptyGaugesMoocs() {
    return {
        "courses": 0,
        "percentageCourses": 0,
        "registrations": 0,
        "percentageRegistrations": 0,
        "percentageLAC": 0
    }
}

function drawGaugeMoocsChart(dataGauge) {
    
    removeGauges(["#gauge-moocs","#gauge-registrations-m","#gauge-lac-m"]);

    if (dataGauge == undefined) {
        dataGauge = setEmptyGaugesMoocs();
    }
    drawGauge(dataGauge.courses, dataGauge.percentageCourses, "", "#gauge-moocs");
    drawGauge(dataGauge.registrations, dataGauge.percentageRegistrations, "", "#gauge-registrations-m");
    drawGauge(dataGauge.percentageLAC, dataGauge.percentageLAC, "%", "#gauge-lac-m");
}

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

points(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Female")));
points1(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")));
points2(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Not Available")));
points3(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Other")));

function points(data) {
    d3.select("#waffle svg").remove();

    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle-gender').html("FEMALE 0%");
    } else {
        $('#waffle-gender').html(data[0].gender.toUpperCase() + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }

    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 35,
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
        .attr("viewBox", "-80 -140 600 1000")
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
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * 50)) + 5
        })
}



function points1(data) {
    d3.select("#waffle1 svg").remove();

    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle1-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle1-gender').html("MALE 0%");
    } else {
        $('#waffle1-gender').html(data[0].gender.toUpperCase() + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }

    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 35,
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
        .attr("viewBox", "-80 -140 600 1000")
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
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * 50)) + 5
        })
}

function points2(data) {
    d3.select("#waffle2 svg").remove();

    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle2-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle2-gender').html("NOT INFORMED 0%");
    } else {
        $('#waffle2-gender').html(data[0].gender.toUpperCase() + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }
    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 35,
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
        .attr("viewBox", "-80 -140 600 1000")
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
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * 50)) + 5
        })
}

function points3(data) {
    d3.select("#waffle3 svg").remove();
    var formatNumber = setSettingsNumber(data[0].registrations);
    $('#waffle3-registrations').html(formatNumber.valueNumber + formatNumber.suffixNumber);
    if (typeof data[0].gender == "undefined") {
        $('#waffle3-gender').html("OTHER 0%");
    } else {
        $('#waffle3-gender').html(data[0].gender.toUpperCase() + " " + (data[0].realpopulation * 100).toFixed(2) + "%");
    }

    var total = 100;
    var widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 35,
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
        .attr("viewBox", "-80 -140 600 1000")
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
            return -(heightSquares * squareSize) + ((col * squareSize) + (col * 50)) + 5
        })
}

/**
 * Start Filters
 */


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

    //Load the json
    switch ($("input[name*='moocsTrend']:checked").val()) {
        case 'all':

            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0 && $("select[id*='divisionSelect']").val() !== "IDB") {
                jsondataMoocs = moocsIndicatorsArray.indicatorsDivisions.filter(function (data) {
                    return data.division_codes == $("select[id*='divisionSelect']").val()
                });
                moocsAllTotalGlobal = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['all_the_time_courses'] : '0';
                moocsAllDownloads = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['all_the_time_registrations'] : '0';
                moocsAllDownloadsLac = (jsondataMoocs.length > 0) ? ((jsondataMoocs[0]['porcent_total_LAC'] * 100 >= 100) ? "100%" : (jsondataMoocs[0]['porcent_total_LAC'] * 100).toFixed(1)) : 0;
                var jsonGaugesMoocs = $.extend(true, [], moocsGaugesIndicators.indicatorsDivisionsAllTheTime)

                jsonGaugesMoocs = jsonGaugesMoocs.filter(function (dataP) {
                    return dataP.divisionCode == $("select[id*='divisionSelect']").val()
                });
                drawGaugeMoocsChart(jsonGaugesMoocs[0]);
                var timelineDivisions = divisionFilter($.extend(true, [], moocsRegistrationTimeline.registrationTimelineDivisions), $("select[id*='divisionSelect']").val());
                if (timelineDivisions.length > 0) createChart(timelineDivisions[0].data)
                else createChart('Nodata');


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
                jsondataMoocs = moocsIndicatorsArray.indicatorsIDB;
                moocsAllTotalGlobal = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['all_the_time_courses'] : '0';
                moocsAllDownloads = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['all_the_time_registrations'] : '0';
                moocsAllDownloadsLac = (jsondataMoocs.length > 0) ? ((jsondataMoocs[0]['porcent_total_LAC'] * 100 == 100) ? "100%" : (jsondataMoocs[0]['porcent_total_LAC'] * 100).toFixed(1)) : '';
                drawGaugeMoocsChart($.extend(true, {}, moocsGaugesIndicators.indicatorsIDBAllTheTime[0]));
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
                jsondataMoocs = moocsIndicatorsArray.indicatorsDivisions.filter(function (data) {
                    return data.division_codes == $("select[id*='divisionSelect']").val()
                });
                moocs2018TotalGlobal = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['2018_courses'] : '0';
                moocs2018Downloads = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['2018_registrations'] : '0';
                moocs2018DownloadsLac = (jsondataMoocs.length > 0) ? ((jsondataMoocs[0]['porcent_total_LAC'] * 100 == 100) ? "100%" : (jsondataMoocs[0]['porcent_total_LAC'] * 100).toFixed(1)) : 0;
                var jsonGaugesMoocs = $.extend(true, [], moocsGaugesIndicators.indicatorsDivisions2018)

                jsonGaugesMoocs = jsonGaugesMoocs.filter(function (dataP) {
                    return dataP.divisionCode == $("select[id*='divisionSelect']").val()
                });
                drawGaugeMoocsChart(jsonGaugesMoocs[0]);
                var timelineDivisions = divisionFilter($.extend(true, [], moocsRegistrationTimeline.registrationTimelineDivisions), $("select[id*='divisionSelect']").val());
                if (timelineDivisions.length > 0) createChart(timelineDivisions[0].data);

                drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisions2018, $("select[id*='divisionSelect']").val())));
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
                // } else if ($("select[id*='deparmentSelect']").val().length > 0) {


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
                jsondataMoocs = moocsIndicatorsArray.indicatorsIDB;
                moocs2018TotalGlobal = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['2018_courses'] : '0';
                moocs2018Downloads = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['2018_registrations'] : '0';
                moocs2018DownloadsLac = (jsondataMoocs.length > 0) ? ((jsondataMoocs[0]['porcent_total_LAC'] * 100 == 100) ? "100%" : (jsondataMoocs[0]['porcent_total_LAC'] * 100).toFixed(1)) : 0;
                drawGaugeMoocsChart($.extend(true, {}, moocsGaugesIndicators.indicatorsIDB2018[0]));

                createChart($.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB));

                drawMoocsRegistrationsChart(top2018Moocs);
                drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // same data for all and 2018
                // drawStudentRegistrationsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                // drawStudentParticipantsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                // drawStudentCompletedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
                // drawStudentCertifiedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));

                // Gender
                points(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Female")));
                points1(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")));
                points2(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Not Available")));
                points3(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Other")));
            }
            break;
    }



}

function initMoocs() {
    drawDistributionChart(moocsEducationArrays.educationLevelIDB);
    drawMoocsRegistrationsChart(topAllMoocs);
    drawMoocsAgeDistributionChart(data);
    drawStudentRegistrationsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    drawStudentParticipantsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    drawStudentCompletedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    drawStudentCertifiedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    createChart(TimeLineIDB);
    drawGaugeMoocsChart($.extend(true, {}, moocsGaugesIndicators.indicatorsIDB2018[0]));
}




// Divisions select filter
$("select[id*='divisionSelect']").change(function () {
    // moocsFilter();
    $('#moocs2018').attr('checked');
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