/**
 * Start code-trend
 *  */

codetrendArrays = {
    codeTrendIADBAllTime: [{
            "name": "Hydro-BID",
            "value": 461
        },
        {
            "name": "Indicator aggregator",
            "value": 3881
        },
        {
            "name": "MapMap",
            "value": 3633
        },
        {
            "name": "Evaluación de Reciclaje Inclusivo",
            "value": 3280
        },
        {
            "name": "Consul",
            "value": 2726
        },
        {
            "name": "SmartMap",
            "value": 1120
        },
        {
            "name": "SIMPLE-LAT",
            "value": 1105
        },
        {
            "name": "Nexso",
            "value": 1051
        },
        {
            "name": "R Library Numbers for Development",
            "value": 875
        },
        {
            "name": "Tabula",
            "value": 861
        }
    ],
    codeTrendIADBA2018: [{
            "name": "Gobierto",
            "value": 801
        },
        {
            "name": "Gmapsdistance",
            "value": 531
        },
        {
            "name": "Massive change detection",
            "value": 495
        },
        {
            "name": "Clasificador de Datos Atípicos",
            "value": 376
        },
        {
            "name": "AP-LATAM",
            "value": 350
        },
        {
            "name": "AEDES Detector",
            "value": 0
        },
        {
            "name": "Consul",
            "value": 0
        },
        {
            "name": "Evaluación de Reciclaje Inclusivo",
            "value": 0
        },
        {
            "name": "Hydro-BID",
            "value": 0
        },
        {
            "name": "IDBx Data Engine",
            "value": 0
        },
        {
            "name": "Indicator aggregator",
            "value": 0
        },
        {
            "name": "MapMap",
            "value": 0
        },
        {
            "name": "Nexso",
            "value": 0
        },
        {
            "name": "Pydatajson",
            "value": 0
        },
        {
            "name": "R Library Numbers for Development",
            "value": 0
        },
        {
            "name": "SIMPLE-LAT",
            "value": 0
        },
        {
            "name": "SmartMap",
            "value": 0
        },
        {
            "name": "Tabula",
            "value": 0
        },
        {
            "name": "Textar",
            "value": 0
        },
        {
            "name": "Vota Inteligente",
            "value": 0
        }
    ],
    codeTrendAllTimeDivision:[
        {
            "value" : 512,
            "name" : "Massive change detection",
            "divisionCodes" : "FMM"
        },
        {
            "value" : 360,
            "name" : "AP-LATAM",
            "divisionCodes" : "FMM"
        },
        {
            "value" : 1105,
            "name" : "SIMPLE-LAT",
            "divisionCodes" : "ICS"
        },
        {
            "value" : 875,
            "name" : "R Library Numbers for Development",
            "divisionCodes" : "ISU"
        },
        {
            "value" : 838,
            "name" : "IDBx Data Engine",
            "divisionCodes" : "KIC"
        },
        {
            "value" : 3633,
            "name" : "MapMap",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 2726,
            "name" : "Consul",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 861,
            "name" : "Tabula",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 813,
            "name" : "Gobierto",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 738,
            "name" : "AEDES Detector",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 691,
            "name" : "Vota Inteligente",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 593,
            "name" : "Textar",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 559,
            "name" : "Gmapsdistance",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 344,
            "name" : "Pydatajson",
            "divisionCodes" : "KLD"
        },
        {
            "value" : 1120,
            "name" : "SmartMap",
            "divisionCodes" : "MIF"
        },
        {
            "value" : 1051,
            "name" : "Nexso",
            "divisionCodes" : "MIF"
        },
        {
            "value" : 3881,
            "name" : "Indicator aggregator",
            "divisionCodes" : "SPD"
        },
        {
            "value" : 381,
            "name" : "Clasificador de Datos Atípicos",
            "divisionCodes" : "SPH"
        },
        {
            "value" : 4616,
            "name" : "Hydro-BID",
            "divisionCodes" : "WSA"
        },
        {
            "value" : 3280,
            "name" : "Evaluación de Reciclaje Inclusivo",
            "divisionCodes" : "WSA"
        }
    ]
}

//init
drawChartCodeTrend(codetrendArrays.codeTrendIADBAllTime);

//click radiobutton drawChart(id del click)
$("input[name*='codeTrend']").click(function () {
    d3.select("#code-trend svg").remove();
    drawChartCodeTrend(codetrendArrays[this.id]);
});

function drawChartCodeTrend(codeTrend) {

    dataCodeTrend = codeTrend.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });

    var marginCodeTrend = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 205
    };

    var widthCodeTrend = 520 - marginCodeTrend.left - marginCodeTrend.right,
        heightCodeTrend = 400 - marginCodeTrend.top - marginCodeTrend.bottom;


    var svgCodeTrend = d3.select("#code-trend").append("svg")
        .attr("width", widthCodeTrend + marginCodeTrend.left + marginCodeTrend.right)
        .attr("height", heightCodeTrend + marginCodeTrend.top + marginCodeTrend.bottom)
        .append("g")
        .attr("transform", "translate(" + marginCodeTrend.left + "," + marginCodeTrend.top + ")");

    var xCodeTrend = d3.scaleLinear()
        .range([0, widthCodeTrend])
        .domain([0, d3.max(dataCodeTrend, function (d) {
            return d.value;
        })]);

    var yCodeTrend = d3.scaleBand()
        .rangeRound([heightCodeTrend, 0], .1)
        .domain(dataCodeTrend.map(function (d) {
            return d.name;
        }));

    var yAxisCodeTrend = d3.axisLeft(yCodeTrend)
        //no tick marks
        .tickPadding(205)
        .tickSize(0);

    var gyCodeTrend = svgCodeTrend.append("g")
        .style("text-anchor", "start")
        .style("color", "#f0b600")
        .attr("class", "y-code")
        .call(yAxisCodeTrend)

    var barsCodeTrend = svgCodeTrend.selectAll(".bar")
        .data(dataCodeTrend)
        .enter()
        .append("g")

    barsCodeTrend.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return yCodeTrend(d.name);
        })
        .attr("fill", "#d3d3d3")
        .attr("height", yCodeTrend.bandwidth() - 2)
        .attr("x", 8)
        .attr("width", function (d) {
            return xCodeTrend(d.value);
        });

    barsCodeTrend.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return yCodeTrend(d.name) + yCodeTrend.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return 12;
        })
        .attr("class", "text-inside")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .text(function (d) {
            return (d.value / 1000) + "K";
        });
}

/**
 * End code-trend
 *  
 * */