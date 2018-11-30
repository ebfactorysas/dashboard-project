
/*
 * Caro
 */



/*
 * Chalo
 */


$("#idbLink").click(function (event) {
    event.preventDefaul();
});


$("#deparmentSelect").on('change', function () {
    $("select[id*='divisionSelect']").val("");
    removePublicationsSvg();

    jsonPublicationsBarras = publicationsTopArrays.topDepartmentsAllTime.filter(function (dataP) {
        return dataP.department_codes == this.value
    });
    drawTrendPublicationChart(jsonPublicationsBarras);
    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDepartments.filter(dataT => {
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
    initIndicators('divisions', sltValue);
    $("select[id*='deparmentSelect']").val("");
    removePublicationsSvg();
    
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


$( document ).ready(function() {
//   init();
});