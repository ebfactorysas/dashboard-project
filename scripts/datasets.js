function drawDataTrendChart(dataDataTrend) {
    dataDataTrend = dataDataTrend.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    })
    var marginDataTrend = {
        top: 15,
        right: 48,
        bottom: 15,
        left: 300
    };

    var widthDataTrend = 800 - marginDataTrend.left - marginDataTrend.right,
        heightDataTrend = 560 - marginDataTrend.top - marginDataTrend.bottom;


    var svgDataTrend = d3.select("#data-trend").append("svg")
        .attr("width", widthDataTrend + marginDataTrend.left + marginDataTrend.right)
        .attr("height", heightDataTrend + marginDataTrend.top + marginDataTrend.bottom)
        .append("g")
        .attr("transform", "translate(" + marginDataTrend.left + "," + marginDataTrend.top + ")");

    var xDataTrend = d3.scaleLinear()
        .range([0, widthDataTrend])
        .domain([0, d3.max(dataDataTrend, function (d) {
            return d.value;
        })]);

    var yDataTrend = d3.scaleBand()
        .rangeRound([heightDataTrend, 0], .1)
        .domain(dataDataTrend.map(function (d) {
            return d.name;
        }));

    var yAxisDataTrend = d3.axisLeft(yDataTrend)
        //no tick marks
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
        .attr("height", yDataTrend.bandwidth() - 2)
        .attr("x", 8)
        .attr("width", function (d) {
            return xDataTrend(d.value);
        });

    barsDataTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yDataTrend(d.name) + yDataTrend.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return xDataTrend(d.value)+10;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "13px")
        .text(function (d) {
            var value =setSettingsNumber(d.value)
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

function wrapData(text) {
    text.each(function () {
        var text = d3.select(this);
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

function drawTreeDataset(dataTree, filtertype) {
    //var colours = interpolateColors("rgb(217, 30, 24)", "rgb(94, 79, 162)", dataTree.length);

    if ($("#dataSet2018").prop("checked")) {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.value2018, b.value2018);
        });
    } else {
        dataTree = dataTree.sort(function (a, b) {
            return d3.descending(a.valueAllTheTime, b.valueAllTheTime);
        });
    }

    coloursDataSet = chroma.scale(['#424488', '#ffffff'])
        .mode('lch').colors(dataTree.length)

    dataTree.forEach(function (element, i) {
        element.color = coloursDataSet[i]
    });

    new d3plus.Treemap()
        .select("#downloads-dataset")
        .width(935)
        .height(200)
        .layoutPadding([0])
        .data(dataTree)
        .groupBy(["value" + filtertype, "name"])
        .sum("value" + filtertype)
        .shapeConfig({
            fill: function (d) {
                return d.color;
            }
        })
        .legend(false)
        .detectVisible(false)
        .render();

}

function createChartTimeLineDataSet(data) {

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
                return value.valueNumber + value.suffixNumber;
            }));
}
var dataGaugeDatasets = {
    "code": {
        "total": getPercentageTotal(datasetsAllTotalGlobal),
        "allocated": datasetsAllTotalGlobal
    },
    "pageview": {
        "total": getPercentageTotal(datasetsAllDownloads),
        "allocated": datasetsAllDownloads
    },
    "lac": {
        "total": 100,
        "allocated": datasetsAllDownloadsLac
    }
}
var dataGaugeDatasets2018 = {
    "code": {
        "total": getPercentageTotal(datasets2018TotalGlobal),
        "allocated": datasets2018TotalGlobal
    },
    "pageview": {
        "total": getPercentageTotal(datasets2018Downloads),
        "allocated": datasets2018Downloads
    },
    "lac": {
        "total": 100,
        "allocated": datasets2018DownloadsLac
    }
}
drawGaugeDatasetChart(dataGaugeDatasets)

function drawGaugeDatasetChart(dataGauge) {
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

    var svg = d3.selectAll("#gauge-datasets").append("svg")
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

    var svg2 = d3.selectAll("#gauge-download-d").append("svg")
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

    var svg3 = d3.selectAll("#gauge-lac-d").append("svg")
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

function drawPlotChartDataset(data) {
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

    var svg = d3.select('#dataset-publications-plot')
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
        .attr('cx', function (d) {
            return xScale(d.daysPublished);
        })
        .attr('cy', function (d) {
            return yScale(d.downloadsByDepartment);
        })
        .attr('r', function (d) {
            return radius(20);
        })
        .style('fill', function (d) {

            if (d.departmentCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return "#8889b3"
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
}

//click radiobutton drawChart(id del click)
$("input[name*='dataSetTrend']").click(function () {
    removeDataSetSvg();
    var ObjectTimeLineDataSet = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
    var ObjectDataSetPlot = $.extend(true, [], datasetsScatterplotArrays);

    // d3.select("#timeline-dataset svg").remove();
    d3.select("#data-trend svg").remove();
    // d3.select("#dataset-publications-plot svg").remove();
    d3.select("#downloads-dataset svg").remove();
    d3.select("#gauge-datasets svg").remove();
    d3.select("#gauge-download-d svg").remove();
    d3.select("#gauge-lac-d svg").remove();

    if (this.id == "dataSetAllTime") {
        createChartTimeLineDataSet(ObjectTimeLineDataSet);
        drawDataTrendChart(datasetsTopArrays.topIDBAllTime);
        drawPlotChartDataset(ObjectDataSetPlot);
        drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "AllTheTime");
        drawGaugeDatasetChart(dataGaugeDatasets);
    } else {
        createChartTimeLineDataSet(ObjectTimeLineDataSet);
        drawDataTrendChart(datasetsTopArrays.topIDB2018);
        drawPlotChartDataset(ObjectDataSetPlot);
        drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");
        drawGaugeDatasetChart(dataGaugeDatasets2018);
    }
});


/************************************************************** 
 * Nueva lógica
*/


function initDataSet(){
    removeDataSetSvg();

    //init
    var ObjectTimeLineDataSet = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
    var ObjectDataSetPlot = $.extend(true, [], datasetsScatterplotArrays);

    drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");
    createChartTimeLineDataSet(ObjectTimeLineDataSet);
    drawDataTrendChart(datasetsTopArrays.topIDB2018);
    drawPlotChartDataset(ObjectDataSetPlot);
}

function removeDataSetSvg(){
        d3.select("#timeline-dataset svg").remove();
        d3.select("#data-trend svg").remove();
        d3.select("#dataset-publications-plot svg").remove();
        d3.select("#downloads-dataset svg").remove();
        // d3.select("#gauge-datasets svg").remove();
        // d3.select("#gauge-download-d svg").remove();
        // d3.select("#gauge-lac-d svg").remove();
}