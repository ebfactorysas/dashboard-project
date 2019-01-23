var cMalos = [];

var newData = nuevoTest();
new_graph(newData);

barGraph('bar-graph-countries', 'TOP COUNTRIES');
barGraph('bar-graph-sources', 'TOP SOURCES');
new_updateFilter(true);



function nuevoTest() {

    baseData = testDatos.filter(function (d) {
        return (d['fff'] == 'Publications')
    });
    updateProducts(testDatos);

    $('#drop-products').on('change', function () {
        var that = this;
        baseData = testDatos.filter(function (d) {
            return (d['fff'] == that.value)
        });
        updateTypes(baseData);

        var datosBySegmentType = baseData.filter(function (d) {
            return (d['segment type'] == 'IDB')
        });

        updateSegments(datosBySegmentType, 'IDB');


        new_updateFilter(true);
    });

    updateTypes(baseData);

    var datosBySegmentType = baseData.filter(function (d) {
        return (d['segment type'] == 'IDB')
    });

    updateSegments(datosBySegmentType, 'IDB');

    $('#drop-departments').on('change', function () {


        // var datosBySegmentType = baseData.filter(function (d) {
        //     return (d['segment type'] == this.value);
        // });
        var that = this;
        var datosBySegmentType = baseData.filter(function (d) {
            return (d['segment type'] == that.value)
        });


        updateSegments(datosBySegmentType, this.value);



        new_updateFilter();
    });
    $('#drop-materials').on('change', function () {


        new_updateFilter();
    });



    $('#lac-checkbox').change(function () {
        new_updateFilter();
    });

    $('#drop-downloads').on('change', function () {
        new_updateFilter();
    });

    var datosBySegmentName = baseData.filter(function (d) {
        return (d['segment name'] == 'IDB')
    });

    var selectedMetric = $('#drop-downloads').find(":selected").val();
    var datosMapeados = [];
    if (selectedMetric.includes("All")) {
        datosMapeados = datosBySegmentName.map(function (d) {
            var nuevoDato = {
                code3: getCoutryCode(d['Country']),
                country: d['Country'],
                z: Number(d['All downloads'])
            };
            return nuevoDato;
        });
    } else {
        datosMapeados = datosBySegmentName.map(function (d) {
            var nuevoDato = {
                code3: getCoutryCode(d['Country']),
                country: d['Country'],
                z: Number(d['2018 downloads'])
            };
            return nuevoDato;
        });
    }



    // var countryIso3 = getCoutryCode('Afghanistan');


    return datosMapeados;
}

function updateProducts(baseData) {


    var products = getUniqueData(baseData, 'fff');


    $('#drop-products').empty();
    //$('#drop-products').append('<option value="all">ALL</option>');
    products.forEach(function (item) {
        $('#drop-products').append('<option value="' + item + '">' + item + '</option>');
    });


}


function getCoutryCode(country) {



    if (country.length != 2) {
        var countryIso2 = isoCountries[country];
    } else {
        var countryIso2 = country.toUpperCase();
    }
    // var countryIso2 = isoCountries[country];
    //var countryIso2 = countryData.find(o => o.Name === country).Code;
    //  var countryIso2 = countryData.find(o => o.Name === country);
    // if(countryIso2===undefined){
    //   console.warn('>>> '+country,countryIso2);
    // }


    var countryIso3 = iso2toIso3[countryIso2];


    if (countryIso3 === undefined) {
        // console.warn('>>> '+country,countryIso3);
        if ((cMalos.indexOf(country) < 0)) {
            cMalos.push(country);
        }
        console.warn(cMalos);
    }


    return countryIso3
}

function updateTypes(baseData) {


    var types = getUniqueData(baseData, 'segment type');


    $('#drop-departments').empty();
    // $('#drop-departments').append('<option value="all">Group by: ALL</option>');

    for (let index = 0; index < types.length; index++) {
        var item = '<option value="' + types[index] + '">Group by: ' + types[index] + '</option>';

        $('#drop-departments').append('<option value="' + types[index] + '">Group by: ' + types[index] + '</option>');
    }
    // types.forEach(function (item) {
    //     $('#drop-departments').append('<option value="' + item + '">Group by: ' + item + '</option>');
    // });


}

function updateSegments(datosBySegmentType, splitSegment) {


    var segmentos = getUniqueData(datosBySegmentType, 'segment name');


    $('#drop-materials').empty();
    if (splitSegment != 'IDB') {
        $('#drop-materials').append('<option value="all">' + splitSegment + ': ALL</option>');
    }
    for (let index = 0; index < segmentos.length; index++) {
        var item = '<option value="' + segmentos[index] + '">' + splitSegment + ': ' + segmentos[index] + '</option>'

        $('#drop-materials').append('<option value="' + segmentos[index] + '">' + splitSegment + ': ' + segmentos[index] + '</option>');

    }

    // segmentos.forEach(function (item) {
    //     $('#drop-materials').append('<option value="' + item + '">' + splitSegment + ': ' + item + '</option>');
    // });
    // // var departmentsItems = [];
    // segmentos.forEach(function(item) {
    //   // departmentsItems.push('<option value="' + item + '">DEPARTMENT: ' + item + '</option>');
    //   $('#drop-departments').append('<option value="' + item + '">DEPARTMENT: ' + item + '</option>');
    // });
    // // $('#drop-departments').append(departmentsItems);

}

function getUniqueData(array2reduce, property) {

    var test = array2reduce.map(function (element) {

        return element[property]
    })

    test = test.filter(function (item, pos, self) {
        return (self.indexOf(item) == pos)
    });

    return test;

}

function appendItemsMetricsHtml(values) {
    var html = [];

    values.map(function (item) {
        html.push('<option value="' + item + '">' + item + '</option>')
    })

    return html;
}

function setMetricsItems(section) {
    switch (section) {

        case "Publications":

            $('#drop-downloads').append(appendItemsMetricsHtml(metrics.Publications));
            $('#drop-downloads option[value="2018 Downloads"]').attr("selected", "selected");

            break;
        case "MOOCs":
            $('#drop-downloads').append(appendItemsMetricsHtml(metrics.MOOCs));
            $('#drop-downloads option[value="2018 Registrations"]').attr("selected", "selected");
            break;
        case "Datasets":
            $('#drop-downloads').append(appendItemsMetricsHtml(metrics.Datasets));
            $('#drop-downloads option[value="2018 Downloads"]').attr("selected", "selected");
            break;
        case "Code":
            $('#drop-downloads').append(appendItemsMetricsHtml(metrics.Code));
            $('#drop-downloads option[value="2018 Pageviews"]').attr("selected", "selected");
            break;
        case "Subscribers":
            $('#drop-downloads').append(appendItemsMetricsHtml(metrics.Subscribers));
            $('#drop-downloads option[value="All Subscribers"]').attr("selected", "selected");
            break;
        default:
            break;
    }
}



function new_updateFilter(isProduct) {


    // var dateSlider = document.getElementById('slider-download-date');
    // var vall_download = dateSlider.noUiSlider.get();


    // var dateCreationSlider = document.getElementById('slider-creation-date');
    // var vall_Creation = dateCreationSlider.noUiSlider.get();


    // var fromDownload = moment(vall_download[0],'x').format('YYYYMMDD');
    // var toDownload = moment(vall_download[1],'x').format('YYYYMMDD');

    // var fromCreation = moment(vall_Creation[0],'x').format('YYYYMMDD');
    // var toCreation = moment(vall_Creation[1],'x').format('YYYYMMDD');
    var selectedMaterial = $('#drop-materials').find(":selected").val();
    var selectedSection = $('#drop-products').find(":selected").val();
    if (isProduct) {
        $('#drop-downloads').empty();

        setMetricsItems(selectedSection);
    }


    var lacCheck = $("#lac-checkbox").is(":checked");


    var selectedDepartment = $('#drop-departments').find(":selected").val();

    var selectedMetric = $('#drop-downloads').find(":selected").val();




    var dataFilteredDeps = filterDropdown(baseData, selectedDepartment, 'segment type');


    var dataFilteredMaterials = filterDropdown(dataFilteredDeps, selectedMaterial, 'segment name');


    // var dataFilteredLAC = filterLACcountries(dataFilteredMaterials, lacCheck);


    // var dataFilteredDownladDate = filterDate('Download_Date', dataFilteredLAC, fromDownload, toDownload);




    // var dataFilteredCreationDate = filterDate('Publication_Date', dataFilteredDownladDate, fromCreation, toCreation);






    // var data2Graph = getCoutryTotals(dataFilteredCreationDate);
    var selectedMetric = $('#drop-downloads').find(":selected").val();
    var datosMapeados = [];
    if (selectedMetric.includes("All")) {
        datosMapeados = dataFilteredMaterials.map(function (d) {
            var nuevoDato = {
                code3: getCoutryCode(d['Country']),
                country: d['Country'],
                z: Number(d['All downloads'])
            };
            return nuevoDato;
        });
    } else {
        datosMapeados = dataFilteredMaterials.map(function (d) {
            var nuevoDato = {
                code3: getCoutryCode(d['Country']),
                country: d['Country'],
                z: Number(d['2018 downloads'])
            };
            return nuevoDato;
        });
    }


    var dataFilteredLAC = filterLACcountries(datosMapeados, lacCheck);



    var data2Graph = getCoutryTotals(dataFilteredLAC, selectedMaterial);
    console.log("test", selectedMetric);
    setDataToSourceChart(selectedSection, selectedMaterial, selectedDepartment, selectedMetric);

    var serie1 = $('#graph-container').d32().get('series-1');
    var serieCountry = $('#bar-graph-countries').d32Bars().get('series-2')
    var serieSource = $('#bar-graph-sources').d32Bars().get('series-2')
    //serie1.setData(data2Graph, true, false, true);
    // serie1.setData(data2Graph, true, true, false);
    serie1.setData(data2Graph, false, false, false);
    switch (selectedSection) {
        case "Code":
            serie1.update({
                color: "#EEAE00"
            }, false);
            serieCountry.update({
                color: "#EEAE00",
            }, true);
            serieSource.update({
                color: "#EEAE00",
            }, true);
            $('#bar-graph-countries').d32Bars().update({
                title: {
                    style: {
                        color: '#EEAE00'
                    }
                }
            }, true);
            $('#bar-graph-sources').d32Bars().update({
                title: {
                    style: {
                        color: '#EEAE00'
                    }
                }
            }, true);
            $('#totales').css("color", '#EEAE00');
            break;
        case "MOOCs":
            serie1.update({
                color: "#FA2E00"
            }, false);
            serieCountry.update({
                color: "#FA2E00",
            }, true);
            serieSource.update({
                color: "#FA2E00",
            }, true);
            $('#bar-graph-countries').d32Bars().update({
                title: {
                    style: {
                        color: '#FA2E00'
                    }
                }
            }, true);
            $('#bar-graph-sources').d32Bars().update({
                title: {
                    style: {
                        color: '#FA2E00'
                    }
                }
            }, true);
            
            $('#totales').css("color", '#FA2E00');
            break;
        case "Publications":
            serie1.update({
                color: "#d1415a"
            }, false);
            serieCountry.update({
                color: "#d1415a",
            }, true);
            serieSource.update({
                color: "#d1415a",
            }, true);
            $('#bar-graph-countries').d32Bars().update({
                title: {
                    style: {
                        color: '#d1415a'
                    }
                }
            }, true);
            $('#totales').css("color", '#d1415a');
            break;
        case "Datasets":
            serie1.update({
                color: "#424488"
            }, false);
            serieCountry.update({
                color: "#424488",
            }, true);
            serieSource.update({
                color: "#424488",
            }, true);
            $('#bar-graph-countries').d32Bars().update({
                title: {
                    style: {
                        color: '#424488'
                    }
                }
            }, true);
            $('#bar-graph-sources').d32Bars().update({
                title: {
                    style: {
                        color: '#424488'
                    }
                }
            }, true);
            $('#totales').css("color", '#424488');
            break;
        case "Subscribers":
            serie1.update({
                color: "#518A81"
            }, false);
            serieCountry.update({
                color: "#518A81",
            }, true);
            serieSource.update({
                color: "#518A81",
            }, true);
            $('#bar-graph-countries').d32Bars().update({
                title: {
                    style: {
                        color: '#518A81'
                    }
                }
            }, true);
            $('#bar-graph-sources').d32Bars().update({
                title: {
                    style: {
                        color: '#518A81'
                    }
                }
            }, true);
            $('#totales').css("color", '#518A81');
            break;
        default:
            break;
    }



    // var serie1 = $('#graph-container').d32().get('series-1');
    // //serie1.setData(datosMapeados, true, false, true);
    // //serie1.setData(datosMapeados, true, true, false);
    // serie1.setData(datosMapeados, true, false, false);




    // var serie1 = $('#graph-container').d32().get('series-1');
    // //serie1.setData(data2Graph, true, false, true);
    // serie1.setData(data2Graph, true, true, false);
    serie1.update({
        name: selectedMetric
    }, false);
    $('#graph-container').d32().redraw();

}



//init();



function init() {

    loadSimulatedData();


    var departmentsItems = [];
    departments.map(function (item) {
        departmentsItems.push('<option value="' + item + '">DEPARTMENT: ' + item + '</option>');
    });
    $('#drop-departments').append(departmentsItems);

    var materialsItems = [];
    MaterialTypes.map(function (item) {
        materialsItems.push('<option value="' + item + '">MATERIAL TYPE: ' + item + '</option>');
    });
    $('#drop-materials').append(materialsItems);

    var departmentsItems = [];
    departments.map(function (item) {
        departmentsItems.push('<option value="' + item + '">DEPARTMENT: ' + item + '</option>');
    });
    $('#drop-departments').append(departmentsItems);



    graph(baseData);
    // var dataFilteredDownladDate = filterDate('Download_Date', baseData, "20171202", "20171203");
    // var data2Graph = getCoutryTotals(dataFilteredDownladDate);
    // graph(data2Graph);

    //barGraph('bar-graph-countries', 'TOP COUNTRIES');

    //barGraph('bar-graph-sources', 'TOP SOURCES');

    createDownloadSlider();

    createCreationSlider();

    addEventsDownloadSlider();
    addEventsCreationSlider();

    $('#lac-checkbox').change(function () {
        updateFilter();
    });

    $('#drop-departments').on('change', function () {
        updateFilter();
    });

    $('#drop-materials').on('change', function () {
        updateFilter();
    });



}



function loadSimulatedData() {

    departments.forEach(function (dep) {
        // var dep = departments[getRandomInt(0,(departments.length-1))];
        var cantPubs = getRandomInt(1, 15);

        for (var k = 0; k <= cantPubs; k++) {
            generatePublicationData(dep);
        }
    });


}



function generatePublicationData(department) {

    fecha_Publication_Date = new_randomDate("20171201", "20181101");
    // fecha_Publication_Date = "20171201";
    var Material_Type = MaterialTypes[getRandomInt(0, (MaterialTypes.length - 1))];
    // var Material_Type = "MaterialA";

    var paisesGenerados = generate_randomCountries();


    paisesGenerados.forEach(function (newPais) {
        countryPushDates(newPais, fecha_Publication_Date, Material_Type, department);
    });

}


function generate_randomCountries() {



    var cantCountries = getRandomInt(1, 15);
    // var cantCountries = getRandomInt(1,(countryCodes.length-1));

    randCountries = [];
    for (var i = 0; i <= cantCountries; i++) {
        var rndCountry = countryCodes[getRandomInt(0, (countryCodes.length - 1))];
        if ((randCountries.indexOf(rndCountry) < 0)) {
            randCountries.push(rndCountry);
        }
    }


    return randCountries;
}



function countryPushDates(pais, fecha_Publication_Date, Material_Type, department) {

    // pais = "COL";
    // fecha_Publication_Date = "20171201";

    fechasGeneradas = generate_randomDates();

    var newItems = [];
    fechasGeneradas.forEach(function (newFecha) {

        var source = SourceTypes[getRandomInt(0, (SourceTypes.length - 1))];
        var valor = getRandomInt(0, 10);
        newItem = {
            "json_featuretype": "Sheet1",
            "Product_Name": "publication3",
            "Publication_Date": fecha_Publication_Date,
            "Product_Type": "Publications",
            "Department": department,
            "Material_Type": Material_Type,
            "Download_Date": newFecha,
            "Metric": "Downloads",
            "Source": source,
            "z": valor,
            "code3": pais
        };
        newItems.push(newItem);
    });





    baseData = baseData.concat(newItems);



}



function generate_randomDates() {
    start = "20171201";
    end = "20181125";


    dates = [];

    var cantFechas = 1; ///-- getRandomInt(1,100);

    for (var i = 0; i < cantFechas; i++) {
        var newDate = new_randomDate(start, end);
        if ((dates.indexOf(newDate) < 0)) {
            dates.push(newDate);
        }

    }


    return dates;
    //new_randomDate(start, end);
    // var nn = new_randomDate(start, end);

}


function new_randomDate(start, end) {

    var ss = Number(new moment(start, 'YYYYMMDD').utc().format('x'));
    var ee = Number(new moment(end, 'YYYYMMDD').utc().format('x'));

    var randDate = (ss + Math.random() * (ee - ss));

    var rr = moment(randDate, 'x').format('YYYYMMDD'); // values[1];


    return rr;
    //return new Date(ss + Math.random() * (ee - ss));
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}



function getMinDate(item, data) {
    var min =
        Math.min.apply(null, data.map(function (d) {
            return d[item]
        }));
    return min;
}

function getMaxDate(item, data) {
    var max = Math.max.apply(null, data.map(function (d) {
        return d[item]
    }));

    return max;
}


function createDownloadSlider() {


    var from = getMinDate('Download_Date', baseData);
    var to = getMaxDate('Download_Date', baseData);


    var dateSlider = document.getElementById('slider-download-date');

    noUiSlider.create(dateSlider, {
        // Create two timestamps to define a range.
        range: {
            min: new_timestamp(from),
            max: new_timestamp(to)
        },

        // Steps of one week
        step: 1 * 24 * 60 * 60 * 1000,
        // step: 30.4 * 24 * 60 * 60 * 1000,
        // step: 7 * 24 * 60 * 60 * 1000,

        // Two more timestamps indicate the handle starting positions.
        start: [new_timestamp(from), new_timestamp(to)],

        // No decimals
        format: wNumb({
            decimals: 0
        })
    });


}


function addEventsDownloadSlider() {

    var dateSlider = document.getElementById('slider-download-date');

    var dateValues = [
        document.getElementById('event-download-start'),
        document.getElementById('event-download-end')
    ];


    dateSlider.noUiSlider.on('update', function (values, handle) {



        updateFilter();
        // var a = moment(values[0],'x').format('YYYYMMDD'); // values[0];
        // var b = moment(values[1],'x').format('YYYYMMDD'); // values[1];




        // updateFilter(a,b);


        dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    });

}


function createCreationSlider() {


    var from = getMinDate('Publication_Date', baseData);
    var to = getMaxDate('Publication_Date', baseData);


    var dateCreationSlider = document.getElementById('slider-creation-date');

    noUiSlider.create(dateCreationSlider, {
        // Create two timestamps to define a range.
        range: {
            min: new_timestamp(from),
            max: new_timestamp(to)
        },

        // Steps of one week
        step: 1 * 24 * 60 * 60 * 1000,
        // step: 7 * 24 * 60 * 60 * 1000,

        // Two more timestamps indicate the handle starting positions.
        start: [new_timestamp(from), new_timestamp(to)],

        // No decimals
        format: wNumb({
            decimals: 0
        })
    });


    // var dateValues = [
    //     document.getElementById('event-creation-start'),
    //     document.getElementById('event-creation-end')
    // ];


    // dateCreationSlider.noUiSlider.on('update', function (values, handle) {



    //   var a = moment(values[0],'x').format('YYYYMMDD'); // values[0];
    //   var b = moment(values[1],'x').format('YYYYMMDD'); // values[1];




    //   updateFilter(a,b);


    //     dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    // });


    // dateCreationSlider.noUiSlider.on('set', function (values, handle) {


    // });
}


function addEventsCreationSlider() {

    var dateCreationSlider = document.getElementById('slider-creation-date');


    var dateValues = [
        document.getElementById('event-creation-start'),
        document.getElementById('event-creation-end')
    ];


    dateCreationSlider.noUiSlider.on('update', function (values, handle) {



        updateFilter();
        // var a = moment(values[0],'x').format('YYYYMMDD'); // values[0];
        // var b = moment(values[1],'x').format('YYYYMMDD'); // values[1];




        // updateFilter(a,b);


        dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    });

}



function updateFilter() {


    var dateSlider = document.getElementById('slider-download-date');
    var vall_download = dateSlider.noUiSlider.get();


    var dateCreationSlider = document.getElementById('slider-creation-date');
    var vall_Creation = dateCreationSlider.noUiSlider.get();


    var fromDownload = moment(vall_download[0], 'x').format('YYYYMMDD');
    var toDownload = moment(vall_download[1], 'x').format('YYYYMMDD');

    var fromCreation = moment(vall_Creation[0], 'x').format('YYYYMMDD');
    var toCreation = moment(vall_Creation[1], 'x').format('YYYYMMDD');


    var lacCheck = $("#lac-checkbox").is(":checked");


    var selectedDepartment = $('#drop-departments').find(":selected").val();


    var selectedMaterial = $('#drop-materials').find(":selected").val();



    var dataFilteredDeps = filterDropdown(baseData, selectedDepartment, 'Department');

    var dataFilteredMaterials = filterDropdown(dataFilteredDeps, selectedMaterial, 'Material_Type');


    var dataFilteredLAC = filterLACcountries(dataFilteredMaterials, lacCheck);


    var dataFilteredDownladDate = filterDate('Download_Date', dataFilteredLAC, fromDownload, toDownload);




    var dataFilteredCreationDate = filterDate('Publication_Date', dataFilteredDownladDate, fromCreation, toCreation);






    var data2Graph = getCoutryTotals(dataFilteredCreationDate);


    var serie1 = $('#graph-container').d32().get('series-1');

    //serie1.setData(data2Graph, true, false, true);
    serie1.setData(data2Graph, true, true, false);

}



function filterLACcountries(data, lacCheck) {
    if (lacCheck) {
        return data.filter(function (d) {
            return (lacCountries.indexOf(d.code3) >= 0)
        });
    } else {
        return data;
    }
}


function filterDropdown(data, selectedItem, item) {
    if (selectedItem != 'all') {
        return data.filter(function (d) {
            return (d[item] == selectedItem);
        });
    } else {
        return data;
    }
}



// Create a new date from a string, return as a timestamp.
function new_timestamp(str) {

    var ts = new moment(str + '0101', 'YYYYMMDD').utc().format('x');
    // var ts = new moment('20100101','YYYYMMDD').utc().format('x');

    return Number(ts);
    //return new Date(str).getTime();
}

// Create a new date from a string, return as a timestamp.
function timestamp(str) {

    var ts = new moment(str + '0101', 'YYYYMMDD').utc().format('x');
    // var ts = new moment('20100101','YYYYMMDD').utc().format('x');

    return Number(ts);
    //return new Date(str).getTime();
}




// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

// Create a string representation of the date.
function formatDate(date) {


    return shortMonths[date.getMonth()] + "-" + date.getFullYear();
    // return weekdays[date.getDay()] + ", " +
    //     date.getDate() + nth(date.getDate()) + " " +
    //     months[date.getMonth()] + " " +
    //     date.getFullYear();
}






function filterDate(item, data, from, to) {

    // var from = "20171203";
    // var to = "20171203";

    var dataFilteredDownladDate = data
        .filter(function (d) {
            return (d[item] >= from)
        })
        .filter(function (d) {
            return (d[item] <= to)
        });
    return dataFilteredDownladDate;

}



function getCoutryTotals(data, test_material) {

    var total = 0;

    var counts = data.reduce(function (p, c) {
        var country = c.code3;
        if (!p.hasOwnProperty(country)) {
            p[country] = null;
        }
        if (c.z != 0) {
            p[country] += c.z;
            total += c.z;
        }
        return p;
    }, {});
    // var counts = data.reduce((p, c) => {
    //   var country = c.code3;
    //   if (!p.hasOwnProperty(country)) {
    //     p[country] = 0;
    //   }
    //   p[country] += c.z;
    //   total += c.z;
    //   return p;
    // }, {});

    // nuevoTest();



    if (total == 0) {
        $('.alert').text('No data for: ' + test_material);
        $('.alert').show();
    } else {
        $('.alert').hide();
    }


    $('#totales').text(abbreviate_number(total));
    // $('#totales').text(total);

    var countsExtended = Object.keys(counts).map(function (k) {
        return {
            code3: k,
            z: counts[k]
        };
    });





    var serieTopCountries = countsExtended
        .sort(dynamicSort("-z"))
        .slice(0, 10)
        .map(function (d) {
            return [d.code3, d.z];
        });
    var serie2 = $('#bar-graph-countries').d32Bars().get('series-2');
    serie2.setData(serieTopCountries, true, false, false);




    var countsSource = data.reduce(function(p, c)  {
        var source = c.Source;
        if (!p.hasOwnProperty(source)) {
            p[source] = 0;
        }
        p[source] += 1;
        // p[source] += c.z;
        return p;
    }, {});

    var countsSourceExtended = Object.keys(countsSource).map(function(k) {
        return {
            src: k,
            total: countsSource[k]
        };
    });



    return countsExtended;
}

function setDataToSourceChart(section, divisionSelected, departmentOption, selectedMetric) {
    
    var serieTopSources = [];
    switch (section) {
        case 'Publications':
            if (selectedMetric.includes("All")) {
                if (divisionSelected === "IDB" || divisionSelected === "all") {
                    serieTopSources = publicationsDownloadSourceArrays.downloadSourceIDB
                        .sort(dynamicSortSources("valueAllTheTime"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.valueAllTheTime];
                        });
                } else {
                    if (departmentOption == "Department") {
                        serieTopSources = publicationsDownloadSourceArrays.downloadSourceDepartments
                            .filter(function (d) {
                                return (d.department_codes == divisionSelected && d.valueAllTheTime > 0)
                            })
                            .sort(dynamicSortSources("valueAllTheTime"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.valueAllTheTime];
                            });
                    } else {
                        serieTopSources = publicationsDownloadSourceArrays.downloadSourceDivisions
                            .filter(function (d) {
                                return (d.division_codes == divisionSelected && d.valueAllTheTime > 0)
                            })
                            .sort(dynamicSortSources("valueAllTheTime"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.valueAllTheTime];
                            });
                    }
                }
            } else {
                if (divisionSelected === "IDB" || divisionSelected === "all") {
                    serieTopSources = publicationsDownloadSourceArrays.downloadSourceIDB
                        .sort(dynamicSortSources("value2018"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.value2018];
                        });
                } else {
                    if (departmentOption == "Department") {
                        serieTopSources = publicationsDownloadSourceArrays.downloadSourceDepartments
                            .filter(function (d) {
                                return (d.department_codes == divisionSelected && d.value2018 > 0)
                            }).sort(dynamicSortSources("value2018"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.value2018];
                            });
                    } else {
                        serieTopSources = publicationsDownloadSourceArrays.downloadSourceDivisions
                            .filter(function (d) {
                                return (d.division_codes == divisionSelected && d.value2018 > 0)
                            })
                            .sort(dynamicSortSources("value2018"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.value2018];
                            });
                    }
                }
            }
            break;
        case 'MOOCs':
        if (selectedMetric.includes("All")) {
            if (divisionSelected === "IDB" || divisionSelected === "all") {
                serieTopSources = moocsEducationArrays.educationLevelIDBAllTheTime
                    .sort(dynamicSortSources("registrations"))
                    .slice(0, 10)
                    .map(function(d)  {
                        return [d.name, d.registrations];
                    });
            } else {
                if (departmentOption == "Department") {
                    serieTopSources = moocsEducationArrays.educationLevelDepartmentsAllTheTime
                        .filter(function (d) {
                            return (d.department_code == divisionSelected )
                        })
                        .sort(dynamicSortSources("registrations"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.registrations];
                        });
                } else {
                    serieTopSources = moocsEducationArrays.educationLevelDivisionsAllTheTime
                        .filter(function (d) {
                            return (d.division_code == divisionSelected)
                        })
                        .sort(dynamicSortSources("registrations"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.registrations];
                        });
                }
            }
        } else {
            if (divisionSelected === "IDB" || divisionSelected === "all") {
                serieTopSources = moocsEducationArrays.educationLevelIDB2018
                    .sort(dynamicSortSources("registrations"))
                    .slice(0, 10)
                    .map(function(d) {
                        return [d.name, d.registrations];
                    });
            } else {
                if (departmentOption == "Department") {
                    serieTopSources = moocsEducationArrays.educationLevelDepartments2018
                        .filter(function (d) {
                            return (d.department_code == divisionSelected)
                        }).sort(dynamicSortSources("registrations"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.registrations];
                        });
                } else {
                    serieTopSources = moocsEducationArrays.educationLevelDivisions2018
                        .filter(function (d) {
                            return (d.division_code == divisionSelected)
                        })
                        .sort(dynamicSortSources("registrations"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.registrations];
                        });
                }
            }
        }
            break;
        case 'Datasets':
            if (selectedMetric.includes("All")) {
                if (divisionSelected === "IDB" || divisionSelected === "all") {
                    serieTopSources = datasetsDownloadSource.downloadSourceIDB
                        .sort(dynamicSortSources("valueAllTheTime"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.valueAllTheTime];
                        });
                } else {
                    if (departmentOption == "Department") {
                        serieTopSources = datasetsDownloadSource.downloadSourceDepartments
                            .filter(function (d) {
                                return (d.department_codes == divisionSelected && d.valueAllTheTime > 0)
                            })
                            .sort(dynamicSortSources("valueAllTheTime"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.valueAllTheTime];
                            });
                    } else {
                        serieTopSources = datasetsDownloadSource.downloadSourceDivisions
                            .filter(function (d) {
                                return (d.division_codes == divisionSelected && d.valueAllTheTime > 0)
                            })
                            .sort(dynamicSortSources("valueAllTheTime"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.valueAllTheTime];
                            });
                    }
                }
            } else {
                if (divisionSelected === "IDB" || divisionSelected === "all") {
                    serieTopSources = datasetsDownloadSource.downloadSourceIDB
                        .sort(dynamicSortSources("value2018"))
                        .slice(0, 10)
                        .map(function(d) {
                            return [d.name, d.value2018];
                        });
                } else {
                    if (departmentOption == "Department") {
                        serieTopSources = datasetsDownloadSource.downloadSourceDepartments
                            .filter(function (d) {
                                return (d.department_codes == divisionSelected && d.value2018 > 0)
                            }).sort(dynamicSortSources("value2018"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.value2018];
                            });
                    } else {
                        serieTopSources = datasetsDownloadSource.downloadSourceDivisions
                            .filter(function (d) {
                                return (d.division_codes == divisionSelected && d.value2018 > 0)
                            })
                            .sort(dynamicSortSources("value2018"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.value2018];
                            });
                    }
                }
            }
            break;
        case 'Code':
            if (selectedMetric.includes("All")) {
                if (divisionSelected === "IDB" || divisionSelected === "all") {
                    serieTopSources = codePageviewsSourceArrays.pageviewSourceIDB
                        .sort(dynamicSortSources("valueAllTheTime"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.valueAllTheTime];
                        });
                } else {
                    if (departmentOption == "Department") {
                        serieTopSources = codePageviewsSourceArrays.pageviewSourceDepartments
                            .filter(function (d) {
                                return (d.department_codes == divisionSelected && d.valueAllTheTime > 0)
                            })
                            .sort(dynamicSortSources("valueAllTheTime"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.valueAllTheTime];
                            });
                    } else {
                        serieTopSources = codePageviewsSourceArrays.pageviewSourceDivisions
                            .filter(function (d) {
                                return (d.division_codes == divisionSelected && d.valueAllTheTime > 0)
                            })
                            .sort(dynamicSortSources("valueAllTheTime"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.valueAllTheTime];
                            });
                    }
                }
            } else {
                if (divisionSelected === "IDB" || divisionSelected === "all") {
                    serieTopSources = codePageviewsSourceArrays.pageviewSourceIDB
                        .sort(dynamicSortSources("value2018"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.value2018];
                        });
                } else {
                    if (departmentOption == "Department") {
                        serieTopSources = codePageviewsSourceArrays.pageviewSourceDepartments
                            .filter(function (d) {
                                return (d.department_codes == divisionSelected && d.value2018 > 0)
                            }).sort(dynamicSortSources("value2018"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.value2018];
                            });
                    } else {
                        serieTopSources = codePageviewsSourceArrays.pageviewSourceDivisions
                            .filter(function (d) {
                                return (d.division_codes == divisionSelected && d.value2018 > 0)
                            })
                            .sort(dynamicSortSources("value2018"))
                            .slice(0, 10)
                            .map(function(d)  {
                                return [d.name, d.value2018];
                            });
                    }
                }
            }
            break;
        case 'Subscribers':
            if (divisionSelected === "IDB" || divisionSelected === "all") {
                serieTopSources = subscribersInstitution.institutionIDB
                    .sort(dynamicSortSources("value"))
                    .slice(0, 10)
                    .map(function(d) {
                        return [d.name, d.value];
                    });
            } else {
                if (departmentOption == "Department") {
                    serieTopSources = subscribersInstitution.institutionDepartments
                        .filter(function (d) {
                            return (d.code == divisionSelected )
                        })
                        .sort(dynamicSortSources("value"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.value];
                        });
                } else {
                    serieTopSources = subscribersInstitution.institutionDivisions
                        .filter(function (d) {
                            return (d.division_code == divisionSelected)
                        })
                        .sort(dynamicSortSources("value"))
                        .slice(0, 10)
                        .map(function(d)  {
                            return [d.name, d.value];
                        });
                }
            }
            break;

        default:
            break;
    }
    var serie3 = $('#bar-graph-sources').d32Bars().get('series-2');
    
    serie3.setData(serieTopSources, true, false, false);
}



function abbreviate_number(num, fixed) {
    if (num === null) {
        return null;
    } // terminate early
    if (num === 0) {
        return '0';
    } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
}



function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortSources(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



function barGraph(selectorID, title) {
    var colorText = '#d1415a';

    d32Bars.chart(selectorID, {
        chart: {
            type: 'bar',
            style: {
                fontFamily: 'Gotham-Book'
            }
        },
        title: {
            text: title,
            style: {
                fontFamily: 'Gotham-Bold',
                fontSize: '12px',
                color: colorText
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            visible: false,
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Gotham-Book'
                }
            }
        },
        yAxis: {
            visible: false,
            reversed: true,
            min: 0,
            title: {
                text: 'Population (millions)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return '<b style="font-size: 16px;color:' + this.series.color + '">' + this.point.name + '</b><br>' +
                    'Value: ' + this.point.y.toLocaleString();
            },
            backgroundColor: '#ffffff', //'#d699a6',  // 'rgb(214, 153, 166)',
            borderColor: '#ffffff',
            borderRadius: 0,
            borderWidth: 1
        },

        plotOptions: {
            series: {
                pointPadding: 0,
                pointWidth: 18,
                borderWidth: 1,
                borderColor: "#858585"
            }
        },
        series: [{
            id: 'series-2',
            name: 'Population',
            color: colorText, //'#c42a48',
            dataLabels: {
                enabled: true,
                rotation: 0,
                inside: true,
                color: '#000000',
                align: 'right', // 'left',
                format: '{point.name}', // one decimal
                //y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '10px',
                    fontFamily: 'Gotham-Book'
                }
            }
        }]
    });

}

function new_graph(data2Graph) {

    d32.mapChart('graph-container', {
        chart: {
            map: 'custom/world',
            style: {
                fontFamily: 'Gotham-Book'
            },
            panning: false,
            // events: {
            //     load: function () {
            //       //this.mapZoom(0.9);
            //          this.mapZoom(0.9, 100, 100);
            //     }
            // },
            //mapZoom: [0.9, 100, 100],
            // borderWidth: 10,
            // margin: [110, 10, 150, 10],
            // width: 1500,
            // height: 1300,
            // spacing: [130, 30, 15, 30],
            // spacingLeft: 300,
        },
        mapNavigation: {
            enabled: false,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        // credits: {
        //     enabled: true
        // },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            },
            enableMouseWheelZoom: false
        },
        tooltip: {
            // pointFormat: '<b>{point.z}</b>',
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderRadius: 0,
            borderWidth: 1,
            formatter: function () {
                return '<b style="font-size: 16px;color:' + this.series.color + '">' + this.point.name + '</b><br>' +
                    this.series.name + ': ' + this.point.z.toLocaleString();
            },
        },
        // lang: {
        //     noData: "Nichts zu anzeigen"
        // },
        // noData: {
        //     style: {
        //         fontWeight: 'bold',
        //         fontSize: '15px',
        //         color: '#303030'
        //     }
        // },
        //         colorAxis: {
        //         },
        series: [{
            name: 'Countries',
            color: '#00FF00',
            enableMouseTracking: true
        }, {
            type: 'mapbubble',
            id: 'series-1',
            color: '#c42a48',
            name: 'Downloads',
            joinBy: ['iso-a3', 'code3'],
            data: data2Graph, //getCoutryTotals(), // countsExtended, // baseData, // data,
            minSize: 5,
            maxSize: '6%', // '7%', // '15%', // '50', // '5%', // '12%',
            tooltip: {
                formatter: function () {
                    return '<b>Series name: ' + this.series.name + '</b><br>' +
                        'Point name: ' + this.point.name + '<br>' +
                        'Value: ' + this.point.value;
                },
                //'<b>{point.country}:</b><br>{point.properties}: {point.z}',
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                useHTML: true
                // pointFormat: '{point.properties.hc-a2}: {point.z}'
            },
            marker: {
                lineColor: '#858585',
                fillOpacity: 0.25
            }
        }]
    });

}


function graph(data2Graph) {

    d32.mapChart('graph-container', {
        chart: {
            map: 'custom/world',
            style: {
                fontFamily: 'Gotham-Book'
            },
            // events: {
            //     load: function () {
            //       //this.mapZoom(0.9);
            //          this.mapZoom(0.9, 100, 100);
            //     }
            // },
            //mapZoom: [0.9, 100, 100],
            // borderWidth: 10,
            // margin: [110, 10, 150, 10],
            // width: 1500,
            // height: 1300,
            // spacing: [130, 30, 15, 30],
            // spacingLeft: 300,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        // credits: {
        //     enabled: true
        // },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            },
            enableMouseWheelZoom: false
        },
        tooltip: {
            // pointFormat: '<b>{point.z}</b>',
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderRadius: 0,
            borderWidth: 1,
            formatter: function () {
                return '<b style="font-size: 16px;color:' + this.series.color + '">' + this.point.name + '</b><br>' +
                    this.series.name + ': ' + this.point.z.toLocaleString();
            },
        },
        series: [{
            name: 'Countries',
            color: '#00FF00',
        }, {
            type: 'mapbubble',
            id: 'series-1',
            color: '#c42a48',
            borderColor: "#858585",
            name: 'Downloads',
            joinBy: ['iso-a3', 'code3'],
            data: data2Graph, //getCoutryTotals(), // countsExtended, // baseData, // data,
            minSize: 5,
            maxSize: '6%', // '7%', // '15%', // '50', // '5%', // '12%',
            tooltip: {
                formatter: function () {
                    return '<b>Series name: ' + this.series.name + '</b><br>' +
                        'Point name: ' + this.point.name + '<br>' +
                        'Value: ' + this.point.value;
                },
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                useHTML: true,
                // pointFormat: '{point.properties.hc-a2}: {point.z}'
            }
        }]
    });

}