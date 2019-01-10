function removeGauges(id) {
    id.forEach(function (element) {
        d3.select(element + " svg").remove();
    });
}
var arc = d3.arc()
        .startAngle(0)
        .innerRadius(70)
        .outerRadius(64);
function drawGauge(value, percentage, displayPercentage, id, code, tooltipText,color) {
    var configuration = {
        width: 150,
        height: 150,
        progress: 0,
        twoPi: 2 * Math.PI
    }

    

    var svg = d3.selectAll(id).append("svg")
        .attr("width", configuration.width)
        .attr("height", configuration.height)
        .append("g")
        .attr("transform", "translate(" + configuration.width / 2 + "," + configuration.height / 2 + ")");

    var meter = svg.append("g")
        .attr("class", "funds-allocated-meter");

    meter.append("path")
        .datum({
            endAngle: configuration.twoPi
        })
        .attr("class", "background")
        .attr("d", arc);

    var foreground = meter.append("path")
        .datum({
            endAngle: 0 * configuration.twoPi
        })
        .attr("class", "foreground");

    foreground.transition()
        .duration(1000)
        .attrTween("d", arcTween(percentage / 100 * configuration.twoPi));
    var textInsideGaugeCourses = 0
    if (displayPercentage === "%") {
        textInsideGaugeCourses = setSettingsNumber(percentage);
    } else {
        textInsideGaugeCourses = setSettingsNumber(value);
    }

    var percentComplete = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0.3em")
        .text(textInsideGaugeCourses.valueNumber + textInsideGaugeCourses.suffixNumber + displayPercentage);

    var i = d3.interpolate(configuration.progress, percentage / 100);
   // foreground.attr("d", arc.endAngle(configuration.twoPi * i(1)));
    gaugeTooltip(id, value, percentage, code, displayPercentage, tooltipText,color);
}

function gaugeTooltip(id, value, percentage, code, displayPercentage, tooltipText,color) {
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
            var textInnerHtml = "<div class='col tooltip-gauges'><h3 class='row' style='color:"+color +"'>Total from {{id}} </h3> <div class='row  pb-1'><span class='col pl-0 pr-0'>{{tooltipText}}</span><span class='col text-right' >{{value}}</div><div class='row pt-1 border-top'> <span class='col pl-0 pr-0'> % of All IDB {{tooltipText}}</span><span  class='col-3 text-right'>{{percentage}}%</span></div>";
            if (displayPercentage == "%") {
                textInnerHtml = "<div class='col tooltip-gauges'><h3 class='row' style='color:"+color +"'>Total from LAC </h3> <div class='row  pb-1'><span class='col pl-0 pr-0'>{{tooltipText}}</span><span class='col text-right' >{{value}}</div><div class='row pt-1 border-top'> <span class='col pl-0 pr-0'> % of All IDB {{tooltipText}}</span><span  class='col-3 text-right'>{{percentage}}%</span></div>";
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

function arcTween(newAngle) {

    // The function passed to attrTween is invoked for each selected element when
    // the transition starts, and for each element returns the interpolator to use
    // over the course of transition. This function is thus responsible for
    // determining the starting angle of the transition (which is pulled from the
    // element’s bound datum, d.endAngle), and the ending angle (simply the
    // newAngle argument to the enclosing function).
    return function(d) {
  
      // To interpolate between the two angles, we use the default d3.interpolate.
      // (Internally, this maps to d3.interpolateNumber, since both of the
      // arguments to d3.interpolate are numbers.) The returned function takes a
      // single argument t and returns a number between the starting angle and the
      // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
      // newAngle; and for 0 < t < 1 it returns an angle in-between.
      var interpolate = d3.interpolate(d.endAngle, newAngle);
  
      // The return value of the attrTween is also a function: the function that
      // we want to run for each tick of the transition. Because we used
      // attrTween("d"), the return value of this last function will be set to the
      // "d" attribute at every tick. (It’s also possible to use transition.tween
      // to run arbitrary code for every tick, say if you want to set multiple
      // attributes from a single function.) The argument t ranges from 0, at the
      // start of the transition, to 1, at the end.
      return function(t) {
  
        // Calculate the current arc angle based on the transition time, t. Since
        // the t for the transition and the t for the interpolate both range from
        // 0 to 1, we can pass t directly to the interpolator.
        //
        // Note that the interpolated angle is written into the element’s bound
        // data object! This is important: it means that if the transition were
        // interrupted, the data bound to the element would still be consistent
        // with its appearance. Whenever we start a new arc transition, the
        // correct starting angle can be inferred from the data.
        d.endAngle = interpolate(t);
  
        // Lastly, compute the arc path given the updated data! In effect, this
        // transition uses data-space interpolation: the data is interpolated
        // (that is, the end angle) rather than the path string itself.
        // Interpolating the angles in polar coordinates, rather than the raw path
        // string, produces valid intermediate arcs during the transition.
        return arc(d);
      };
    };
  }