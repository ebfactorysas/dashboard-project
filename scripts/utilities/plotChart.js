function createPlotChart(data,id,colorPlot,xA,yA,valueTicksX,valueTicksY,textForYAxis){
    var margin = {
        top: 50,
        right: 50,
        bottom: 60,
        left: 150
    };
    var width = 750 - margin.left - margin.right;
    var height = 540 - margin.top - margin.bottom;
    var valueOfFilter = $('#idbLink')[0].text;
    var arrayAux = [];
    var arrayElements = [];
    var maxValue = 0;
    var maxValueX = 0;
    var maxValueY = 0;

    for (let i = 0; i < data.length; i++) {
        data[i].FullCode = data[i].Code + " " + data[i].departmentCode.toUpperCase();
        data[i].divisionDepartment = data[i].departmentCode + "/" + data[i].divisionCode;

        if(maxValueX<=data[i][xA] ){
            maxValueX = data[i][xA];
        }
        if(maxValueY<=data[i][yA] ){
            maxValueY = data[i][yA];
        }

        if (data[i].Downloads >= maxValue) {
            maxValue = data[i].Downloads;
        }
        if (valueOfFilter == data[i].divisionCode) {
            arrayElements.push($.extend(true, {}, data[i]))
        } else {
            arrayAux.push($.extend(true, {}, data[i]))
        }
    }

    var newData = arrayAux.concat(arrayElements);
    var visualization = d3plusOld.viz()
        .container(id)
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
            if (d.divisionCode != valueOfFilter && valueOfFilter != "IDB") {
                return "#d8d8d8"
            }
            return colorPlot
        })
        .tooltip({
            large: 600,
            small: 650,
            anchor: "top left",
            value: ["divisionDepartment", "publishedDate", "Downloads", "daysPublished", "pageviews"]
        })
        .x({
            value: xA,
            axis: true,
            ticks: {
                size: 0,
                width: 2,
                value: valueTicksX,
            },
            grid: false,
            mouse: {
                dasharray: "4"
            },"domain" : [0, maxValueX],"range":[0,maxValueX]
        })
        .text("Code")
        .y({
            value: yA,
            axis: true,
            ticks: {
                size: 0,
                width: 2,
                value: valueTicksY
            },
            grid: false,
            mouse: {
                dasharray: "4"
            },
            "domain" : [-10, maxValueY],"range":[0,maxValueY]
        })
        .format({
            "text": function (text, params) {
                //i made this cuz' this cant change anywhere
                $("#d3plus_graph_xgrid line").css("stroke-dasharray", "4");
                $("#d3plus_graph_ygrid line").css("stroke-dasharray", "4");
                if(textForYAxis.length>0 && text == yA){
                    return textForYAxis
                }

                if (text === "daysPublished") {
                    return "Published Days";
                } else if (text === "pageviews") {
                    return "Downloads per Day"
                } else if (text === "divisionDepartment") {
                    return "Department/Division"
                } else if (text === "publishedDate") {
                    return "Published Date"
                } else {
                    return text;
                }
            }
        })
        .draw()
}