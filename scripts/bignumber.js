// console.log(bnPublicationsArrays.publicationsDepartments);
var filter = "departments";
// var valueFilter = "AUG"
var valueFilter = "CSD"
var options = {
    useEasing: true,
    useGrouping: true,
    separator: '',
    decimal: '',
};
// var jsondata = "";
if (filter == "departments"){
    jsondataPublications = bnPublicationsArrays.publicationsDepartments.filter(data => data.department_codes == valueFilter);
    jsondataMoocs = moocsIndicatorsArray.indicatorsDepartments.filter(data => data.department_codes == valueFilter);
    jsondataDatasets = datasetsIndicatorsArray.indicatorsDepartments.filter(data => data.department_codes == valueFilter);
}
else if(filter == "divisions"){
    jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(data => data.division_codes == valueFilter);
    jsondataMoocs = moocsIndicatorsArray.indicatorsDivisions.filter(data => data.division_codes == valueFilter);
    jsondataDatasets = datasetsIndicatorsArray.indicatorsDivisions.filter(data => data.division_codes == valueFilter);
}
else {
    jsondataPublications = bnPublicationsArrays.publicationsIDB;
    jsondataMoocs = moocsIndicatorsArray.indicatorsIDB;
    jsondataDatasets = datasetsIndicatorsArray.indicatorsIDB;
}
console.log(jsondataMoocs);
var dataPublicationsResults = publicationsIndicatorAlltime(jsondataPublications);
var dataMoocsResults = moocsIndicatorAlltime(jsondataMoocs);
var dataDatasetsResults = datasetsIndicatorAlltime(jsondataDatasets);

setDataMain(dataPublicationsResults, dataMoocsResults, dataDatasetsResults);
$("input[name*='blueTrend']").click(function () {
    // console.log(jsondata);
    
    if (this.id == "blueAllTime") {
        dataResultsPublications = publicationsIndicatorAlltime(jsondataPublications);
        dataResultsMoocs = moocsIndicatorAlltime(jsondataMoocs);
        dataResultsDatasets = datasetsIndicatorAlltime(jsondataDatasets);
    } else {
        dataResultsPublications = publicationsIndicator2018(jsondataPublications);
        dataResultsMoocs = moocsIndicator2018(jsondataMoocs);
        dataResultsDatasets = datasetsIndicator2018(jsondataDatasets);
    }
    setDataMain(dataResultsPublications, dataResultsMoocs, dataResultsDatasets);
});

// publicationsValue = (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '';
function setDataMain(dataResultsPublications, dataResultsMoocs, dataResultsDatasets) {
    setDataPublications(dataResultsPublications);
    setDataMoocs(dataResultsMoocs);
    setDataDatasets(dataResultsDatasets);
}
















/**
 * Columna de indicadores de Publications 
 */
function publicationsIndicatorAlltime(jsondata){
    var results = {
        publicationsValue : (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '',
        porcent_total_publications : "Missing", // no se enviaron en los datos para el porcentaje total de publicaciones filtrado por all time
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? ((jsondata[0]['all_the_time_downloads'] > 1000) ? ((jsondata[0]['all_the_time_downloads'] / 1000).toFixed(0) + 'K') : jsondata[0]['all_the_time_downloads']) : '',
        porcent_total_downloads : "Missing", // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac : (jsondata.length > 0) ? (jsondata[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) + '%' : ''
    }
    return results;
}
function publicationsIndicator2018(jsondata){
    var results = {
        publicationsValue: (jsondata.length > 0) ? jsondata[0]['2018_publications'] : '',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_publications'] * 100).toFixed(1) + '%': '',
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? ((jsondata[0]['2018_downloads'] > 1000) ? ((jsondata[0]['2018_downloads'] / 1000).toFixed(0) + 'K') : jsondata[0]['2018_downloads']) : '',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%': '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

function setDataPublications(dataResults) {
    // $('.valuepublications').text(dataResults.publicationsValue);
    var valuepublications = new CountUp('valuepublications', 0, dataResults.publicationsValue, 0, 1.5, options);
    var publications_downloads = new CountUp('publications_downloads', 0, (dataResults.downloadsValue.endsWith("K") ? dataResults.downloadsValue.replace("K","") : dataResults.downloadsValue), 0, 1.5, options);
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
    console.log(results);
    return results;
}

function moocsIndicator2018(jsondata) {
    var results = {
        moocsValue: (jsondata.length > 0) ? jsondata[0]['2018_courses'] : '',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['porcent_total_courses'] * 100).toFixed(1) + '%': '',
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_courses'] : '',
        downloadsValue: (jsondata.length > 0) ? ((jsondata[0]['2018_registrations'] > 1000) ? ((jsondata[0]['2018_registrations'] / 1000).toFixed(0) + 'K') : jsondata[0]['2018_registrations']) : '',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['porcent_total_registrations'] * 100).toFixed(1) + '%': '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['porcent_total_lac'] * 100).toFixed(1) + '%' : ''
    }
    console.log(results);
    return results;
}

function setDataMoocs(dataResults) {
    var valuepublications = new CountUp('valuemoocs', 0, dataResults.moocsValue, 0, 1.5, options);
    var publications_downloads = new CountUp('moocs_downloads', 0, (dataResults.downloadsValue.endsWith("K") ? dataResults.downloadsValue.replace("K", "") : dataResults.downloadsValue), 0, 1.5, options);
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
        datasetsValue: (jsondata.length > 0) ? jsondata[0].all_the_time_datasets : '',
        porcent_total_publications: "missing",
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_datasets'] : '',
        downloadsValue: (jsondata.length > 0) ? ((jsondata[0]['all_the_time_downloads'] > 1000) ? ((jsondata[0]['all_the_time_downloads'] / 1000).toFixed(0) + 'K') : jsondata[0]['all_the_time_downloads']) : '',
        porcent_total_downloads: "missing",
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['all_the_time_percent_total_lac_downloads'] * 100).toFixed(1) + '%' : ''
    }
    console.log(results);
    return results;
}

function datasetsIndicator2018(jsondata) {
    var results = {
        datasetsValue: (jsondata.length > 0) ? jsondata[0]['2018_datasets'] : '',
        porcent_total_publications: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_datasets'] * 100).toFixed(1) + '%' : '',
        compare2017_2018_publications: (jsondata.length > 0) ? jsondata[0]['2017_2018_datasets'] : '',
        downloadsValue: (jsondata.length > 0) ? ((jsondata[0]['2018_downloads'] > 1000) ? ((jsondata[0]['2018_downloads'] / 1000).toFixed(0) + 'K') : jsondata[0]['2018_downloads']) : '',
        porcent_total_downloads: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_downloads'] * 100).toFixed(1) + '%' : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_lac_downloads'] * 100).toFixed(1) + '%' : ''
    }
    console.log(results);
    return results;
}

function setDataDatasets(dataResults) {
    var valuepublications = new CountUp('valuedatasets', 0, dataResults.datasetsValue, 0, 1.5, options);
    var publications_downloads = new CountUp('datasets_downloads', 0, ((dataResults.downloadsValue.endsWith("K")) ? dataResults.downloadsValue.replace("K", "") : dataResults.downloadsValue), 0, 1.5, options);
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
    console.log(dataResults.downloadsValue.endsWith("K"));
    // $('.valuedatasets').text(dataResults.datasetsValue);
    $('#datasets_porcent').text(dataResults.porcent_total_publications);
    $('#datasets_compare_2017').text(dataResults.compare2017_2018_publications);
    // $('.datasets_downloads').text(dataResults.downloadsValue);
    $('#datasets_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#datasets_downloads_lac').text(dataResults.porcent_downloads_lac);
}