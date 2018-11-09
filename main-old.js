Highcharts.chart('downloads', {
    credits: false,
    colorAxis: {
        minColor: '#d1415a',
        maxColor: '#FFFFFF'
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
            name: 'A',
            value: 12,
            colorValue: 1
        }, {
            name: 'B',
            value: 6,
            colorValue: 2
        }, {
            name: 'C',
            value: 3,
            colorValue: 3
        }, {
            name: 'D',
            value: 3,
            colorValue: 4
        }, {
            name: 'E',
            value: 2,
            colorValue: 5
        }, {
            name: 'F',
            value: 2,
            colorValue: 6
        }, {
            name: 'G',
            value: 1,
            colorValue: 7
        }]
    }],
    title: {
        text: 'WHERE ARE DOWNLOADS COMING FROM',
        style:{ "color": "#D1415A", "fontSize": "12px","fontWeight":"bold" }
    },
});


Highcharts.chart('publications', {
    credits: false,
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: ''
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Downloads'
            
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Published Days'
        }
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} , {point.y} days'
            }
        }
    },
    series: [{
        showInLegend: false,  
        name: 'SCL',
        color: 'rgba(223, 83, 83, .7)',
        data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
            [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
            [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
            [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
            [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
            [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
            [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
            [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
            [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
            [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
            [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
            [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
            [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
            [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
            [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
            [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
            [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
            [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
            [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
            [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
            [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
            [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
            [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
            [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
            [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
            [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
            [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
            [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
            [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
            [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
            [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
            [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
            [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
            [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
            [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
            [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
            [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
            [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
            [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
            [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
            [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
            [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
            [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
            [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
            [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
            [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
            [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
            [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
            [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
            [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
            [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
            [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]

    }]
});


Highcharts.chart('timelines', {
    credits: false,
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'DOWNLOADS TIMELINE',
        style:{ "color": "#D1415A", "fontSize": "12px","fontWeight":"bold"}
    },
    xAxis: {type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            year: '%Y' 
        },
        },
    yAxis: [ {visible:false, // Primary yAxis
        labels: {
            format: '{value}',
          
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { visible:false,// Secondary yAxis
        title: {
            text: 'Downloads',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} ',
            /* style: {
                color: Highcharts.getOptions().colors[0]
            } */
        },
        opposite: true
    }],
    series: [{
    showInLegend: false,  
        name: 'Downloads',
        type: 'area',
        color:'#d1415a',
        yAxis: 1,
        data: [[Date.UTC(2013, 10, 25),0],[Date.UTC(2013, 11, 01),5],[Date.UTC(2013, 12, 25),10],[Date.UTC(2014, 05, 25),13],[Date.UTC(2014, 07, 25),20],[Date.UTC(2014, 12, 25),15.9],[Date.UTC(2015, 12, 25),30.9],[Date.UTC(2016, 12, 25),20.9],[Date.UTC(2017, 12, 25),52.9],[Date.UTC(2018, 12, 25),25.9]],
        

    }, {
    showInLegend: false,  
        name: '',
        type: 'spline',
        color:'#C4C4C4',
        dashStyle: 'dash',
        data: [[Date.UTC(2013, 10, 25),0],[Date.UTC(2013, 11, 01),5],[Date.UTC(2013, 12, 25),10],[Date.UTC(2014, 05, 25),15],[Date.UTC(2014, 07, 25),25],[Date.UTC(2014, 12, 25),40],[Date.UTC(2015, 12, 25),60],[Date.UTC(2016, 12, 25),100],[Date.UTC(2017, 12, 25),200],[Date.UTC(2018, 12, 25),350]],
        tooltip: {
            valueSuffix: 'K',
        }
    }]
});


 
Highcharts.chart('gauge1',{
    credits: false,
    chart: {
      type: 'solidgauge',
      backgroundColor:'transparent',
      marginTop: 30,
    },
    title: {
      text: 'PUBLICATIONS',
     	style: {
        fontSize: '16px',
        color: '#fff'
      }
    },
    exporting: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{
        outerRadius: '106%',
        innerRadius: '94%',
        backgroundColor:'#AA0206',
        borderWidth: 0
      }]
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
    },
    plotOptions: {
      solidgauge: {
        borderWidth: '12px',
        dataLabels: {
          enabled: true,
          y: -40,
          borderWidth: 0,
          backgroundColor: 'none',
          useHTML: true,
          shadow: false,
          style: {
            fontSize: '16px'
          },
          formatter: function() {
            return '<div style="width:100%;text-align:center;"><span style="font-size:3em;color:#FFFFFF;font-weight:bold;">66</span>';
          }
        },
        linecap: 'square',
        stickyTracking: true
      }
    },
    series: [{
      name: 'Subscriptions',
      borderColor: '#ffffff',
      data: [{
        color:  '#ffffff',
        radius: '100%',
        innerRadius: '100%',
        y: 15
      }]
    }],
    lang: {
      noData: "No data to display"
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#333333'
      }
    }
  });
Highcharts.chart('gauge2',{
credits: false,
chart: {
    type: 'solidgauge',
    backgroundColor:'transparent',
    marginTop: 30,
},
title: {
    text: 'DOWNLOADS',
    style: {
        fontSize: '16px',
        color: '#fff'
    }
},
exporting: {
    enabled: false
},
tooltip: {
    enabled: false
},
pane: {
    startAngle: 0,
    endAngle: 360,
    background: [{
    outerRadius: '106%',
    innerRadius: '94%',
    backgroundColor:'#AA0206',
    borderWidth: 0
    }]
},
yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
},
plotOptions: {
    solidgauge: {
    borderWidth: '12px',
    dataLabels: {
        enabled: true,
        y: -40,
        borderWidth: 0,
        backgroundColor: 'none',
        useHTML: true,
        shadow: false,
        style: {
        fontSize: '16px'
        },
        formatter: function() {
        return '<div style="width:100%;text-align:center;"><span style="font-size:3em;color:#FFFFFF;font-weight:bold;">113K</span>';
        }
    },
    linecap: 'square',
    stickyTracking: true
    }
},
series: [{
    name: 'Subscriptions',
    borderColor: '#ffffff',
    data: [{
    color:  '#ffffff',
    radius: '100%',
    innerRadius: '100%',
    y: 20
    }]
}],
lang: {
    noData: "No data to display"
},
noData: {
    style: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#333333'
    }
}
});
Highcharts.chart('gauge3',{
credits: false,
chart: {
    type: 'solidgauge',
    backgroundColor:'transparent',
    marginTop: 30,
},
title: {
    text: 'DOWNLOADS FROM LAC',
    style: {
    fontSize: '16px',
    color: '#fff'
    }
},
exporting: {
    enabled: false
},
tooltip: {
    enabled: false
},
pane: {
    startAngle: 0,
    endAngle: 360,
    background: [{
    outerRadius: '106%',
    innerRadius: '94%',
    backgroundColor:'#AA0206',
    borderWidth: 0
    }]
},
yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
},
plotOptions: {
    solidgauge: {
    borderWidth: '12px',
    dataLabels: {
        enabled: true,
        y: -40,
        borderWidth: 0,
        backgroundColor: 'none',
        useHTML: true,
        shadow: false,
        style: {
        fontSize: '16px'
        },
        formatter: function() {
        return '<div style="width:100%;text-align:center;"><span style="font-size:3em;color:#FFFFFF;font-weight:bold;">76%</span>';
        }
    },
    linecap: 'square',
    stickyTracking: true
    }
},
series: [{
    name: 'Subscriptions',
    borderColor: '#ffffff',
    data: [{
    color:  '#ffffff',
    radius: '100%',
    innerRadius: '100%',
    y: 76
    }]
}],
lang: {
    noData: "No data to display"
},
noData: {
    style: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#333333'
    }
}
});

var chart = $('#container').highcharts(),
        point = chart.series[0].points[0];
point.onMouseOver(); // Show the hover marker
chart.tooltip.refresh(point); // Show the tooltip
chart.tooltip.hide = function () {console.log()};