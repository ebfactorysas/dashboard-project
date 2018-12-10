function drawInstitutionsChart(dataInstitution) {
    var dataInstitutionSum = d3.sum(dataInstitution, function (d) {
        return d.value;
    });

    var marginInstitution = {
        top: 50,
        right: 40,
        bottom: 50,
        left: 40
    }

    var widthInstitution = 800 - marginInstitution.left - marginInstitution.right;
    var heightInstitution = 460 - marginInstitution.top - marginInstitution.bottom;
    var svgInstitution = d3.select('#institution-suscribers')
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-60 -60 800 500")
        .append("g")

        //class to make it responsive
        .classed("svg-content-responsive", true);

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
        .attr("width", xInstitution.bandwidth() - 30)
        .attr("y", function (d) {
            return yInstitution(d.value + 3);
        })
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 15; //Bar width of 20 plus 1 for padding
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
            return yInstitution(d.value) - 20;
        })
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 50; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#336577")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 25; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {

            return d.value < 1000 ? d.value : (Math.round(d.value / 1000).toFixed(0)) + "K";
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 25; //Bar width of 20 plus 1 for padding
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
        right: 0,
        bottom: 50,
        left: 50
    }

    var widthAgeSuscribers = 700 - marginAgeSuscribers.left - marginAgeSuscribers.right;
    var heightAgeSuscribers = 510 - marginAgeSuscribers.top - marginAgeSuscribers.bottom;

    var sumDataAgeSuscribers = d3.sum(dataAgeSuscribers, function (d) {
        return d.value;
    });
    var svgAgeSuscribers = d3.select('#age-suscribers').append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 -95 650 550")
        .append("g")
        // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")")

        //class to make it responsive
        .classed("svg-content-responsive", true);

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
        .attr("width", xAgeSuscribers.bandwidth() - 30)
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
            return i * xAgeSuscribers.bandwidth() + 25; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {

            return d.value + "K";
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 25; //Bar width of 20 plus 1 for padding
        })
        .attr("dy", "1.2em")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "12px")
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



function drawTreeSuscriber(dataTree) {
    d3.select("#demographics-suscribers svg").remove();
    dataTree = dataTree.sort(function (a, b) {
        return d3.descending(a.subscribers, b.subscribers);
    });

    colours = chroma.scale(['#518a81', '#ffffff'])
        .mode('lch').colors(dataTree.length)

    dataTree.forEach(function (element, i) {
        element.color = colours[i]
    });

    new d3plus.Treemap()
        .select("#demographics-suscribers")
        .width(630)
        .height(200)
        .data(dataTree)
        .layoutPadding([0])
        .groupBy(["subscribers", "gender"])
        .sum("subscribers")
        .shapeConfig({
            fill: function (d) {
                return d.color;
            }
        })
        .legend(false)
        .detectVisible(false)
        .render();
}

var dataGaugeSubscribers = {
    "code": {
        "total": getPercentageTotal(subscribersAllTotalGlobal),
        "allocated": subscribersAllTotalGlobal
    },
    "pageview": {
        "total": getPercentageTotal(subscribersAllDownloads),
        "allocated": subscribersAllDownloads
    },
    "lac": {
        "total": 100,
        "allocated": subscribersAllDownloadsLac
    }
}
var dataGaugeSubscribers2018 = {
    "code": {
        "total": getPercentageTotal(subscribersAllTotalGlobal),
        "allocated": subscribersAllTotalGlobal
    },
    "pageview": {
        "total": getPercentageTotal(subscribersAllDownloads),
        "allocated": subscribersAllDownloads
    },
    "lac": {
        "total": 100,
        "allocated": subscribersAllDownloadsLac
    }
}
drawGaugeSubscribersChart(dataGaugeSubscribers);


function drawGaugeSubscribersChart(dataGauge) {
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
        .text(setSettingsNumber(dataGauge.code.allocated).valueNumber + setSettingsNumber(dataGauge.code.allocated).suffixNumber);



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
        .text(setSettingsNumber(dataGauge.pageview.allocated).valueNumber + setSettingsNumber(dataGauge.pageview.allocated).suffixNumber);



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

    dataSet = dataSet.slice(0, 6);

    var marginSuscriber = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 205
    };

    var widthSuscriber = 750 - marginSuscriber.left - marginSuscriber.right,
        heightSuscriber = 220 - marginSuscriber.top - marginSuscriber.bottom;

    var svgSuscribers = d3.select("#suscribers-interested").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-265 -28 800 220")
        .append("g")
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var xSuscribers = d3.scaleLinear()
        .range([0, widthSuscriber])
        .domain([0, d3.max(dataSet, function (d) {
            return d.value;
        })]);

    var ySuscribers = d3.scaleBand()

        .rangeRound([heightSuscriber, 0], .1)
        .domain(dataSet.map(function (d) {
            return d.name;
        }));

    var yAxisSuscribers = d3.axisLeft(ySuscribers)
        //no tick marks
        .tickPadding(260)
        .tickSize(0);

    var gySuscribers = svgSuscribers.append("g")
        .style("text-anchor", "start")
        .style("color", "#1e6577")
        .style("font-family", "Gotham-Medium")
        .style("font-size", "13px")
        .attr("class", "y-suscribers")
        .call(yAxisSuscribers)

    var barsSuscribers = svgSuscribers.selectAll(".bar")
        .data(dataSet)
        .enter()
        .append("g")

    barsSuscribers.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return ySuscribers(d.name);
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
            return ySuscribers(d.name) + ySuscribers.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 16;
        })
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .text(function (d) {
            var value = setSettingsNumber(d.value)
            return value.valueNumber + value.suffixNumber;
        });
}

//init
function initSuscribers(){
    drawSuscribersChart(orderTopDataSuscribers(subscribersTopics));
    drawTreeSuscriber(subscribersGender.genderIDB);
    drawInstitutionsChart(subscribersInstitution.institutionIDB);
}
initSuscribers();


// Filters
function removeSubscribersSvg() {
    d3.select("#institution-suscribers svg").remove();
    d3.select("#age-suscribers svg").remove();
    d3.select("#gauge-suscribers svg").remove();
    d3.select("#gauge-lac-s svg").remove();
    d3.select("#gauge-2018 svg").remove();

}

function divisionSubscriberFilter(moocsJson, filterBy) {
    return moocsJson.filter(function (entry) {
        entry.value = Number(entry.value);
        return entry.code.indexOf(filterBy) > 0;
    });
}

function subscribersFilter() {
    removeSubscribersSvg();
    //Load the json
    switch ($("input[name*='suscribersTrend']:checked").val()) {
        case 'all':

            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0) {

                // console.log("division subscriber=> ", divisionSubscriberFilter(subscribersInstitution.institutionDivisions, $("select[id*='divisionSelect']").val()))
                drawInstitutionsChart(divisionSubscriberFilter(subscribersInstitution.institutionDivisions, $("select[id*='divisionSelect']").val()));

                // drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisionsAlltime, $("select[id*='divisionSelect']").val())));
                // drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions, $("select[id*='divisionSelect']").val())));

                // var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, $("select[id*='divisionSelect']").val());
                // drawStudentRegistrationsChart(students[0]);
                // drawStudentParticipantsChart(students[0]);
                // drawStudentCompletedsChart(students[0]);
                // drawStudentCertifiedsChart(students[0]);
            } else if ($("select[id*='deparmentSelect']").val().length > 0) {
                drawInstitutionsChart(divisionSubscriberFilter(subscribersInstitution.institutionDepartments, $("select[id*='deparmentSelect']").val()));

                // drawMoocsRegistrationsChart(orderTopMoocs(departmentFilter(moocsTopArrays.departmentsAllTime, $("select[id*='deparmentSelect']").val())));
                // drawDistributionChart(orderTopMoocs(departmentFilter(moocsEducationArrays.educationLevelDepartments, $("select[id*='deparmentSelect']").val())));

                // var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, $("select[id*='deparmentSelect']").val());
                // drawStudentRegistrationsChart(students[0]);
                // drawStudentParticipantsChart(students[0]);
                // drawStudentCompletedsChart(students[0]);
                // drawStudentCertifiedsChart(students[0]);
            } else {
                // drawMoocsRegistrationsChart(topAllMoocs);
                // drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // // same data for all and 2018
                // drawStudentRegistrationsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                // drawStudentParticipantsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                // drawStudentCompletedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                // drawStudentCertifiedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                console.log("ffdf");
                drawInstitutionsChart(subscribersInstitution.institutionIDB);

            }


            break;
        case "2018":
            drawGaugeSubscribersChart(dataGaugeSubscribers2018);
            break;
        default:
            //top registration chart
            if ($("select[id*='divisionSelect']").val().length > 0) {
                drawInstitutionsChart(divisionSubscriberFilter(subscribersInstitution.institutionDivisions, $("select[id*='divisionSelect']").val()));

                // drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisions2018, $("select[id*='divisionSelect']").val())));
                // drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions, $("select[id*='divisionSelect']").val())));

                // var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, $("select[id*='divisionSelect']").val());
                // drawStudentRegistrationsChart(students[0]);
                // drawStudentParticipantsChart(students[0]);
                // drawStudentCompletedsChart(students[0]);
                // drawStudentCertifiedsChart(students[0]);
            } else if ($("select[id*='deparmentSelect']").val().length > 0) {
                drawInstitutionsChart(divisionSubscriberFilter(subscribersInstitution.institutionDepartments, $("select[id*='deparmentSelect']").val()));

                // drawMoocsRegistrationsChart(orderTopMoocs(departmentFilter(moocsTopArrays.departments2018, $("select[id*='deparmentSelect']").val())));
                // drawDistributionChart(orderTopMoocs(departmentFilter(moocsEducationArrays.educationLevelDepartments, $("select[id*='deparmentSelect']").val())));

                // var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, $("select[id*='deparmentSelect']").val());
                // drawStudentRegistrationsChart(students[0]);
                // drawStudentParticipantsChart(students[0]);
                // drawStudentCompletedsChart(students[0]);
                // drawStudentCertifiedsChart(students[0]);
            } else {
                // drawMoocsRegistrationsChart(top2018Moocs);
                // drawDistributionChart(moocsEducationArrays.educationLevelIDB);
                // // same data for all and 2018
                // drawStudentRegistrationsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                // drawStudentParticipantsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                // drawStudentCompletedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                // drawStudentCertifiedsChart(moocsStudentsFlowArrays.studentsFlowIDB);
                drawInstitutionsChart(subscribersInstitution.institutionIDB);

            }
            break;
    }



}
// Divisions select filter
// $("select[id*='divisionSelect']").change(function () {
//     $("select[id*='deparmentSelect']").val("");
//     subscribersFilter();
// });

// // Deparment select filter
// $("select[id*='deparmentSelect']").change(function () {
//     $("select[id*='divisionSelect']").val("");
//     subscribersFilter();
// });

// $("#idbLink").click(function () {
//     $("select[id*='deparmentSelect']").val("");
//     $("select[id*='divisionSelect']").val("");
//     subscribersFilter();
// });

$("input[name*='suscribersTrend']").click(function () {
    //subscribersFilter();
});