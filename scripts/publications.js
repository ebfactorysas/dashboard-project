function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.date - b.date;
}

function createChartTimelinePublication(data, typeload) {
    d3.select("#timeline-publication svg").remove();
    createTimelineChart(data,"#timeline-publication","#d1415a","#publication2018")

}

function drawTreePublication(dataTree, filtertype, typeload) {
    d3.select("#downloads-publications div").remove();
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


    drawTreeChart(dataTree, filtertype, "#downloads-publications", '#d1415a', text);

}

function drawTrendPublicationChart(dataPublicationTrend) {
    d3.select("#publication-trend svg").remove();
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

        .rangeRound([40 * dataPublicationTrend.length, 0], .1)
        .domain(dataPublicationTrend.map(function (d) {
            return d.value;
        }));

    var yAxisPublicationTrend = d3.axisLeft(yPublicationTrend)
        .tickFormat(function (x) {
            var value = setSettingsNumber(x.toFixed(0));
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
        .attr("height", 35)
        .attr("x", 16)
        .attr("width", function (d) {
            return xPublicationTrend(d.value);
        });

    barsPublicationTrend.append("text")
        .attr("class", "label")
        .attr("y", function (d) {
            return yPublicationTrend(d.value) + 40 / 2 + 2;
        })
        .attr("x", function (d) {
            return 25;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "14px")
        .text(function (d) {
            if (d.name.length > 90) {
                return d.name.slice(0, 90) + "...";
            }
            return d.name;
        });
    var div = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("font-size", "12px")
        .style("width", "450px");
    var tooltipText = d3Old.selectAll("#publication-trend .text-inside")
        .on("mouseover", function (d) {
            var textHtml = "<div class='col tooltip-gauges'><h3 class='row'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Downloads</span><span class='col text-right' >{{value}}</div>";
            textHtml = textHtml.replace('{{title}}', d.name)
            textHtml = textHtml.replace('{{value}}', d.value.toLocaleString())
            if (d.division_codes) {
                var addText = "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Division")
                addText = addText.replace('{{code}}', d.division_codes)
                textHtml = textHtml + addText;
            } else if (d.department_codes) {
                var addText = "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Department")
                addText = addText.replace('{{code}}', d.department_codes);
                textHtml = textHtml + addText;
            }
            textHtml = textHtml + "</div>";
            div.transition()
                .duration(0)
                .style("display", "inline-block")
                .style("font-family", "Gotham-Book");
            div.html(textHtml)
                .style("left", (d3Old.event.pageX) + 5 + "px")
                .style("top", (d3Old.event.pageY - 28) + 5 + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("display", "none");
        });

    var tooltipBar = d3Old.selectAll("#publication-trend .bar")
        .on("mouseover", function (d) {
            var textHtml = "<div class='col tooltip-gauges'><h3 class='row'>{{title}} </h3> <div class='row pb-1'><span class='col pl-0 pr-0'>Downloads</span><span class='col text-right' >{{value}}</div>";
            textHtml = textHtml.replace('{{title}}', d.name)
            textHtml = textHtml.replace('{{value}}', d.value.toLocaleString())
            if (d.division_codes) {
                var addText = "<div class='row pt-1 border-top'><span class='col pl-0 pr-0 '> {{type}}</span><span  class='col-3 text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Division")
                addText = addText.replace('{{code}}', d.division_codes)
                textHtml = textHtml + addText;
            } else if (d.department_codes) {
                var addText = "<div class='row pt-1 border-top'><span class='col-2 pl-0 pr-0 '> {{type}}</span><span  class='col text-right'>{{code}}</span></div>"
                addText = addText.replace('{{type}}', "Department")
                addText = addText.replace('{{code}}', d.department_codes);
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

function drawGaugePublicationChart(dataGauge) {

    removeGauges(["#gauge-publications", "#gauge-download-p", "#gauge-lac-p"]);

    if (dataGauge == undefined) {
        dataGauge = setEmptyGaugesPublication();
    }
    if (!dataGauge.divisionCode) {
        dataGauge.divisionCode = "IDB"
    }
    drawGauge(dataGauge.publications, dataGauge.percentagePublications, "", "#gauge-publications", dataGauge.divisionCode, "Publications","#D1415A");
    drawGauge(dataGauge.downloads, dataGauge.percentageDownloads, "", "#gauge-download-p", dataGauge.divisionCode, "Downloads","#D1415A");
    drawGauge(dataGauge.LAC, dataGauge.percentageLAC.toFixed(1), "%", "#gauge-lac-p", dataGauge.divisionCode, "Publications","#D1415A");
}

function createLineChart(elements) {

    var parseTime = d3.timeParse("%m/%d/%Y");

    elements.trend.forEach(function (item) {
        item.id = elements.name;
        item.dateAux = item.date;
        item.date = parseTime(item.date);
    });
    var data = elements.trend;
    var attributes = [{
        "id": elements.name,
        "hex": "#e39aa7"
    }]
    var visualization = d3plusOld.viz()
        .container("#lines-publications  ")
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
                d3.selectAll("#lines-publications #d3plus_graph_xticks").remove();
                d3.selectAll("#lines-publications #d3plus_graph_yticks").remove();
                d3.selectAll("#lines-publications #d3plus_graph_xlabel").remove();
                d3.selectAll("#lines-publications #d3plus_graph_ylabel").remove();
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

function drawLinesChartPublication(data) {

    d3.selectAll("#lines-publications div").remove();

    var parseTime = d3.timeParse("%m/%d/%Y");

    if (data.length > 0) {
        data = data.sort(function (a, b) {
            return d3.descending(a.value, b.value);
        });
        data.forEach(function (element) {
            createLineChart($.extend(true, [], element));
        });
    }

}

function drawPlotChartPublication(data, typeload) {
    d3.select("#publications-plot div").remove();    
    xValue=[0, 200, 400, 600, 800, 1000];
    yValue= [0, 50, 100, 150, 200];
    createPlotChart(data,"#publications-plot","#d65a70","Downloads","daysPublished",xValue,yValue,"");

}

function getNodePos(el) {
    var body = d3.select('body').node();

    for (var lx = 0, ly = 0; el != null && el != body; lx += (el.offsetLeft || el.clientLeft), ly += (el.offsetTop || el.clientTop), el = (el.offsetParent || el.parentNode))
    ;
    return {
        x: lx,
        y: ly
    };
}

function setEmptyGaugesPublication() {
    return {
        "publications": 0,
        "percentagePublications": 0,
        "downloads": 0,
        "percentageDownloads": 0,
        "percentageLAC": 0
    }
}

function initPublications() {
    dataPublicationGauge2018 = $.extend(true, {}, publicationsIndicators.indicatorsIDB2018[0]);
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

        if (validarFormatoFecha(val.date) == true) {
            jsonDates += '{"date":"' + val.date + '"},';
        }
    });
    jsonDates += "]}";
    jsonDates = eval(jsonDates);



    var jsonLines = "[";
    jsonDates.forEach(function (dataDate, i) {
        jsonLines += '{';
        jsonLines += '"date":"' + dataDate.date + '",';

        jsonDataLines.forEach(function (value, y, arr) {

            resultsDate = value.dates.filter(function (d, y) {
                return d.date == dataDate.date
            });

            jsonLines += '"' + y + '":' + (parseFloat(resultsDate[0].value) + (1000 * (y + 1))) + ',';

        });
        jsonLines += "},"
    });
    jsonLines += "]";

    jsonLines = eval(jsonLines);

    drawGaugePublicationChart(dataPublicationGauge2018);
    createChartTimelinePublication(downloadTimelineIDB, 'init');
    drawTrendPublicationChart(publicationsTopArrays.topIDB2018);
    drawLinesChartPublication(publicationsTopArrays.topIDB2018);
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
    if ($("select[id*='divisionSelect']").val() != "IDB") {
        if ($("select[id*='divisionSelect']").val().length > 0) {
            var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
            if (this.id == "publicationAllTime") {
                jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(function (data) {
                    return data.division_codes == $("select[id*='divisionSelect']").val()
                });
                jsonPublicationsBarras = publicationsTopArrays.topDivisionsAllTime.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                jsonTreePublications = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });

                var jsonGaugesPublications = $.extend(true, [], publicationsIndicators.indicatorsDivisionsAllTheTime)

                jsonGaugesPublications = jsonGaugesPublications.filter(function (dataP) {
                    return dataP.divisionCode == $("select[id*='divisionSelect']").val()
                });
                publicationsAllTotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_publications : '0';
                publicationsAllDownloads = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_downloads : '0';
                publicationsAllDownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0].all_the_time_porcent_total_LAC_downloads != "missing" && jsondataPublications[0].all_the_time_porcent_total_LAC_downloads > 0) ? (jsondataPublications[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) : jsondataPublications[0].all_the_time_porcent_total_LAC_downloads) : '';
                drawGaugePublicationChart(jsonGaugesPublications[0]);
                jsonTreePublications = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                drawTreePublication(jsonTreePublications, "AllTheTime");
                drawTrendPublicationChart(jsonPublicationsBarras);
                drawLinesChartPublication(jsonPublicationsBarras)
            } else {
                $('.label-filter-restidb').show();
                var jsonPublicationsBarras = $.extend(true, [], publicationsTopArrays.topDivisions2018);
                jsonPublicationsBarras = jsonPublicationsBarras.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                jsonTreePublications = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataP) {
                    return dataP.division_codes == $("select[id*='divisionSelect']").val()
                });
                var jsonGaugesPublications = $.extend(true, [], publicationsIndicators.indicatorsDivisions2018)

                jsonGaugesPublications = jsonGaugesPublications.filter(function (dataP) {
                    return dataP.divisionCode == $("select[id*='divisionSelect']").val()
                });
                // drawPlotChartPublication(ObjectpublicationsAttention);
                drawTrendPublicationChart(jsonPublicationsBarras);
                drawLinesChartPublication(jsonPublicationsBarras)
                drawTreePublication(jsonTreePublications, "2018");

                jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(function (data) {
                    return data.division_codes == $("select[id*='divisionSelect']").val()
                });
                publications2018TotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0]['2018_publications'] : '0';
                publications2018Downloads = (jsondataPublications.length > 0) ? jsondataPublications[0]['2018_downloads'] : '0';
                publications2018DownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0]['2018_porcent_total_LAC_downloads'] != "missing" && jsondataPublications[0]['2018_porcent_total_LAC_downloads'] > 0) ? (jsondataPublications[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) : jsondataPublications[0]['2018_porcent_total_LAC_downloads']) : '';
                drawGaugePublicationChart(jsonGaugesPublications[0]);
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
        if (this.id == "publicationAllTime") {
            drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "AllTheTime");
            drawTrendPublicationChart(publicationsTopArrays.topIDBAllTime);
            drawLinesChartPublication(publicationsTopArrays.topIDBAllTime);
            drawGaugePublicationChart($.extend(true, {}, publicationsIndicators.indicatorsIDBAllTheTime[0]));
        } else {
            drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "2018");
            drawTrendPublicationChart(publicationsTopArrays.topIDB2018);
            drawLinesChartPublication(publicationsTopArrays.topIDB2018);
            drawGaugePublicationChart($.extend(true, {}, publicationsIndicators.indicatorsIDB2018[0]));
        }
    }
});