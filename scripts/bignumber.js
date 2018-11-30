// console.log(bnPublicationsArrays.publicationsDepartments);
var filterselect = "";
// var valueFilter = "AUG"
var valueFilter = ""

//variables globales para usar en los gauges
var publicationsAllTotalGlobal = 0;
var publicationsAllDownloads = 0;
var publicationsAllDownloadsLac = 0;
var publications2018TotalGlobal = 0;
var publications2018Downloads = 0;
var publications2018DownloadsLac = 0;

var moocsAllTotalGlobal = 0;
var moocsAllDownloads = 0;
var moocsAllDownloadsLac = 0;
var moocs2018TotalGlobal = 0;
var moocs2018Downloads = 0;
var moocs2018DownloadsLac = 0;

var datasetsAllTotalGlobal = 0;
var datasetsAllDownloads = 0;
var datasetsAllDownloadsLac = 0;
var datasets2018TotalGlobal = 0;
var datasets2018Downloads = 0;
var datasets2018DownloadsLac = 0;

var codeAllTotalGlobal = 0;
var codeAllDownloads = 0;
var codeAllDownloadsLac = 0;
var code2018TotalGlobal = 0;
var code2018Downloads = 0;
var code2018DownloadsLac = 0;

var subscribersAllTotalGlobal = 0;
var subscribersAllDownloads = 0;
var subscribersAllDownloadsLac = 0;
//FIN - variables globales para usar en los gauges

initIndicators(filterselect, valueFilter);


function gaugeIDB() {
    $("#deparmentSelect").value = "";
    $("#divisionSelect").value = "";
    initIndicators('IDB', 'IDB');
    $('#blueAllTime').click();
    d3.select("#gauge-publications svg").remove();
    d3.select("#gauge-download-p svg").remove();
    d3.select("#gauge-lac-p svg").remove();

    d3.select("#gauge-moocs svg").remove();
    d3.select("#gauge-registrations-m svg").remove();
    d3.select("#gauge-lac-m svg").remove();

    d3.select("#gauge-datasets svg").remove();
    d3.select("#gauge-download-d svg").remove();
    d3.select("#gauge-lac-d svg").remove();

    d3.select("#gauge-code svg").remove();
    d3.select("#gauge-pageview svg").remove();
    d3.select("#gauge-lac svg").remove();

    d3.select("#gauge-suscribers svg").remove();
    d3.select("#gauge-lac-s svg").remove();
    d3.select("#gauge-2018 svg").remove();
    updateGaugesPublications();
    updateGaugesMoocs();
    updateGaugesDatasets();
    updateGaugesCode();
    updateGaugesSubscribers();
};

function initIndicators(filterselect, valueFilter) {
    // var jsondata = "";
    if (filterselect == "departments") {
        jsondataPublications = bnPublicationsArrays.publicationsDepartments.filter(function (data) {
            return data.department_codes == valueFilter
        });
        jsondataMoocs = moocsIndicatorsArray.indicatorsDepartments.filter(function (data) {
            return data.department_codes == valueFilter
        });
        jsondataDatasets = datasetsIndicatorsArray.indicatorsDepartments.filter(function (data) {
            return data.department_codes == valueFilter
        });
        jsondataCode = codeIndicatorsArrays.indicatorsDepartments.filter(function (data) {
            return data.department_codes == valueFilter
        });
        jsondataSubscriber = subscribersArray.subscribersDepartments.filter(function (data) {
            return data.deparment_code == valueFilter
        });
    } else if (filterselect == "divisions") {
        jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(function (data) {
            return  data.division_codes == valueFilter
        });
        jsondataMoocs = moocsIndicatorsArray.indicatorsDivisions.filter(function (data) {
            return  data.division_codes == valueFilter
        });
        jsondataDatasets = datasetsIndicatorsArray.indicatorsDivisions.filter(function (data) {
            return  data.division_codes == valueFilter
        });
        jsondataCode = codeIndicatorsArrays.indicatorsDivisions.filter(function (data) {
            return  data.division_codes == valueFilter
        });
        jsondataSubscriber = subscribersArray.subscribersDivisions.filter(function (data) {
            return data.Divisions == valueFilter
        });
    } else {
        jsondataPublications = bnPublicationsArrays.publicationsIDB;
        jsondataMoocs = moocsIndicatorsArray.indicatorsIDB;
        jsondataDatasets = datasetsIndicatorsArray.indicatorsIDB;
        jsondataCode = codeIndicatorsArrays.indicatorsIDB;
        jsondataSubscriber = subscribersArray.subscribersIDB;
    }

    var dataPublicationsResults = publicationsIndicatorAlltime(jsondataPublications);
    var dataMoocsResults = moocsIndicatorAlltime(jsondataMoocs);
    var dataDatasetsResults = datasetsIndicatorAlltime(jsondataDatasets);
    var dataCodeResults = codeIndicatorAlltime(jsondataCode);
    var dataSubscribersResults = subscriberIndicatorAlltime(jsondataSubscriber);

    // console.log(filterselect);
    // console.log(valueFilter);
    // console.log(jsondataPublications);
    // console.log(dataPublicationsResults);
    setDataMain(dataPublicationsResults, dataMoocsResults, dataDatasetsResults, dataCodeResults, dataSubscribersResults);
    getDataBignumbers(jsondataPublications, jsondataMoocs, jsondataDatasets, jsondataCode, jsondataSubscriber);
    
}
$("input[name*='blueTrend']").click(function () {
    // console.log(jsondata);

    if (this.id == "blueAllTime") {
        dataResultsPublications = publicationsIndicatorAlltime(jsondataPublications);
        dataResultsMoocs = moocsIndicatorAlltime(jsondataMoocs);
        dataResultsDatasets = datasetsIndicatorAlltime(jsondataDatasets);
        dataResultsCode = codeIndicatorAlltime(jsondataCode);
        dataResultsSubscriber = subscriberIndicatorAlltime(jsondataSubscriber);
    } else {
        dataResultsPublications = publicationsIndicator2018(jsondataPublications);
        dataResultsMoocs = moocsIndicator2018(jsondataMoocs);
        dataResultsDatasets = datasetsIndicator2018(jsondataDatasets);
        dataResultsCode = codeIndicator2018(jsondataCode);
        dataResultsSubscriber = subscriberIndicator2018(jsondataSubscriber);
    }
    
    // console.log(jsondataPublications);
    // console.log(dataResultsPublications);
    setDataMain(dataResultsPublications, dataResultsMoocs, dataResultsDatasets, dataResultsCode, dataResultsSubscriber);
});

// publicationsValue = (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '';
function setDataMain(dataResultsPublications, dataResultsMoocs, dataResultsDatasets, dataResultsCode, dataResultsSubscriber) {
    // mainReset();
    setDataPublications(dataResultsPublications);
    setDataMoocs(dataResultsMoocs);
    setDataDatasets(dataResultsDatasets);
    setCode(dataResultsCode);
    setSubscriber(dataResultsSubscriber);
}

// function mainReset() {
//     var valuepublications = new CountUp('valuepublications', 0, 0, 0, 1.0, optionsAnimation);
//     valuepublications.reset();
//     var publications_downloads = new CountUp('publications_downloads', 0, 0, 0, 1.0, optionsAnimation);
//     publications_downloads.reset();
// }






var optionsAnimation = {
    useEasing: false,
    useGrouping: false,
    separator: ',',
    decimal: '.',
};

function optionsAnimated(suffixValue) {
    var optionsAnimation = {
        useEasing: false,
        useGrouping: false,
        separator: ',',
        decimal: '.',
        suffix: suffixValue,
    };
    return optionsAnimation;
}

/**
 * Columna de indicadores de Publications 
 */
function publicationsIndicatorAlltime(jsondata){
    publicationsAllTotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_publications : '0';
    // publications2018TotalRest = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_LAC_downloads : '0';
    // publications2018TotalRest = setSettingsNumber(publications2018TotalRest).valueNumber;

    publicationsAllDownloads = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_downloads : '0';
    // publicationsAllDownloadsLac = (jsondataPublications.length > 0) ? (jsondata[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(0) : '0';
    publicationsAllDownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0].all_the_time_porcent_total_LAC_downloads != "missing" && jsondataPublications[0].all_the_time_porcent_total_LAC_downloads > 0) ? (jsondataPublications[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) : jsondataPublications[0].all_the_time_porcent_total_LAC_downloads) : 0;
    // console.log(setSettingsNumber(publications2018TotalRest).suffixNumber);
    // $('#gauge-publications .percent-complete').append(setSettingsNumber(publications2018TotalRest).suffixNumber);
    var results = {
        publicationsValue: (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '0',
        porcent_total_publications: "100%", /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_downloads'] : '0',
        porcent_total_downloads: "100%", /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        porcent_downloads_lac: (jsondata.length > 0) ? ((jsondata[0].all_the_time_porcent_total_LAC_downloads != "missing" && jsondata[0].all_the_time_porcent_total_LAC_downloads > 0) ? (jsondata[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) + '%' : jsondata[0].all_the_time_porcent_total_LAC_downloads) : 0, //falta en el archivo
    }
    return results;
}
function publicationsIndicator2018(jsondata){
    // publications2018TotalGlobal = (jsondata.length > 0) ? jsondata[0]['2018_publications'] : '0';
    // publications2018TotalGlobal = setSettingsNumber(publications2018TotalGlobal);
    var results = {
        publicationsValue: (jsondata.length > 0) ? jsondata[0]['2018_publications'] : '0',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_publications'] * 100).toFixed(1) + '%': '',
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_downloads'] : '0',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%': '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setDataPublications(dataResults) {
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.publicationsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.publicationsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.publicationsValue).decimalNumber;
    var valuepublications = new CountUp('valuepublications', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.downloadsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.downloadsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.downloadsValue).decimalNumber;
    var publications_downloads = new CountUp('publications_downloads', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!publications_downloads.error) {
        publications_downloads.start();
    } else {
        console.error(publications_downloads.error);
    }
    // $('.valuepublications').text(dataResults.publicationsValue);
    $('#publications_porcent').text(dataResults.porcent_total_publications);
    $('#publications_compare_2017').text(dataResults.compare2017_2018_publications);
    // $('.publications_downloads').text(dataResults.downloadsValue);
    $('#publications_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#publications_downloads_lac').text(dataResults.porcent_downloads_lac);
}

function updateGaugesPublications(){
    var dataPublicationGauge1 = {
        "publication": {
            "total": (publicationsAllTotalGlobal > 100) ? 1000 : 100,
            "allocated": publicationsAllTotalGlobal
        },
        "download": {
            "total": (publicationsAllDownloads > 100) ? 1000 : 100,
            "allocated": publicationsAllDownloads
        },
        "lac": {
            "total": (publicationsAllDownloads > 100) ? 1000 : 100,
            "allocated": publicationsAllDownloadsLac
        }
    }
    drawGaugePublicationChart(dataPublicationGauge1);
}



/**
 * Columna de indicadores de MOOCS 
 */
function moocsIndicatorAlltime(jsondata) {
    
    var results = {
        moocsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_courses'] : '0',
        porcent_total_publications: '100%', /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_courses'] : '0',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_registrations'] : '0',
        // porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['all_the_time_porcent_total_registrations'] * 100).toFixed(1) + '%' : '', /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        porcent_total_downloads: (jsondata.length > 0) ? ((jsondata[0]['all_the_time_porcent_total_registrations'] * 100 >= 100) ? "100%" : (jsondata[0]['all_the_time_porcent_total_registrations'] * 100).toFixed(1) + '%') : '', /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        porcent_downloads_lac: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_LAC'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_LAC'] * 100).toFixed(1) + '%') : '',
    }
    // console.log(results);
    return results;
}

function moocsIndicator2018(jsondata) {
    
    var results = {
        moocsValue: (jsondata.length > 0) ? jsondata[0]['2018_courses'] : '0',
        // porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['porcent_total_courses'] * 100).toFixed(1) + '%': '',
        porcent_total_publications: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_courses'] * 100 == 100) ? "100%" : (jsondata[0]['porcent_total_courses'] * 100).toFixed(1) + '%') : '',
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_courses'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_registrations'] : '0',
        // porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['porcent_total_registrations'] * 100).toFixed(1) + '%' : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_total_downloads: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_registrations'] * 100 == 100) ? "100%" : (jsondata[0]['porcent_total_registrations'] * 100).toFixed(1) + '%') : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        // porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_LAC'] * 100).toFixed(1) + '%' : ''
        porcent_downloads_lac: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_LAC'] * 100 == 100) ? "100%" : (jsondata[0]['porcent_total_LAC'] * 100).toFixed(1) + '%') : '',
    }
    // console.log(results);
    return results;
}

function setDataMoocs(dataResults) {

    // optionsUpdated = optionsAnimated("");
    // if (parseFloat(dataResults.moocsValue) > 1000) {
    //     dataResults.moocsValue = dataResults.moocsValue / 1000;
    //     optionsUpdated = optionsAnimated("K");
    // }
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.moocsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.moocsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.moocsValue).decimalNumber;
    var valuepublications = new CountUp('valuemoocs', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.downloadsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.downloadsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.downloadsValue).decimalNumber;
    var publications_downloads = new CountUp('moocs_downloads', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }
    if (!publications_downloads.error) {
        publications_downloads.start();
    } else {
        console.error(publications_downloads.error);
    }
    // $('.valuemoocs').text(dataResults.moocsValue);
    $('#moocs_porcent').text(dataResults.porcent_total_publications);
    $('#moocs_compare_2017').text(dataResults.compare2017_2018_publications);
    // $('.moocs_downloads').text(dataResults.downloadsValue);
    $('#moocs_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#moocs_downloads_lac').text(dataResults.porcent_downloads_lac);
}
function updateGaugesMoocs() {
    var dataGaugeMoocs = {
        "code": {
            "total": (moocsAllTotalGlobal > 0) ? ((moocsAllTotalGlobal > 100) ? 1000 : 100) : 100,
            "allocated": moocsAllTotalGlobal
        },
        "pageview": {
            "total": (moocsAllDownloads > 0) ? ((moocsAllDownloads > 100) ? 1000 : 100) : 100,
            "allocated": moocsAllDownloads
        },
        "lac": {
            "total": (moocsAllDownloadsLac > 0) ? ((moocsAllDownloadsLac > 100) ? 1000 : 100) : 100,
            "allocated": moocsAllDownloadsLac
        }
    }
    drawGaugeMoocsChart(dataGaugeMoocs);
}


/**
 * Columna de indicadores de DATASETS 
 */
function datasetsIndicatorAlltime(jsondata) {
    
    var results = {
        datasetsValue: (jsondata.length > 0) ? jsondata[0].all_the_time_datasets : '0',
        porcent_total_publications: "100%", /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_datasets'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_downloads'] : '0',
        porcent_total_downloads: "100%", /*missing, rodrigo dice que si falta el dato que pongamos 100% para all the time*/
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['all_the_time_porcent_total_lac_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function datasetsIndicator2018(jsondata) {
    
    var results = {
        datasetsValue: datasets2018TotalGlobal,
        // porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_datasets'] * 100).toFixed(1) + '%' : '',
        porcent_total_publications: (jsondata.length > 0) ? ((jsondata[0]['2018_porcent_total_datasets'] * 100 >= 100) ? "100%" : (jsondata[0]['2018_porcent_total_datasets'] * 100).toFixed(1) + '%') : '',
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_datasets'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_downloads'] : '0',
        // porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%' : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_total_downloads: (jsondata.length > 0) ? ((jsondata[0]['2018_porcent_total_downloads'] * 100 >= 100) ? "100%" : (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%') : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        // porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_lac_downloads'] * 100).toFixed(1) + '%' : ''
        porcent_downloads_lac: (jsondata.length > 0) ? ((jsondata[0]['2018_porcent_total_lac_downloads'] * 100 >= 100) ? "100%" : (jsondata[0]['2018_porcent_total_lac_downloads'] * 100).toFixed(1) + '%') : '',
    }
    // console.log(results);
    return results;
}

function setDataDatasets(dataResults) {
    // optionsUpdated = optionsAnimated("");
    // if (parseFloat(dataResults.datasetsValue) > 1000) {
    //     dataResults.datasetsValue = dataResults.datasetsValue / 1000;
    //     optionsUpdated = optionsAnimated("K");
    // }
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.datasetsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.datasetsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.datasetsValue).decimalNumber;
    var valuepublications = new CountUp('valuedatasets', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    // optionsUpdated = optionsAnimated("");
    // if (parseFloat(dataResults.downloadsValue) > 1000) {
    //     dataResults.downloadsValue = dataResults.downloadsValue / 1000;
    //     optionsUpdated = optionsAnimated("K");
    // }
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.downloadsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.downloadsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.downloadsValue).decimalNumber;
    var publications_downloads = new CountUp('datasets_downloads', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!publications_downloads.error) {
        publications_downloads.start();
    } else {
        console.error(publications_downloads.error);
    }
    // console.log(dataResults.downloadsValue.endsWith("K"));
    // $('.valuedatasets').text(dataResults.datasetsValue);
    $('#datasets_porcent').text(dataResults.porcent_total_publications);
    $('#datasets_compare_2017').text(dataResults.compare2017_2018_publications);
    // $('.datasets_downloads').text(dataResults.downloadsValue);
    $('#datasets_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#datasets_downloads_lac').text(dataResults.porcent_downloads_lac);
}
function updateGaugesDatasets() {
    var dataGaugeDatasets = {
        "code": {
            "total": (datasetsAllTotalGlobal > 0) ? ((datasetsAllTotalGlobal > 100) ? 1000 : 100) : 100,
            "allocated": datasetsAllTotalGlobal
        },
        "pageview": {
            "total": (datasetsAllDownloads > 0) ? ((datasetsAllDownloads > 100) ? 1000 : 100) : 100,
            "allocated": datasetsAllDownloads
        },
        "lac": {
            "total": (datasetsAllDownloadsLac > 0) ? ((datasetsAllDownloadsLac > 100) ? 1000 : 100) : 100,
            "allocated": datasetsAllDownloadsLac
        }
    }
    drawGaugeDatasetChart(dataGaugeDatasets);
}




/**
 * Columna de indicadores de CODE 
 */
function codeIndicatorAlltime(jsondata) {
    
    var results = {
        codeValue: (jsondata.length > 0) ? jsondata[0].all_the_time_code : '0',
        // porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['porcent_total_code'] * 100).toFixed(1) + '%' : '',
        porcent_total_publications: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_code'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_code'] * 100).toFixed(1) + '%') : '',
        compare2017_2018_publications: 'Missing',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_pageviews'] : '0',
        // porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0].all_the_time_porcent_total_pageviews * 100).toFixed(1) : '0',
        porcent_total_downloads: (jsondata.length > 0) ? ((jsondata[0]['all_the_time_porcent_total_pageviews'] * 100 >= 100) ? "100%" : (jsondata[0]['all_the_time_porcent_total_pageviews'] * 100).toFixed(1) + '%') : '',
        // porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_lac'] * 100).toFixed(1) + '%' : ''
        porcent_downloads_lac: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_lac'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_lac'] * 100).toFixed(1) + '%') : '',
    }
    // console.log(results);
    return results;
}

function codeIndicator2018(jsondata) {
    
    var results = {
        codeValue: (jsondata.length > 0) ? jsondata[0]['2018_code'] : '0',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_pageviews'] * 100).toFixed(1) + '%' : '',
        compare2017_2018_publications: 'Missing',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_pageviews'] : '0',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_pageviews'] * 100).toFixed(1) + '%' : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_lac'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setCode(dataResults) {
    
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.codeValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.codeValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.codeValue).decimalNumber;
    var valuepublications = new CountUp('valuecode', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.downloadsValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.downloadsValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.downloadsValue).decimalNumber;
    var publications_downloads = new CountUp('code_downloads', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!publications_downloads.error) {
        publications_downloads.start();
    } else {
        console.error(publications_downloads.error);
    }
    // console.log(dataResults.downloadsValue.endsWith("K"));
    // $('.valuedatasets').text(dataResults.datasetsValue);
    $('#code_porcent').text(dataResults.porcent_total_publications);
    $('#code_compare_2017').text(dataResults.compare2017_2018_publications);
    // $('.datasets_downloads').text(dataResults.downloadsValue);
    $('#code_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#code_downloads_lac').text(dataResults.porcent_downloads_lac);
}
function updateGaugesCode() {
    var dataGaugeCode = {
        "code": {
            "total": (codeAllTotalGlobal > 0) ? ((codeAllTotalGlobal > 100) ? 1000 : 100) : 100,
            "allocated": codeAllTotalGlobal
        },
        "pageview": {
            "total": (codeAllDownloads > 0) ? ((codeAllDownloads > 100) ? 1000 : 100) : 100,
            "allocated": codeAllDownloads
        },
        "lac": {
            "total": (codeAllDownloadsLac > 0) ? ((codeAllDownloadsLac > 100) ? 1000 : 100) : 100,
            "allocated": codeAllDownloadsLac
        }
    }
    drawGaugeCodeChart(dataGaugeCode);
}


/**
 * Columna de indicadores de SUBSCRIBER 
 */
function subscriberIndicatorAlltime(jsondata) {
    // console.log(jsondata);
    
    var results = {
        subscriberValue: (jsondata.length > 0) ? jsondata[0].subscribers : '0',
        // porcent_total_subscriber: (jsondata.length > 0) ? (jsondata[0].porcent_total_subscribers * 100).toFixed(1) + '%' : '',
        porcent_total_subscriber: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_subscribers'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_subscribers'] * 100).toFixed(1) + '%') : '',
        porcent_total_subscriber_2018: '100%', /** missing, se pone 100% por orden de rodrigo */
        // porcent_subscriber_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_from_lac'] * 100).toFixed(1) + '%' : ''
        porcent_subscriber_lac: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_from_lac'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_from_lac'] * 100).toFixed(1) + '%') : '',
    }
    // console.log(results);
    return results;
}

function subscriberIndicator2018(jsondata) {
    var results = {
        subscriberValue: (jsondata.length > 0) ? jsondata[0].subscribers : '0',
        // porcent_total_subscriber: (jsondata.length > 0) ? (jsondata[0].porcent_total_subscribers * 100).toFixed(1) + '%' : '0',
        porcent_total_subscriber: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_subscribers'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_subscribers'] * 100).toFixed(1) + '%') : '',
        porcent_total_subscriber_2018: '100%', /** missing, se pone 100% por orden de rodrigo */
        // porcent_subscriber_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_from_lac'] * 100).toFixed(1) + '%' : ''
        porcent_subscriber_lac: (jsondata.length > 0) ? ((jsondata[0]['porcent_total_from_lac'] * 100 >= 100) ? "100%" : (jsondata[0]['porcent_total_from_lac'] * 100).toFixed(1) + '%') : '',
    }
    // console.log(results);
    return results;
}

function setSubscriber(dataResults) {
    // console.log(dataResults);
    // optionsUpdated = optionsAnimated("");
    // if (parseFloat(dataResults.subscriberValue) > 1000) {
    //     dataResults.subscriberValue = dataResults.subscriberValue / 1000;
    //     optionsUpdated = optionsAnimated("K");
    // }
    // console.log(optionsAnimation);
    optionsUpdated = optionsAnimated("");
    optionsUpdated = optionsAnimated(setSettingsNumber(dataResults.subscriberValue).suffixNumber);
    dataPublicationsNumber = setSettingsNumber(dataResults.subscriberValue).valueNumber;
    decimalCount = setSettingsNumber(dataResults.subscriberValue).decimalNumber;
    var valuepublications = new CountUp('total_subscriber', 0, dataPublicationsNumber, decimalCount, 1.0, optionsUpdated);

    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    $('#porcent_subscriber').text(dataResults.porcent_total_subscriber);
    $('#porcent_subscriber_2018').text(dataResults.porcent_total_subscriber_2018);
    $('#porcent_lac').text(dataResults.porcent_subscriber_lac);
}

function updateGaugesSubscribers() {
    var dataGaugeSubscribers = {
        "code": {
            "total": (subscribersAllTotalGlobal > 0) ? ((subscribersAllTotalGlobal > 100) ? 1000 : 100) : 100,
            "allocated": subscribersAllTotalGlobal
        },
        "pageview": {
            "total": (subscribersAllDownloads > 0) ? ((subscribersAllDownloads > 100) ? 1000 : 100) : 100,
            "allocated": subscribersAllDownloads
        },
        "lac": {
            "total": (subscribersAllDownloadsLac > 0) ? ((subscribersAllDownloadsLac > 100) ? 1000 : 100) : 100,
            "allocated": subscribersAllDownloadsLac
        }
    }
    drawGaugeSubscribersChart(dataGaugeSubscribers);
}

function getDataBignumbers(jsondataPublications, jsondataMoocs, jsondataDatasets, jsondataCode, jsondataSubscriber) {
    publicationsAllTotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_publications : '0';
    publicationsAllDownloads = (jsondataPublications.length > 0) ? jsondataPublications[0].all_the_time_downloads : '0';
    publicationsAllDownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0].all_the_time_porcent_total_LAC_downloads != "missing") ? (jsondataPublications[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) : jsondataPublications[0].all_the_time_porcent_total_LAC_downloads) : '';
    publications2018TotalGlobal = (jsondataPublications.length > 0) ? jsondataPublications[0]['2018_publications'] : '0';
    publications2018Downloads = (jsondataPublications.length > 0) ? jsondataPublications[0]['2018_downloads'] : '0';
    publications2018DownloadsLac = (jsondataPublications.length > 0) ? ((jsondataPublications[0]['2018_porcent_total_LAC_downloads'] != "missing") ? (jsondataPublications[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) : jsondataPublications[0]['2018_porcent_total_LAC_downloads']) : '';

    moocsAllTotalGlobal = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['all_the_time_courses'] : '0';
    moocsAllDownloads = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['all_the_time_registrations'] : '0';
    moocsAllDownloadsLac = (jsondataMoocs.length > 0) ? (jsondataMoocs[0]['porcent_total_LAC'] * 100).toFixed(1) : '';
    moocs2018TotalGlobal = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['2018_courses'] : '0';
    moocs2018Downloads = (jsondataMoocs.length > 0) ? jsondataMoocs[0]['2018_registrations'] : '0';
    moocs2018DownloadsLac = (jsondataMoocs.length > 0) ? (jsondataMoocs[0]['porcent_total_LAC'] * 100).toFixed(1) : '';

    datasetsAllTotalGlobal = (jsondataDatasets.length > 0) ? jsondataDatasets[0].all_the_time_datasets : '0';
    datasetsAllDownloads = (jsondataDatasets.length > 0) ? jsondataDatasets[0].all_the_time_downloads : '0';
    datasetsAllDownloadsLac = (jsondataDatasets.length > 0) ? (jsondataDatasets[0].all_the_time_porcent_total_lac_downloads * 100).toFixed(0) : '0';
    datasets2018TotalGlobal = (jsondataDatasets.length > 0) ? jsondataDatasets[0]['2018_datasets'] : '0';
    datasets2018Downloads = (jsondataDatasets.length > 0) ? jsondataDatasets[0]['2018_downloads'] : '0';
    datasets2018DownloadsLac = (jsondataDatasets.length > 0) ? (jsondataDatasets[0]['2018_porcent_total_lac_downloads'] * 100).toFixed(0) : '0';

    codeAllTotalGlobal = (jsondataCode.length > 0) ? jsondataCode[0].all_the_time_code : '0';
    codeAllDownloads = (jsondataCode.length > 0) ? jsondataCode[0].all_the_time_pageviews : '0';
    codeAllDownloadsLac = (jsondataCode.length > 0) ? (jsondataCode[0].porcent_total_lac * 100).toFixed(0) : '0';
    code2018TotalGlobal = (jsondataCode.length > 0) ? jsondataCode[0]['2018_code'] : '0';
    code2018Downloads = (jsondataCode.length > 0) ? jsondataCode[0]['2018_pageviews'] : '0';
    code2018DownloadsLac = (jsondataCode.length > 0) ? (jsondataCode[0].porcent_total_lac * 100).toFixed(0) : '0';

    subscribersAllTotalGlobal = (jsondataSubscriber.length > 0) ? jsondataSubscriber[0].subscribers : '0';
    subscribersAllDownloads = (jsondataSubscriber.length > 0) ? jsondataSubscriber[0].lac_subscribers : '0';
    subscribersAllDownloadsLac = (jsondataSubscriber.length > 0) ? (jsondataSubscriber[0].porcent_total_from_lac * 100).toFixed(0) : '0';
}


function setSettingsNumber(valueNumber){
    /********
    1 - 999
    1000 = < 99999 = 1.1 K o 99.9 K
    100000 = < 999999 = 100 K o 999 K
    1000000 = < 9999999 = 1.00 M o 9.99 M
    10000000 => 10.1 M
    *********/
   decimalNumber = 0;
   suffixNumber = "";
    if (valueNumber > 0 && valueNumber <= 999) {
        valueNumber = valueNumber;
        suffixNumber = "";
    }
    else if (valueNumber > 1000 && valueNumber <= 99999) {
        valueNumber = (valueNumber / 1000).toFixed(1);
        suffixNumber = "K";
        decimalNumber = 1;
    }
    else if (valueNumber >= 100000 && valueNumber <= 999999) {
        valueNumber = (valueNumber / 1000).toFixed(0);
        suffixNumber = "K";
        decimalNumber = "";
    }
    else if (valueNumber >= 1000000 && valueNumber <= 9999999) {
        valueNumber = (valueNumber / 1000000).toFixed(2);
        suffixNumber = "M";
        decimalNumber = 2;
    }
    else if (valueNumber >= 10000000) {
        valueNumber = (valueNumber / 1000000).toFixed(1);
        suffixNumber = "M";
        decimalNumber = 1;
    }
    results = {
        valueNumber: valueNumber,
        suffixNumber: suffixNumber,
        decimalNumber: decimalNumber
    }
    return results;
}

function getPercentageTotal(value) {
    if (setSettingsNumber(value).suffixNumber == "") {
        if (value < 100) {
            gaugeTotalPercentage = 100;
        } else if (value > 100 && value < 1000) {
            gaugeTotalPercentage = 1000;
        }
    } else if (setSettingsNumber(value).suffixNumber == "K") {
        gaugeTotalPercentage = 1000000;
    } else if (setSettingsNumber(value).suffixNumber == "M") {
        if (value < 10000000) {
            gaugeTotalPercentage = 10000000;
        } else if (parseFloat(setSettingsNumber(value).valueNumber) < 20000000) {
            gaugeTotalPercentage = 20000000;
        } else if (parseFloat(setSettingsNumber(value).valueNumber) < 30000000) {
            gaugeTotalPercentage = 30000000;
        }
    }
    return gaugeTotalPercentage;
}