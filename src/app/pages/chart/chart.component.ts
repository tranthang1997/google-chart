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
  monthChart1 = 4;

  constructor() {
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
      theme: 'material',
      hAxis: {
        format: 'M月\nY',
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
      legend: { position: 'none' },
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
        0: { targetAxisIndex: 0, },
        1: { targetAxisIndex: 1, type: 'line' }
      },
      vAxes: {
        0: { textPosition: 'none' },
        1: {},
      },
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%' },
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

    for (let i = 0; i < 5; i++) {
      const value1 = randomData(0.2, 0);
      const value2 = randomData(0.3, 0.2);
      const value3 = randomData(0.4, 0.3);
      data.addRows([
        [new Date(2019, i),
          value1, customTooltip(new Date(2019, i), value1, options.colors[0], 'T'),
          value2, customTooltip(new Date(2019, i), value2, options.colors[1], 'TB'),
          value3, customTooltip(new Date(2019, i), value3, options.colors[2], 'TOP')],
      ]);
    }

    const chart = new google.visualization.LineChart(document.getElementById('my-char-line1'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return parseFloat((((Math.random() * (max - min) + min) * 10) / 10).toFixed(2));
    }

    function placeMarker(dataTable) {
      const cli = this.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-top')[0].style.left = '542px';
      $('.overlay-marker-top')[0].style.color = options.colors[2];

      $('.overlay-marker-tb')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-tb')[0].style.left = '542px';
      $('.overlay-marker-tb')[0].style.color = options.colors[1];

      $('.overlay-marker-t')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
      $('.overlay-marker-t')[0].style.left = '542px';
      $('.overlay-marker-t')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color, label: string) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
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
        format: 'M月\nY',
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
      legend: { position: 'none' },
      vAxis: {
        format: '#件',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 16,
        },
        gridlines: {count: 5},
        ticks: [0, 500, 1000, 1500, 2000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: { targetAxisIndex: 0, },
        1: { targetAxisIndex: 1, type: 'line' }
      },
      vAxes: {
        0: { textPosition: 'none' },
        1: {}
      },
      colors: ['black', 'red', 'blue', 'green'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%' },
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
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 7))) + 50 + 'px';
      $('.overlay-marker-top-2')[0].style.left = '540px';
      $('.overlay-marker-top-2')[0].style.color = options.colors[3];

      $('.overlay-marker-tb-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-tb-2')[0].style.left = '540px';
      $('.overlay-marker-tb-2')[0].style.color = options.colors[2];

      $('.overlay-marker-t-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-t-2')[0].style.left = '540px';
      $('.overlay-marker-t-2')[0].style.color = options.colors[1];

      $('.overlay-marker-ct-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
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
        format: 'M月\nY',
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
      legend: { position: 'none' },
      vAxis: {
        format: '#回',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 16,
        },
        gridlines: {count: 5},
        ticks: [0, 250, 500, 750, 1000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 16
      },
      series: {
        0: { targetAxisIndex: 0, },
        1: { targetAxisIndex: 1, type: 'line' }
      },
      vAxes: {
        0: { textPosition: 'none' },
        1: {}
      },
      colors: ['black', 'red', 'blue'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%' },
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
    chart.draw(data, options);

    function randomData(max: number, min: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      $('.overlay-marker-top-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-top-3')[0].style.left = '540px';
      $('.overlay-marker-top-3')[0].style.color = options.colors[2];

      $('.overlay-marker-tb-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-tb-3')[0].style.left = '540px';
      $('.overlay-marker-tb-3')[0].style.color = options.colors[1];

      $('.overlay-marker-t-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
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
      tooltip: { isHtml: true },
      bar: {
        groupWidth: '80%',
        borderRadius: 0
      },
      vAxis: {
        viewWindow: {min: 0},
        format: '#%',
        gridlines: { count: 5 },
        ticks: [0, 0.10, 0.20, 0.30, 0.40],
      },
      series: {
        0: { targetAxisIndex: 0, },
        1: { targetAxisIndex: 1, type: 'column' }
      },
      vAxes: {
        0: { textPosition: 'none' },
        1: {}
      },
      titleTextStyle: {
        bold: true,
        fontSize: 20
      },
      legend: { position: 'none' },
      colors: ['blue', 'red'],
      chartArea: {left: '10%', right: '15%', width: '80%', height: '80%' },
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
      $('.overlay-marker-41')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 1))) + 30 + 'px';
      $('.overlay-marker-41')[0].style.left = '80px';
      $('.overlay-marker-41')[0].style.color = options.colors[0];
      //
      $('.overlay-marker-42')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(0, 3))) + 30 + 'px';
      $('.overlay-marker-42')[0].style.left = '100px';
      $('.overlay-marker-42')[0].style.color = options.colors[1];
    }
  }

  clickLoadChart1Next() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine1);
    console.log(this.monthChart1);
  }
  clickLoadChart1Prev() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine1);
  }

  clickLoadChart2Next() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine2);
    console.log(this.monthChart1);
  }
  clickLoadChart2Prev() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine2);
  }

  clickLoadChart3Next() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine3);
    console.log(this.monthChart1);
  }
  clickLoadChart3Prev() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine3);
  }

  clickLoadChart4Next() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartColumn);
    console.log(this.monthChart1);
  }
  clickLoadChart4Prev() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartColumn);
  }
}
