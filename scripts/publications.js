/**
 * Start timelines
 *  */
var dataTimeline = [{
        "date": "1-Jul-18",
        "close": 60000
    },
    {
        "date": "30-Apr-18",
        "close": 50000
    },
    {
        "date": "27-Jan-18",
        "close": 45000
    },
    {
        "date": "26-Dec-17",
        "close": 35000
    },
    {
        "date": "24-Jul-17",
        "close": 20000
    },
    {
        "date": "20-Dec-16",
        "close": 30000
    }, {
        "date": "16-Jul-16",
        "close": 25000
    },
    {
        "date": "27-Mar-14",
        "close": 12000
    },
    {
        "date": "26-Jan-13",
        "close": 5000
    }
]

createChart(dataTimeline);

function createChart(data) {
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
    var svg = d3.select("#timeline-publication").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var totalAmount = 0;
    // format the data
    data.forEach(function (d) {
        d.date = parseTime(d.date);
    });

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
    //
    svg.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', '#c3c3c3')
        .attr("stroke-dasharray", "4")
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .style('stroke-width', '3px')
        .style("font-family","Gotham-Book")
        .style("font-size","13px")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .style("font-family","Gotham-Book")
        .style("font-size","13px")
        .call(d3.axisLeft(y)
        .tickFormat(d3.format(".2s")));
}