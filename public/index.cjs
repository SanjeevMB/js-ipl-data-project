fetch('./output/1-matches-per-year.json')
  .then((data) => data.json())
  .then((data) => {
    let matchYear = Object.values(data);

    Highcharts.chart('container1', {

      title: {
        text: 'Indian premier league',
        align: 'left'
      },

      subtitle: {
        align: 'left'
      },

      yAxis: {
        title: {
          text: 'Number of Matches'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2008 to 2020'
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
        name: 'Mathes per year',
        data: matchYear
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
  })