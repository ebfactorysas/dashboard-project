function setPublicationGauge(isIdb) {
    var publicationGauge = {
        "publication": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(publicationsAllTotalGlobal),
            "allocated": publicationsAllTotalGlobal
        },
        "download": {
            "total": (isIdb == 'IDB') ? 1 : getPercentageTotal(publicationsAllDownloads),
            "allocated": publicationsAllDownloads
        },
        "lac": {
            "total": 100,
            "allocated": publicationsAllDownloadsLac
        }
    }
    return publicationGauge;
}

function setPublicationGauge2018($isIdb) {
    var publicationGauge2018 = {
        "publication": {
            "total": ($isIdb == 'IDB') ? 1 : getPercentageTotal(publications2018TotalGlobal),
            "allocated": publications2018TotalGlobal
        },
        "download": {
            "total": ($isIdb == 'IDB') ? 1 : getPercentageTotal(publications2018Downloads),
            "allocated": publications2018Downloads
        },
        "lac": {
            "total": 100,
            "allocated": publications2018DownloadsLac
        }
    }
    return publicationGauge2018;
}


var dataLinesPublications = [{
        "date": "11/08/2018",
        "one": 93.4,
        "two": 81.4,
        "three": 74.3,
        "four": 60.8,
        "five": 50.7,
        "six": 41.1,
        "seven": 35,
        "eight": 21.7,
        "nine": 11.9,
        "ten": 2.4
    },
    {
        "date": "11/09/2018",
        "one": 93.6,
        "two": 82.3,
        "three": 78.7,
        "four": 61.1,
        "five": 51.5,
        "six": 41.8,
        "seven": 35,
        "eight": 22,
        "nine": 14.5,
        "ten": 2.2
    },
    {
        "date": "11/10/2018",
        "one": 93.7,
        "two": 81.1,
        "three": 73.9,
        "four": 60.3,
        "five": 50.4,
        "six": 40.3,
        "seven": 35,
        "eight": 20.9,
        "nine": 11.8,
        "ten": 1
    },
    {
        "date": "11/11/2018",
        "one": 93.9,
        "two": 80.8,
        "three": 73.4,
        "four": 60.5,
        "five": 50.4,
        "six": 40.2,
        "seven": 35,
        "eight": 21,
        "nine": 11.2,
        "ten": 1.2
    },
    {
        "date": "11/12/2018",
        "one": 94.3,
        "two": 81.2,
        "three": 73.1,
        "four": 60.5,
        "five": 50.6,
        "six": 40.3,
        "seven": 35,
        "eight": 21,
        "nine": 13.4,
        "ten": 1.2
    },
    {
        "date": "11/13/2018",
        "one": 94.1,
        "two": 81.7,
        "three": 75,
        "four": 60.9,
        "five": 51.3,
        "six": 40.4,
        "seven": 35,
        "eight": 21.6,
        "nine": 19.7,
        "ten": 2.5
    },
    {
        "date": "11/14/2018",
        "one": 95.5,
        "two": 81.1,
        "three": 73.2,
        "four": 60.5,
        "five": 51.2,
        "six": 40.6,
        "seven": 35,
        "eight": 21.3,
        "nine": 15.3,
        "ten": 1.5
    },
    {
        "date": "11/15/2018",
        "one": 96.5,
        "two": 81.7,
        "three": 74.2,
        "four": 60.9,
        "five": 51.3,
        "six": 40.4,
        "seven": 35,
        "eight": 21.7,
        "nine": 16.6,
        "ten": 2.5
    },
    {
        "date": "11/16/2018",
        "one": 94.5,
        "two": 82.8,
        "three": 78,
        "four": 60.8,
        "five": 52,
        "six": 40.7,
        "seven": 35,
        "eight": 22.4,
        "nine": 17.5,
        "ten": 1.2
    },
    {
        "date": "11/17/2018",
        "one": 92.9,
        "two": 81.3,
        "three": 75.2,
        "four": 60.5,
        "five": 51,
        "six": 40.5,
        "seven": 35,
        "eight": 21,
        "nine": 16.8,
        "ten": 1.4
    },
    {
        "date": "11/18/2018",
        "one": 94.4,
        "two": 81.3,
        "three": 74,
        "four": 60.4,
        "five": 50.7,
        "six": 40.3,
        "seven": 35,
        "eight": 21.2,
        "nine": 17.2,
        "ten": 1.4
    },
    {
        "date": "11/19/2018",
        "one": 96.4,
        "two": 81.3,
        "three": 73.8,
        "four": 60.6,
        "five": 50.9,
        "six": 40.2,
        "seven": 35,
        "eight": 21.4,
        "nine": 15.6,
        "ten": 1.6
    },
    {
        "date": "11/20/2018",
        "one": 93.4,
        "two": 81.3,
        "three": 73.4,
        "four": 60.7,
        "five": 50.7,
        "six": 40.2,
        "seven": 35,
        "eight": 21.3,
        "nine": 15.3,
        "ten": 1.7
    },
    {
        "date": "11/21/2018",
        "one": 94.7,
        "two": 81.7,
        "three": 73.6,
        "four": 60.9,
        "five": 51.1,
        "six": 45.4,
        "seven": 35,
        "eight": 22.1,
        "nine": 14,
        "ten": 1.9
    },
    {
        "date": "11/22/2018",
        "one": 92.4,
        "two": 81.2,
        "three": 73.1,
        "four": 60.6,
        "five": 51.2,
        "six": 43,
        "seven": 35,
        "eight": 20.9,
        "nine": 13.8,
        "ten": 2.2
    },
    {
        "date": "11/23/2018",
        "one": 94.1,
        "two": 83.1,
        "three": 80,
        "four": 62,
        "five": 51.7,
        "six": 47.9,
        "seven": 35,
        "eight": 22.9,
        "nine": 15.9,
        "ten": 2.7
    },
    {
        "date": "11/24/2018",
        "one": 96.6,
        "two": 81.7,
        "three": 74.3,
        "four": 60.7,
        "five": 50.9,
        "six": 45.4,
        "seven": 35,
        "eight": 21.9,
        "nine": 14.1,
        "ten": 2.7
    },
    {
        "date": "11/25/2018",
        "one": 92.3,
        "two": 80.9,
        "three": 72.1,
        "four": 60.3,
        "five": 50.3,
        "six": 41.4,
        "seven": 35,
        "eight": 20.6,
        "nine": 12.6,
        "ten": 2.3
    },
    {
        "date": "11/26/2018",
        "one": 98.9,
        "two": 81.5,
        "three": 72.1,
        "four": 60.5,
        "five": 50.7,
        "six": 42.8,
        "seven": 35,
        "eight": 20.8,
        "nine": 14.1,
        "ten": 3
    },
    {
        "date": "11/27/2018",
        "one": 94.7,
        "two": 81.1,
        "three": 73,
        "four": 60.7,
        "five": 50.7,
        "six": 48,
        "seven": 35,
        "eight": 21,
        "nine": 13.3,
        "ten": 2.4
    },
    {
        "date": "11/28/2018",
        "one": 97,
        "two": 80.9,
        "three": 75,
        "four": 60.5,
        "five": 50.9,
        "six": 42.1,
        "seven": 35,
        "eight": 20.9,
        "nine": 12.7,
        "ten": 2.2
    },
    {
        "date": "11/29/2018",
        "one": 95.8,
        "two": 81.2,
        "three": 77.3,
        "four": 60.7,
        "five": 50.6,
        "six": 40.6,
        "seven": 35,
        "eight": 21.2,
        "nine": 13.1,
        "ten": 2.4
    },
    {
        "date": "11/30/2018",
        "one": 100,
        "two": 81.2,
        "three": 74.2,
        "four": 60.4,
        "five": 50.9,
        "six": 40.5,
        "seven": 31,
        "eight": 21.2,
        "nine": 12.5,
        "ten": 1.3
    },
    {
        "date": "12/01/2018",
        "one": 95.2,
        "two": 81.5,
        "three": 79.5,
        "four": 60.2,
        "five": 51.8,
        "six": 40.5,
        "seven": 35,
        "eight": 21,
        "nine": 13.8,
        "ten": 2.2
    },
    {
        "date": "12/02/2018",
        "one": 93.4,
        "two": 80.7,
        "three": 76.7,
        "four": 60.2,
        "five": 50.7,
        "six": 40.3,
        "seven": 35,
        "eight": 20.6,
        "nine": 12.9,
        "ten": 1.8
    },
    {
        "date": "12/03/2018",
        "one": 97.7,
        "two": 81.4,
        "three": 78.6,
        "four": 60.6,
        "five": 51.6,
        "six": 40.7,
        "seven": 35,
        "eight": 21.3,
        "nine": 14.2,
        "ten": 2.2
    },
    {
        "date": "12/04/2018",
        "one": 97.1,
        "two": 81.2,
        "three": 78.1,
        "four": 60.6,
        "five": 51.8,
        "six": 41,
        "seven": 35,
        "eight": 21,
        "nine": 13.7,
        "ten": 3
    },
    {
        "date": "12/05/2018",
        "one": 96.4,
        "two": 81.1,
        "three": 77.5,
        "four": 60.6,
        "five": 51.4,
        "six": 40.4,
        "seven": 35,
        "eight": 21.1,
        "nine": 12.5,
        "ten": 2.5
    }
]

function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.date - b.date;
}

function createChartTimelinePublication(data, typeload) {


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
    var svg = d3.select("#timeline-publication")
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-60 -28 600 300")
        .append("g")
        // .attr("transform", "translate(" + marginMoocs.left + "," + marginMoocs.top + ")")

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

    //calculate path do not delete it
    // svg.append('svg:path')
    //     .attr('d', lineGen(data))
    //     .attr('stroke', '#c3c3c3')
    //     .attr("stroke-dasharray", "4")
    //     .attr('stroke-width', 2)
    //     .attr('fill', 'none');

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .style('stroke-width', '3px')
        .style("font-family", "Gotham-Book")
        .style("font-size", "13px")
        .call(d3.axisBottom(x)
            .ticks(d3.timeDay.filter(function (d) {
                return $("#publication2018").prop("checked") ? d3.timeDay.count(0, d) % 60 === 0 : d3.timeDay.count(0, d) % 300 === 0
            }))
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
                return Math.floor(value.valueNumber) + value.suffixNumber;
            }));

    var textOfTotal = setSettingsNumber(totalAmount);

    svg.append("text")
        .attr("x", (width - (margin.left / 2)))
        .attr("y", positionText)
        // .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .style("font-family", "Gotham-Bold")
        .text(textOfTotal.valueNumber + textOfTotal.suffixNumber);
    svg.append("text")
        .attr("x", (width - (margin.left / 2)))
        .attr("y", positionText + 20)
        // .attr("text-anchor", "middle")  
        .style("font-size", "14px")
        .style("font-family", "Gotham-Book")
        .text("TOTAL");

}

function drawTreePublication(dataTree, filtertype, typeload) {
    if (typeload != "init") {
        if ($("#publication2018").prop("checked")) {
            dataTree = dataTree.sort(function (a, b) {
                return d3.descending(a.value2018, b.value2018);
            });
        } else {
            dataTree = dataTree.sort(function (a, b) {
                return d3.descending(a.valueAllTheTime, b.valueAllTheTime);
            });
        }
    } else {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.value2018, b.value2018);
        });
    }
    var numbType =  d3.format('.0%');
    colours = chroma.scale(['#d1415a', '#ffffff'])
        .mode('lch').colors(dataTree.length)

    dataTree.forEach(function (element, i) {
        element.color = colours[i]
    });

    // instantiate d3plus
    var visualization = d3plusOld.viz()
        .container("#downloads-publications") // container DIV to hold the visualization
        .data({
            "value": dataTree, // results in larger padding between 'groups' in treemap
            "stroke": {
                "width": 2
            } // gives each shape a border
        }) // data to use with the visualization
        .type("tree_map") // visualization type
        .id("name") // key for which our data is unique on
        .size({
            value: "value" + filtertype,
            fill: "blue"
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
            value: ["value" + filtertype]
        })
        .format({
            "text": function (text, params) {
                if (text === "share") {
                    return "Percentage";
                } else if (text === "value" + filtertype) {
                    return "Value"
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

function drawTrendPublicationChart(dataPublicationTrend) {

    dataPublicationTrend = dataPublicationTrend.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });

    var marginPublicationTrend = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 40
    };

    var widthPublicationTrend = 680 - marginPublicationTrend.left - marginPublicationTrend.right,
        heightPublicationTrend = 465 - marginPublicationTrend.top - marginPublicationTrend.bottom;


    var svgPublicationTrend = d3.select("#publication-trend")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-40-20 730 450")
        .append("g")
        .classed("svg-content-responsive", true);

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
        .tickFormat(function (x) {
            var value = setSettingsNumber(x);
            return value.valueNumber + suffixNumber;
        })
        .tickPadding(40)
        .tickSize(0)



    var gyPublicationTrend = svgPublicationTrend.append("g")
        .style("text-anchor", "start")
        .style("color", "#555555")
        .attr("class", "y-data")
        .call(yAxisPublicationTrend)

    var textInAxis = d3.selectAll("#publication-trend .y-data text")
        .attr("dy", ".2em")

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
        .attr("height", yPublicationTrend.bandwidth() - 6)
        .attr("x", 16)
        .attr("width", function (d) {
            return xPublicationTrend(d.value);
        });

    barsPublicationTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yPublicationTrend(d.value) + yPublicationTrend.bandwidth() / 2 + 2;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 25;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "14px")
        .text(function (d) {
            return d.name;
        });
}

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
        /*.text(setSettingsNumber(dataGauge.publication.allocated).valueNumber + setSettingsNumber(dataGauge.publication.allocated).suffixNumber);*/
        .text(setSettingsNumber(dataGauge.publication.allocated).valueNumber + setSettingsNumber(dataGauge.publication.allocated).suffixNumber);


    var i4 = d3.interpolate(progress4, dataGauge.publication.allocated / dataGauge.publication.total);
    foreground4.attr("d", arc4.endAngle(twoPi * i4(1)));
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
        .text(setSettingsNumber(dataGauge.download.allocated).valueNumber + setSettingsNumber(dataGauge.download.allocated).suffixNumber);


    var i2 = d3.interpolate(progress2, dataGauge.download.allocated / dataGauge.download.total);
    foreground2.attr("d", arc2.endAngle(twoPi * i2(1)));
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
        .text(dataGauge.lac.allocated + "%");


    var i3 = d3.interpolate(progress3, dataGauge.lac.allocated / dataGauge.lac.total);
    foreground3.attr("d", arc3.endAngle(twoPi * i3(1)));

}

function drawLinesChartPublication(data) {
    // console.log(data);
    margin = {
            top: 20,
            right: 0,
            bottom: 0,
            left: 0
        },
        margin2 = {
            top: 0,
            right: 20,
            bottom: 30,
            left: 0
        },
        width = 400 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom,
        height2 = 400 - margin2.top - margin2.bottom;

    var svg = d3.select("#lines-publications").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-1 -10 105 400")
        .append("g")
        .classed("svg-content-responsive", true);



    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "transparent")

    var parseTime = d3.timeParse("%m/%d/%Y");

    var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
        .extent([
            [0, 0],
            [width, height2]
        ])
        .on("brush end", brushed);


    var line = d3.line()
        .x(function (d) {
            return x(new Date(d.date));
        })
        .y(function (d) {
            return y(d.hours);
        });

    var line2 = d3.line()
        .x(function (d) {
            return x2(new Date(d.date));
        })
        .y(function (d) {
            return y2(d.hours);
        })

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);


    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



    var colors = [];
    for (var i = 0; i < 50; i++) {
        var xx = "#e4e4e4";
        colors.push(xx);
        colors.push(xx);
    }




    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks()
    }

    z.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "date";
    }));

    data.forEach(function (d) {
        d.date = parseTime(d.date);
    });

    var employees = z.domain().map(function (id) {
        return {
            id: id,
            values: data.map(function (d) {
                return {
                    date: d.date,
                    hours: +d[id]
                };
            })
        };
    });


    var o1 = 0;
    var o2 = 0;

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));

    y.domain([
        0,
        d3.max(employees, function (c) {
            return d3.max(c.values, function (d) {
                return d.hours;
            });
        })
    ]);
    x2.domain(x.domain());
    y2.domain(y.domain());
    z.domain(employees.map(function (c) {
        return c.id;
    }));



    var focuslineGroups = focus.selectAll("g")
        .data(employees)
        .enter().append("g");

    var focuslines = focuslineGroups.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.values);
        })
        .style("stroke", function (d) {
            return "#e39aa7"
        })
        .attr("clip-path", "url(#clip)");

    /* will be evaluated 
        var line = svg.append("line")
        .attr("x1", 30)
        .attr("x2", 30)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke-width", 1)
        .attr("stroke", "#c3c3c3")
        .attr("stroke-dasharray", "2,2")

    var line2 = svg.append("line")
        .attr("x1", 80)
        .attr("x2", 80)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke-width", 1)
        .attr("stroke", "#c3c3c3")
        .attr("stroke-dasharray", "2,2")*/

    function brushed() {
        var extent = d3.event.selection;
        var s = extent.map(x2.invert, x2);
        x.domain(s);
        focuslines.attr("d", function (d) {
            return line(d.values)
        });
        focus.select(".axis--x").call(xAxis);
        focus.select(".axis--y").call(yAxis);
    }
}


function drawPlotChartPublication(data, typeload) {
    d3.select("#publications-plot svg").remove();
    var margin = {
        top: 30,
        right: 50,
        bottom: 60,
        left: 100
    };
    var width = 750 - margin.left - margin.right;
    var height = 540 - margin.top - margin.bottom;
    var valueOfFilter = $('#idbLink')[0].text;
    var arrayAux = [];
    var arrayElements = [];
    for (let i = 0; i < data.length; i++) {
        if (valueOfFilter == data[i].departmentCode) {
            arrayElements.push(data[i])
        } else {
            arrayAux.push(data[i])
        }
    }
    data = arrayAux.concat(arrayElements);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);



    var svg = d3.select('#publications-plot')
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-100 -60 750 600")
        .append("g")
        .classed("svg-content-responsive", true);

    var opacityScale = d3.scaleLinear()
        .domain([0.0, 30.0])
        .range([0.10, .80]);

    // The API for scales have changed in v4. There is a separate module d3-scale which can be used instead. The main change here is instead of d3.scale.linear, we have d3.scaleLinear.
    var xScale = d3.scaleLinear()
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .range([height, 0]);

    // square root scale.
    var radius = d3.scaleSqrt()
        .range([2, 5]);

    // the axes are much cleaner and easier now. No need to rotate and orient the axis, just call axisBottom, axisLeft etc.
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickPadding(40)
        .tickSize(0)
        .ticks(5);

    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickPadding(40)
        .tickSize(0)
        .ticks(5);

    data.forEach(function (d) {
        d.Downloads = +d.Downloads;
        d.daysPublished = +d.daysPublished;
        d.Code = d.Code;
    });

    xScale.domain(d3.extent(data, function (d) {
        return d.Downloads;
    })).nice();

    yScale.domain(d3.extent(data, function (d) {
        return d.daysPublished;
    })).nice();

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'x axis')
        .style("stroke-dasharray", "5,5")
        .call(xAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 70)
        .attr('x', 300)
        .attr('fill', 'black')
        .text("Downloads");

    // y-axis is translated to (0,0)
    svg.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'y axis')
        .style("stroke-dasharray", "5,5")
        .call(yAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', -80)
        .attr('x', -180)
        .attr('fill', 'black')
        .attr('transform', "rotate(-90)")
        .attr('text-anchor', 'middle')
        .text("Published Days");

    var mouseOver = function (d) {
        d3.select(this).attr("stroke", "#555555").attr("stroke-width", "2");
        div.transition()
            .duration(0)
            .style("opacity", .9);
        div.html(
                "<div><h4 class='text-center'><b>PUBLICATION DETAILS</b></h4><p class='pb-2'>" +
                d.Code + "</p><p><b>" +
                d.departmentCode + "</b></p><div class='pl-0'><p><span>Downloads:</span>&nbsp;&nbsp;&nbsp;<b>" + d.Downloads + "</b></p><p><span>Published Days:</span><b>" + d.daysPublished + "</b></p></div></div>")
            .style("left", (d3.event.pageX - 200) + "px")
            .style("top", (d3.event.pageY) + "px");

    }

    var mouseOut = function (d) {
        d3.select(this).attr("stroke-width", "0");
        div.transition()
            .duration(0)
            .style("opacity", 0);
    }
    var bubble = svg.selectAll('.bubble')
        .data(data)
        .enter().append('circle')
        .attr('class', 'bubble')
        .attr('cx', function (d) {
            return xScale(d.Downloads);
        })
        .attr('cy', function (d) {
            return yScale(d.daysPublished);
        })
        .attr('r', function (d) {
            return radius(20);
        })
        .style('fill', function (d) {

            if (d.departmentCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return "#d65a70"
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
    // .append('title')
    // .attr('x', function (d) {
    //     return radius(d.Downloads);
    // })
    // .text(function (d) {
    //     return d.Code;
    // });

}

function removePublicationsSvg() {
    d3.select("#downloads-publications svg").remove();
    // d3.select("#timeline-publication svg").remove();
    d3.select("#publication-trend svg").remove();
    //d3.select("#publications-plot svg").remove();
}

function removePublicationsSvgAll() {
    d3.select("#downloads-publications svg").remove();
    d3.select("#timeline-publication svg").remove();
    d3.select("#publication-trend svg").remove();
    d3.select("#publications-plot svg").remove();
}


function removePublicationsGauges() {
    d3.select("#gauge-publications svg").remove();
    d3.select("#gauge-download-p svg").remove();
    d3.select("#gauge-lac-p svg").remove();
}

// function publicationFilter() {
//     removePublicationsSvg();

//     if ($("select[id*='divisionSelect']").val().length > 0) {

//     } else if ($("select[id*='deparmentSelect']").val().length > 0) {
//         var downloadTimelineDepartment = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineDepartments);
//         downloadTimelineDepartment = downloadTimelineDepartment.filter(function (downloadTimelineDepartment) {
//             return downloadTimelineDepartment.departmentCode == $("#deparmentSelect").val()
//         })
//         //downloadTimelineDepartment = downloadTimelineDepartment[0].data;
//         createChartTimelinePublication(downloadTimelineDepartment);
//     } else {
//         initPublications();
//     }
// }

// initPublications();

function initPublications() {
    removePublicationsSvg();
    dataPublicationGauge = setPublicationGauge('IDB');
    dataPublicationGauge2018 = setPublicationGauge2018('IDB');
    var downloadTimelineIDB = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineIDB);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);


    var jsonPublicationLines = $.extend(true, [], publicationsLines.lines30daysDivisions);
    jsonDataLines = jsonPublicationLines.filter(function (data) {
        return data.division_codes == 'CAN'
    });

    jsonDataLines = jsonDataLines.sort(function (a, b) {
        return b['2018_downloads'] - a['2018_downloads'];
    });

    jsonLines += '"data":';

    var jsonDates = "{data:[";
    jsonResultAux = $.extend(true, [], jsonDataLines);
    jsonResultAux.length = 1;
    $.each(jsonResultAux[0].dates, function (y, val) {
        // console.log(validarFormatoFecha(y));
        if (validarFormatoFecha(val.date) == true) {
            jsonDates += '{"date":"' + val.date + '"},';
        }
    });
    jsonDates += "]}";
    jsonDates = eval(jsonDates);
    // console.log(jsonDataLines);


    var jsonLines = "[";
    jsonDates.forEach(function (dataDate, i) {
        jsonLines += '{';
        jsonLines += '"date":"' + dataDate.date + '",';
        // console.log(jsonDataLines);
        jsonDataLines.forEach(function (value, y, arr) {
            // $.each(internalJson, function (y, val) {
            // jsonLines += '"2018_downloads_' + y + '":"' + value['2018_downloads'] + '",';
            resultsDate = value.dates.filter(function (d, y) {
                return d.date == dataDate.date
            });
            // console.log(resultsDate);
            jsonLines += '"' + y + '":' + (parseFloat(resultsDate[0].value) + (1000 * (y + 1))) + ',';

            // jsonDates = jsonDates.filter(function (datajson){
            //     return datajson.date == y
            // });

            // console.log(val);
        });
        jsonLines += "},"
    });
    jsonLines += "]";
    // console.log(jsonLines);
    jsonLines = eval(jsonLines);

    drawGaugePublicationChart(dataPublicationGauge2018);
    drawLinesChartPublication(dataLinesPublications);
    createChartTimelinePublication(downloadTimelineIDB, 'init');
    drawTrendPublicationChart(publicationsTopArrays.topIDBAllTime);
    drawPlotChartPublication(ObjectpublicationsAttention, 'init');
    drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "2018", 'init');
}

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

//click radiobutton drawChart(id del click)
$("input[name*='publicationTrend']").click(function () {
    var downloadTimelineIDBTEST = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineIDB);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);

    removePublicationsSvg();
    removePublicationsGauges();
    if ($("select[id*='divisionSelect']").val() != "IDB") {
        if ($("select[id*='divisionSelect']").val().length > 0) {


            // jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDepartments.filter(dataT => {
            //     return dataT.department_codes == this.value
            // });
            // drawTreePublication(jsonPublicTree, "AllTheTime");



            // var downloadTimelineIDB = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineIDB);
            // createChartTimelinePublication(downloadTimelineIDB);
            // drawTrendPublicationChart(publicationsTopArrays.topIDBAllTime);

            var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
            if (this.id == "publicationAllTime") {
                $('.label-filter-restidb').hide();
                jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(function (data) {
                    return data.division_codes == $("select[id*='divisionSelect']").val()
                });
                jsonPublicationsBarras = publicationsTopArrays.topDivisionsAllTime.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                jsonTreePublications = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                publicationsAllTotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_publications : '0';
                publicationsAllDownloads = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_downloads : '0';
                publicationsAllDownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0].all_the_time_porcent_total_LAC_downloads != "missing" && jsondataPublications[0].all_the_time_porcent_total_LAC_downloads > 0) ? (jsondataPublications[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) : jsondataPublications[0].all_the_time_porcent_total_LAC_downloads) : '';
                dataPublicationGauge = setPublicationGauge();
                drawGaugePublicationChart(dataPublicationGauge);
                jsonTreePublications = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                drawTreePublication(jsonTreePublications, "AllTheTime");
                drawTrendPublicationChart(jsonPublicationsBarras);
            } else {
                $('.label-filter-restidb').show();
                jsonPublicationsBarras = publicationsTopArrays.topDivisions2018.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                jsonTreePublications = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                // drawPlotChartPublication(ObjectpublicationsAttention);
                drawTrendPublicationChart(jsonPublicationsBarras);
                drawTreePublication(jsonTreePublications, "2018");
                drawLinesChartPublication(dataLinesPublications);

                jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(function (data) {
                    return data.division_codes == $("select[id*='divisionSelect']").val()
                });
                publications2018TotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0]['2018_publications'] : '0';
                publications2018Downloads = (jsondataPublications.length > 0) ? jsondataPublications[0]['2018_downloads'] : '0';
                publications2018DownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0]['2018_porcent_total_LAC_downloads'] != "missing" && jsondataPublications[0]['2018_porcent_total_LAC_downloads'] > 0) ? (jsondataPublications[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) : jsondataPublications[0]['2018_porcent_total_LAC_downloads']) : '';
                dataPublicationGauge2018 = setPublicationGauge2018();
                drawGaugePublicationChart(dataPublicationGauge2018);
            }
        } else if ($("select[id*='deparmentSelect']").val().length > 0) {
            var downloadTimelineDepartment = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineDepartments);
            downloadTimelineDepartment = downloadTimelineDepartment.filter(function (downloadTimelineDepartment) {
                return downloadTimelineDepartment.departmentCode == $("#deparmentSelect").val()
            });
            downloadTimelineDepartment = downloadTimelineDepartment[0].data;
            // createChartTimelinePublication(downloadTimelineDepartment);
        }
    } else {
        removePublicationsSvg();
        removePublicationsGauges();
        if (this.id == "publicationAllTime") {
            $('.label-filter-restidb').hide();
            dataPublicationGauge = setPublicationGauge();
            drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "AllTheTime");
            // createChartTimelinePublication(downloadTimelineIDBTEST);
            drawTrendPublicationChart(publicationsTopArrays.topIDBAllTime);
            // drawPlotChartPublication(ObjectpublicationsAttention);
            drawGaugePublicationChart(dataPublicationGauge);
        } else {
            dataPublicationGauge2018 = setPublicationGauge2018();
            $('.label-filter-restidb').show();
            drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "2018");
            // createChartTimelinePublication(downloadTimelineIDBTEST);
            drawTrendPublicationChart(publicationsTopArrays.topIDB2018);
            // drawPlotChartPublication(ObjectpublicationsAttention);
            drawGaugePublicationChart(dataPublicationGauge2018);
        }
    }
});

//department filter


//iadb filter
// $("#idbLink").click(function (event) {
//     $("select[id*='deparmentSelect']").val("");
//     $("select[id*='divisionSelect']").val("");
//     event.preventDefault();
//     publicationFilter();
// });

var sample_data = [{
        "provincia": "Buenos Aires",
        "poblacion": 15625084
    },
    {
        "provincia": "Córdoba",
        "poblacion": 3308876
    },
    {
        "provincia": "Santa Fe",
        "poblacion": 3194537
    },
    {
        "provincia": "Ciudad Autónoma de Buenos Aires",
        "poblacion": 2890151
    },
    {
        "provincia": "Mendoza",
        "poblacion": 1738929
    },
    {
        "provincia": "Tucumán",
        "poblacion": 1448188
    },
    {
        "provincia": "Entre Ríos",
        "poblacion": 1235994
    },
    {
        "provincia": "Salta",
        "poblacion": 1214441
    },
    {
        "provincia": "Misiones",
        "poblacion": 111593
    },
    {
        "provincia": "Chaco",
        "poblacion": 1055259
    },
    {
        "provincia": "Corrientes",
        "poblacion": 992595
    },
    {
        "provincia": "Santiago del Estero",
        "poblacion": 874006
    },
    {
        "provincia": "San Juan",
        "poblacion": 681055
    },
    {
        "provincia": "Jujuy",
        "poblacion": 673307
    },
    {
        "provincia": "Río Negro",
        "poblacion": 638645
    },
    {
        "provincia": "Neuquén",
        "poblacion": 551266
    },
    {
        "provincia": "Formosa",
        "poblacion": 530162
    },
    {
        "provincia": "Chubut",
        "poblacion": 509108
    },
    {
        "provincia": "San Luis",
        "poblacion": 432310
    },
    {
        "provincia": "Catamarca",
        "poblacion": 367828
    },
    {
        "provincia": "La Rioja",
        "poblacion": 333642
    },
    {
        "provincia": "La Pampa",
        "poblacion": 318951
    },
    {
        "provincia": "Santa Cruz",
        "poblacion": 273964
    },
]