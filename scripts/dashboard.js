//division filter
$("#divisionSelect").on('change', function (data) {
    changeFilterDashboard(this.value);
});

function changeFilterDashboard(sltValue){
    $('#idbLink').text($("#divisionSelect option:selected").text());
    $('.label-filter-select').text($("#divisionSelect option:selected").text());
    removeSubscribersSvg();
    if (sltValue.includes("department")) {
        var departmentSelected = $("#divisionSelect option:selected").text();
        $("#publication2018").prop("checked", true);
        $("#moocs2018").prop("checked", true);
        initIndicators('departments', departmentSelected);
        setDataPublicationsByDepartment(departmentSelected);
        setDataMoocsByDepartment(departmentSelected);
        setDataDataSetByDepartment(departmentSelected);
        setDataCodeByDepartment(departmentSelected);
        setDataSuscribersByDepartment(departmentSelected);
    } else {
        if (sltValue == "IDB") {
            setDataIDBPublications();
            setDataSubscribersIdb();
            initCode();
            initDataSet();
            initMoocs();
        } else {
            initIndicators('divisions', sltValue);
            $('#blue2018').click();
            $("#moocs2018").prop("checked", true);
            //Se llama la funcion para actulizar los datos con el valor de la division seleccionada
            setDataPublicationsByDivisions(sltValue);
            setDataMoocsByDivisions(sltValue);
            setDataDataSetByDivisions(sltValue);
            setDataSuscribersByDivisions(sltValue);
            setDataCodeByDivisions(sltValue);
            
        }
    }
}

/**
 * Funciones para cuando se cambia de division para IDB
 */

function setDataIDBPublications() {
    $("#publication2018").prop("checked", true);
    var downloadTimelineIDB = $.extend(true, [], publicationsDownloadTimelineArray.downloadTimelineIDB);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
    // gaugeIDB();
    initIndicators('', '');
    drawGaugePublicationChart($.extend(true, {}, publicationsIndicators.indicatorsIDB2018[0]));
    createChartTimelinePublication(downloadTimelineIDB, 'init');
    drawTrendPublicationChart(publicationsTopArrays.topIDB2018);
    drawLinesChartPublication(publicationsTopArrays.topIDB2018);
    drawPlotChartPublication(ObjectpublicationsAttention, 'init');
    drawTreePublication(publicationsDownloadSourceArrays.downloadSourceIDB, "2018", 'init');
}

function SetDataIDBDataSet() {
    //treemap
    drawTreeDataset(datasetsDownloadSource.downloadSourceIDB, "2018");

    //timeline
    var ObjectDataSetLineChart = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineIDB);
    createChartTimeLineDataSet(ObjectDataSetLineChart);

}

function setDataSubscribersIdb() {
   initSuscribers();
}

function setDataMoocsIdb() {
    $('#moocs2018').attr('checked');

    drawGaugeMoocsChart($.extend(true, {}, moocsGaugesIndicators.indicatorsIDB2018[0]));
    createChartTimelineMoocs($.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB));
    //    createChart($.extend(true, [], moocsRegistrationTimeline.registrationTimelineIDB));

    drawMoocsRegistrationsChart(top2018Moocs);
    drawDistributionChart(moocsEducationArrays.educationLevelIDB);
    // same data for all and 2018
    // drawStudentRegistrationsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    // drawStudentParticipantsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    // drawStudentCompletedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));
    // drawStudentCertifiedsChart($.extend(true, [], moocsStudentsFlowArrays.studentsFlowIDB));

    // Gender
    points(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Female")));
    points1(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Male")));
    points2(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Not Available")));
    points3(moocsGenderAddGray(moocsGenderFilter($.extend(true, [], moocsGenderArrays.genderIDB), "Other")));
}

/**
 * Funcion para actualizar la informacion de la seccion de publicaciones
 */
function setDataPublicationsByDivisions(sltValue) {
    $("#publication2018").prop("checked", true);
    dataPublicationGauge2018 = $.extend(true, [], publicationsIndicators.indicatorsDivisions2018)
    dataPublicationGauge2018 = dataPublicationGauge2018.filter(function (dataP) {
        return dataP.divisionCode == sltValue
    });
    drawGaugePublicationChart(dataPublicationGauge2018[0]);
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
    drawPlotChartPublication(ObjectpublicationsAttention);

    // $("select[id*='deparmentSelect']").val("");

    jsonPublicationsBarras = publicationsTopArrays.topDivisions2018.filter(function (dataP) {
        return dataP.division_codes == sltValue
    });
    drawTrendPublicationChart(jsonPublicationsBarras, '2018', '');
    drawLinesChartPublication(jsonPublicationsBarras, '2018', '');
    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDivisions.filter(function (dataT) {
        return dataT.division_codes == sltValue
    });
    drawTreePublication(jsonPublicTree, "2018", 'init');
    var auxDownloadTimelineDivisions = publicationsDownloadTimelineArray.downloadTimelineDivisions.filter(function (d) {
        return d.division_codes == sltValue
    })
    if(auxDownloadTimelineDivisions.length>0){
        auxDownloadTimelineDivisions = $.extend(true, [], auxDownloadTimelineDivisions[0].data);
    }else{
        auxDownloadTimelineDivisions = [];
    }
    
    createChartTimelinePublication(auxDownloadTimelineDivisions, '');

    // d3.select("#publications-plot svg").remove();
}

function setDataPublicationsByDepartment(sltValue) {

    

    // gauges
    dataPublicationGauge2018 = $.extend(true, [], publicationsIndicators.indicatorsDepartments2018)
    dataPublicationGauge2018 = dataPublicationGauge2018.filter(function (dataP) {
        return dataP.departmentCode == sltValue
    });
    drawGaugePublicationChart(dataPublicationGauge2018[0]);

    //plot
    var ObjectpublicationsAttention = $.extend(true, [], publicationsAttention);
    drawPlotChartPublication(ObjectpublicationsAttention);

    //data-trend
    var jsonPublicationsBarras = publicationsTopArrays.topDepartments2018.filter(function (dataP) {
        return dataP.department_code == sltValue
    });
    drawTrendPublicationChart(jsonPublicationsBarras, '2018', '');
    drawLinesChartPublication(jsonPublicationsBarras, '2018', '');

    //tree
    jsonPublicTree = publicationsDownloadSourceArrays.downloadSourceDepartments.filter(function (dataT) {
        return dataT.department_codes == sltValue
    });

    drawTreePublication(jsonPublicTree, "2018", 'init');

    //timeline
    var auxDownloadTimelineDepartment = publicationsDownloadTimelineArray.downloadTimelineDepartments.filter(function (d) {
        return d.department_code == sltValue
    })
    auxDownloadTimelineDepartment = $.extend(true, [], auxDownloadTimelineDepartment[0].data);
    createChartTimelinePublication(auxDownloadTimelineDepartment, '');

}

/**
 * Funcion para actualizar la informacion de la seccion de publicaciones
 */

 /**
  * Funcion para actualizar la informacion de la seccion de Moocs
  */
function setDataMoocsByDivisions(sltValue){
    
    
    var jsonGaugesMoocs = $.extend(true, [], moocsGaugesIndicators.indicatorsDivisions2018)

    jsonGaugesMoocs = jsonGaugesMoocs.filter(function (dataP) {
        return dataP.divisionCode == sltValue
    });
    drawGaugeMoocsChart(jsonGaugesMoocs[0]);
    
    var auxDownloadTimelineDivisions = moocsRegistrationTimeline.registrationTimelineDivisions.filter(function (d) {
        return d.code == sltValue
    })
    if(auxDownloadTimelineDivisions.length>0){
        auxDownloadTimelineDivisions = $.extend(true, [], auxDownloadTimelineDivisions[0].data);
    }else{
        auxDownloadTimelineDivisions = [];
    }
    
    createChartTimelineMoocs(auxDownloadTimelineDivisions, '');

    var jsonAgeMoocs =$.extend(true, [],  moocsAgeArrays.ageDivision2018);
    jsonAgeMoocs = jsonAgeMoocs.filter(function (dataP) {
        return dataP.divisionCode == sltValue
    });
    drawMoocsAgeDistributionChart(jsonAgeMoocs);


    drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.divisions2018,sltValue)));
    drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDivisions2018,sltValue)));
    var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDivisions, sltValue);
    drawStudentRegistrationsChart($.extend(true, [], students[0]));
    drawStudentParticipantsChart($.extend(true, [], students[0]));
    drawStudentCompletedsChart($.extend(true, [], students[0]));
    drawStudentCertifiedsChart($.extend(true, [], students[0]));

    // Gender
    var gender = divisionFilter($.extend(true, [], moocsGenderArrays.genderDivisions), sltValue);
    points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
    points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
    points2(moocsGenderAddGray(moocsGenderFilter(gender, "Not Available")));
    points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));

}

function setDataMoocsByDepartment(sltValue){
   
    
    var jsonGaugesMoocs = $.extend(true, [], moocsGaugesIndicators.indicatorsDepartments2018)

    jsonGaugesMoocs = jsonGaugesMoocs.filter(function (dataP) {
        return dataP.departmentCode == sltValue
    });
    drawGaugeMoocsChart(jsonGaugesMoocs[0]);
    
    var auxDownloadTimelineDepartment = moocsRegistrationTimeline.registrationTimelineDepartments.filter(function (d) {
        return d.code == sltValue
    })
    if(auxDownloadTimelineDepartment.length>0){
        auxDownloadTimelineDepartment = $.extend(true, [], auxDownloadTimelineDepartment[0].data);
    }else{
        auxDownloadTimelineDepartment = [];
    }
    
    createChartTimelineMoocs(auxDownloadTimelineDepartment, '');

    var jsonAgeMoocs =$.extend(true, [],  moocsAgeArrays.ageDepartments2018);
    jsonAgeMoocs = jsonAgeMoocs.filter(function (dataP) {
        return dataP.departmentCode == sltValue
    });
    drawMoocsAgeDistributionChart(jsonAgeMoocs);


    drawMoocsRegistrationsChart(orderTopMoocs(divisionFilter(moocsTopArrays.departments2018,sltValue)));
    drawDistributionChart(orderTopMoocs(divisionFilter(moocsEducationArrays.educationLevelDepartments2018,sltValue)));
    var students = divisionFilter(moocsStudentsFlowArrays.studentsFlowDepartments, sltValue);
    drawStudentRegistrationsChart($.extend(true, [], students[0]));
    drawStudentParticipantsChart($.extend(true, [], students[0]));
    drawStudentCompletedsChart($.extend(true, [], students[0]));
    drawStudentCertifiedsChart($.extend(true, [], students[0]));

    // Gender
    var gender = divisionFilter($.extend(true, [], moocsGenderArrays.genderDepartments), sltValue);
    points(moocsGenderAddGray(moocsGenderFilter(gender, "Female")));
    points1(moocsGenderAddGray(moocsGenderFilter(gender, "Male")));
    points2(moocsGenderAddGray(moocsGenderFilter(gender, "Not Available")));
    points3(moocsGenderAddGray(moocsGenderFilter(gender, "Other")));
}
/**
 * Funcion para actualizar la informacion de la seccion de dataset
 */

function setDataDataSetByDivisions(sltValue) {
    $("#dataSet2018").prop("checked", true);
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
    if (jsonTimeLineDataSet.length > 0) {
        createChartTimeLineDataSet(jsonTimeLineDataSet[0].data);
    } else {
        createChartTimeLineDataSet([]);
    }

    //data-trend
    drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDB2018));
    drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDB2018));

    datasets2018TotalGlobal = (jsondataDatasets.length > 0) ? jsondataDatasets[0]['2018_datasets'] : '0';
    datasets2018Downloads = (jsondataDatasets.length > 0) ? jsondataDatasets[0]['2018_downloads'] : '0';
    datasets2018DownloadsLac = (jsondataDatasets.length > 0) ? (jsondataDatasets[0]['2018_porcent_total_lac_downloads'] * 100).toFixed(0) : '0';

    var ObjectGaugeDataSet = $.extend(true, [], datasetsGaugesIndicators.indicatorsDivisions2018);
    ObjectGaugeDataSet = ObjectGaugeDataSet.filter(function (dataT) {
        return dataT.divisionCode == sltValue
    });
    drawGaugeDatasetChart(ObjectGaugeDataSet[0]);
    drawPlotChartDataset($.extend(true, [], datasetsScatterplotArrays));
}

function setDataDataSetByDepartment(sltValue) {
    $("#dataSet2018").prop("checked", true);
    //treemap
    jsonDataSetTree = datasetsDownloadSource.downloadSourceDepartments.filter(function (dataT) {
        return dataT.department_codes == sltValue
    });
    drawTreeDataset(jsonDataSetTree, "2018", 'init');

    //chart time line
    var ObjectDataSetTimeLine = $.extend(true, [], datasetsDownloadsTimelineArrays.downloadsTimelineDepartments);
    jsonTimeLineDataSet = ObjectDataSetTimeLine.filter(function (dataT) {
        return dataT.department_code == sltValue
    });
    if (jsonTimeLineDataSet.length > 0) {
        createChartTimeLineDataSet(jsonTimeLineDataSet[0].data);
    } else {
        createChartTimeLineDataSet([]);
    }

    //data-trend
    drawDataTrendChart($.extend(true, [], datasetsTopArrays.topIDB2018));
    drawLinesChartDataset($.extend(true, [], datasetsTopArrays.topIDB2018));

    //gauges
    var ObjectGaugeDataSet = $.extend(true, [], datasetsGaugesIndicators.indicatorsDepartments2018);
    ObjectGaugeDataSet = ObjectGaugeDataSet.filter(function (dataT) {
        return dataT.departmentCode == sltValue
    });
    drawGaugeDatasetChart(ObjectGaugeDataSet[0]);
    drawPlotChartDataset($.extend(true, [], datasetsScatterplotArrays));

}

/**
 * Funcion para actualizar la informacion de la seccion de Code
 */
function setDataCodeByDivisions(sltValue) {
    $("#code2018").prop("checked", true);
    var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.topIDB2018);

    var ObjectPageViewsTimeLine2018 = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineDivisions);
    ObjectPageViewsTimeLine2018 = ObjectPageViewsTimeLine2018.filter(function (data) {
        return data.division_codes == sltValue
    });
    var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);
    var ObjectCodePageViewSource = $.extend(true, [], codePageviewsSourceArrays.pageviewSourceDivisions);
    ObjectCodePageViewSource = ObjectCodePageViewSource.filter(function (data) {
        return data.division_codes == sltValue
    });

    var ObjectGauges = $.extend(true, [], codeGaugesIndicators.indicatorsDivisions2018);
    ObjectGauges = ObjectGauges.filter(function (data) {
        return data.divisionCode == sltValue
    });

    // drawLinesChart(dataLines);
    drawGaugeCodeChart(ObjectGauges[0]);
    drawPlotChart(ObjectcodeScatterploArrays);
    drawChartCodeTrend(ObjectTopIdb2018);
    drawLinesChartCode(ObjectTopIdb2018);
    if (ObjectPageViewsTimeLine2018.length > 0) {
        createChartTimeline(ObjectPageViewsTimeLine2018[0].data);
    } else {
        createChartTimeline([]);
    }

    drawTreeCode(ObjectCodePageViewSource, "2018");
}

function setDataCodeByDepartment(sltValue) {
    $("#code2018").prop("checked", true);
    var ObjectTopIdb2018 = $.extend(true, [], codeTopArrays.topIDB2018);

    var ObjectPageViewsTimeLine2018 = $.extend(true, [], codePageviewsTimelineArrays.pageviewTimelineDepartments);
    ObjectPageViewsTimeLine2018 = ObjectPageViewsTimeLine2018.filter(function (data) {
        return data.departmentCode == sltValue
    });
    var ObjectcodeScatterploArrays = $.extend(true, [], codeScatterploArrays);
    var ObjectCodePageViewSource = $.extend(true, [], codePageviewsSourceArrays.pageviewSourceDepartments);
    ObjectCodePageViewSource = ObjectCodePageViewSource.filter(function (data) {
        return data.department_codes == sltValue
    });

    var ObjectGauges = $.extend(true, [], codeGaugesIndicators.indicatorsDepartments2018);
    ObjectGauges = ObjectGauges.filter(function (data) {
        return data.departmentCode == sltValue
    });

    // drawLinesChart(dataLines);
    drawGaugeCodeChart(ObjectGauges[0]);
    drawPlotChart(ObjectcodeScatterploArrays);
    drawChartCodeTrend(ObjectTopIdb2018);
    drawLinesChartCode(ObjectTopIdb2018);
    if (ObjectPageViewsTimeLine2018.length > 0) {
        createChartTimeline(ObjectPageViewsTimeLine2018[0].data);
    } else {
        createChartTimeline([]);
    }

    drawTreeCode(ObjectCodePageViewSource, "2018");
}

/**
 * Funcion para actualizar la informacion de la seccion de suscribers divisions
 */
function setDataSuscribersByDivisions(sltValue) {
    //treemap
    var ObjectGenderTreeMap = $.extend(true, [], subscribersGender.genderDivisions);
    jsonSuscribersTree = ObjectGenderTreeMap.filter(function (data) {
        return data.division_code == sltValue;
    });
    drawTreeSuscriber(jsonSuscribersTree);

    //#suscribers-interested
    var ObjectTopicBars = $.extend(true, [], subscribersTopics);
    arraySuscribersTopics = ObjectTopicBars.filter(function (data) {
        return data.division_code == sltValue;
    });
    drawSuscribersChart(arraySuscribersTopics);

    //#suscribers-subtopics
    var ObjectSubTopicBars = $.extend(true, [], subscribersSubTopics);
    var arraySuscribersSubTopics = ObjectSubTopicBars.filter(function (data) {
        return data.division_code == sltValue;
    });
    drawAgeSuscribersChart(arraySuscribersSubTopics);

    //#institution-suscribers
    var objectInstitution = $.extend(true, [], subscribersInstitution.institutionDivisions);
    arraySuscribersInstitution = objectInstitution.filter(function (data) {
        return data.division_code == sltValue;
    });
    drawInstitutionsChart(arraySuscribersInstitution);


    jsondataSubscriber = subscribersArray.subscribersDivisions.filter(function (data) {
        return data.Divisions == sltValue
    });
    subscribersAllTotalGlobal = (jsondataSubscriber.length > 0) ? jsondataSubscriber[0].subscribers : '0';
    subscribersAllDownloads = (jsondataSubscriber.length > 0) ? '100%' : '0'; /** missing, se pone 100% por orden de rodrigo */
    subscribersAllDownloadsLac = (jsondataSubscriber.length > 0) ? ((jsondataSubscriber[0]['porcent_total_from_lac'] * 100 >= 100) ? "100%" : (jsondataSubscriber[0]['porcent_total_from_lac'] * 100).toFixed(1)) : '';
    gaugeSuscribers = setSuscribersGauge();
    drawGaugeSubscribersChart(gaugeSuscribers);
}

/**
 * Funcion para actualizar la informacion de la seccion de suscribers department
 */
function setDataSuscribersByDepartment(sltValue) {
    //treemap
    var ObjectGenderTreeMap = $.extend(true, [], subscribersGender.genderDeparments);
    jsonSuscribersTree = ObjectGenderTreeMap.filter(function (data) {
        return data.department == sltValue;
    });
    drawTreeSuscriber(jsonSuscribersTree);

    //#suscribers-interested
    var ObjectTopicBars = $.extend(true, [], subscribersTopics);
    arraySuscribersTopics = ObjectTopicBars.filter(function (data) {
        return data.Department == sltValue;
    });
    drawSuscribersChart(arraySuscribersTopics);

    //#suscribers-subtopics
    var ObjectSubTopicBars = $.extend(true, [], subscribersSubTopics);
    arraySuscribersSubTopics = ObjectSubTopicBars.filter(function (data) {
        return data.Departments == sltValue;
    });
    drawAgeSuscribersChart(arraySuscribersSubTopics);

    //#institution-suscribers
    var objectInstitution = $.extend(true, [], subscribersInstitution.institutionDivisions);
    arraySuscribersInstitution = objectInstitution.filter(function (data) {
        return data.division_code == sltValue;
    });
    drawInstitutionsChart(arraySuscribersInstitution);


    jsondataSubscriber = subscribersArray.subscribersDepartments.filter(function (data) {
        return data.deparment_code == sltValue
    });
    subscribersAllTotalGlobal = (jsondataSubscriber.length > 0) ? jsondataSubscriber[0].subscribers : '0';
    subscribersAllDownloads = (jsondataSubscriber.length > 0) ? '100%' : '0'; /** missing, se pone 100% por orden de rodrigo */
    subscribersAllDownloadsLac = (jsondataSubscriber.length > 0) ? ((jsondataSubscriber[0]['porcent_total_from_lac'] * 100 >= 100) ? "100%" : (jsondataSubscriber[0]['porcent_total_from_lac'] * 100).toFixed(1)) : '';
    gaugeSuscribers = setSuscribersGauge();
    drawGaugeSubscribersChart(gaugeSuscribers);
}


/**
 * bignumbers
 */


$(window).on('load', function () {
    $('.label-filter-select').text($("#divisionSelect option:selected").text());
    initPublications();
    initMoocs();
    initDataSet();
    initCode();
    initSuscribers();
});

function getItems() {   
    console.log(_spPageContextInfo.webAbsoluteUrl);

    $.ajax({
 
        async: true, // Async by default is set to “true” load the script asynchronously
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|JOSEA@iadb.org'", // URL to fetch data from sharepoint list
        method: "GET", //Specifies the operation to fetch the list item
 
        headers: {
            "accept": "application/json;odata=verbose", //It defines the Data format
            "content-type": "application/json;odata=verbose" //It defines the content type as JSON
        },
        success: function (data) {
            //data = data.d.results;
            //Iterate the data
            console.log(data);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
 
        }
    });
 }

$(document).ready(function () {
    //getItems();
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    if (isIE == true || screen.width<980) {
        $(".body").css("width", screen.width + "px");
    }
    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: 'a few seconds',
            ss: '%d seconds',
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });
    
});
var $win = $('#s4-workspace');

    $win.scroll(function () {
        if ($win.scrollTop() == 0){
            $('#s4-bodyContainer .navbar:nth-child(2)').css("position", "fixed");
            $('#s4-bodyContainer .navbar:nth-child(2)').css('margin-top','8rem');
            $('.inner-nav').css('margin-top','16rem');
            if(screen.width<=480){
                $('section.big-numbers').css('margin-top','16rem');
            }
        }else{
            if(screen.width<=480){
                $('section.big-numbers').css('margin-top','8rem');
            }
            $('.inner-nav').css('margin-top','8rem');
            $('#s4-bodyContainer .navbar:nth-child(2)').css('margin-top','0');
            $('#s4-bodyContainer .navbar:nth-child(2)').css("position", "absolute");
        }            
        
    });


$(window).resize(function () {
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    if (isIE == true) {
        $(".body").css("width", screen.width + "px");
    }

    // changeFilterDashboard($("select[id*='divisionSelect']").val());
    
});
