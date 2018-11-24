// console.log(bnPublicationsArrays.publicationsDepartments);
var filter = "departments";
// var valueFilter = "AUG"
var valueFilter = "CSC"
// var jsondata = "";
if (filter == "departments"){
    jsondataPublications = bnPublicationsArrays.publicationsDepartments.filter(data => data.department_codes == valueFilter);
    jsondataMoocs = moocsIndicatorsArray.indicatorsDepartments.filter(data => data.department_codes == valueFilter);
}
else if(filter == "divisions"){
    jsondataPublications = bnPublicationsArrays.publicationsDivisions.filter(data => data.division_codes == valueFilter);
    jsondataMoocs = moocsIndicatorsArray.indicatorsDivisions.filter(data => data.division_codes == valueFilter);
}
else {
    jsondataPublications = bnPublicationsArrays.publicationsIDB;
    jsondataMoocs = moocsIndicatorsArray.indicatorsIDB;
}
console.log(jsondataMoocs);
var dataPublicationsResults = publicationsIndicatorAlltime(jsondataPublications);
var dataMoocsResults = moocsIndicatorAlltime(jsondataMoocs);

setDataMain(dataPublicationsResults, dataMoocsResults);
$("input[name*='blueTrend']").click(function () {
    // console.log(jsondata);
    
    if (this.id == "blueAllTime") {
        dataResultsPublications = publicationsIndicatorAlltime(jsondataPublications);
        dataResultsMoocs = moocsIndicatorAlltime(jsondataMoocs);
    } else {
        dataResultsPublications = publicationsIndicator2018(jsondataPublications);
        dataResultsMoocs = moocsIndicator2018(jsondataMoocs);
    }
    setDataMain(dataResultsPublications, dataResultsMoocs);
});

// publicationsValue = (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '';
function setDataMain(dataResultsPublications, dataResultsMoocs) {
    setDataPublications(dataResultsPublications);
    setDataMoocs(dataResultsMoocs);
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
    $('.valuepublications').text(dataResults.publicationsValue);
    $('#publications_porcent').text(dataResults.porcent_total_publications);
    $('#publications_compare_2017').text(dataResults.compare2017_2018_publications);
    $('.publications_downloads').text(dataResults.downloadsValue);
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
    $('.valuemoocs').text(dataResults.moocsValue);
    $('#moocs_porcent').text(dataResults.porcent_total_publications);
    $('#moocs_compare_2017').text(dataResults.compare2017_2018_publications);
    $('.moocs_downloads').text(dataResults.downloadsValue);
    $('#moocs_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#moocs_downloads_lac').text(dataResults.porcent_downloads_lac);
}