function drawDataTrendChart(dataDataTrend) {
    d3.select("#data-trend svg").remove();
    dataDataTrend = dataDataTrend.slice(0, 10).sort(function (a, b) {
        return d3.descending(a.Rank, b.Rank);
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
        .attr("fill", function (d) {
            var divisionSelected = $('#idbLink')[0].text;
            if (divisionSelected == "IDB" || divisionSelected == d.Division) {
                return "#424488";
            }
            return "#d3d3d3";
        })
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

    var div = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("font-size", "12px")
        .style("width", "450px");


    var tooltipBar = d3Old.selectAll("#data-trend .bar")
        .on("mouseover", function (d) {
            var textHtml = "<div class='col tooltip-gauges'><h3 class='row purple'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Downloads</span><span class='col text-right' >{{value}}</div>";
            textHtml = textHtml.replace('{{title}}', d.name)
            textHtml = textHtml.replace('{{value}}', d.value.toLocaleString())
            if (d.Department) {
                var addText = "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Department")
                addText = addText.replace('{{code}}', d.Department);
                textHtml = textHtml + addText;
            }
            if (d.Division) {
                var addText = "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Division")
                addText = addText.replace('{{code}}', d.Division)
                textHtml = textHtml + addText;
            }

            textHtml = textHtml + "</div>";
            div.transition()
                .duration(0)
                .style("font-family", "Gotham-Book")
                .style("display", "inline-block");
            // div.html(d.value + "<br/>" + d.name)
            div.html(textHtml)
                .style("left", (d3Old.event.pageX) + 5 + "px")
                .style("top", (d3Old.event.pageY - 28) + 5 + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("display", "none");
        });
}

function drawTreeDataset(dataTree, filtertype, typeload) {
    d3.select("#downloads-dataset div").remove();
    var count = 0;

    if (typeload != "init") {
        if ($("#dataSet2018").prop("checked")) {
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
    var text =
        function (text, params) {
            if (text === "share") {
                return "% Total of IDB Downloads";
            } else if (text === "value" + filtertype) {
                return "Downloads"
            } else {
                return d3plusOld.string.title(text, params);
            }
        }
    drawTreeChart(dataTree, filtertype, "#downloads-dataset", '#424488', text);
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

    removeGauges(["#gauge-datasets", "#gauge-download-d", "#gauge-lac-d"]);

    if (dataGauge == undefined) {
        dataGauge = setEmptyGaugesDatasets();
    }

    if (!dataGauge.divisionCode) {
        dataGauge.divisionCode = "IDB"
    }
    drawGauge(dataGauge.datasets, dataGauge.percentageDatasets, "", "#gauge-datasets", dataGauge.divisionCode, "Datasets", "#424488");
    drawGauge(dataGauge.downloads, dataGauge.percentageDownloads, "", "#gauge-download-d", dataGauge.divisionCode, "Downloads", "#424488");
    drawGauge(dataGauge.percentageLAC, dataGauge.percentageLAC, "%", "#gauge-lac-d", dataGauge.divisionCode, "Datasets", "#424488");
}

function drawPlotChartDataset(data) {
    d3.select("#dataset-publications-plot div").remove();
    createPlotChart(data, "#dataset-publications-plot", "#8889b3", "daysPublished", "Downloads", undefined, undefined, "Downloads by Department");
}

function createChartTimeLineDataSet(data) {
    d3.select("#timeline-dataset svg").remove();
    createTimelineChart(data, "#timeline-dataset", "#424488", "#dataset2018")
}

function createLineChartDataset(elements,color) {

    var parseTime = d3.timeParse("%m/%d/%Y");

    elements.trend.forEach(function (item) {
        item.id = elements.name;
        item.dateAux = item.date;
        item.date = parseTime(item.date);
    });
    var data = elements.trend;
    var attributes = [{
        "id": elements.name,
        "hex": color
    }]
    var visualization = d3plusOld.viz()
        .container("#lines-dataset  ")
        .data(elements.trend)
        .type("line")
        .id({
            grouping: false,
            value: "id"
        })
        .font({
            family: "Gotham-Book"
        })
        .background("transparent")
        .text("id")

        .axes({
            background: {
                color: "transparent",
                stroke: {
                    width: 0
                }
            },
            ticks: false
        })
        .tooltip({
            value: ["dateAux"],
            small: 450
        })
        .y({
            value: "value",
            grid: false,
            axis: false,
            mouse: false
        })
        .x({
            value: "date",
            grid: false,
            axis: false,
            mouse: false
        })
        .attrs(attributes)
        .color("hex")
        .format({
            "text": function (text, params) {
                if (text == "dateAux") {
                    return "Date"
                }

                if (text == "value") {
                    return "Downloads"
                }
                //i made this cuz' this cant change anywhere
                d3.selectAll("#lines-dataset #d3plus_graph_xticks").remove();
                d3.selectAll("#lines-dataset #d3plus_graph_yticks").remove();
                d3.selectAll("#lines-dataset #d3plus_graph_xlabel").remove();
                d3.selectAll("#lines-dataset #d3plus_graph_ylabel").remove();
                return d3plusOld.string.title(text, params);
            }

        })
        .width({
            value: 170,
            small: 50
        })
        .height({
            value: 80,
            small: 30
        })
        .draw()
}

function drawLinesChartDataset(data) {

    d3.selectAll("#lines-dataset div").remove();

    var parseTime = d3.timeParse("%m/%d/%Y");

    if (data.length > 0) {
        data = data.sort(function (a, b) {
            return d3.ascending(a.Rank, b.Rank);
        });
        data.forEach(function (element) {
            var color = "";
            var divisionSelected = $('#idbLink')[0].text;
            if(divisionSelected=="IDB"|| divisionSelected==element.Division){
                color="#424488";
            }else{
                color="#e6e6e6";
            }
            createLineChartDataset($.extend(true, [], element),color);
        });
    }

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
                drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDBAllTime));
                drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDBAllTime));
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
                drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDB2018));
                drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDB2018));
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
            drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "AllTheTime");
            drawGaugeDatasetChart($.extend(true, {}, datasetsGaugesIndicators.indicatorsIDBAllTheTime[0]));
            drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDBAllTime));
            drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDBAllTime));
        } else {
            //tree map
            drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");
            drawGaugeDatasetChart($.extend(true, {}, datasetsGaugesIndicators.indicatorsIDB2018[0]));
            drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDB2018));
            drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDB2018));
        }
        
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
    drawGaugeDatasetChart($.extend(true, {}, datasetsGaugesIndicators.indicatorsIDB2018[0]));

    //old logic
    drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDB2018));
    drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDB2018));
    drawPlotChartDataset(ObjectDataSetPlot);
}