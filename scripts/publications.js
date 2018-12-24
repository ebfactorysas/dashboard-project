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



function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.date - b.date;
}

function createChartTimelinePublication(data, typeload) {
    d3.select("#timeline-publication div").remove();
 
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 580 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;
    
    var positions = {};
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

    var svg = d3.select("#timeline-publication")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-60 -28 600 300")
        .append("g")
        .classed("svg-content-responsive", true);

    // format the data
    data.forEach(function (d) {
        d.dateAux = d.date;
        d.date = parseTime(d.date);

    });

    data = data.sort(sortByDateAscending);
    var totalAmount =0;
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

    var testarea = d3Old.selectAll("#timeline-publication path")
    .on("mousemove",function(d){
        
    });
    
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

        var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
        focus.append("rect")
        .attr("x", -28)
        .attr("y", -18)
        .attr("class", "tooltip-bg")
        .attr("width", 80)
        .attr("height", 40)
        .attr("fill","#fff")
    
    var textFocus = focus.append("text")
        .attr("x", -20)
        .attr("dy", ".35em")
        .style("font-size",15)
        .style("font-family","Gotham-Book");

        textFocus.append("tspan")
        .attr("x", -20)
        .attr("dy", ".35em")
        .attr("class","value")
        .style("font-size",15)
        .style("font-family","Gotham-Book");

        textFocus.append("tspan")
        .attr("x", -20)
        .attr("y", 15)
        .attr("dy", ".35em")
        .attr("class","date")
        .style("font-size",15)
        .style("font-family","Gotham-Book");
        
        
    

svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() {
            focus.style("display", null);
            // focus2.style("display", null);
            // focus3.style("display", null);
            // focus4.style("display", null);
        })
        .on("mouseout", function() {
            focus.style("display", "none");
            // focus2.style("display", "none");
            // focus3.style("display", "none");
            // focus4.style("display", "none");
        })
        .on("mousemove", mousemove);
        var bisectDate = d3.bisector(function(d) {
            return d.date;
        }).left;

    function mousemove() {
        
        var x0 = x.invert(d3.mouse(this)[0]),
        
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d= x0 - d0.date > d1.date - x0 ? d1 : d0;
        
          var depl=parseFloat(d.close);
          
          focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close)+ ")"); 
          
        
          focus.select(".value").text(d.close);
          focus.select(".date").text(d.dateAux);
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
    var numbType = d3.format('.0%');
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
            value: "value" + filtertype
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
            return d[current_id] + "\n" + (d.d3plusOld.share*100).toFixed(1)+"%";
        })

    visualization.draw()
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

        .rangeRound([40*dataPublicationTrend.length, 0], .1)
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
        .attr("height",35)
        .attr("x", 16)
        .attr("width", function (d) {
            return xPublicationTrend(d.value);
        });

    barsPublicationTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yPublicationTrend(d.value) +40 / 2 + 2;
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
    var div = d3.select("body").append("div")
        .attr("class", "toolTip");
    var tooltipText = d3Old.selectAll("#publication-trend .text-inside")
        .on("mouseover", function (d) {
            div.transition()
                .duration(0)
                .style("display", "inline-block");
            div.html(d.value + "<br/>" + d.name)
                .style("left", (d3Old.event.pageX) + "px")
                .style("top", (d3Old.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("display", "none");
        });

    var tooltipBar = d3Old.selectAll("#publication-trend .bar")
        .on("mouseover", function (d) {
            div.transition()
                .duration(0)
                .style("display", "inline-block");
            div.html(d.value + "<br/>" + d.name)
                .style("left", (d3Old.event.pageX) + "px")
                .style("top", (d3Old.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("display", "none");
        });

    var tooltipAxis = d3Old.selectAll("#publication-trend .tick")
        .on("mouseover", function (d) {
            div.transition()
                .duration(0)
                .style("display", "inline-block");
            div.html(d)
                .style("left", (d3Old.event.pageX) + "px")
                .style("top", (d3Old.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("display", "none");
        });
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
        .text(setSettingsNumber(dataGauge.publication.allocated).valueNumber + setSettingsNumber(dataGauge.publication.allocated).suffixNumber);
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")        
        .style("padding", "5px")
        .style("background-color", "white")
        .style("z-index", "100")
        .style("visibility", "hidden")

    var root = d3Old.select("#gauge-publications svg");

    var scr = {
        x: window.scrollX,
        y: window.scrollY,
        w: window.innerWidth,
        h: window.innerHeight
    };
    var body_sel = d3Old.select('body');
    var body = {
        w: body_sel.node().offsetWidth,
        h: body_sel.node().offsetHeight
    };
    var doc = {
        w: document.width,
        h: document.height
    };
    var svgpos = getNodePos(root.node());

    var dist = {
        x: 5,
        y: 5
    };
    var element1 = d3Old.selectAll("#gauge-publications svg")
        .on("mousemove", function () {
            var m = d3Old.mouse(root.node());
            scr.x = window.scrollX;
            scr.y = window.scrollY;
            m[0] += svgpos.x;
            m[1] += svgpos.y;
            tooltip.style("right", "");
            tooltip.style("left", "");
            tooltip.style("bottom", "");
            tooltip.style("top", "");
            
            if (m[0] > scr.x + scr.w / 2) {
                tooltip.style("right", (body.w - m[0] + dist.x) + "px");
            } else {
                tooltip.style("left", (m[0] + dist.x) + "px");
            }

            if (m[1] > scr.y + scr.h / 2) {
                tooltip.style("bottom", (body.h - m[1] + dist.y) + "px");
            } else {
                tooltip.style("top", (m[1] + dist.y) + "px");
            }
            tooltip.style("visibility", "visible");
            tooltip.text(dataGauge.publication.allocated);
        })
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
        });

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
    var root2 = d3Old.select("#gauge-download-p svg");
    var svgpos2 = getNodePos(root2.node());
    var element2 = d3Old.selectAll("#gauge-download-p svg")
        .on("mousemove", function () {
            var m = d3Old.mouse(root2.node());
            scr.x = window.scrollX;
            scr.y = window.scrollY;
            m[0] += svgpos2.x;
            m[1] += svgpos2.y;
            tooltip.style("right", "");
            tooltip.style("left", "");
            tooltip.style("bottom", "");
            tooltip.style("top", "");
            
            if (m[0] > scr.x + scr.w / 2) {
                tooltip.style("right", (body.w - m[0] + dist.x) + "px");
            } else {
                tooltip.style("left", (m[0] + dist.x) + "px");
            }

            if (m[1] > scr.y + scr.h / 2) {
                tooltip.style("bottom", (body.h - m[1] + dist.y) + "px");
            } else {
                tooltip.style("top", (m[1] + dist.y) + "px");
            }
            tooltip.style("visibility", "visible");
            tooltip.text(dataGauge.download.allocated);
        })
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
        });


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

function createLineChart(elements){
    
    var parseTime = d3.timeParse("%m/%d/%Y");
    
    elements.trend.forEach(function(item) {
        item.id=elements.name;
        item.dateAux = item.date;
        item.date = parseTime(item.date);
    });
    var data = elements.trend;
    var attributes = [
        {"id": elements.name, "hex": "#e39aa7"}
      ]
    var visualization = d3plusOld.viz()
    .container("#lines-publications  ")  // container DIV to hold the visualization
    .data(elements.trend)  // data to use with the visualization
    .type("line")       // visualization type
    .id({grouping:false,value:"id"})         // key for which our data is unique on
    .background("transparent")
    .text("id")       // key to use for display text
    
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
            value: ["dateAux"]
        })
    .y({value:"value",grid:false,axis: false,mouse:false})         // key to use for y-axis
    .x({value:"date",grid:false,axis: false,mouse:false})    
    .attrs(attributes)
    .color("hex")
    .format({
            "text": function (text, params) {
                if(text == "dateAux"){
                    return "Date"
                }
                
                if(text == "value"){
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
        .width({value:170,small:50})
        .height({value:80,small:30})
    .draw()             // finally, draw the visualization!
    
}

function drawLinesChartPublication(data) {
       
    d3.selectAll("#lines-publications div").remove();

    var parseTime = d3.timeParse("%m/%d/%Y");


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

    // var svg = d3.select("#lines-publications").append("svg")
    //     .attr("preserveAspectRatio", "xMinYMin meet")
    //     .attr("viewBox", "-1 -10 105 400")
    //     .append("g")
    //     .classed("svg-content-responsive", true);
    // svg.append("rect")
    //     .attr("width", "100%")
    //     .attr("height", "100%")
    //     .attr("fill", "transparent")
    if(data.length>0){
        data = data.sort(function (a, b) {
            return d3.descending(a.value, b.value);
        });
        data.forEach(function(element) {
            createLineChart($.extend(true, [], element));    
        }); 
    }
    
        
        

    
    //     data = $.extend(true, [], dataLinesPublications);
    // var x = d3.scaleTime().range([0, width]),
    //     x2 = d3.scaleTime().range([0, width]),
    //     y = d3.scaleLinear().range([height, 0]),
    //     y2 = d3.scaleLinear().range([height2, 0]),
    //     z = d3.scaleOrdinal(d3.schemeCategory10);

    // var xAxis = d3.axisBottom(x),
    //     xAxis2 = d3.axisBottom(x2),
    //     yAxis = d3.axisLeft(y);

    // var brush = d3.brushX()
    //     .extent([
    //         [0, 0],
    //         [width, height2]
    //     ])
    //     .on("brush end", brushed);


    // var line = d3.line()
    //     .x(function (d) {
    //         return x(new Date(d.date));
    //     })
    //     .y(function (d) {
    //         return y(d.hours);
    //     });

    // var line2 = d3.line()
    //     .x(function (d) {
    //         return x2(new Date(d.date));
    //     })
    //     .y(function (d) {
    //         return y2(d.hours);
    //     })

    // var clip = svg.append("defs").append("svg:clipPath")
    //     .attr("id", "clip")
    //     .append("svg:rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .attr("x", 0)
    //     .attr("y", 0);


    // var focus = svg.append("g")
    //     .attr("class", "focus")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // function getRandomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }



    // var colors = [];
    // for (var i = 0; i < 50; i++) {
    //     var xx = "#e4e4e4";
    //     colors.push(xx);
    //     colors.push(xx);
    // }




    // // gridlines in y axis function
    // function make_y_gridlines() {
    //     return d3.axisLeft(y)
    //         .ticks()
    // }

    // z.domain(d3.keys(data[0]).filter(function (key) {
    //     return key !== "date";
    // }));

    // data.forEach(function (d) {
    //     d.date = parseTime(d.date);
    // });

    // var employees = z.domain().map(function (id) {
    //     return {
    //         id: id,
    //         values: data.map(function (d) {
    //             return {
    //                 date: d.date,
    //                 hours: +d[id]
    //             };
    //         })
    //     };
    // });


    // var o1 = 0;
    // var o2 = 0;

    // x.domain(d3.extent(data, function (d) {
    //     return d.date;
    // }));

    // y.domain([
    //     0,
    //     d3.max(employees, function (c) {
    //         return d3.max(c.values, function (d) {
    //             return d.hours;
    //         });
    //     })
    // ]);
    // x2.domain(x.domain());
    // y2.domain(y.domain());
    // z.domain(employees.map(function (c) {
    //     return c.id;
    // }));



    // var focuslineGroups = focus.selectAll("g")
    //     .data(employees)
    //     .enter().append("g");

    // var focuslines = focuslineGroups.append("path")
    //     .attr("class", "line")
    //     .attr("d", function (d) {
    //         return line(d.values);
    //     })
    //     .style("stroke", function (d) {
    //         return "#e39aa7"
    //     })
    //     .attr("clip-path", "url(#clip)");

    // /* will be evaluated 
    //     var line = svg.append("line")
    //     .attr("x1", 30)
    //     .attr("x2", 30)
    //     .attr("y1", 0)
    //     .attr("y2", height)
    //     .attr("stroke-width", 1)
    //     .attr("stroke", "#c3c3c3")
    //     .attr("stroke-dasharray", "2,2")

    // var line2 = svg.append("line")
    //     .attr("x1", 80)
    //     .attr("x2", 80)
    //     .attr("y1", 0)
    //     .attr("y2", height)
    //     .attr("stroke-width", 1)
    //     .attr("stroke", "#c3c3c3")
    //     .attr("stroke-dasharray", "2,2")*/

    // function brushed() {
    //     var extent = d3.event.selection;
    //     var s = extent.map(x2.invert, x2);
    //     x.domain(s);
    //     focuslines.attr("d", function (d) {
    //         return line(d.values)
    //     });
    //     focus.select(".axis--x").call(xAxis);
    //     focus.select(".axis--y").call(yAxis);
    // }
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

        if (data[i].Downloads >= maxValue) {
            maxValue = data[i].Downloads;
        }
        if (valueOfFilter == data[i].departmentCode) {
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
            if (d.departmentCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return "#d65a70"
        })
        .tooltip({
            large: 400,
            small: 500,
            anchor: "top left",
            value: ["Downloads", "daysPublished", "pageviews", "publishedDate"]
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
                    return "Pageviews"
                } else if (text === "publishedDate") {
                    return "Published Date"
                } else {
                    return d3plusOld.string.title(text, params);
                }
            }
        })
        .draw()

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
            // $.each(internalJson, function (y, val) {
            // jsonLines += '"2018_downloads_' + y + '":"' + value['2018_downloads'] + '",';
            resultsDate = value.dates.filter(function (d, y) {
                return d.date == dataDate.date
            });
            
            jsonLines += '"' + y + '":' + (parseFloat(resultsDate[0].value) + (1000 * (y + 1))) + ',';

            // jsonDates = jsonDates.filter(function (datajson){
            //     return datajson.date == y
            // });

            
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
                // $('.label-filter-restidb').hide();
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
            // $('.label-filter-restidb').hide();
            dataPublicationGauge = setPublicationGauge('IDB');
            drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "AllTheTime");
            // createChartTimelinePublication(downloadTimelineIDBTEST);
            drawTrendPublicationChart(publicationsTopArrays.topIDBAllTime);
            drawLinesChartPublication(publicationsTopArrays.topIDBAllTime);
            // drawPlotChartPublication(ObjectpublicationsAttention);
            drawGaugePublicationChart(dataPublicationGauge);
        } else {
            dataPublicationGauge2018 = setPublicationGauge2018('IDB');
            // $('.label-filter-restidb').show();
            drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "2018");
            // createChartTimelinePublication(downloadTimelineIDBTEST);
            drawTrendPublicationChart(publicationsTopArrays.topIDB2018);
            drawLinesChartPublication(publicationsTopArrays.topIDB2018);
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