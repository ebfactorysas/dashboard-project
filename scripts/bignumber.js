// console.log(bnPublicationsArrays.publicationsDepartments);
var filter = "";
// var valueFilter = "AUG"
var valueFilter = ""
initIndicators(filter, valueFilter);

$("#deparmentSelect").on('change', function () {
    // console.log(this.value);
    mainReset();
    initIndicators('deparments', this.value);
    $("#divisionSelect").value = "";
});
$("#divisionSelect").on('change', function () {
    // console.log(this.value);
    $("#deparmentSelect").value = "";
    mainReset();
    initIndicators('divisions', this.value);
});


function initIndicators(filter, valueFilter) {
    // var jsondata = "";
    if (filter == "departments"){
        jsondataPublications = bnPublicationsArrays.publicationsDepartments.filter(data => data.department_codes == valueFilter);
        jsondataMoocs = moocsIndicatorsArray.indicatorsDepartments.filter(data => data.department_codes == valueFilter);
        jsondataDatasets = datasetsIndicatorsArray.indicatorsDepartments.filter(data => data.department_codes == valueFilter);
        jsondataCode = codeIndicatorsArrays.indicatorsDepartments.filter(data => data.department_codes == valueFilter);
        jsondataSubscriber = subscribersArray.subscribersDepartments.filter(data => data.department == valueFilter);
    }
    else if(filter == "divisions"){
        jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(data => data.division_codes == valueFilter);
        jsondataMoocs = moocsIndicatorsArray.indicatorsDivisions.filter(data => data.division_codes == valueFilter);
        jsondataDatasets = datasetsIndicatorsArray.indicatorsDivisions.filter(data => data.division_codes == valueFilter);
        jsondataCode = codeIndicatorsArrays.indicatorsDivisions.filter(data => data.division_codes == valueFilter);
        jsondataSubscriber = subscribersArray.subscribersDivisions.filter(data => data.divisions == valueFilter);
    }
    else {
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
    console.log(filter);
    console.log(valueFilter);
    console.log(jsondataPublications);
    console.log(dataPublicationsResults);
    setDataMain(dataPublicationsResults, dataMoocsResults, dataDatasetsResults, dataCodeResults, dataSubscribersResults);
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
    setDataMain(dataResultsPublications, dataResultsMoocs, dataResultsDatasets, dataResultsCode, dataResultsSubscriber);
});

// publicationsValue = (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '';
function setDataMain(dataResultsPublications, dataResultsMoocs, dataResultsDatasets, dataResultsCode, dataResultsSubscriber) {
    mainReset();
    setDataPublications(dataResultsPublications);
    setDataMoocs(dataResultsMoocs);
    setDataDatasets(dataResultsDatasets);
    setCode(dataResultsCode);
    setSubscriber(dataResultsSubscriber);
}

function mainReset() {
    var valuepublications = new CountUp('valuepublications', 0, 0, 0, 1.0, optionsAnimation);
    valuepublications.reset();
    var publications_downloads = new CountUp('publications_downloads', 0, 0, 0, 1.0, optionsAnimation);
    publications_downloads.reset();
}






var optionsAnimation = {
    useEasing: false,
    useGrouping: false,
    separator: '',
    decimal: '',
};

function optionsAnimated(suffixValue){
    var optionsAnimation = {
        useEasing: false,
        useGrouping: false,
        separator: '',
        decimal: '',
        suffix: suffixValue,
    };
    return optionsAnimation;
}

/**
 * Columna de indicadores de Publications 
 */
function publicationsIndicatorAlltime(jsondata){
    var results = {
        publicationsValue : (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '0',
        porcent_total_publications : "Missing", // no se enviaron en los datos para el porcentaje total de publicaciones filtrado por all time
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_downloads'] : '0',
        porcent_total_downloads : "Missing", // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac : (jsondata.length > 0) ? (jsondata[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) + '%' : ''
    }
    return results;
}
function publicationsIndicator2018(jsondata){
    var results = {
        publicationsValue: (jsondata.length > 0) ? jsondata[0]['2018_publications'] : '0',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_publications'] * 100).toFixed(1) + '%': '',
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_downloads'] : '0',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%': '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setDataPublications(dataResults) {
    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.publicationsValue) > 1000) {
        dataResults.publicationsValue = dataResults.publicationsValue/1000;
        optionsUpdated = optionsAnimated("K");
    }
    var valuepublications = new CountUp('valuepublications', 0, dataResults.publicationsValue, 0, 1.0, optionsUpdated);
    
    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.downloadsValue) > 1000 && parseFloat(dataResults.downloadsValue) < 1000000) {
        dataResults.downloadsValue = dataResults.downloadsValue/1000;
        optionsUpdated = optionsAnimated("K");
    }
    else if(parseFloat(dataResults.downloadsValue) > 1000000){
        dataResults.downloadsValue = dataResults.downloadsValue / 1000000;
        optionsUpdated = optionsAnimated("M");
    }
    
    var publications_downloads = new CountUp('publications_downloads', 0, dataResults.downloadsValue, 0, 1.0, optionsUpdated);
    
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



/**
 * Columna de indicadores de MOOCS 
 */
function moocsIndicatorAlltime(jsondata) {
    var results = {
        moocsValue: '0',
        porcent_total_publications: '0%', // no se enviaron en los datos para el porcentaje total de publicaciones filtrado por all time
        compare2017_2018_publications: '0',
        downloadsValue: '0',
        porcent_total_downloads: '0%', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: '0%'
    }
    // console.log(results);
    return results;
}

function moocsIndicator2018(jsondata) {
    var results = {
        moocsValue: (jsondata.length > 0) ? jsondata[0]['2018_courses'] : '0',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['porcent_total_courses'] * 100).toFixed(1) + '%': '',
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_courses'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_registrations'] : '0',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['porcent_total_registrations'] * 100).toFixed(1) + '%': '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_lac'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setDataMoocs(dataResults) {
    
    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.moocsValue) > 1000) {
        dataResults.moocsValue = dataResults.moocsValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    var valuepublications = new CountUp('valuemoocs', 0, dataResults.moocsValue, 0, 1.0, optionsUpdated);
    
    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.downloadsValue) > 1000) {
        dataResults.downloadsValue = dataResults.downloadsValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    var publications_downloads = new CountUp('moocs_downloads', 0, dataResults.downloadsValue, 0, 1.0, optionsUpdated);
    
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


/**
 * Columna de indicadores de DATASETS 
 */
function datasetsIndicatorAlltime(jsondata) {
    var results = {
        datasetsValue: (jsondata.length > 0) ? jsondata[0].all_the_time_datasets : '0',
        porcent_total_publications: "missing",
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_datasets'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_downloads'] : '0',
        porcent_total_downloads: "missing",
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['all_the_time_percent_total_lac_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function datasetsIndicator2018(jsondata) {
    var results = {
        datasetsValue: (jsondata.length > 0) ? jsondata[0]['2018_datasets'] : '0',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_datasets'] * 100).toFixed(1) + '%' : '',
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_datasets'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_downloads'] : '0',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%' : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_lac_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setDataDatasets(dataResults) {
    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.datasetsValue) > 1000) {
        dataResults.datasetsValue = dataResults.datasetsValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    
    var valuepublications = new CountUp('valuedatasets', 0, dataResults.datasetsValue, 0, 1.0, optionsAnimation);
    
    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.downloadsValue) > 1000) {
        dataResults.downloadsValue = dataResults.downloadsValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    
    var publications_downloads = new CountUp('datasets_downloads', 0, dataResults.downloadsValue, 0, 1.0, optionsAnimation);
    
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


/**
 * Columna de indicadores de CODE 
 */
function codeIndicatorAlltime(jsondata) {
    // console.log(jsondata);
    var results = {
        codeValue: (jsondata.length > 0) ? jsondata[0].all_the_time_code : '0',
        porcent_total_publications: (jsondata.length > 0) ? jsondata[0].porcent_total_code : '0',
        compare2017_2018_publications: 'Missing',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['all_the_time_pageviews'] : '0',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0].all_the_time_porcent_total_pageviews * 100).toFixed(1) : '0',
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_lac'] * 100).toFixed(1) + '%' : ''
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
    // console.log(dataResults);
    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.codeValue) > 1000) {
        dataResults.codeValue = dataResults.codeValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    // console.log(optionsAnimation);
    var valuepublications = new CountUp('valuecode', 0, dataResults.codeValue, 0, 1.0, optionsAnimation);
    
    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.downloadsValue) > 1000) {
        dataResults.downloadsValue = dataResults.downloadsValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    // console.log(optionsAnimation);
    var publications_downloads = new CountUp('code_downloads', 0, dataResults.downloadsValue, 0, 1.0, optionsAnimation);
    
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


/**
 * Columna de indicadores de SUBSCRIBER 
 */
function subscriberIndicatorAlltime(jsondata) {
    // console.log(jsondata);
    var results = {
        subscriberValue: (jsondata.length > 0) ? jsondata[0].subscribers : '0',
        porcent_total_subscriber: (jsondata.length > 0) ? (jsondata[0].porcent_total_subscribers * 100).toFixed(1) + '%': '',
        porcent_total_subscriber_2018: 'missing',
        porcent_subscriber_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_from_lac'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function subscriberIndicator2018(jsondata) {
    var results = {
        subscriberValue: (jsondata.length > 0) ? jsondata[0].subscribers : '0',
        porcent_total_subscriber: (jsondata.length > 0) ? (jsondata[0].porcent_total_subscribers * 100).toFixed(1) + '%': '0',
        porcent_total_subscriber_2018: 'missing',
        porcent_subscriber_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_from_lac'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setSubscriber(dataResults) {
    // console.log(dataResults);
    optionsUpdated = optionsAnimated("");
    if (parseFloat(dataResults.subscriberValue) > 1000) {
        dataResults.subscriberValue = dataResults.subscriberValue / 1000;
        optionsUpdated = optionsAnimated("K");
    }
    // console.log(optionsAnimation);
    var valuepublications = new CountUp('total_subscriber', 0, dataResults.subscriberValue, 0, 1.0, optionsAnimation);
    
    if (!valuepublications.error) {
        valuepublications.start();
    } else {
        console.error(valuepublications.error);
    }

    $('#porcent_subscriber').text(dataResults.porcent_total_subscriber);
    $('#porcent_subscriber_2018').text(dataResults.porcent_total_subscriber_2018);
    $('#porcent_lac').text(dataResults.porcent_subscriber_lac);
}