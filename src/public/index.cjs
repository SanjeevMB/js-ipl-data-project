fetch('./output/1-matches-per-year.json')
  .then((data) => data.json())
  .then((data) => {
    let matchPerYear = Object.values(data);
    Highcharts.chart('container1', {

      title: {
        text: 'Indian premier league total matches 2008-2017',
        align: 'left'
      },

      yAxis: {
        title: {
          text: 'Number of Matches'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2008 to 2023'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2008
        }
      },

      series: [{
        name: 'IPL',
        data: matchPerYear
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    });

  });


fetch('./output/2-matches-won-per-team-per-year.json')
  .then((data) => data.json())
  .then((data) => {

    let allValues = data.map((element) => {
      return Object.values(element)
    })

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('container2', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Matches won per team per year'
      },
      subtitle: {
        text: '' +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank"></a>'
      },
      xAxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        title: {
          text: 'Matches won'
        },
        labels: {
          formatter: function () {
            return this.value;
          }
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: allValues[0][allValues[0].length-1],
        marker: {
          symbol: 'square'
        },
        data: allValues[0]

      }, {
        name: allValues[1][allValues[1].length-1],
        marker: {
          symbol: 'disc'
        },
        data: allValues[1]
      },{
        name: allValues[2][allValues[2].length-1],
        marker: {
          symbol: 'circle'
        },
        data: allValues[2]
      },{
        name: allValues[3][allValues[3].length-1],
        marker: {
          symbol: 'triangle'
        },
        data: allValues[3]
      },{
        name: allValues[4][allValues[4].length-1],
        marker: {
          symbol: 'diamond'
        },
        data: allValues[4]
      },{
        name: allValues[5][allValues[5].length-1],
        marker: {
          symbol: 'triangle'
        },
        data: allValues[6]
      },{
        name: allValues[7][allValues[7].length-1],
        marker: {
          symbol: 'diamond'
        },
        data: allValues[7]
      },{
        name: allValues[8][allValues[8].length-1],
        marker: {
          symbol: 'diamond'
        },
        data: allValues[8]
      },{
        name: allValues[9][allValues[9].length-1],
        marker: {
          symbol: 'dot'
        },
        data: allValues[9]
      },{
        name: allValues[10][allValues[10].length-1],
        marker: {
          symbol: 'diamond'
        },
        data: allValues[10]
      },{
        name: allValues[11][allValues[11].length-1],
        marker: {
          symbol: 'triangle'
        },
        data: allValues[11]
      },{
        name: allValues[12][allValues[12].length-1],
        marker: {
          symbol: 'circle'
        },
        data: allValues[12]
      }]
    });


  })

fetch('./output/3-extra-runs-per-team-in-2016.json')
  .then((data) => data.json())
  .then((data) => {
    let extraRunValues = Object.values(data);
    let extraRunKeys = Object.keys(data);

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('container3', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Extra runs given by per team in 2016'
      },
      subtitle: {
        text: '' +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank"></a>'
      },
      xAxis: {
        categories: extraRunKeys
      },
      yAxis: {
        title: {
          text: 'Extra runs'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Teams',
        data: extraRunValues
      },]
    });
  });


fetch('.//output/4-top-10-economical-bowlers-in-2015.json')
  .then((data) => data.json())
  .then((data) => {
    let bowlerName = data.map((element) => {
      return element[0];
    });
    let economy = data.map((element) => {
      return element[1];
    });

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('container4', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Top ten economical bowler'
      },
      subtitle: {
        text: '' +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank"></a>'
      },
      xAxis: {
        categories: bowlerName,
        accessibility: {
          description: 'Months of'
        }
      },
      yAxis: {
        title: {
          text: 'Economy rate'
        },
        labels: {
          formatter: function (economy) {
            return economy.value;
          }
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Economy',
        marker: {
          symbol: 'diamond'
        },
        data: [{
          y: 1.5,
          marker: {
            // symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
          },
          accessibility: {
            description: 'Snowy symbol, this is the coldest point in the chart.'
          }
        }, economy[0], economy[1], economy[2], economy[3], economy[4], economy[5], economy[6], economy[7], economy[8]]
      }]
    });
  });


fetch('./output/5-number-of-times-each-team-won-toss-and-also-won-the-match.json')
  .then((data) => data.json())
  .then((data) => {
    let teams = Object.values(data);
    let wonCount = Object.keys(data);

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('container5', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Number of matches and toss both won by team'
      },
      subtitle: {
        text: '' +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank"></a>'
      },
      xAxis: {
        categories: wonCount
      },
      yAxis: {
        title: {
          text: 'Matches won'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Teams',
        data: teams
      },]
    });
  });

fetch('./output/6-player-won-highest-number-Player-of-match-each-season.json')
  .then((data) => data.json())
  .then((data) => {

    let seasonEconomy = Object.values(data);

    Highcharts.chart('container6', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Bowler with best economy'
      },
      subtitle: {
        text: ': <a href="https://worldpopulationreview.com/world-cities" target="_blank"></a>'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Strike rate'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
      },
      series: [{
        name: 'Population',
        data: seasonEconomy,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    });
  });


fetch('./output/7-strike-rate-of-a-batsman-each-season.json')
  .then((data) => data.json())
  .then((data) => {

    let seasonEconomy = [];


    let keys = Object.keys(data);
    let value = Object.values(data);

    let count = 0;
    keys.map((element) => {
      let temp = [];
      temp.push(element);
      temp.push(value[count].Strike_rate);
      seasonEconomy.push(temp);
      count++;
    })

    let usableData = []
    seasonEconomy.map((element) => {
      let temp = []
      temp.push(element[0])
      temp.push(Number(element[1]));
      usableData.push(temp);
    })



    Highcharts.chart('container7', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'David Warner economy in IPL from 2009 2017'
      },
      subtitle: {
        text: ': <a href="https://worldpopulationreview.com/world-cities" target="_blank"></a>'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Strike rate'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
      },
      series: [{
        name: 'Population',
        data: usableData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    });
  });

fetch('./output/8-highest-number-of-times-one-player-dismissed-by-another-player.json')
  .then((data) => data.json())
  .then((data) => {

    Highcharts.chart('container8', {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Highest No of time one player dissmissed'
      },
      subtitle: {
        align: 'left',
        text: '<a href="http://statcounter.com" target="_blank"></a>'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Dissmissed time'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          }
        }
      },

      series: [
        {
          name: data[0],
          colorByPoint: true,
          data: [
            {
              name: data[0],
              y: data[1],
            },
          ]
        }
      ],
    });
  });


fetch('./output/9-bowler-with-best-economy-in-super-overs.json')
  .then((data) => data.json())
  .then((data) => {

    let dataArr = ["JJ Bumrah", 4];

    Highcharts.chart('container9', {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Bowler with best economy in super over'
      },
      subtitle: {
        align: 'left',
        text: '<a href="http://statcounter.com" target="_blank"></a>'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Dissmissed time'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          }
        }
      },

      series: [
        {
          name: dataArr[0],
          colorByPoint: true,
          data: [
            {
              name: dataArr[0],
              y: dataArr[1],
            },
          ]
        }
      ],
    });
  });

