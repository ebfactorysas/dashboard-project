function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.date - b.date;
}

function createChartTimelinePublication(data, typeload) {
    d3.select("#timeline-publication svg").remove();

    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 600 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;
    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var positionText = 0;
    var area = d3.area()
        .x(function (d) {
            return x(d.date);
        })
        .y0(height)
        .y1(function (d) {
            positionText = y(d.close);
            return y(d.close);
        });

    var valueline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.close);
        });

    var svg = d3.select("#timeline-publication")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-60 -28 610 250")
        .append("g")
        .classed("svg-content-responsive", true);

    data.forEach(function (d) {
        d.dateAux = d.date;
        d.date = parseTime(d.date);

    });

    data = data.sort(sortByDateAscending);
    var totalAmount = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].close = +data[i].close;
        totalAmount += data[i].close;
        if (i > 0) {
            data[i]['CumulativeAmount'] = data[i].close + data[i - 1].close;
        } else {
            data[i]['CumulativeAmount'] = data[i].close;
        }
    }

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

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.close;
    })]);

    svg.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area);

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
        .style("font-size", "16px")
        .style("font-family", "Gotham-Bold")
        .text(textOfTotal.valueNumber + textOfTotal.suffixNumber);
    svg.append("text")
        .attr("x", (width - (margin.left / 2)))
        .attr("y", positionText + 20)
        .style("font-size", "14px")
        .style("font-family", "Gotham-Book")
        .text("TOTAL");

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
    focus.append("rect")
        .attr("x", -100)
        .attr("y", -18)
        .attr("class", "tooltip-bg")
        .attr("width", 150)
        .attr("height", 50)
        .attr("fill", "#fff")

    var textFocus = focus.append("text")
        .attr("x", -100)
        .attr("dy", ".35em")
        .style("font-size", 15)
        .style("font-family", "Gotham-Book");

    textFocus.append("tspan")
        .attr("x", -100)
        .attr("dy", ".35em")
        .attr("class", "value")
        .style("font-size", 16)
        .style("font-family", "Gotham-Book")
        .attr("fill", "#d1415a");

    textFocus.append("tspan")
        .attr("x", -100)
        .attr("y", 17)
        .attr("dy", ".35em")
        .attr("class", "date")
        .style("font-size", 14)
        .style("font-family", "Gotham-Book");

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function () {
            focus.style("display", null);
        })
        .on("mouseout", function () {
            focus.style("display", "none");
        })
        .on("mousemove", mousemove);
    var bisectDate = d3.bisector(function (d) {
        return d.date;
    }).left;

    function mousemove() {

        var x0 = x.invert(d3.mouse(this)[0]),

            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        if (x(d.date) < 300) {
            focus.select("rect").attr("x", -10)
            focus.selectAll("text").attr("x", -5)
            focus.selectAll("tspan").attr("x", -5)
        } else {
            focus.select("rect").attr("x", -140)
            focus.selectAll("text").attr("x", -135)
            focus.selectAll("tspan").attr("x", -135)
        }

        var depl = parseFloat(d.close);

        focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");

        focus.select(".value").text(moment(d.date).format("MMM-YY"));
        focus.select(".date").text(d.close.toLocaleString() + " downloads");
    }

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
    drawGauge(dataGauge.publications, dataGauge.percentagePublications, "", "#gauge-publications", dataGauge.divisionCode, "Publications");
    drawGauge(dataGauge.downloads, dataGauge.percentageDownloads, "", "#gauge-download-p", dataGauge.divisionCode, "Downloads");
    drawGauge(dataGauge.LAC, dataGauge.percentageLAC.toFixed(1), "%", "#gauge-lac-p", dataGauge.divisionCode, "Publications");
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
    var maxValue = 0
    for (let i = 0; i < data.length; i++) {
        data[i].FullCode = data[i].Code + " " + data[i].departmentCode.toUpperCase();
        data[i].divisionDepartment = data[i].departmentCode + "/" + data[i].divisionCode;
        if (data[i].Downloads >= maxValue) {
            maxValue = data[i].Downloads;
        }
        if (valueOfFilter == data[i].divisionCode) {
            arrayElements.push($.extend(true, {}, data[i]))
        } else {
            arrayAux.push($.extend(true, {}, data[i]))
        }
    }
    var newData = arrayAux.concat(arrayElements);

    var visualization = d3plusOld.viz()
        .container("#publications-plot")
        .data(newData)
        .type("scatter")
        .id({
            grouping: false,
            value: ["FullCode"]
        })
        .background("transparent")
        .font({
            family: "Gotham-Book"
        })
        .axes({
            background: {
                color: "transparent",
                stroke: {
                    width: 0
                }
            },
            ticks: false
        })
        .size(10)
        .legend(false)
        .color(function (d) {
            if (d.divisionCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return "#d65a70"
        })
        .tooltip({
            large: 600,
            small: 650,
            anchor: "top left",
            value: ["divisionDepartment", "publishedDate", "Downloads", "daysPublished", "pageviews"]
        })
        .x({
            value: "Downloads",
            axis: true,
            ticks: {
                size: 0,
                width: 2,
                value: [0, 200, 400, 600, 800, 1000]
            },
            grid: false,
            mouse: {
                dasharray: "4"
            }
        })
        .text("Code")
        .y({
            value: "daysPublished",
            axis: true,
            ticks: {
                size: 0,
                width: 2,
                value: [0, 50, 100, 150, 200]
            },
            grid: false,
            mouse: {
                dasharray: "4"
            }
        })
        .format({
            "text": function (text, params) {
                //i made this cuz' this cant change anywhere
                $("#d3plus_graph_xgrid line").css("stroke-dasharray", "4");
                $("#d3plus_graph_ygrid line").css("stroke-dasharray", "4");
                if (text === "daysPublished") {
                    return "Published Days";
                } else if (text === "pageviews") {
                    return "Downloads per Day"
                } else if (text === "divisionDepartment") {
                    return "Department/Division"
                } else if (text === "publishedDate") {
                    return "Published Date"
                } else {
                    return text;
                }
            }
        })
        .draw()

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