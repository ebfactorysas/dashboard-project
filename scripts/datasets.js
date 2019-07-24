function drawDataTrendChart(dataDataTrend) {
    d3.select("#data-trend svg").remove();
    dataDataTrend = dataDataTrend.slice(0, 10).sort(function (a, b) {
        return d3.descending(a.Rank, b.Rank);
    })
    var inBar= false;
    if($('.body').width()< 500){
        inBar = true;
    }
    drawTrendChart(dataDataTrend, "#data-trend", "#45509b", "purple", inBar, "#000000");
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
    createTimelineChart(data, "#timeline-dataset", "#424488", "#dataset2018",600)
}

function createLineChartDataset(elements, color) {

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
    var valueOfFilter = $("#divisionSelect")[0].value;

    if (data.length > 0) {
        data = data.sort(function (a, b) {
            return d3.ascending(a.Rank, b.Rank);
        });
        data.forEach(function (element) {
            var color = "";
            var divisionSelected = $('#idbLink')[0].text;
            if (divisionSelected == "IDB Group" || divisionSelected == element.Division || (valueOfFilter == "department" && element.Department == divisionSelected)) {
                color = "#424488";
            } else {
                color = "#e6e6e6";
            }
            createLineChartDataset($.extend(true, [], element), color);
        });
    }

}


$("input[name*='dataSetTrend']").click(function () {
    if ($("select[id*='divisionSelect']").val() != "IDB") {
        if ($("select[id*='divisionSelect']").val() != "department") {

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

        } else {
            if (this.id == "dataSetAllTime") {
                var departmentSelected = $("#divisionSelect option:selected").text();
                //treemap
                jsonDataSetTree = datasetsDownloadSource.downloadSourceDepartments.filter(function (dataT) {
                    return dataT.division_codes == departmentSelected
                });
                drawTreeDataset(jsonDataSetTree, "AllTheTime");


                var ObjectGaugeDataSet = $.extend(true, [], datasetsGaugesIndicators.indicatorsDepartmentsAllTheTime);
                ObjectGaugeDataSet = ObjectGaugeDataSet.filter(function (dataT) {
                    return dataT.departmentCode == departmentSelected
                });
                drawGaugeDatasetChart(ObjectGaugeDataSet[0]);

                //top 10
                drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDBAllTime));
                drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDBAllTime));
            } else {
                var departmentSelected = $("#divisionSelect option:selected").text();
                //treemap
                jsonDataSetTree = datasetsDownloadSource.downloadSourceDepartments.filter(function (dataT) {
                    return dataT.division_codes == departmentSelected
                });
                drawTreeDataset(jsonDataSetTree, "2018");


                var ObjectGaugeDataSet = $.extend(true, [], datasetsGaugesIndicators.indicatorsDepartments2018);
                ObjectGaugeDataSet = ObjectGaugeDataSet.filter(function (dataT) {
                    return dataT.departmentCode == departmentSelected
                });
                drawGaugeDatasetChart(ObjectGaugeDataSet[0]);

                //top 10
                drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDB2018));
                drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDB2018));
            }
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
        var lineHeight = 17;
        if(screen.width<=480){
            text.text(text.text().slice(0, 33));
            lineHeight=14;
        }  

        var words = text.text().split(/\s+/).reverse();
        
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