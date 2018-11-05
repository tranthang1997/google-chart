import {Component, OnInit, AfterViewInit} from '@angular/core';

declare var google: any;
declare var googleLoaded: any;
declare var $: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  pageTitle = 'Title';

  eventNext1 = false;
  eventPrev1 = false;

  eventNext2 = false;
  eventPrev2 = false;

  eventNext3 = false;
  eventPrev3 = false;

  maxMonth1 = 4;
  curentYear1 = 2019;
  minMonth1 = 0;

  maxMonth2 = 4;
  curentYear2 = 2018;
  minMonth2 = 0;

  maxMonth3 = 4;
  curentYear3 = 2018;
  minMonth3 = 0;

  selectedOption: string;

  constructor() {
    this.selectedOption = 'all';
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine1);
    google.charts.setOnLoadCallback(this.drawChartLine2);
    google.charts.setOnLoadCallback(this.drawChartLine3);

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartColumn);
  }

  drawChartLine1() {
    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        },
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4,
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      colors: ['black', 'blue', 'red'],
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      vAxis: {
        scaleType: 'linear',
        format: '#%',
        viewWindow: {min: 0, max: 0.4},
        'textStyle': {
          'fontSize': 16,
        },
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {},
      },
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    for (let i = 0; i < 5; i++) {
      const value1 = randomData(0.2, 0);
      const value2 = randomData(0.3, 0.2);
      const value3 = randomData(0.4, 0.3);
      data.addRows([
        [new Date(2019, i, 1),
          value1, customTooltip(new Date(2019, i, 1), value1, options.colors[0], 'T'),
          value2, customTooltip(new Date(2019, i, 1), value2, options.colors[1], 'TB'),
          value3, customTooltip(new Date(2019, i, 1), value3, options.colors[2], 'TOP')],
      ]);
    }
    const chart = new google.visualization.LineChart(document.getElementById('my-char-line1'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, 2019, 2019));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return parseFloat((((Math.random() * (max - min) + min) * 10) / 10).toFixed(2));
    }

    function fillYear(dataTable, firstYear, lastYear) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-1')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-1')[0].style.left = '60px';

      $('.last-year-1')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-1')[0].style.left = '530px';

      $('.first-year-1')[0].innerHTML = firstYear;
      $('.last-year-1')[0].innerHTML = lastYear;
    }
    function placeMarker(dataTable) {
      const cli = this.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-top')[0].style.left = '542px';
      $('.overlay-marker-top')[0].style.color = options.colors[2];

      $('.overlay-marker-tb')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-tb')[0].style.left = '542px';
      $('.overlay-marker-tb')[0].style.color = options.colors[1];

      $('.overlay-marker-t')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-t')[0].style.left = '542px';
      $('.overlay-marker-t')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value * 100}%</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  loadChart1Next(maxMonth: number, curentYear: number) {
    let firstYear = 0;
    let lastYear = 0;
    const options = {
      theme: 'material',
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent',
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4,
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      colors: ['black', 'blue', 'red'],
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      vAxis: {
        scaleType: 'linear',
        format: '#%',
        viewWindow: {min: 0, max: 0.4},
        'textStyle': {
          'fontSize': 16,
        },
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {},
      },
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', 'type');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    if (maxMonth < 7) {
      for (let i = maxMonth + 1; i <= maxMonth + 5; i++) {
        const value1 = randomData(0.2, 0);
        const value2 = randomData(0.3, 0.2);
        const value3 = randomData(0.4, 0.3);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TOP')],
        ]);
      }
      this.maxMonth1 = maxMonth + 5;
      this.minMonth1 = maxMonth + 1;
      firstYear = curentYear;
      lastYear = curentYear;
    } else {
      for (let i = maxMonth + 1; i <= 11; i++) {
        const value1 = randomData(0.2, 0);
        const value2 = randomData(0.3, 0.2);
        const value3 = randomData(0.4, 0.3);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TOP')],
        ]);
      }

      for (let j = 0; j < 5 - (11 - maxMonth); j++) {
        const value1 = randomData(0.2, 0);
        const value2 = randomData(0.3, 0.2);
        const value3 = randomData(0.4, 0.3);
        data.addRows([
          [new Date(curentYear + 1, j),
            value1, customTooltip(new Date(curentYear + 1, j), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear + 1, j), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear + 1, j), value3, options.colors[2], 'TOP')],
        ]);
      }
      this.maxMonth1 = 5 - (11 - maxMonth) - 1;
      this.minMonth1 = maxMonth + 1;
      console.log(maxMonth);
      if (maxMonth !== 11) {
        this.curentYear1++;
      }
      if (maxMonth === 11) {
        firstYear = curentYear + 1;
        lastYear = curentYear + 1;
      } else {
        firstYear = curentYear;
        lastYear = curentYear + 1;
      }
      console.log(this.maxMonth1);
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-char-line1'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, firstYear, lastYear));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return parseFloat((((Math.random() * (max - min) + min) * 10) / 10).toFixed(2));
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-1')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-1')[0].style.left = '60px';

      $('.last-year-1')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-1')[0].style.left = '530px';

      $('.first-year-1')[0].innerHTML = firstYears;
      $('.last-year-1')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = this.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-top')[0].style.left = '542px';
      $('.overlay-marker-top')[0].style.color = options.colors[2];

      $('.overlay-marker-tb')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-tb')[0].style.left = '542px';
      $('.overlay-marker-tb')[0].style.color = options.colors[1];

      $('.overlay-marker-t')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-t')[0].style.left = '542px';
      $('.overlay-marker-t')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value * 100}%</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  loadChart1Prev(minMonth: number, curentYear: number) {
    let firstYear = 0;
    let lastYear = 0;
    const options = {
      theme: 'material',
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent',
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4,
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      colors: ['black', 'blue', 'red'],
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      vAxis: {
        scaleType: 'linear',
        format: '#%',
        viewWindow: {min: 0, max: 0.4},
        'textStyle': {
          'fontSize': 16,
        },
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {},
      },
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', 'type');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    if (minMonth > 4) {
      for (let i = minMonth - 5; i < minMonth; i++) {
        const value1 = randomData(0.2, 0);
        const value2 = randomData(0.3, 0.2);
        const value3 = randomData(0.4, 0.3);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TOP')],
        ]);
      }
      this.minMonth1 = minMonth - 5;
      this.maxMonth1 = minMonth - 1;
      firstYear = curentYear;
      lastYear = curentYear;
    } else {
      for (let i = (11 + minMonth) - 4; i <= 11; i++) {
        const value1 = randomData(0.2, 0);
        const value2 = randomData(0.3, 0.2);
        const value3 = randomData(0.4, 0.3);
        data.addRows([
          [new Date(curentYear - 1, i),
            value1, customTooltip(new Date(curentYear - 1, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear - 1, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear - 1, i), value3, options.colors[2], 'TOP')],
        ]);
      }

      for (let j = 0; j < minMonth; j++) {
        const value1 = randomData(0.2, 0);
        const value2 = randomData(0.3, 0.2);
        const value3 = randomData(0.4, 0.3);
        data.addRows([
          [new Date(curentYear, j),
            value1, customTooltip(new Date(curentYear, j), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, j), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, j), value3, options.colors[2], 'TOP')],
        ]);
      }
      this.minMonth1 = (11 + minMonth) - 4;
      if (minMonth === 0) {
        this.maxMonth1 = 11;
      } else {
        this.maxMonth1 = minMonth - 1;
      }
      this.curentYear1--;
      if (minMonth === 0) {
        firstYear = curentYear - 1;
        lastYear = curentYear - 1;
      } else {
        firstYear = curentYear - 1;
        lastYear = curentYear;
      }
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-char-line1'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, firstYear, lastYear));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return parseFloat((((Math.random() * (max - min) + min) * 10) / 10).toFixed(2));
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-1')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-1')[0].style.left = '60px';

      $('.last-year-1')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-1')[0].style.left = '530px';

      $('.first-year-1')[0].innerHTML = firstYears;
      $('.last-year-1')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = this.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-top')[0].style.left = '542px';
      $('.overlay-marker-top')[0].style.color = options.colors[2];

      $('.overlay-marker-tb')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-tb')[0].style.left = '542px';
      $('.overlay-marker-tb')[0].style.color = options.colors[1];

      $('.overlay-marker-t')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-t')[0].style.left = '542px';
      $('.overlay-marker-t')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value * 100}%</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  drawChartLine2() {
    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      vAxis: {
        format: '#件',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 12,
        },
        gridlines: {count: 5},
        ticks: [0, 500, 1000, 1500, 2000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      colors: ['black', 'red', 'blue', 'green'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    for (let i = 0; i < 5; i++) {
      const value1 = randomData(500, 0);
      const value2 = randomData(1000, 500);
      const value3 = randomData(1500, 1000);
      const value4 = randomData(1500, 2000);
      data.addRows([
        [new Date(2018, i),
          value1, customTooltip(new Date(2018, i), value1, options.colors[0], 'CT'),
          value2, customTooltip(new Date(2018, i), value2, options.colors[1], 'T'),
          value3, customTooltip(new Date(2018, i), value3, options.colors[2], 'TB'),
          value4, customTooltip(new Date(2018, i), value4, options.colors[3], 'TOP')]
      ]);
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line2'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));

    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, 2018, 2018));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-2')[0].style.left = '60px';

      $('.last-year-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-2')[0].style.left = '530px';

      $('.first-year-2')[0].innerHTML = firstYears;
      $('.last-year-2')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 7))) + 70 + 'px';
      $('.overlay-marker-top-2')[0].style.left = '540px';
      $('.overlay-marker-top-2')[0].style.color = options.colors[3];

      $('.overlay-marker-tb-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-tb-2')[0].style.left = '540px';
      $('.overlay-marker-tb-2')[0].style.color = options.colors[2];

      $('.overlay-marker-t-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-t-2')[0].style.left = '540px';
      $('.overlay-marker-t-2')[0].style.color = options.colors[1];

      $('.overlay-marker-ct-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-ct-2')[0].style.left = '540px';
      $('.overlay-marker-ct-2')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value}件</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  loadChart2Next(maxMonth: number, curentYear: number) {
    let firstYear = 0;
    let lastYear = 0;
    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      vAxis: {
        format: '#件',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 12,
        },
        gridlines: {count: 5},
        ticks: [0, 500, 1000, 1500, 2000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      colors: ['black', 'red', 'blue', 'green'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    console.log('a');
    console.log(this.curentYear2);
    if (maxMonth < 7) {
      for (let i = maxMonth + 1; i <= maxMonth + 5; i++) {
        const value1 = randomData(500, 0);
        const value2 = randomData(1000, 500);
        const value3 = randomData(1500, 1000);
        const value4 = randomData(1500, 2000);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'CT'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'T'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TB'),
            value4, customTooltip(new Date(curentYear, i), value4, options.colors[3], 'TOP')]
        ]);
      }
      this.maxMonth2 = maxMonth + 5;
      this.minMonth2 = maxMonth + 1;
      firstYear = curentYear;
      lastYear = curentYear;
      console.log(this.maxMonth2);
    } else {
      for (let i = maxMonth + 1; i <= 11; i++) {
        const value1 = randomData(500, 0);
        const value2 = randomData(1000, 500);
        const value3 = randomData(1500, 1000);
        const value4 = randomData(1500, 2000);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'CT'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'T'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TB'),
            value4, customTooltip(new Date(curentYear, i), value4, options.colors[3], 'TOP')]
        ]);
      }

      for (let j = 0; j < 5 - (11 - maxMonth); j++) {
        const value1 = randomData(500, 0);
        const value2 = randomData(1000, 500);
        const value3 = randomData(1500, 1000);
        const value4 = randomData(1500, 2000);
        data.addRows([
          [new Date(curentYear + 1, j),
            value1, customTooltip(new Date(curentYear + 1, j), value1, options.colors[0], 'CT'),
            value2, customTooltip(new Date(curentYear + 1, j), value2, options.colors[1], 'T'),
            value3, customTooltip(new Date(curentYear + 1, j), value3, options.colors[2], 'TB'),
            value4, customTooltip(new Date(curentYear + 1, j), value4, options.colors[3], 'TOP')]
        ]);
      }
      this.maxMonth2 = 5 - (11 - maxMonth) - 1;
      this.minMonth2 = maxMonth + 1;
      this.curentYear2++;
      if (maxMonth === 11) {
        firstYear = curentYear + 1;
        lastYear = curentYear + 1;
      } else {
        firstYear = curentYear;
        lastYear = curentYear + 1;
      }
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line2'));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, firstYear, lastYear));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-2')[0].style.left = '60px';

      $('.last-year-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-2')[0].style.left = '530px';

      $('.first-year-2')[0].innerHTML = firstYears;
      $('.last-year-2')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 7))) + 70 + 'px';
      $('.overlay-marker-top-2')[0].style.left = '540px';
      $('.overlay-marker-top-2')[0].style.color = options.colors[3];

      $('.overlay-marker-tb-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-tb-2')[0].style.left = '540px';
      $('.overlay-marker-tb-2')[0].style.color = options.colors[2];

      $('.overlay-marker-t-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-t-2')[0].style.left = '540px';
      $('.overlay-marker-t-2')[0].style.color = options.colors[1];

      $('.overlay-marker-ct-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-ct-2')[0].style.left = '540px';
      $('.overlay-marker-ct-2')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value}件</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  loadChart2Prev(minMonth: number, curentYear: number) {
    let firstYear = 0;
    let lastYear = 0;
    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      vAxis: {
        format: '#件',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 12,
        },
        gridlines: {count: 5},
        ticks: [0, 500, 1000, 1500, 2000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      colors: ['black', 'red', 'blue', 'green'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    console.log(this.curentYear2);
    if (minMonth > 4) {
      for (let i = minMonth - 5; i < minMonth; i++) {
        const value1 = randomData(500, 0);
        const value2 = randomData(1000, 500);
        const value3 = randomData(1500, 1000);
        const value4 = randomData(1500, 2000);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'CT'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'T'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TB'),
            value4, customTooltip(new Date(curentYear, i), value4, options.colors[3], 'TOP')]
        ]);
      }
      this.minMonth2 = minMonth - 5;
      this.maxMonth2 = minMonth - 1;
      firstYear = curentYear;
      lastYear = curentYear;
    } else {
      for (let i = (11 + minMonth) - 4; i <= 11; i++) {
        const value1 = randomData(500, 0);
        const value2 = randomData(1000, 500);
        const value3 = randomData(1500, 1000);
        const value4 = randomData(1500, 2000);
        data.addRows([
          [new Date(curentYear - 1, i),
            value1, customTooltip(new Date(curentYear - 1, i), value1, options.colors[0], 'CT'),
            value2, customTooltip(new Date(curentYear - 1, i), value2, options.colors[1], 'T'),
            value3, customTooltip(new Date(curentYear - 1, i), value3, options.colors[2], 'TB'),
            value4, customTooltip(new Date(curentYear - 1, i), value4, options.colors[3], 'TOP')]
        ]);
      }

      for (let j = 0; j < minMonth; j++) {
        const value1 = randomData(500, 0);
        const value2 = randomData(1000, 500);
        const value3 = randomData(1500, 1000);
        const value4 = randomData(1500, 2000);
        data.addRows([
          [new Date(curentYear, j),
            value1, customTooltip(new Date(curentYear, j), value1, options.colors[0], 'CT'),
            value2, customTooltip(new Date(curentYear, j), value2, options.colors[1], 'T'),
            value3, customTooltip(new Date(curentYear, j), value3, options.colors[2], 'TB'),
            value4, customTooltip(new Date(curentYear, j), value4, options.colors[3], 'TOP')]
        ]);
      }
      this.minMonth2 = (11 + minMonth) - 4;
      if (minMonth === 0) {
        this.maxMonth2 = 11;
      } else {
        this.maxMonth2 = minMonth - 1;
      }
      this.curentYear2--;
      if (minMonth === 0) {
        firstYear = curentYear - 1;
        lastYear = curentYear - 1;
      } else {
        firstYear = curentYear - 1;
        lastYear = curentYear;
      }
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line2'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, firstYear, lastYear));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-2')[0].style.left = '60px';

      $('.last-year-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-2')[0].style.left = '530px';

      $('.first-year-2')[0].innerHTML = firstYears;
      $('.last-year-2')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 7))) + 70 + 'px';
      $('.overlay-marker-top-2')[0].style.left = '540px';
      $('.overlay-marker-top-2')[0].style.color = options.colors[3];

      $('.overlay-marker-tb-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-tb-2')[0].style.left = '540px';
      $('.overlay-marker-tb-2')[0].style.color = options.colors[2];

      $('.overlay-marker-t-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-t-2')[0].style.left = '540px';
      $('.overlay-marker-t-2')[0].style.color = options.colors[1];

      $('.overlay-marker-ct-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-ct-2')[0].style.left = '540px';
      $('.overlay-marker-ct-2')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value}件</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  drawChartLine3() {

    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      vAxis: {
        format: '#回',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 12,
        },
        gridlines: {count: 5},
        ticks: [0, 250, 500, 750, 1000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      colors: ['black', 'red', 'blue'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    for (let i = 0; i < 5; i++) {
      const value1 = randomData(250, 0);
      const value2 = randomData(500, 250);
      const value3 = randomData(1000, 500);
      data.addRows([
        [new Date(2018, i),
          value1, customTooltip(new Date(2018, i), value1, options.colors[0], 'T'),
          value2, customTooltip(new Date(2018, i), value2, options.colors[1], 'TB'),
          value3, customTooltip(new Date(2018, i), value3, options.colors[2], 'TOP')]
      ]);
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line3'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, 2018, 2018));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-3')[0].style.left = '60px';

      $('.last-year-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-3')[0].style.left = '530px';

      $('.first-year-3')[0].innerHTML = firstYears;
      $('.last-year-3')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-top-3')[0].style.left = '540px';
      $('.overlay-marker-top-3')[0].style.color = options.colors[2];

      $('.overlay-marker-tb-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-tb-3')[0].style.left = '540px';
      $('.overlay-marker-tb-3')[0].style.color = options.colors[1];

      $('.overlay-marker-t-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-t-3')[0].style.left = '540px';
      $('.overlay-marker-t-3')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value}回</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  loadChart3Next(maxMonth: number, curentYear: number) {
    let firstYear = 0;
    let lastYear = 0;
    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      vAxis: {
        format: '#回',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 12,
        },
        gridlines: {count: 5},
        ticks: [0, 250, 500, 750, 1000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      colors: ['black', 'red', 'blue'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    if (maxMonth < 7) {
      for (let i = maxMonth + 1; i <= maxMonth + 5; i++) {
        const value1 = randomData(250, 0);
        const value2 = randomData(500, 250);
        const value3 = randomData(1000, 500);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TOP')]
        ]);
      }
      this.maxMonth3 = maxMonth + 5;
      this.minMonth3 = maxMonth + 1;
      firstYear = curentYear;
      lastYear = curentYear;
    } else {
      for (let i = maxMonth + 1; i <= 11; i++) {
        const value1 = randomData(250, 0);
        const value2 = randomData(500, 250);
        const value3 = randomData(1000, 500);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TOP')]
        ]);
      }

      for (let j = 0; j < 5 - (11 - maxMonth); j++) {
        const value1 = randomData(250, 0);
        const value2 = randomData(500, 250);
        const value3 = randomData(1000, 500);
        data.addRows([
          [new Date(curentYear + 1, j),
            value1, customTooltip(new Date(curentYear + 1, j), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear + 1, j), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear + 1, j), value3, options.colors[2], 'TOP')]
        ]);
      }
      this.maxMonth3 = 5 - (11 - maxMonth) - 1;
      this.minMonth3 = maxMonth + 1;
      this.curentYear3++;
      if (maxMonth === 11) {
        firstYear = curentYear + 1;
        lastYear = curentYear + 1;
      } else {
        firstYear = curentYear;
        lastYear = curentYear + 1;
      }
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line3'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, firstYear, lastYear));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-3')[0].style.left = '60px';

      $('.last-year-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-3')[0].style.left = '530px';

      $('.first-year-3')[0].innerHTML = firstYears;
      $('.last-year-3')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-top-3')[0].style.left = '540px';
      $('.overlay-marker-top-3')[0].style.color = options.colors[2];

      $('.overlay-marker-tb-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-tb-3')[0].style.left = '540px';
      $('.overlay-marker-tb-3')[0].style.color = options.colors[1];

      $('.overlay-marker-t-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-t-3')[0].style.left = '540px';
      $('.overlay-marker-t-3')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value}回</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  loadChart3Prev(minMonth: number, curentYear: number) {
    let firstYear = 0;
    let lastYear = 0;
    const options = {
      hAxis: {
        format: 'M月',
        minorGridlines: {count: 0 },
        gridlines: {
          color: 'transparent'
        }
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4
      },
      tooltip: {trigger: 'hover', isHtml: true},
      legend: {position: 'none'},
      vAxis: {
        format: '#回',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 12,
        },
        gridlines: {count: 5},
        ticks: [0, 250, 500, 750, 1000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'line'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      colors: ['black', 'red', 'blue'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      pointSize: 5,
      pointShape: 'circle',
      width: 620,
      height: 350
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    if (minMonth > 4) {
      for (let i = minMonth - 5; i < minMonth; i++) {
        const value1 = randomData(250, 0);
        const value2 = randomData(500, 250);
        const value3 = randomData(1000, 500);
        data.addRows([
          [new Date(curentYear, i),
            value1, customTooltip(new Date(curentYear, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, i), value3, options.colors[2], 'TOP')]
        ]);
      }
      this.minMonth3 = minMonth - 5;
      this.maxMonth3 = minMonth - 1;
      firstYear = curentYear;
      lastYear = curentYear;
    } else {
      for (let i = (11 + minMonth) - 4; i <= 11; i++) {
        const value1 = randomData(250, 0);
        const value2 = randomData(500, 250);
        const value3 = randomData(1000, 500);
        data.addRows([
          [new Date(curentYear - 1, i),
            value1, customTooltip(new Date(curentYear - 1, i), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear - 1, i), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear - 1, i), value3, options.colors[2], 'TOP')]
        ]);
      }

      for (let j = 0; j < minMonth; j++) {
        const value1 = randomData(250, 0);
        const value2 = randomData(500, 250);
        const value3 = randomData(1000, 500);
        data.addRows([
          [new Date(curentYear, j),
            value1, customTooltip(new Date(curentYear, j), value1, options.colors[0], 'T'),
            value2, customTooltip(new Date(curentYear, j), value2, options.colors[1], 'TB'),
            value3, customTooltip(new Date(curentYear, j), value3, options.colors[2], 'TOP')]
        ]);
      }

      this.minMonth3 = (11 + minMonth) - 4;
      if (minMonth === 0) {
        this.maxMonth3 = 11;
      } else {
        this.maxMonth3 = minMonth - 1;
      }
      this.curentYear3--;
      if (minMonth === 0) {
        firstYear = curentYear - 1;
        lastYear = curentYear - 1;
      } else {
        firstYear = curentYear - 1;
        lastYear = curentYear;
      }
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line3'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    google.visualization.events.addListener(chart, 'ready', fillYear.bind(chart, data, firstYear, lastYear));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function fillYear(dataTable, firstYears, lastYears) {
      const cli = this.getChartLayoutInterface();

      $('.first-year-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 2))) + 420 + 'px';
      $('.first-year-3')[0].style.left = '60px';

      $('.last-year-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 4))) + 420 + 'px';
      $('.last-year-3')[0].style.left = '530px';

      $('.first-year-3')[0].innerHTML = firstYears;
      $('.last-year-3')[0].innerHTML = lastYears;
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 70 + 'px';
      $('.overlay-marker-top-3')[0].style.left = '540px';
      $('.overlay-marker-top-3')[0].style.color = options.colors[2];

      $('.overlay-marker-tb-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 70 + 'px';
      $('.overlay-marker-tb-3')[0].style.left = '540px';
      $('.overlay-marker-tb-3')[0].style.color = options.colors[1];

      $('.overlay-marker-t-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 70 + 'px';
      $('.overlay-marker-t-3')[0].style.left = '540px';
      $('.overlay-marker-t-3')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">${label}</td>
                    <td align="right">${value}回</td>
                  </tr>
                </tbody>
              </table>`;
    }
  }

  drawChartColumn() {

    const data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'annotation'});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'annotation'});

    for (let i = 0; i < 10; i++) {
      const value1 = randomData(0.4, 0);
      const value2 = randomData(0.4, 0);
      data.addRows([
        [i + 1 + '回', value1, '', value2, ''],
      ]);
    }

    const options = {
      tooltip: {isHtml: true},
      bar: {
        groupWidth: '80%',
        borderRadius: 0
      },
      vAxis: {
        viewWindow: {min: 0},
        format: '#%',
        gridlines: {count: 5},
        ticks: [0, 0.10, 0.20, 0.30, 0.40],
      },
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1, type: 'column'}
      },
      vAxes: {
        0: {textPosition: 'none'},
        1: {}
      },
      titleTextStyle: {
        bold: true,
        fontSize: 20
      },
      legend: {position: 'none'},
      colors: ['blue', 'red'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%'},
      width: 620,
      height: 350
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('my-chart-column'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return parseFloat((((Math.random() * (max - min) + min) * 10) / 10).toFixed(2));
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-41')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 1))) + 35 + 'px';
      $('.overlay-marker-41')[0].style.left = '77px';
      $('.overlay-marker-41')[0].style.color = options.colors[0];

      $('.overlay-marker-42')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 3))) + 35 + 'px';
      $('.overlay-marker-42')[0].style.left = '97px';
      $('.overlay-marker-42')[0].style.color = options.colors[1];

      $('.overlay-marker-43')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(9, 4))) + 105 + 'px';
      $('.overlay-marker-43')[0].style.left = '510px';
      $('.overlay-marker-43')[0].style.color = 'black';
    }
  }

  clickLoadChart1Next() {
    this.eventNext1 = true;
    console.log(this.maxMonth1);
    if (this.eventPrev1) {
      if (this.maxMonth1 === 11) {
        this.curentYear1++;
      }
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart1Next(this.maxMonth1, this.curentYear1));
    console.log(this.maxMonth1);
  }

  clickLoadChart1Prev() {
    this.eventPrev1 = true;
    if (this.eventNext1) {
      if (this.minMonth1 >= 8) {
        this.curentYear1--;
      }
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart1Prev(this.minMonth1, this.curentYear1));
  }

  clickLoadChart2Next() {
    this.eventNext2 = true;
    if (this.eventPrev2) {
      if (this.maxMonth2 <= 3) {
        this.curentYear2++;
      }
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart2Next(this.maxMonth2, this.curentYear2));
    console.log(this.curentYear2);
  }

  clickLoadChart2Prev() {
    this.eventPrev2 = true;
    if (this.eventNext2) {
      if (this.minMonth2 >= 8) {
        this.curentYear2--;
      }
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart2Prev(this.minMonth2, this.curentYear2));
    console.log(this.curentYear2);
  }

  clickLoadChart3Next() {
    this.eventNext3 = true;
    if (this.eventPrev3) {
      if (this.maxMonth3 <= 3) {
        this.curentYear3++;
      }
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart3Next(this.maxMonth3, this.curentYear3));
  }

  clickLoadChart3Prev() {
    this.eventPrev3 = true;
    if (this.eventNext3) {
      if (this.minMonth3 >= 8) {
        this.curentYear3--;
      }
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart3Prev(this.minMonth3, this.curentYear3));
  }

  clickLoadChart4Next() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartColumn);
  }

  clickLoadChart4Prev() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartColumn);
  }

  print() {
    console.log($('#my-char-line1')[0].innerHTML);
    if (this.selectedOption === 'all') {
      $('.selectOptionAll').css('display', 'none');
      $('.btn-print').css('display', 'none');
      $('.btn-arrow').css('display', 'none');

      window.print();

      $('.selectOptionAll').css('display', 'block');
      $('.btn-print').css('display', 'block');
      $('.btn-arrow').css('display', 'block');
    } else if (this.selectedOption === '1') {
      const printContent = $('.chart-1')[0].innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;

      $('#my-char-line1').addClass('chart-line1');
      $('.my-title-line1').addClass('title-line1');

      $('.btn-arrow').css('visibility', 'hidden');

      window.print();

      $('.btn-arrow').css('display', 'visible');
      window.location.reload();
      document.body.innerHTML = originalContents;
      console.log($('.selectOptionAll')[0].value);
    } else if (this.selectedOption === '2') {
      const printContent = $('.chart-2')[0].innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;
      $('#my-chart-line2').addClass('chart-line2');
      $('.my-title-line2').addClass('title-line2');

      $('.btn-arrow').css('visibility', 'hidden');
      window.print();
      $('.btn-arrow').css('display', 'visible');

      window.location.reload();
      document.body.innerHTML = originalContents;
    } else if (this.selectedOption === '3') {
      const printContent = $('.chart-3')[0].innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;

      $('#my-chart-line3').addClass('chart-line3');
      $('.my-title-line3').addClass('title-line3');

      $('.btn-arrow').css('visibility', 'hidden');
      window.print();
      $('.btn-arrow').css('display', 'visible');

      window.location.reload();
      document.body.innerHTML = originalContents;
    } else {
      const printContent = $('.chart-4')[0].innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;

      $('#my-chart-column').addClass('chart-column');
      $('.my-title-line4').addClass('title-line4');
      $('.btn-arrow').css('visibility', 'hidden');

      window.print();

      $('.btn-arrow').css('display', 'visible');
      window.location.reload();
      document.body.innerHTML = originalContents;
    }
  }

  selectOption(value: any) {
    if (value) {
      this.selectedOption = value;
    } else {
      this.selectedOption = 'all';
    }
  }
}
