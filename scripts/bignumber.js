// console.log(bnPublicationsArrays.publicationsDepartments);
var jsondata = bnPublicationsArrays.publicationsDepartments.filter(data => data.department_codes == 'AUG');
var dataResults = publicationsIndicatorAlltime(jsondata);
setData(dataResults);
// console.log(jsondata);
$("input[name*='blueTrend']").click(function () {
    
    if (this.id == "blueAllTime") {
        dataResults = publicationsIndicatorAlltime(jsondata);
    } else {
        dataResults = publicationsIndicator2018(jsondata);
    }
    setData(dataResults)
});

// publicationsValue = (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '';
function setData(dataResults) {
    $('.valuepublications').text(dataResults.publicationsValue);
    $('#publications_porcent').text(dataResults.porcent_total_publications);
    $('#publications_compare_2017').text(dataResults.compare2017_2018_publications);
    $('.publications_downloads').text(dataResults.downloadsValue);
    $('#publications_downloads_porcent').text(dataResults.porcent_total_downloads);
    $('#publications_downloads_lac').text(dataResults.porcent_downloads_lac);
}



function publicationsIndicatorAlltime(jsondata){
    var results = {
        publicationsValue : (jsondata.length > 0) ? jsondata[0].all_the_time_publications : '',
        porcent_total_publications : "Missing", // no se enviaron en los datos para el porcentaje total de publicaciones filtrado por all time
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue : (jsondata.length > 0) ? jsondata[0].all_the_time_downloads : '',
        porcent_total_downloads : "Missing", // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac : (jsondata.length > 0) ? (jsondata[0].all_the_time_porcent_total_LAC_downloads * 100).toFixed(1) + '%' : ''
    }
    return results;
}
function publicationsIndicator2018(jsondata){
    var results = {
        publicationsValue: (jsondata.length > 0) ? jsondata[0]['2018_publications'] : '',
        porcent_total_publications: (jsondata.length > 0) ? jsondata[0]['2018_porcent_total_publications'] : '',
        compare2017_2018_publications : (jsondata.length > 0) ? jsondata[0]['2017_2018_publications'] : '',
        downloadsValue: (jsondata.length > 0) ? jsondata[0]['2018_downloads'] : '',
        porcent_total_downloads: (jsondata.length > 0) ? jsondata[0]['2018_porcent_total_downloads'] : '', // no se enviaron en los datos para el porcentaje total de downloads filtrado por all time
        porcent_downloads_lac: (jsondata.length > 0) ? (jsondata[0]['2018_porcent_total_LAC_downloads'] * 100).toFixed(1) + '%' : ''
    }
    // console.log(results);
    return results;
}

// console.log(dataResults);