function drawDataTrendChart(dataDataTrend) {
    d3.select("#data-trend svg").remove();
    dataDataTrend = dataDataTrend.slice(0, 10).sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    })
    var marginDataTrend = {
        top: 15,
        right: 48,
        bottom: 15,
        left: 300
    };

    var widthDataTrend = 800 - marginDataTrend.left - marginDataTrend.right,
        heightDataTrend = 520 - marginDataTrend.top - marginDataTrend.bottom;


    var svgDataTrend = d3.select("#data-trend")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-290 -28 800 550")
        .append("g")
        .classed("svg-content-responsive", true);

    var xDataTrend = d3.scaleLinear()
        .range([0, widthDataTrend])
        .domain([0, d3.max(dataDataTrend, function (d) {
            return d.value;
        })]);

    var yDataTrend = d3.scaleBand()
        .rangeRound([50 * dataDataTrend.length, 0], .1)
        .domain(dataDataTrend.map(function (d) {
            return d.name;
        }));

    var yAxisDataTrend = d3.axisLeft(yDataTrend)
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
        .attr("height", 45)
        .attr("x", 8)
        .attr("width", function (d) {
            return xDataTrend(d.value);
        });

    barsDataTrend.append("text")
        .attr("class", "label")
        .attr("y", function (d) {
            return yDataTrend(d.name) + 45 / 2 + 4;
        })
        .attr("x", function (d) {
            return xDataTrend(d.value) + 10;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "13px")
        .text(function (d) {
            var value = setSettingsNumber(d.value)
            return value.valueNumber + value.suffixNumber;
        });

    svgDataTrend.selectAll(".tick text")
        .attr("width", "290")
        .attr("x", -290)
        .attr("y", -5)
        .attr("text-anchor", "start")
        .style("font-family", "Gotham-Medium")
        .style("font-size", "13px")
        .call(wrapData);
}

function drawTreeDataset(dataTree, filtertype, typeload) {
    d3.select("#downloads-dataset div").remove();

    var count = 0;

    if (typeload != "init") {
        if ($("#dataSet2018").prop("checked")) {
            dataTree = dataTree.sort(function (a, b) {
                return d3.descending(a.value2018, b.value2018);
            });
            dataTree.forEach(function (element) {
                if (element.value2018 > 0) {
                    count++;
                }
            });
        } else {
            dataTree = dataTree.sort(function (a, b) {
                return d3.descending(a.valueAllTheTime, b.valueAllTheTime);
            });
            dataTree.forEach(function (element) {
                if (element.valueAllTheTime > 0) {
                    count++;
                }
            });
        }
    } else {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.value2018, b.value2018);
        });
        dataTree.forEach(function (element) {
            if (element.value2018 > 0) {
                count++;
            }
        });
    }
    var numbType =  d3.format('.0%');

    coloursDataSet = chroma.scale(['#424488', '#ffffff'])
        .mode('lch').colors(dataTree.length)

    dataTree.forEach(function (element, i) {
        element.color = coloursDataSet[i]
    });

    //if all values are zero clean array to avoid error (darker of undefined)
    count > 0 ? dataTree = dataTree : dataTree = [];
    // instantiate d3plus
    var visualization = d3plusOld.viz()
        .container("#downloads-dataset") // container DIV to hold the visualization
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

function setEmptyGaugesDatasets() {
    return {
        "datasets": 0,
        "percentageDatasets": 0,
        "downloads": 0,
        "percentageDownloads": 0,
        "percentageLAC": 0
    }
}

function drawGaugeDatasetChart(dataGauge) {
    
    removeGauges(["#gauge-datasets","#gauge-download-d","#gauge-lac-d"]);

    if (dataGauge == undefined) {
        dataGauge = setEmptyGaugesDatasets();
    }
    drawGauge(dataGauge.datasets, dataGauge.percentageDatasets, "", "#gauge-datasets");
    drawGauge(dataGauge.downloads, dataGauge.percentageDownloads, "", "#gauge-download-d");
    drawGauge(dataGauge.percentageLAC, dataGauge.percentageLAC, "%", "#gauge-lac-d");
}

function drawPlotChartDataset(data) {
    d3.select("#dataset-publications-plot svg").remove();
    var margin = {
        top: 30,
        right: 50,
        bottom: 60,
        left: 100
    };
    var width = 750 - margin.left - margin.right;
    var height = 580 - margin.top - margin.bottom;
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

    var svg = d3.select('#dataset-publications-plot')
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-100 -60 750 650")
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
        .ticks(10)
        .tickFormat(function (x) {
            var value = setSettingsNumber(x);
            return value.valueNumber + value.suffixNumber;
        });

    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickPadding(40)
        .tickSize(0)
        .ticks(10)
        .tickFormat(function (x) {
            var value = setSettingsNumber(x);
            return value.valueNumber + value.suffixNumber;
        });

    data.forEach(function (d) {
        d.downloadsByDepartment = +d.downloadsByDepartment;
        d.daysPublished = +d.daysPublished;

    });

    xScale.domain(d3.extent(data, function (d) {
        return d.daysPublished;
    })).nice();

    yScale.domain(d3.extent(data, function (d) {
        return d.downloadsByDepartment;
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
        .text("Published Days");

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
        .text("Downloads by Department");

    var mouseOver = function (d) {
        d3.select(this).attr("stroke", "#555555").attr("stroke-width", "2");
        div.transition()
            .duration(0)
            .style("opacity", .9);
        div.html(
                "<div><h4 class='text-center'><b>DATASETS DETAILS</b></h4><p class='pb-2'>" +
                d.Code + "</p><p><b>" +
                d.departmentCode + "</b></p><div class='pl-0'><p><span>Downloads by Department:</span>&nbsp;&nbsp;&nbsp;<b>" + d.downloadsByDepartment + "</b></p><p><span>Published Days:</span><b>" + d.daysPublished + "</b></p></div></div>")
            .style("left", (d3.event.pageX) + "px")
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
        .attr('stroke-width', '2')
        .attr('stroke', '#7879a9')
        .attr('cx', function (d) {
            return xScale(d.daysPublished);
        })
        .attr('cy', function (d) {
            return yScale(d.downloadsByDepartment);
        })
        .attr('r', function (d) {
            return radius(20);
        })
        .style('opacity', '.6')
        .style('fill', function (d) {

            if (d.departmentCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return "#8889b3"
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
}

function createChartTimeLineDataSet(data) {
    d3.select("#timeline-dataset svg").remove();
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
    var svg = d3.select("#timeline-dataset").append("svg")
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
                return $("#dataSet2018").prop("checked") ? d3.timeDay.count(0, d) % 60 === 0 : d3.timeDay.count(0, d) % 60 === 0
            }))
            .ticks(10)
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
}


$("input[name*='dataSetTrend']").click(function () {
    if ($("select[id*='divisionSelect']").val() != "IDB") {
        if ($("select[id*='divisionSelect']").val().length > 0) {

            if (this.id == "dataSetAllTime") {
                // $('.label-filter-restidb').hide();

                //treemap
                jsonDataSetTree = datasetsDownloadSource.downloadSourceDivisions.filter(function (dataT) {
                    return dataT.division_codes == $("select[id*='divisionSelect']").val()
                });
                drawTreeDataset(jsonDataSetTree, "AllTheTime");
                var jsonDataSetGauge = $.extend(true, [], datasetsGaugesIndicators.indicatorsDivisionsAllTheTime);
                jsonDataSetGauge = jsonDataSetGauge.filter(function (dataT) {
                    return dataT.divisionCode == $("select[id*='divisionSelect']").val()
                });
                drawGaugeDatasetChart(jsonDataSetGauge[0]);

                //top 10
                var ObjectDataTrendDataSet = $.extend(true, [], datasetsTopArrays.topDivisionsAllTime);
                jsonDataTrendDataSet = ObjectDataTrendDataSet.filter(function (dataT) {
                    return dataT.division_codes == $("select[id*='divisionSelect']").val()
                });
                if (jsonDataTrendDataSet.length > 0) {
                    drawDataTrendChart(jsonDataTrendDataSet);
                } else {
                    drawDataTrendChart([]);
                }
            } else {
                //treemap
                jsonDataSetTree = datasetsDownloadSource.downloadSourceDivisions.filter(function (dataT) {
                    return dataT.division_codes == $("select[id*='divisionSelect']").val()
                });
                drawTreeDataset(jsonDataSetTree, "2018");
                var jsonDataSetGauge = $.extend(true, [], datasetsGaugesIndicators.indicatorsDivisions2018);
                jsonDataSetGauge = jsonDataSetGauge.filter(function (dataT) {
                    return dataT.divisionCode == $("select[id*='divisionSelect']").val()
                });
                drawGaugeDatasetChart(jsonDataSetGauge[0]);

                //top 10
                var ObjectDataTrendDataSet = $.extend(true, [], datasetsTopArrays.topDivisions2018);
                jsonDataTrendDataSet = ObjectDataTrendDataSet.filter(function (dataT) {
                    return dataT.division_codes == $("select[id*='divisionSelect']").val()
                });
                if (jsonDataTrendDataSet.length > 0) {
                    drawDataTrendChart(jsonDataTrendDataSet);
                } else {
                    drawDataTrendChart([]);
                }
            }

            // //linechart
            // var ObjectDataSetLineChart = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineDivisions);
            // ObjectDataSetLineChart.filter(function(data) {
            //     return data.division_code == $("select[id*='divisionSelect']").val()
            // });
            // createChartTimeLineDataSet(ObjectDataSetLineChart[0].data);

        } else if ($("select[id*='deparmentSelect']").val().length > 0) {
            //acá iría la lógica de departamentos
        }

    } else {

        if (this.id == "dataSetAllTime") {
            //treemap
            drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");            
            drawGaugeDatasetChart( $.extend(true, {}, datasetsGaugesIndicators.indicatorsIDBAllTheTime[0]));
        } else {
            //tree map
            drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "AllTheTime");
            drawGaugeDatasetChart( $.extend(true, {}, datasetsGaugesIndicators.indicatorsIDB2018[0]));
        }
        //linechart
        // var ObjectDataSetLineChart = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
        // createChartTimeLineDataSet(ObjectDataSetLineChart);


    }
});

function wrapData(text) {
    text.each(function () {
        var text = d3.select(this);
        text.text(text.text().slice(0, 80));

        var words = text.text().split(/\s+/).reverse();
        var lineHeight = 17;
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

function initDataSet() {
    //init
    $("#dataSet2018").prop("checked", true);
    var ObjectDataSetLineChart = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
    createChartTimeLineDataSet(ObjectDataSetLineChart);
    var ObjectDataSetPlot = $.extend(true, [], datasetsScatterplotArrays);

    //new logic
    drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");
    // createChartTimeLineDataSet(ObjectDataSetLineChart);
    drawGaugeDatasetChart( $.extend(true, {}, datasetsGaugesIndicators.indicatorsIDB2018[0]));

    //old logic
    drawDataTrendChart(datasetsTopArrays.topIDB2018);
    drawPlotChartDataset(ObjectDataSetPlot);    
}