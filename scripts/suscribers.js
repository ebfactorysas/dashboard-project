/**
 * Start institution-suscribers
 *  */

var dataInstitution = [{
    "name": "Not Reported",
    "value": 40.3
}, {
    "name": "Government",
    "value": 19.5
}, {
    "name": "Academia",
    "value": 17.4
}, {
    "name": "Private Sector",
    "value": 17.2
}, {
    "name": "General Public",
    "value": 16.1
}, {
    "name": "Civil Society",
    "value": 10.1
}, {
    "name": "Research Center",
    "value": 2.6
}, {
    "name": "Multilateral Organization",
    "value": 2.3
}, {
    "name": "Media",
    "value": 1.2
}];

drawInstitutionsChart(dataInstitution);

function drawInstitutionsChart(dataInstitution) {
    var dataInstitutionSum = d3.sum(dataInstitution, function (d) {
        return d.value;
    });

    var marginInstitution = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var widthInstitution = 650 - marginInstitution.left - marginInstitution.right;
    var heightInstitution = 400 - marginInstitution.top - marginInstitution.bottom;
    var svgInstitution = d3.select('#institution-suscribers').append("svg")
        .attr("width", widthInstitution + marginInstitution.left + marginInstitution.right)
        .attr("height", heightInstitution + marginInstitution.top + marginInstitution.bottom)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + marginInstitution.top + ")");

    var xInstitution = d3.scaleBand()
        .range([0, widthInstitution]);
    var yInstitution = d3.scaleLinear()
        .range([heightInstitution, 0]);

    xInstitution.domain(dataInstitution.map(function (d) {
        return d.name
    }));
    yInstitution.domain([0, d3.max(dataInstitution, function (d) {
        return d.value
    })]);

    svgInstitution.selectAll(".bar")
        .data(dataInstitution)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xInstitution(d.name);
        })
        .attr("width", xInstitution.bandwidth() - 15)
        .attr("y", function (d) {
            return yInstitution(d.value + 3);
        })
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 10; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#9ebbc2")
        .attr("stroke-width", 1)
        .attr("stroke", "#337384")
        .attr("height", function (d) {
            return heightInstitution - yInstitution(d.value + 3);
        });

    svgInstitution.selectAll("text")
        .data(dataInstitution)
        .enter()
        .append("text")
        .text(null)
        .attr("y", function (d) {
            console.log(d)
            return yInstitution(d.value + 5);
        })
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 12; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#336577")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 12; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {

            return d.value + "K";
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xInstitution.bandwidth() + 12; //Bar width of 20 plus 1 for padding
        })
        .attr("dy", "1.2em")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "10px")
        .text(function (d) {
            return parseFloat(Math.round(d.value * 100 / dataInstitutionSum * 100) / 100).toFixed(1) +
                "%";
        });

    svgInstitution.append("g")
        .attr("transform", "translate(0," + heightInstitution + ")")
        .attr("class", "institution-chart")
        .call(d3.axisBottom(xInstitution));

    svgInstitution.selectAll(".tick text")
        .call(wrap, xInstitution.bandwidth())
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "9px")
        .attr("fill", "#336577");

}



/**
 * End institution-suscribers
 *  */

/**
 * Start age-suscribers
 *  */


var dataAgeSuscribers = [{
    "name": "0-19",
    "value": 2.7
}, {
    "name": "20-39",
    "value": 29.3
}, {
    "name": "40-59",
    "value": 22.4
}, {
    "name": "60-79",
    "value": 2.5
}, {
    "name": "80-99",
    "value": 0
}, {
    "name": "100-119",
    "value": 2.1
}, {
    "name": "Not Reported",
    "value": 67.5
}];

drawAgeSuscribersChart(dataAgeSuscribers);

function drawAgeSuscribersChart(dataAgeSuscribers) {
    var marginAgeSuscribers = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }

    var widthAgeSuscribers = 450 - marginAgeSuscribers.left - marginAgeSuscribers.right;
    var heightAgeSuscribers = 400 - marginAgeSuscribers.top - marginAgeSuscribers.bottom;

    var sumDataAgeSuscribers = d3.sum(dataAgeSuscribers, function (d) {
        return d.value;
    });
    var svgAgeSuscribers = d3.select('#age-suscribers').append("svg")
        .attr("width", widthAgeSuscribers + marginAgeSuscribers.left + marginAgeSuscribers.right)
        .attr("height", heightAgeSuscribers + marginAgeSuscribers.top + marginAgeSuscribers.bottom)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + marginAgeSuscribers.top + ")");

    var xAgeSuscribers = d3.scaleBand()
        .range([0, widthAgeSuscribers]);
    var yAgeSuscribers = d3.scaleLinear()
        .range([heightAgeSuscribers, 0]);

    xAgeSuscribers.domain(dataAgeSuscribers.map(function (d) {
        return d.name
    }));
    yAgeSuscribers.domain([0, d3.max(dataAgeSuscribers, function (d) {
        return d.value
    })]);

    svgAgeSuscribers.selectAll(".bar")
        .data(dataAgeSuscribers)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xAgeSuscribers(d.name);
        })
        .attr("width", xAgeSuscribers.bandwidth() - 15)
        .attr("y", function (d) {
            return yAgeSuscribers(d.value + 3);
        })
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 10; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#9ebbc2")
        .attr("stroke-width", 1)
        .attr("stroke", "#337384")
        .attr("height", function (d) {
            return heightAgeSuscribers - yAgeSuscribers(d.value + 3);
        });

    svgAgeSuscribers.selectAll("text")
        .data(dataAgeSuscribers)
        .enter()
        .append("text")
        .text(null)
        .attr("y", function (d) {
            return yAgeSuscribers(d.value + 7);
        })
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 20; //Bar width of 20 plus 1 for padding
        })
        .attr("fill", "#336577")
        .attr("font-family", "Gotham-Bold")
        .attr("font-size", "12px")
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 20; //Bar width of 20 plus 1 for padding
        })
        .text(function (d) {

            return d.value + "K";
        })
        .append("tspan")
        .attr("x", function (d, i) {
            return i * xAgeSuscribers.bandwidth() + 20; //Bar width of 20 plus 1 for padding
        })
        .attr("dy", "1.2em")
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "10px")
        .text(function (d) {
            return parseFloat(Math.round((d.value * 100 / sumDataAgeSuscribers) * 100) / 100).toFixed(2) +
                "%";
        });

    svgAgeSuscribers.append("g")
        .attr("transform", "translate(0," + heightAgeSuscribers + ")")
        .attr("class", "suscriber-AgeChart")
        .call(d3.axisBottom(xAgeSuscribers));

    svgAgeSuscribers.selectAll(".tick text")
        .call(wrap, xAgeSuscribers.bandwidth())
        .attr("font-family", "Gotham-Book")
        .attr("font-size", "9px")
        .attr("fill", "#336577");
}



/**
 * End age-suscribers
 *  */


  /**
 * Start tree
 *  */

var dataTree = {
    "name": "flare",
    "children": [{
        "name": "analytics",
        "children": [{
                "name": "graph",
                "children": [{
                    "name": "Not Reported",
                    "size": 66
                }]
            },
            {
                "name": "optimization",
                "children": [{
                    "name": "Male",
                    "size": 18
                }]
            },{
                "name": "graph",
                "children": [{
                    "name": "Female",
                    "size": 66
                }]
            }
        ]
    }]
}

drawTree(dataTree);

function drawTree(dataTree) {
    const marginTree = {
            top: 40,
            right: 10,
            bottom: 10,
            left: 10
        },
        widthTree = 500 - marginTree.left - marginTree.right,
        heightTree = 200 - marginTree.top - marginTree.bottom,
        colorTree = d3.scaleOrdinal().range(["#518a81", "#9abfba", "#aeccc7"]);

    const treemap = d3.treemap().size([widthTree, heightTree]);

    const divTree = d3.select("#demographics-suscribers").append("div")
        .style("position", "relative")
        .style("width", (widthTree + marginTree.left + marginTree.right) + "px")
        .style("height", (heightTree + marginTree.top + marginTree.bottom) + "px")
        .style("left", marginTree.left + "px")
        .style("top", marginTree.top + "px");
    const root = d3.hierarchy(dataTree, (d) => d.children)
        .sum((d) => d.size);

    const tree = treemap(root);

    const node = divTree.datum(root).selectAll(".node")
        .data(tree.leaves())
        .enter().append("div")
        .attr("class", "node")
        .style("left", (d) => d.x0 + "px")
        .style("top", (d) => d.y0 + "px")
        .style("width", (d) => Math.max(0, d.x1 - d.x0) + "px")
        .style("height", (d) => Math.max(0, d.y1 - d.y0) + "px")
        .style("background", (d) => colorTree(d.parent.data.name))
        .text((d) => d.data.name);

    d3.selectAll("input").on("change", function change() {
        const value = this.value === "count" ?
            (d) => {
                return d.size ? 1 : 0;
            } :
            (d) => {
                return d.size;
            };

        const newRoot = d3.hierarchy(dataTree, (d) => d.children)
            .sum(value);

        node.data(treemap(newRoot).leaves())
            .transition()
            .duration(1500)
            .style("left", (d) => d.x0 + "px")
            .style("top", (d) => d.y0 + "px")
            .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
            .style("height", (d) => Math.max(0, d.y1 - d.y0 - 1) + "px")
    });
}
/**
 * End tree
 *  */