initMap();



function initMap() {

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

    // console.log('baseData',baseData);


    graph(baseData);
    // var dataFilteredDownladDate = filterDate('Download_Date', baseData, "20171202", "20171203");
    // var data2Graph = getCoutryTotals(dataFilteredDownladDate);
    // graph(data2Graph);

    barGraph('bar-graph-countries', 'TOP COUNTRIES');

    barGraph('bar-graph-sources', 'TOP SOURCES');

    createDownloadSlider();

    createCreationSlider();

    addEventsDownloadSlider();
    addEventsCreationSlider();

    $('#lac-checkbox').change(function () {
        updateFilter();
    });

    $('#drop-departments').on('change', function () {
        // console.log( this.value );
        // console.log( $(this).find(":selected").val() );
        updateFilter();
    });

    $('#drop-materials').on('change', function () {
        // console.log( this.value );
        // console.log( $(this).find(":selected").val() );
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
    //console.log('paisesGenerados',paisesGenerados);

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
    // console.log('randCountries',randCountries);

    return randCountries;
}



function countryPushDates(pais, fecha_Publication_Date, Material_Type, department) {

    // pais = "COL";
    // fecha_Publication_Date = "20171201";

    fechasGeneradas = generate_randomDates();

    var newItems = [];
    fechasGeneradas.forEach(function (newFecha) {
        //console.log(newFecha);
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

    //console.log('newItems',newItems);

    // console.log('baseData',baseData);

    baseData = baseData.concat(newItems);

    //console.log('baseData',baseData);

}



function generate_randomDates() {
    start = "20171201";
    end = "20181125";


    dates = [];

    var cantFechas = getRandomInt(1, 100);

    for (var i = 0; i <= cantFechas; i++) {
        var newDate = new_randomDate(start, end);
        if ((dates.indexOf(newDate) < 0)) {
            dates.push(newDate);
        }
        // console.log('rndDATE('+i+')= ' + new_randomDate(start, end) );
    }
    //console.log('dates',dates);

    return dates;
    //new_randomDate(start, end);
    // var nn = new_randomDate(start, end);
    // console.log('nn',nn);
}


function new_randomDate(start, end) {

    var ss = Number(new moment(start, 'YYYYMMDD').utc().format('x'));
    var ee = Number(new moment(end, 'YYYYMMDD').utc().format('x'));

    var randDate = (ss + Math.random() * (ee - ss));

    var rr = moment(randDate, 'x').format('YYYYMMDD'); // values[1];
    //console.log('rr',rr);

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
    //console.log('min',min);
    return min;
}

function getMaxDate(item, data) {
    var max = Math.max.apply(null, data.map(function (d) {
        return d[item]
    }));
    //Math.max.apply(null, data.map(function(d) {return d[item]}));
    //console.log('max',max);
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
        // console.log('values',values);
        // console.log('handle',handle);

        updateFilter();
        // var a = moment(values[0],'x').format('YYYYMMDD'); // values[0];
        // var b = moment(values[1],'x').format('YYYYMMDD'); // values[1];

        // console.log('a',a);
        // console.log('b',b);

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
    //   console.log('values',values);
    //   console.log('handle',handle);

    //   var a = moment(values[0],'x').format('YYYYMMDD'); // values[0];
    //   var b = moment(values[1],'x').format('YYYYMMDD'); // values[1];

    //   console.log('a',a);
    //   console.log('b',b);

    //   updateFilter(a,b);


    //     dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    // });


    // dateCreationSlider.noUiSlider.on('set', function (values, handle) {
    //   console.log('values',values);
    //   console.log('handle',handle);
    // });
}


function addEventsCreationSlider() {

    var dateCreationSlider = document.getElementById('slider-creation-date');


    var dateValues = [
        document.getElementById('event-creation-start'),
        document.getElementById('event-creation-end')
    ];


    dateCreationSlider.noUiSlider.on('update', function (values, handle) {
        // console.log('values',values);
        // console.log('handle',handle);

        updateFilter();
        // var a = moment(values[0],'x').format('YYYYMMDD'); // values[0];
        // var b = moment(values[1],'x').format('YYYYMMDD'); // values[1];

        // console.log('a',a);
        // console.log('b',b);

        // updateFilter(a,b);


        dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    });

}



function updateFilter() {


    var dateSlider = document.getElementById('slider-download-date');
    var vall_download = dateSlider.noUiSlider.get();
    // console.log('vall_download',vall_download);

    var dateCreationSlider = document.getElementById('slider-creation-date');
    var vall_Creation = dateCreationSlider.noUiSlider.get();
    // console.log('vall_Creation',vall_Creation);

    var fromDownload = moment(vall_download[0], 'x').format('YYYYMMDD');
    var toDownload = moment(vall_download[1], 'x').format('YYYYMMDD');

    var fromCreation = moment(vall_Creation[0], 'x').format('YYYYMMDD');
    var toCreation = moment(vall_Creation[1], 'x').format('YYYYMMDD');


    var lacCheck = $("#lac-checkbox").is(":checked");
    // console.log('lacCheck',lacCheck);

    var selectedDepartment = $('#drop-departments').find(":selected").val();
    //console.log( 'selectedDepartment:',selectedDepartment );

    var selectedMaterial = $('#drop-materials').find(":selected").val();
    //console.log( 'selectedMaterial:',selectedMaterial );


    var dataFilteredDeps = filterDropdown(baseData, selectedDepartment, 'Department');

    var dataFilteredMaterials = filterDropdown(dataFilteredDeps, selectedMaterial, 'Material_Type');


    var dataFilteredLAC = filterLACcountries(dataFilteredMaterials, lacCheck);


    var dataFilteredDownladDate = filterDate('Download_Date', dataFilteredLAC, fromDownload, toDownload);
    // console.log('dataFilteredDownladDate: ('+dataFilteredDownladDate.length+')', dataFilteredDownladDate);



    var dataFilteredCreationDate = filterDate('Publication_Date', dataFilteredDownladDate, fromCreation, toCreation);
    // console.log('dataFilteredCreationDate: ('+dataFilteredCreationDate.length+')', dataFilteredCreationDate);





    var data2Graph = getCoutryTotals(dataFilteredCreationDate);


    var serie1 = $('#graph-container').d32().get('series-1');

    //serie1.setData(data2Graph, true, false, true);
    serie1.setData(data2Graph, true, true, false);

}



function filterLACcountries(data, lacCheck) {
    if (lacCheck) {
        return data.filter(function (d) {
            return lacCountries.indexOf(d.code3) >= 0
        });
    } else {
        return data;
    }
}


function filterDropdown(data, selectedItem, item) {
    if (selectedItem != 'all') {
        return data.filter(function(d){
            return d[item] == selectedItem;
        });
    } else {
        return data;
    }
}



// Create a new date from a string, return as a timestamp.
function new_timestamp(str) {

    var ts = new moment(str + '0101', 'YYYYMMDD').utc().format('x');
    // var ts = new moment('20100101','YYYYMMDD').utc().format('x');
    // console.log('ts',ts);
    return Number(ts);
    //return new Date(str).getTime();
}

// Create a new date from a string, return as a timestamp.
function timestamp(str) {

    var ts = new moment(str + '0101', 'YYYYMMDD').utc().format('x');
    // var ts = new moment('20100101','YYYYMMDD').utc().format('x');
    // console.log('ts',ts);
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
    //console.log('date',date);

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
        .filter(function(d) {
            return d[item] >= from
        })
        .filter(function(d) {
            return d[item] <= to
        });
    return dataFilteredDownladDate;

}



function getCoutryTotals(data) {

    var total = 0;

    var counts = data.reduce(function(p, c) {
        var country = c.code3;
        if (!p.hasOwnProperty(country)) {
            p[country] = 0;
        }
        p[country] += c.z;
        total += c.z;
        return p;
    }, {});

    //console.log('counts:',counts);

    // console.log(total);


    $('#totales').text(abbreviate_number(total));
    // $('#totales').text(total);

    var countsExtended = Object.keys(counts).map(function(k) {
        return {
            code3: k,
            z: counts[k]
        };
    });

    //console.log(countsExtended);



    var serieTopCountries = countsExtended
        .sort(dynamicSort("-z"))
        .slice(0, 10)
        .map(function(d) {
            return [d.code3, d.z];
        });
    var serie2 = $('#bar-graph-countries').d32Bars().get('series-2');
    serie2.setData(serieTopCountries, true, false, false);

    //console.log('data:',data);

    var countsSource = data.reduce(function(p, c) {
        var source = c.Source;
        if (!p.hasOwnProperty(source)) {
            p[source] = 0;
        }
        p[source] += 1;
        // p[source] += c.z;
        return p;
    }, {});
    //console.log('countsSource:',countsSource);
    var countsSourceExtended = Object.keys(countsSource).map(function(k){
        return {
            src: k,
            total: countsSource[k]
        };
    });

    //console.log(countsSourceExtended);

    var serieTopSources = countsSourceExtended
        .sort(dynamicSort("-total"))
        .slice(0, 10)
        .map(function(d) {
            return [d.src, d.total];
        });

    var serie3 = $('#bar-graph-sources').d32Bars().get('series-2');
    serie3.setData(serieTopSources, true, false, false);



    return countsExtended;
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



function barGraph(selectorID, title) {

    d32Bars.chart(selectorID, {
        chart: {
            credits: false,
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
                color: '#c42a48'
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
                    fontFamily: 'Verdana, sans-serif'
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
            pointFormat: '<b>{point.y}</b>',
            backgroundColor: '#F0C5CC', //'#d699a6',  // 'rgb(214, 153, 166)',
            borderColor: '#c42a48',
            borderRadius: 20,
            borderWidth: 1
        },
        plotOptions: {
            series: {
                pointPadding: 0,
                pointWidth: 18,
                borderWidth: 1,
                borderColor: '#c42a48'
            }
        },
        series: [{
            id: 'series-2',
            name: 'Population',
            color: 'rgb(214, 153, 166)', //'#c42a48',
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
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}

function graph(data2Graph) {

    d32.mapChart('graph-container', {
        chart: {
            credits: false,
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
            }
        },
        tooltip: {
            // pointFormat: '<b>{point.z}</b>',
            backgroundColor: '#F0C5CC', //'#d699a6', // 'rgb(214, 153, 166)',
            borderColor: '#c42a48',
            borderRadius: 20,
            borderWidth: 1
        },
        series: [{
            name: 'Countries',
            color: '#00FF00',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            id: 'series-1',
            color: '#c42a48',
            name: 'Downloads',
            joinBy: ['iso-a3', 'code3'],
            data: data2Graph, //getCoutryTotals(), // countsExtended, // baseData, // data,
            minSize: 1,
            maxSize: '4%', // '7%', // '15%', // '50', // '5%', // '12%',
            tooltip: {
                pointFormat: '{point.properties.hc-a2}: {point.z}'
            }
        }]
    });

}