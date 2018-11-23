/**
 * Start data-trend
 *  */

var dataDataTrend = [{
        "name": "The Database of Political Institutions 2017(DPI2017)",
        "value": 2.6,
    },
    {
        "name": "FINLAC Data:Datos de desempeño e insclusión financiera de América Latina y el Ca...",
        "value": .3,
    },
    {
        "name": "National Women's Health Survey for Trinidad and Tobago",
        "value": .3,
    },
    {
        "name": "Datos asociados al 'Panorama de enevejeciemiento y depenedencia en América La...",
        "value": .2,
    },
    {
        "name": "Suriname Survey of Living Conditions: 2016-2017",
        "value": .2,
    },
    {
        "name": "Standarized Public Debt Database",
        "value": .2,
    },
    {
        "name": "Primary Healthcare Access, Experience, and Coordination in Latin America and the Caribb...",
        "value": .1,
    }, {
        "name": "Barbados Survey of Living Conditions:2016",
        "value": .1,
    }, {
        "name": "Guyana Labor Force Survey: Fourth Quater 2017",
        "value": .1,
    },
    {
        "name": "Guyana Labor Force Survey: Third Quater 2017",
        "value": .1,
    }
];

dataDataTrend = dataDataTrend.sort(function (a, b) {
    return d3.ascending(a.value, b.value);
})

drawDataTrendChart(dataDataTrend);

function drawDataTrendChart(dataDataTrend) {
    var marginDataTrend = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 300
    };

    var widthDataTrend = 560 - marginDataTrend.left - marginDataTrend.right,
        heightDataTrend = 400 - marginDataTrend.top - marginDataTrend.bottom;


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
            return 12;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .text(function (d) {
            return d.value + "K";
        });

    svgDataTrend.selectAll(".tick text")
        .attr("width", "248")
        .attr("x", -290)
        .attr("y", -5)
        .attr("text-anchor", "start")
        .call(wrapData);
}




function wrapData(text) {
    text.each(function () {
        var text = d3.select(this);
        var words = text.text().split(/\s+/).reverse();
        var lineHeight = 15;
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

/**
 * End data-trend
 *  */