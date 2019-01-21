function drawTreeChart(dataTree, filtertype, id, color, text) {
    colours = chroma.scale([color, '#ffffff'])
        .mode('lch').colors(dataTree.length)

    dataTree.forEach(function (element, i) {
        element.color = colours[i]
    });
    var numbType = d3.format('.0%');
    var visualization = d3plusOld.viz()
        .container(id)
        .data({
            "value": dataTree,
            "stroke": {
                "width": 2
            }
        })
        .type("tree_map")
        .id("name")
        .size({
            value: "value" + filtertype,
            fill: "blue"
        })
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
            resize: false,
            text: function (d) {

                if ((d.d3plusOld.share * 100).toFixed(1) >= 10) {
                    return d.name + "\n" + (d.d3plusOld.share * 100).toFixed(1) + "%";
                }
            }
        })
        .tooltip({
            font: {
                family: "Gotham-Book"
            },
            value: "value" + filtertype,
            large: 600,
            small: 280,
        })
        .format({ "number" : function( number , key ) {
            if (key.key === "share") {
              return d3Old.round(number,1)+"%";
            }
            else if(key.key =="value" + filtertype) {
              return number.toLocaleString();
            }
        
          },"text": text
        })
        // .format(text)
        .text(function (d) {
            var current_id = visualization.id();
            return d[current_id]; //+ "\n" + (d.d3plusOld.share * 100).toFixed(1) + "%";
        })
        .resize(true)

    visualization.draw()
}