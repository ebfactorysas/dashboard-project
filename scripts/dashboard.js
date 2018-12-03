/*
 * Caro
 */



/*
 * Chalo
 */





$("#deparmentSelect").on('change', function () {
    $("select[id*='divisionSelect']").val("");
    removePublicationsSvg();

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
    d3.select("#publications-plot svg").remove();
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
    drawPlotChartPublication(ObjectpublicationsAttention);
    initIndicators('divisions', sltValue);
    // $("select[id*='deparmentSelect']").val("");
    removePublicationsSvg();
    $('#idbLink').text(sltValue);
    jsonPublicationsBarras = publicationsTopArrays.topDivisionsAllTime.filter(function (dataP) {
        return dataP.division_codes == sltValue
    });
    drawTrendPublicationChart(jsonPublicationsBarras);

    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(dataT => {
        return dataT.division_codes == sltValue
    });
    drawTreePublication(jsonPublicTree, "AllTheTime");

    if (this.value == "IDB") {
        gaugeIDB();
    } else {
        $('.label-filter-select').text(this.value);
        $("#deparmentSelect").value = "";

        // mainReset();
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
    }
});

/**
 * bignumbers
 */


$(window).on('load', function () {
    initPublications();
    $('.label-filter-restidb').hide();
    
});