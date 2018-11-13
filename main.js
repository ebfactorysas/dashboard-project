var width = 200,
    height = 200,

    progress = 0,
    progress1 = 0,
    progress2 = 0,
    allocated = 76,
    total = 100,
    allocated1 = 76,
    total1 = 100,
    allocated2 = 76,
    total2 = 100,
    formatPercent = d3.format(".0%");
const twoPi = 2 * Math.PI;

var arc = d3.arc()
    .startAngle(0)
    .innerRadius(58)
    .outerRadius(66);

var svg = d3.selectAll(".gauge").append("svg")
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
    .attr("dy", "0.3em");


var i = d3.interpolate(progress, allocated / total);

d3.transition().duration(1000).tween("progress", function () {
    return function (t) {
        progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress));
        percentComplete.text(formatPercent(progress));
    };
});
var data = {
    "name": "Max",
    "value": 100,
    "children": [{
        "name": "Sylvia",
        "value": 75,
        "children": [{
                "name": "Craig",
                "value": 100
            },
            {
                "name": "Robin",
                "value": 100
            },
            {
                "name": "Anna",
                "value": 100
            }
        ]
    }, {
        "name": "David",
        "value": 75,
        "children": [{
                "name": "Jeff",
                "value": 100
            },
            {
                "name": "buffy",
                "value": 100
            }
        ]
    }, {
        "name": "Mr X",
        "value": 100,

    }]
};

var partitionLayout = d3.partition()
    .size([350, 350]);

var rootNode = d3.hierarchy(data)

rootNode.sum(function (d) {
    return d.value;
});

partitionLayout(rootNode);
var test = d3.select('#downloads')
    .selectAll('rect')
    .data(rootNode.descendants())
    .enter();
test.append('text')
    .attr('x', function (d) {
        return d.y0 + 10;
    })
    .attr('y', function (d) {
        return d.x0 + 20;
    })
    .text(function (d) {
        console.log(d)
        return d.data.name;
    })
test.append('rect')
    .attr('x', function (d) {
        return d.y0;
    })
    .attr('y', function (d) {
        return d.x0;
    })
    .attr('width', function (d) {
        return d.y1 - d.y0;
    })
    .attr('height', function (d) {
        return d.x1 - d.x0;
    })
    .style("fill", function (d) {
        return 'rgba(209,65,90,0.' + d.depth + 3 + ')'
    });

//Bubbles
var bubbleData = [{
        "name": "file1",
        "PublishedDays": 5,
        "downloads": 500

    },
    {
        "name": "file2",
        "PublishedDays": 50,
        "downloads": 200

    },
    {
        "name": "file3",
        "PublishedDays": 25,
        "downloads": 1500,

    }, {
        "name": "file4",
        "PublishedDays": 56,
        "downloads": 5000

    }, {
        "name": "file5",
        "PublishedDays": 10,
        "downloads": 3000

    }, {
        "name": "file6",
        "PublishedDays": 100,
        "downloads": 100

    }, {
        "name": "file7",
        "PublishedDays": 6,
        "downloads": 0

    }, {
        "name": "file8",
        "PublishedDays": 47,
        "downloads": 150

    }, {
        "name": "file9",
        "PublishedDays": 95,
        "downloads": 500

    }, {
        "name": "file10",
        "PublishedDays": 105,
        "downloads": 550

    }, {
        "name": "file11",
        "PublishedDays": 65,
        "downloads": 96

    }
]
var marginBubble = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30
};
var widthBubble = 350 + marginBubble.left + marginBubble.right;
var heightBubble = 300 + marginBubble.top + marginBubble.bottom;
var svgBubble = d3.select('#publications')
    .append('svg')
    .attr('width', widthBubble + marginBubble.left + marginBubble.right)
    .attr('height', heightBubble + marginBubble.top + marginBubble.bottom)
    //.call(responsivefy)
    .append('g')
    .attr('transform', 'translate(' + marginBubble.left + ' ' + marginBubble.top + ' ' + marginBubble.right + ' ' + marginBubble.bottom + ')');



var yScale = d3.scaleLinear()
    .domain(d3.extent(bubbleData, d => d.PublishedDays))
    .range([300, 0])
    .nice();

var yAxis = d3.axisLeft(yScale);
svgBubble.call(yAxis);

var xScale = d3.scaleLinear()
    .domain(d3.extent(bubbleData, d => d.downloads))
    .range([0, 300])
    .nice();

var xAxis = d3.axisBottom(xScale)
    .ticks(5);
svgBubble.append('g')
    .attr('transform', `translate(0,300)`)
    .call(xAxis);