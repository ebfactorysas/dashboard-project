function removeGauges(id) {
    id.forEach(function (element) {
        d3.select(element + " svg").remove();
    });
}

function drawGauge(value, percentage, displayPercentage, id, code, tooltipText) {
    var configuration = {
        width: 150,
        height: 150,
        progress: 0,
        twoPi: 2 * Math.PI
    }

    var arc = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);

    var svg = d3.selectAll(id).append("svg")
        .attr("width", configuration.width)
        .attr("height", configuration.height)
        .append("g")
        .attr("transform", "translate(" + configuration.width / 2 + "," + configuration.height / 2 + ")");

    var meter = svg.append("g")
        .attr("class", "funds-allocated-meter");

    meter.append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(configuration.twoPi));

    var foreground = meter.append("path")
        .attr("class", "foreground");
        var textInsideGaugeCourses=0
    if(displayPercentage==="%"){
        textInsideGaugeCourses= setSettingsNumber(percentage);
    }else{
        textInsideGaugeCourses= setSettingsNumber(value);
    }
    
    var percentComplete = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0.3em")
        .text(textInsideGaugeCourses.valueNumber + textInsideGaugeCourses.suffixNumber + displayPercentage);

    var i = d3.interpolate(configuration.progress, percentage / 100);
    foreground.attr("d", arc.endAngle(configuration.twoPi * i(1)));
    gaugeTooltip(id, value, percentage, code, displayPercentage, tooltipText);
}

function gaugeTooltip(id, value, percentage, code, displayPercentage, tooltipText) {
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "toolTip")
        .style("position", "absolute")
        .style("padding", "5px")
        .style("background-color", "white")
        .style("z-index", "100")
        .attr("width", "1000")
        .style("width", "1000")
        .style("font-size", "12px")
        .style("font-family", "Gotham-Book");


    var root = d3Old.select(id + " svg");
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


    d3Old.selectAll(id + " svg")
        .on("mousemove", function () {
            var textInnerHtml = "<div class='col tooltip-gauges'><h3 class='row'>Total from {{id}} </h3> <div class='row  pb-1'><span class='col pl-0 pr-0'>{{tooltipText}}</span><span class='col text-right' >{{value}}</div><div class='row pt-1 border-top'> <span class='col pl-0 pr-0'> % of All IDB {{tooltipText}}</span><span  class='col-3 text-right'>{{percentage}}%</span></div>";
            if (displayPercentage == "%") {
                textInnerHtml = "<div class='col tooltip-gauges'><h3 class='row'>Total from LAC </h3> <div class='row  pb-1'><span class='col pl-0 pr-0'>{{tooltipText}}</span><span class='col text-right' >{{value}}</div><div class='row pt-1 border-top'> <span class='col pl-0 pr-0'> % of All IDB {{tooltipText}}</span><span  class='col-3 text-right'>{{percentage}}%</span></div>";
            } else {
                textInnerHtml = textInnerHtml.replace("{{id}}", code);
            }

            textInnerHtml = textInnerHtml.replace("{{value}}", value.toLocaleString());
            textInnerHtml = textInnerHtml.replace("{{percentage}}", percentage);
            textInnerHtml = textInnerHtml.replace(/{{tooltipText}}/g, tooltipText);

            var m = d3Old.mouse(root.node());
            scr.x = d3Old.event.pageX;
            scr.y = d3Old.event.pageY;
            m[0] += svgpos.x;
            m[1] += svgpos.y;
            tooltip.style("right", "");
            tooltip.style("left", "");
            tooltip.style("bottom", "");
            tooltip.style("top", "");
            tooltip.style("left", scr.x + 5 + "px");
            tooltip.style("top", scr.y + 5 + "px");
            tooltip.html(textInnerHtml)
                .style("display", "inline-block");

        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(0)
                .style("display", "none");
        });
}