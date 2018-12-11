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
    removeMoocsGauges();
    removeDatasetsGauges();
    removeGaugeCode();

    d3.select("#gauge-suscribers svg").remove();
    d3.select("#gauge-lac-s svg").remove();
    d3.select("#gauge-2018 svg").remove();
    // updateGaugesPublications();
    // updateGaugesMoocs();
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
    // removeDatasetsGauges();
    removeCodeSvgAll();
    removeGaugeCode();
    
    if (this.value == "IDB") {
        $('.label-filter-select').text(this.value);
        setDataIDBPublications();
        SetDataIDBDataSet();
        setDataSubscribers();
        setDataIDBCode();
    } else {
        initIndicators('divisions', sltValue);
        $('.label-filter-select').text(this.value);
        $('#blue2018').click();


        //Se llama la funcion para actulizar los datos con el valor de la division seleccionada
        setDataPublicationsByDivisions(sltValue);
        setDataDataSetByDivisions(sltValue);
        setDataSuscribersByDivisions(sltValue);
        setDataCodeByDivisions(sltValue);
        // d3.select("#gauge-moocs svg").remove();
        // d3.select("#gauge-registrations-m svg").remove();
        // d3.select("#gauge-lac-m svg").remove();

        

        // d3.select("#gauge-code svg").remove();
        // d3.select("#gauge-pageview svg").remove();
        // d3.select("#gauge-lac svg").remove();

        // d3.select("#gauge-suscribers svg").remove();
        // d3.select("#gauge-lac-s svg").remove();
        // d3.select("#gauge-2018 svg").remove();
        // updateGaugesPublications();

        // updateGaugesMoocs();
        // updateGaugesDatasets();
        // updateGaugesCode();
        // updateGaugesSubscribers();
    }

    moocsFilter();
});

/**
 * Funciones para cuando se cambia de division para IDB
 */

function setDataIDBPublications() {
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


function SetDataIDBDataSet() {
    //treemap
    drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");

    var ObjectDataSetLineChart = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
    createChartTimeLineDataSet(ObjectDataSetLineChart);

}

function setDataIDBCode() {
    // dataPublicationGauge = setPublicationGauge();
    // dataPublicationGauge2018 = setPublicationGauge2018();
    removeCodeSvgAll();
    initCode();
}

function setDataSubscribers(){
    drawTreeSuscriber(subscribersGender.genderIDB);
    drawSuscribersChart(orderTopDataSuscribers(subscribersTopics));
    drawInstitutionsChart(subscribersInstitution.institutionIDB);
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

    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataT) {
        return dataT.division_codes == sltValue
    });
    drawTreePublication(jsonPublicTree, "2018", 'init');
    var auxDownloadTimelineDivisions = publicationsDownloadTimelineArray.downloadTimelineDivisions.filter(function (d) {
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
    jsonDataSetTree = datasetsDownloadSource.downloadSourceDivisions.filter(function (dataT) {
        return dataT.division_codes == sltValue
    });
    drawTreeDataset(jsonDataSetTree, "2018", 'init');

    //chart time line
    var ObjectDataSetTimeLine = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineDivisions);
    jsonTimeLineDataSet = ObjectDataSetTimeLine.filter(function (dataT) {
        return dataT.division_code == sltValue
    });
    if(jsonTimeLineDataSet.length>0){
        createChartTimeLineDataSet(jsonTimeLineDataSet[0].data);
    }else{
        createChartTimeLineDataSet([]);
    }
    
}

/**
 * Funcion para actualizar la informacion de la seccion de suscribers divisions
 */
function setDataSuscribersByDivisions(sltValue){
    //treemap
    var ObjectGenderTreeMap = $.extend(true, [], subscribersGender.genderDivisions);
    jsonSuscribersTree = ObjectGenderTreeMap.filter(function(data){
        return data.division_code ==sltValue;
    });
    drawTreeSuscriber(jsonSuscribersTree);

    //#suscribers-interested
    var ObjectTopicBars = $.extend(true, [], subscribersTopics);
    arraySuscribersTopics = ObjectTopicBars.filter(function(data){
        return data.division_code ==sltValue;
    });
    drawSuscribersChart(arraySuscribersTopics);

    //#institution-suscribers
    var objectInstitution = $.extend(true, [], subscribersInstitution.institutionDivisions);
    arraySuscribersInstitution = objectInstitution.filter(function(data){
        return data.division_code ==sltValue;
    });
    drawInstitutionsChart(arraySuscribersInstitution);


}

/**
 * Funcion para actualizar la informacion de la seccion de Code
 */
function setDataCodeByDivisions(sltValue) {
    // removePublicationsGauges();
    // removePublicationsSvgAll();
    var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.codeTrend2018Divisions);
    ObjectTopIdb2018 = ObjectTopIdb2018.filter(function (data){
        return data.divisionCodes == sltValue
    });
    var ObjectPageViewsTimeLine2018 = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineDivisions);
    ObjectPageViewsTimeLine2018 = ObjectPageViewsTimeLine2018.filter(function (data){
        return data.division_codes == sltValue
    });
    var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);
    ObjectcodeScatterploArrays = ObjectcodeScatterploArrays.filter(function (data){
        return data.department_codes == sltValue
    });
    var ObjectCodePageViewSource = $.extend(true, [], codePageviewsSourceArrays.pageviewSourceDivisions);
    ObjectCodePageViewSource = ObjectCodePageViewSource.filter(function (data){
        return data.division_codes == sltValue
    });

    drawLinesChart(dataLines);
    dataGaugeCode2018 = setCodeGauge2018();
    drawGaugeCodeChart(dataGaugeCode2018);
    drawPlotChart(ObjectcodeScatterploArrays);
    drawChartCodeTrend(ObjectTopIdb2018);
    createChartTimeline(ObjectPageViewsTimeLine2018[0].data);
    drawTreeCode(ObjectCodePageViewSource, "2018");
}


/**
 * Funcion para actualizar la informacion de la seccion de suscribers department
 */
function setDataSuscribersByDepartment(sltValue){
    //treemap
    jsonSuscribersTree = subscribersGender.genderDeparments.filter(function(data){
        return data.department ==sltValue;
    });
    drawTreeSuscriber(jsonSuscribersTree);
}



/**
 * bignumbers
 */


$(window).on('load', function () {
    initPublications();
    initMoocs();
    initDataSet();
    initCode();
    $('.label-filter-restidb').hide();

});