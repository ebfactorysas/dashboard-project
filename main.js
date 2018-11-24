// var width = 150,
//     height = 150,

//     progress = 0,
//     progress3 = 0,
//     progress2 = 0,
//     allocated = 76,
//     total = 100,
//     allocated3 = 9,
//     total3 = 100,
//     allocated2 = 113,
//     total2 = 1000,
//     formatPercent = d3.format(".0%");
// const twoPi = 2 * Math.PI;

// var arc = d3.arc()
//     .startAngle(0)
//     .innerRadius(70)
//     .outerRadius(64);

// var svg = d3.selectAll(".gauge").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var meter = svg.append("g")
//     .attr("class", "funds-allocated-meter");

// meter.append("path")
//     .attr("class", "background")
//     .attr("d", arc.endAngle(twoPi));

// var foreground = meter.append("path")
//     .attr("class", "foreground");

// var percentComplete = meter.append("text")
//     .attr("text-anchor", "middle")
//     .attr("class", "percent-complete")
//     .attr("dy", "0.3em");


// var i = d3.interpolate(progress, allocated / total);

// //gauge K

// var arc2 = d3.arc()
//     .startAngle(0)
//     .innerRadius(70)
//     .outerRadius(64);

// var svg2 = d3.selectAll(".gauge-k").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var meter2 = svg2.append("g")
//     .attr("class", "funds-allocated-meter");

// meter2.append("path")
//     .attr("class", "background")
//     .attr("d", arc2.endAngle(twoPi));

// var foreground2 = meter2.append("path")
//     .attr("class", "foreground");

// var percentComplete2 = meter2.append("text")
//     .attr("text-anchor", "middle")
//     .attr("class", "percent-complete")
//     .attr("dy", "0.3em");


// var i2 = d3.interpolate(progress2, allocated2 / total2);

// d3.transition().duration(1000).tween("progress", function () {
//     return function (t) {
//         progress = i(t);
//         foreground.attr("d", arc.endAngle(twoPi * progress));
//         percentComplete.text((progress * 100).toFixed(0));
//         progress2 = i2(t);
//         foreground2.attr("d", arc.endAngle(twoPi * progress2));
//         percentComplete2.text((progress2 * 1000).toFixed(0) + "K");

//     };
// });


// //gauge %

// var arc3 = d3.arc()
//     .startAngle(0)
//     .innerRadius(70)
//     .outerRadius(64);

// var svg3 = d3.selectAll(".gauge-p").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var meter3 = svg3.append("g")
//     .attr("class", "funds-allocated-meter");

// meter3.append("path")
//     .attr("class", "background")
//     .attr("d", arc3.endAngle(twoPi));

// var foreground3 = meter3.append("path")
//     .attr("class", "foreground");

// var percentComplete3 = meter3.append("text")
//     .attr("text-anchor", "middle")
//     .attr("class", "percent-complete")
//     .attr("dy", "0.3em");


// var i3 = d3.interpolate(progress3, allocated3 / total3);

// d3.transition().duration(1000).tween("progress", function () {
//     return function (t) {
//         progress = i(t);
//         foreground.attr("d", arc.endAngle(twoPi * progress));
//         percentComplete.text((progress * 100).toFixed(0));
//         progress2 = i2(t);
//         foreground2.attr("d", arc2.endAngle(twoPi * progress2));
//         percentComplete2.text((progress2 * 1000).toFixed(0) + "K");
//         progress3 = i3(t);
//         foreground3.attr("d", arc3.endAngle(twoPi * progress3));
//         percentComplete3.text((progress3 * 100).toFixed(0) + "%");

//     };
// });

// function wrap(text, width) {
//     text.each(function () {
//         var text = d3.select(this),
//             words = text.text().split(/\s+/).reverse(),
//             word,
//             line = [],
//             lineNumber = 0,
//             lineHeight = 1.1, // ems
//             y = text.attr("y"),
//             dy = parseFloat(text.attr("dy")),
//             tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
//         while (word = words.pop()) {
//             line.push(word)
//             tspan.text(line.join(" "))
//             if (tspan.node().getComputedTextLength() > width) {
//                 line.pop()
//                 tspan.text(line.join(" "))
//                 line = [word]
//                 var number = ++lineNumber * lineHeight + dy;
//                 tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", number + "em").text(word)
//             }
//         }
//     })
// }

// //Bubbles
// var bubbleData = [{
//         "name": "file1",
//         "PublishedDays": 5,
//         "downloads": 500

//     },
//     {
//         "name": "file2",
//         "PublishedDays": 50,
//         "downloads": 200

//     },
//     {
//         "name": "file3",
//         "PublishedDays": 25,
//         "downloads": 1500,

//     }, {
//         "name": "file4",
//         "PublishedDays": 56,
//         "downloads": 5000

//     }, {
//         "name": "file5",
//         "PublishedDays": 10,
//         "downloads": 3000

//     }, {
//         "name": "file6",
//         "PublishedDays": 100,
//         "downloads": 100

//     }, {
//         "name": "file7",
//         "PublishedDays": 6,
//         "downloads": 0

//     }, {
//         "name": "file8",
//         "PublishedDays": 47,
//         "downloads": 150

//     }, {
//         "name": "file9",
//         "PublishedDays": 95,
//         "downloads": 500

//     }, {
//         "name": "file10",
//         "PublishedDays": 105,
//         "downloads": 550

//     }, {
//         "name": "file11",
//         "PublishedDays": 65,
//         "downloads": 96

//     }
// ]
// var marginBubble = {
//     top: 10,
//     right: 20,
//     bottom: 30,
//     left: 30
// };
// var widthBubble = 350 + marginBubble.left + marginBubble.right;
// var heightBubble = 300 + marginBubble.top + marginBubble.bottom;
// var svgBubble = d3.select('#publications')
//     .append('svg')
//     .attr('width', widthBubble + marginBubble.left + marginBubble.right)
//     .attr('height', heightBubble + marginBubble.top + marginBubble.bottom)
//     //.call(responsivefy)
//     .append('g')
// //.attr('transform', 'translate(' + marginBubble.left + ' ' + marginBubble.top + ' ' + marginBubble.right + ' ' + marginBubble.bottom + ')');



// var yScale = d3.scaleLinear()
//     .domain(d3.extent(bubbleData, function (d) {
//         return d.PublishedDays;
//     }))
//     .range([300, 0])
//     .nice();

// var yAxis = d3.axisLeft(yScale);
// svgBubble.call(yAxis);

// var xScale = d3.scaleLinear()
//     .domain(d3.extent(bubbleData, function (d) {
//         return d.downloads;
//     }))
//     .range([0, 300])
//     .nice();

// var xAxis = d3.axisBottom(xScale)
//     .ticks(5);
// svgBubble.append('g')
//     .attr('transform', 'translate(0,300)')
//     .call(xAxis);

// //Moocs students flow














