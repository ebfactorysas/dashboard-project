$("#deparmentSelect").on('change', function () {
    $("select[id*='divisionSelect']").val("");
    
    removePublicationsSvg();
    removePublicationsGauges();
    jsonPublicationsBarras = publicationsTopArrays.topDepartmentsAllTime.filter(function (dataP) {
        return dataP.department_codes == this.value
    });
    drawTrendPublicationChart(jsonPublicationsBarras);
    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDepartments.filter(function (dataT) {
        return dataT.department_codes == this.value
    });
    drawTreePublication(jsonPublicTree, "AllTheTime");


    initIndicators('departments', this.value);
    $('.label-filter-select').text(this.value);
    $("#divisionSelect").value = "";
    $('#blueAllTime').click();
    removePublicationsGauges();

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
});

//division filter
$("#divisionSelect").on('change', function (data) {
    var sltValue = this.value;
    $('#idbLink').text(sltValue);
    
    removePublicationsGauges();
    removePublicationsSvgAll();


    if (this.value == "IDB") {
        $('.label-filter-select').text(this.value);
        setDataIDBPublications();
        SetDataIDBDataSet();
    } else {
        initIndicators('divisions', sltValue);
        $('.label-filter-select').text(this.value);
        $('#blue2018').click();
        // $('#publication2018').click();

        //Se llama la funcion para actulizar los datos con el valor de la division seleccionada
        setDataPublicationsByDivisions(sltValue);
        setDataDataSetByDivisions(sltValue);

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
        // updateGaugesPublications();

        updateGaugesMoocs();
        updateGaugesDatasets();
        updateGaugesCode();
        updateGaugesSubscribers();
    }
});

/**
 * Funciones para cuando se cambia de division para IDB
 */

function setDataIDBPublications(){
    // dataPublicationGauge = setPublicationGauge();
    // dataPublicationGauge2018 = setPublicationGauge2018();
    removePublicationsSvgAll();
    var downloadTimelineIDB = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineIDB);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
    // gaugeIDB();
    initIndicators('', '');
    dataPublicationGauge2018 = setPublicationGauge2018();
    drawGaugePublicationChart(dataPublicationGauge2018);
    drawLinesChartPublication(dataLinesPublications);
    createChartTimelinePublication(downloadTimelineIDB, 'init');
    drawTrendPublicationChart(publicationsTopArrays.topIDBAllTime);
    drawPlotChartPublication(ObjectpublicationsAttention, 'init');
    drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "2018", 'init');
}


function SetDataIDBDataSet(){
    drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");
}



/**
 * Funcion para actualizar la informacion de la seccion de publicaciones
 */
function setDataPublicationsByDivisions(sltValue) {
    // removePublicationsGauges();
    // removePublicationsSvgAll();
    dataPublicationGauge2018 = setPublicationGauge2018();
    drawGaugePublicationChart(dataPublicationGauge2018);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
    drawPlotChartPublication(ObjectpublicationsAttention);

    // $("select[id*='deparmentSelect']").val("");
    $('#idbLink').text(sltValue);
    jsonPublicationsBarras = publicationsTopArrays.topDivisionsAllTime.filter(function (dataP) {
        return dataP.division_codes == sltValue
    });
    drawTrendPublicationChart(jsonPublicationsBarras, '2018', '');

    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(dataT => {
        return dataT.division_codes == sltValue
    });
    drawTreePublication(jsonPublicTree, "2018", 'init');
    var auxDownloadTimelineDivisions = publicationsDownloadTimelineArray.downloadTimelineDivisions.filter(function (d){
        return d.division_codes == sltValue
    })
    auxDownloadTimelineDivisions = $.extend(true, [], auxDownloadTimelineDivisions[0].data);
    createChartTimelinePublication(auxDownloadTimelineDivisions, '');

    // d3.select("#publications-plot svg").remove();
}
/**
 * Funcion para actualizar la informacion de la seccion de dataset
 */

 function setDataDataSetByDivisions(sltValue) {

    //treemap
    jsonDataSetTree = datasetsDownloadSource.downloadSourceDivisions.filter(dataT => {
        return dataT.division_codes == sltValue
    });
    drawTreeDataset(jsonDataSetTree, "2018", 'init');

    //chart time line
    var ObjectDataSetPlot = $.extend(true, [], datasetsScatterplotArrays);
    jsonPlotDataSet = ObjectDataSetPlot.filter(dataT => {
        return dataT.division_codes == sltValue
    });
    createChartTimeLineDataSet(jsonPlotDataSet);
 }



/**
 * bignumbers
 */


$(window).on('load', function () {
    initPublications();
    initDataSet();
    $('.label-filter-restidb').hide();
    
});