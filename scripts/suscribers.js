function drawInstitutionsChart(dataInstitution) {
    d3.select("#institution-suscribers svg").remove();
    var dataInstitutionSum = d3.sum(dataInstitution, function (d) {
        return d.value;
    });

    var marginInstitution = {
        top: 50,
        right: 40,
        bottom: 50,
        left: 40
    }

    var widthInstitution = 700 - marginInstitution.left - marginInstitution.right;
    var heightInstitution = 515 - marginInstitution.top - marginInstitution.bottom;
    var svgInstitution = d3.select('#institution-suscribers')
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-25 -73 650 520")
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
        .attr("font-size", "14px")
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 25; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {
            var number = setSettingsNumber(d.value)
            return number.valueNumber + number.suffixNumber;
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 25; //Bar width of 20 plus 1 for padding
        })
        .attr("dy", "1.2em")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "12px")
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
        .attr("font-size", "12px")
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



function drawAgeSuscribersChart(data) {
    
    d3.select("#age-suscribers svg").remove();
    dataSet = data.sort(function (a, b) {
        a.name = a.name.slice(0,30);
        return d3.ascending(a.value, b.value);
    });

    dataSet = dataSet.slice(0, 10);

    var marginSuscriber = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 205
    };

    var widthSuscriber = 750 - marginSuscriber.left - marginSuscriber.right,
        heightSuscriber = 220 - marginSuscriber.top - marginSuscriber.bottom;

    var svgSuscribers = d3.select("#age-suscribers").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-265 -28 800 430")
        .append("g")
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var xSuscribers = d3.scaleLinear()
        .range([0, widthSuscriber])
        .domain([0, d3.max(dataSet, function (d) {
            return d.value;
        })]);

    var ySuscribers = d3.scaleBand()

        .rangeRound([40*dataSet.length, 0], .1)
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
        .attr("height", 35)
        .attr("x", 8)
        .attr("width", function (d) {
            return xSuscribers(d.value);
        });


    barsSuscribers.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return ySuscribers(d.name) + 35 / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return -25;
        })
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "14px")
        .text(function (d) {
            var value = setSettingsNumber(d.value)
            return value.valueNumber + value.suffixNumber;
        })
        .style("fill", "#336577")
        .style("font-family", "Gotham-Bold")
        .style("font-size", "11px");
}



function drawTreeSuscriber(dataTree) {
    d3.select("#demographics-suscribers div").remove();
    dataTree = dataTree.sort(function (a, b) {
        return d3.descending(a.subscribers, b.subscribers);
    });

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
        var numbType =  d3.format('.0%');
    colours = chroma.scale(['#518a81', '#ffffff'])
        .mode('lch').colors(dataTree.length);
    dataTree.forEach(function (element, i) {
        element.color = colours[i]
    });
    var visualization = d3plusOld.viz()
        .container("#demographics-suscribers") // container DIV to hold the visualization
        .data({
            "value": dataTree, // results in larger padding between 'groups' in treemap
            "stroke": {
                "width": 2
            } // gives each shape a border
        }) // data to use with the visualization
        .type("tree_map") // visualization type
        .id("gender") // key for which our data is unique on
        .size({
            value: "subscribers" 
        }) // sizing of blocks
        .legend(false)
        .color(function (d) {
            return d.color;
        })
        .labels({
            align: "left",
            valign: "top",
            value: true,
            font: {
                family: "Gotham-Bold",
                size: "17"
            },
            resize: false
        })
        .tooltip({
            font: {
                family: "Gotham-Book"
            },
            value: ["subscribers" ]
        })
        .format({
            "text": function (text, params) {
                if (text === "share") {
                    return "Percentage";
                } else if (text === "value" ) {
                    return "Subscribers"
                } else {
                    return d3plusOld.string.title(text, params);
                }
            }
        })
        .text(function (d) {
            var current_id = visualization.id();
            return d[current_id] + "\n" + numbType(d.d3plusOld.share.toFixed(2));
        })

    visualization.draw()
      
}
function setSuscribersGauge(isIdb) {
    var dataGaugeSubscribers = {
        "code": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(subscribersAllTotalGlobal),
            "allocated": subscribersAllTotalGlobal
        },
        "pageview": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(subscribersAllDownloads),
            "allocated": subscribersAllDownloads
        },
        "lac": {
            "total": 100,
            "allocated": subscribersAllDownloadsLac
        }
    }
    return dataGaugeSubscribers;
}

function setSuscribersGauge2018(isIdb) {
    var dataGaugeSubscribers2018 = {
        "code": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(subscribersAllTotalGlobal),
            "allocated": subscribersAllTotalGlobal
        },
        "pageview": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(subscribersAllDownloads),
            "allocated": subscribersAllDownloads
        },
        "lac": {
            "total": 100,
            "allocated": subscribersAllDownloadsLac
        }
    }
    return dataGaugeSubscribers2018;
}

function drawGaugeSubscribersChart(dataGauge) {
    d3.select("#gauge-suscribers svg").remove();
    d3.select("#gauge-lac-s svg").remove();
    d3.select("#gauge-2018 svg").remove();
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
    
    d3.select("#suscribers-interested svg").remove();
    dataSet = data.sort(function (a, b) {
        a.name = a.name.slice(0,30);
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

        .rangeRound([30*dataSet.length, 0], .1)
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
        .attr("height", 25)
        .attr("x", 8)
        .attr("width", function (d) {
            return xSuscribers(d.value);
        });


    barsSuscribers.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return ySuscribers(d.name) + 25 / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return -25;
        })
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "14px")
        .text(function (d) {
            var value = setSettingsNumber(d.value)
            return value.valueNumber + value.suffixNumber;
        })
        .style("fill", "#336577")
        .style("font-family", "Gotham-Bold")
        .style("font-size", "11px");
}

//init
function initSuscribers() {
    drawAgeSuscribersChart(subscribersSubTopics);
    drawSuscribersChart(orderTopDataSuscribers(subscribersTopics));
    drawTreeSuscriber(subscribersGender.genderIDB);
    drawInstitutionsChart(subscribersInstitution.institutionIDB);
    dataGaugeSubscribers2018 = setSuscribersGauge2018('IDB');
    drawGaugeSubscribersChart(dataGaugeSubscribers2018);
}



// Filters
function removeSubscribersSvg() {
    d3.select("#institution-suscribers svg").remove();
    d3.select("#age-suscribers svg").remove();
    

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