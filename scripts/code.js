function drawChartCodeTrend(codeTrend) {
    d3.select("#code-trend svg").remove();
    codeTrend = codeTrend.slice(0, 10).sort(function (a, b) {
        return d3.descending(a.Rank, b.Rank);
    })

    drawTrendChart(codeTrend, "#code-trend", "#eeae00", "yellow", true, "#858585");
}

function drawTreeCode(dataTree, filtertype, typeload) {
    d3.select("#downloads-code div").remove();

    if ($("#code2018").prop("checked")) {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.value2018, b.value2018);
        });
    } else {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.valueAllTheTime, b.valueAllTheTime);
        });
    }
    var text =
        function (text, params) {
            if (text === "share") {
                return "% Total of IDB Pageviews";
            } else if (text === "value" + filtertype) {
                return "Pageviews"
            } else {
                return d3plusOld.string.title(text, params);
            }
        }

    drawTreeChart(dataTree, filtertype, "#downloads-code", '#ebb203', text);
}

function createChartTimeline(data) {
    d3.select("#timeline-code svg").remove();
    createTimelineChart(data, "#timeline-code", "#EEAE00", "#code018",600)
}

function drawPlotChart(data) {
    d3.select("#code-plot div").remove();
    createPlotChart(data, "#code-plot", "#EEAE00", "daysPublished", "pageviews", undefined, undefined, "Pageviews");
}

function drawGaugeCodeChart(dataGauge) {
    removeGauges(["#gauge-code", "#gauge-pageview", "#gauge-lac"]);

    if (dataGauge == undefined) {
        dataGauge = setEmptyGaugesCode();
    }
    if (!dataGauge.divisionCode) {
        dataGauge.divisionCode = "IDB"
    }

    drawGauge(dataGauge.code, dataGauge.percentageCode, "", "#gauge-code", dataGauge.divisionCode, "Code", "#EEAE00");
    drawGauge(dataGauge.pageviews, dataGauge.percentagePageviews, "", "#gauge-pageview", dataGauge.divisionCode, "Pageviews", "#EEAE00");
    drawGauge(dataGauge.LAC, dataGauge.percentageLAC.toFixed(1), "%", "#gauge-lac", dataGauge.divisionCode, "Publications", "#EEAE00");
}

function createLineChartCode(elements) {

    var parseTime = d3.timeParse("%m/%d/%Y");

    elements.trend.forEach(function (item) {
        item.id = elements.name;
        item.dateAux = item.date;
        item.date = parseTime(item.date);
    });
    var data = elements.trend;
    var attributes = [{
        "id": elements.name,
        "hex": "#f1d179"
    }]
    var visualization = d3plusOld.viz()
        .container("#lines-code  ")
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
                    return "Pageviews"
                }
                //i made this cuz' this cant change anywhere
                d3.selectAll("#lines-code #d3plus_graph_xticks").remove();
                d3.selectAll("#lines-code #d3plus_graph_yticks").remove();
                d3.selectAll("#lines-code #d3plus_graph_xlabel").remove();
                d3.selectAll("#lines-code #d3plus_graph_ylabel").remove();
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

function drawLinesChartCode(data) {

    d3.selectAll("#lines-code div").remove();

    var parseTime = d3.timeParse("%m/%d/%Y");

    if (data.length > 0) {
        data = data.sort(function (a, b) {
            return d3.descending(a.value, b.value);
        });
        data.forEach(function (element) {
            createLineChartCode($.extend(true, [], element));
        });
    }

}

function initCode() {
    var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.topIDB2018);
    var ObjectPageViewsTimeLineAllTime = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineIDB);
    var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);

    drawTreeCode($.extend(true, [], codePageviewsSourceArrays.pageviewSourceIDB), "2018", 'init');
    drawGaugeCodeChart($.extend(true, {}, codeGaugesIndicators.indicatorsIDB2018[0]));
    drawPlotChart(ObjectcodeScatterploArrays);
    drawChartCodeTrend(ObjectTopIdb2018);
    drawLinesChartCode(ObjectTopIdb2018);
    createChartTimeline(ObjectPageViewsTimeLineAllTime);
}

function setEmptyGaugesCode() {
    return {
        "code": 0,
        "percentageCode": 0,
        "pageviews": 0,
        "percentagePageviews": 0,
        "percentageLAC": 0,
        "LAC": 0
    }
}
//click radiobutton drawChart(id del click)
$("input[name*='codeTrend']").click(function () {
    if ($("select[id*='divisionSelect']").val() == "IDB") {
        if (this.id == "codeAllTime") {
            drawTreeCode($.extend(true, [], codePageviewsSourceArrays.pageviewSourceIDB), "AllTheTime");
            drawChartCodeTrend($.extend(true, [], codeTopArrays.topIDBAllTheTime));
            drawLinesChartCode($.extend(true, [], codeTopArrays.topIDBAllTheTime));
            drawGaugeCodeChart($.extend(true, {}, codeGaugesIndicators.indicatorsIDBAllTheTime[0]));
        } else {
            drawTreeCode($.extend(true, [], codePageviewsSourceArrays.pageviewSourceIDB), "2018");
            drawChartCodeTrend($.extend(true, [], codeTopArrays.topIDB2018));
            drawLinesChartCode($.extend(true, [], codeTopArrays.topIDB2018));
            drawGaugeCodeChart($.extend(true, {}, codeGaugesIndicators.indicatorsIDB2018[0]));
        }
    } else {
        jsondataCode = codeIndicatorsArrays.indicatorsDivisions.filter(function (data) {
            return data.division_codes == $("select[id*='divisionSelect']").val()
        });
        var ObjectPageViewsTimeLine = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineDivisions);
        ObjectPageViewsTimeLine = ObjectPageViewsTimeLine.filter(function (data) {
            return data.division_codes == $("select[id*='divisionSelect']").val()
        });
        var ObjectCodePageViewSource = $.extend(true, [], codePageviewsSourceArrays.pageviewSourceDivisions);
        ObjectCodePageViewSource = ObjectCodePageViewSource.filter(function (data) {
            return data.division_codes == $("select[id*='divisionSelect']").val()
        });
        if (this.id == "codeAllTime") {
            drawChartCodeTrend($.extend(true, [], codeTopArrays.topIDBAllTheTime));
            drawLinesChartCode($.extend(true, [], codeTopArrays.topIDBAllTheTime));
            codeAllTotalGlobal = (jsondataCode.length > 0) ? jsondataCode[0].all_the_time_code : '0',
                codeAllDownloads = (jsondataCode.length > 0) ? jsondataCode[0]['all_the_time_pageviews'] : '0',
                codeAllDownloadsLac = (jsondataCode.length > 0) ? ((jsondataCode[0]['porcent_total_lac'] * 100 >= 100) ? "100%" : (jsondataCode[0]['porcent_total_lac'] * 100).toFixed(1)) : '',
                drawGaugeCodeChart($.extend(true, {}, codeGaugesIndicators.indicatorsDivisionsAllTheTime[0]));
            drawTreeCode(ObjectCodePageViewSource, "AllTheTime");
        } else {
            var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.codeTrend2018Divisions);
            ObjectTopIdb2018 = ObjectTopIdb2018.filter(function (data) {
                return data.divisionCodes == $("select[id*='divisionSelect']").val()
            });
            code2018TotalGlobal = (jsondataCode.length > 0) ? jsondataCode[0]['2018_code'] : '0',
                code2018Downloads = (jsondataCode.length > 0) ? jsondataCode[0]['2018_pageviews'] : '0',
                code2018DownloadsLac = (jsondataCode.length > 0) ? ((jsondataCode[0]['porcent_total_lac'] * 100 >= 100) ? "100%" : (jsondataCode[0]['porcent_total_lac'] * 100).toFixed(1)) : '',
                drawChartCodeTrend($.extend(true, [], codeTopArrays.topIDB2018));
                drawLinesChartCode($.extend(true, [], codeTopArrays.topIDB2018));
            drawGaugeCodeChart($.extend(true, {}, codeGaugesIndicators.indicatorsDivisions2018[0]));
            drawTreeCode(ObjectCodePageViewSource, "2018");
        }
    }
});