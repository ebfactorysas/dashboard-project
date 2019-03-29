function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.date - b.date;
}

function createChartTimelinePublication(data, typeload) {
    d3.select("#timeline-publication svg").remove();
    createTimelineChart(data, "#timeline-publication", "#d1415a", "#publication2018",600)

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
    drawTrendChartRectBar(dataPublicationTrend,"#publication-trend","#dea6b0","red","Downloads");
    
}

function drawGaugePublicationChart(dataGauge) {

    removeGauges(["#gauge-publications", "#gauge-download-p", "#gauge-lac-p"]);

    if (dataGauge == undefined) {
        dataGauge = setEmptyGaugesPublication();
    }

    var code = $('#idbLink')[0].text;

    drawGauge(dataGauge.publications, dataGauge.percentagePublications.toFixed(1), "", "#gauge-publications", code, "Publications", "#D1415A");
    drawGauge(dataGauge.downloads, dataGauge.percentageDownloads.toFixed(1), "", "#gauge-download-p", code, "Downloads", "#D1415A");
    drawGauge(dataGauge.LAC, dataGauge.percentageLAC.toFixed(1), "%", "#gauge-lac-p", code, "Downloads", "#D1415A");
}

function createLineChart(elements) {

    var parseTime = d3.timeParse("%m/%d/%Y");
    var allSumOfValues = 0;
    elements.trend.forEach(function (item) {
        item.id = elements.name;
        item.dateAux = item.date;
        item.date = parseTime(item.date);
        allSumOfValues += item.value;
    });
    if(allSumOfValues==0){
        elements.trend.forEach(function (item) {
            item.value = 0.001;
        });
        
    }
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
            },
            "number": function(number,params){
                var formatted = d3plusOld.number.format(number, params);
                if(formatted==0.001){
                    return 0;
                }
                return formatted; 
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
            return d3.ascending(a.rank, b.rank);
        });
        data.forEach(function (element) {
            createLineChart($.extend(true, [], element));
        });
    }

}

function drawPlotChartPublication(data, typeload) {
    d3.select("#publications-plot div").remove();
    xValue = [0, 200, 400, 600, 800, 1000];
    yValue = [0, 50, 100, 150, 200];
    createPlotChart(data, "#publications-plot", "#d65a70", "Downloads", "daysPublished", xValue, yValue, "");

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
        "percentageLAC": 0,
        "LAC": 0
    }
}

function initPublications() {
    dataPublicationGauge2018 = $.extend(true, {}, publicationsIndicators.indicatorsIDB2018[0]);
    var downloadTimelineIDB = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineIDB);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);

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
        if ($("select[id*='divisionSelect']").val() != "department") {
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
        } else {
            sltValue= $('#idbLink')[0].text;
            if (this.id == "publicationAllTime") {
                // gauges
                dataPublicationGauge = $.extend(true, [], publicationsIndicators.indicatorsDepartmentsAllTheTime)
                dataPublicationGauge = dataPublicationGauge.filter(function (dataP) {
                    return dataP.departmentCode == sltValue
                });
                drawGaugePublicationChart(dataPublicationGauge[0]);

                

                //data-trend
                var jsonPublicationsBarras = publicationsTopArrays.topDepartmentsAllTime.filter(function (dataP) {
                    return dataP.department_code == sltValue
                });
                drawTrendPublicationChart(jsonPublicationsBarras, '2018', '');
                drawLinesChartPublication(jsonPublicationsBarras, '2018', '');

                //tree
                jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDepartments.filter(function (dataT) {
                    return dataT.department_codes == sltValue
                });

                drawTreePublication(jsonPublicTree, "AllTheTime", '');

            } else {
                // gauges
                dataPublicationGauge2018 = $.extend(true, [], publicationsIndicators.indicatorsDepartments2018)
                dataPublicationGauge2018 = dataPublicationGauge2018.filter(function (dataP) {
                    return dataP.departmentCode == sltValue
                });
                drawGaugePublicationChart(dataPublicationGauge2018[0]);

                //data-trend
                var jsonPublicationsBarras = publicationsTopArrays.topDepartments2018.filter(function (dataP) {
                    return dataP.department_code == sltValue
                });
                drawTrendPublicationChart(jsonPublicationsBarras, '2018', '');
                drawLinesChartPublication(jsonPublicationsBarras, '2018', '');

                //tree
                jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDepartments.filter(function (dataT) {
                    return dataT.department_codes == sltValue
                });

                drawTreePublication(jsonPublicTree, "2018", 'init');
            }
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