import {Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';

declare var google: any;
declare var googleLoaded: any;
declare var $: any;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('myChart') myChart;

  pageTitle = 'Title';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    // const observable = Rx.Observable.create()
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
    function fomart(date: Date) {
      if (date.getMonth() === 0) {
        return date + '月\n' + date.getFullYear();
      }
      return date + '月\n';
    }
    const options = {
      theme: 'material',
      hAxis: {
        format: 'M月\nY',
        gridlines: {
          color: 'transparent',
        },
        lineDashStyle: [2, 2, 20, 2, 20, 2]
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4,
        // focused: { color: '#3bc', opacity: 0.8 }
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
    };
    const a = 0.1;
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'type');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    data.addRows([
      [new Date(2018, 8),
        a, customTooltip(new Date(2018, 8), a, options.colors[0], 'T'),
        0.13, customTooltip(new Date(2018, 8), 0.13, options.colors[1], 'TB'),
        0.27, customTooltip(new Date(2018, 8), 0.27, options.colors[2], 'TOP')],
      [new Date(2018, 9),
        0.15, customTooltip(new Date(2018, 9), 0.15, options.colors[0], 'T'),
        0.19, customTooltip(new Date(2018, 9), 0.19, options.colors[1], 'TB'),
        0.2, customTooltip(new Date(2018, 9), 0.2, options.colors[2], 'TOP')],
      [new Date(2018, 10),
        0.18, customTooltip(new Date(2018, 10), 0.18, options.colors[0], 'T'),
        0.2, customTooltip(new Date(2018, 10), 0.2, options.colors[1], 'TB'),
        0.27, customTooltip(new Date(2018, 10), 0.27, options.colors[2], 'TOP')],
      [new Date(2018, 11),
        0.2, customTooltip(new Date(2018, 11), 0.2, options.colors[0], 'T'),
        0.3, customTooltip(new Date(2018, 11), 0.3, options.colors[1], 'TB'),
        0.35, customTooltip(new Date(2018, 11), 0.35, options.colors[2], 'TOP')],
      [new Date(2019, 0) || 2019,
        0.1, customTooltip(new Date(2019, 0), 0.1, options.colors[0], 'T'),
        0.22, customTooltip(new Date(2019, 0), 0.22, options.colors[1], 'TB'),
        0.35, customTooltip(new Date(2019, 0), 0.35, options.colors[2], 'TOP')],
    ]);

    const chart = new google.visualization.LineChart(document.getElementById('my-char-line1'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function placeMarker(dataTable) {
      const cli = this.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      console.log(cli.getYLocation(dataTable.getValue(4, 3)));
      $('.overlay-marker-top')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-top')[0].style.left = '420px';
      $('.overlay-marker-top')[0].style.color = options.colors[2];

      $('.overlay-marker-tb')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-tb')[0].style.left = '420px';
      $('.overlay-marker-tb')[0].style.color = options.colors[1];

      $('.overlay-marker-t')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
      $('.overlay-marker-t')[0].style.left = '425px';
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

  clickLoadChartNext() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.loadChart1);
  }
  clickLoadChartPrev() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChartLine1);
  }

  loadChart1() {
    const options = {
      theme: 'material',
      hAxis: {
        format: 'M月\nY',
        gridlines: {
          color: 'transparent',
        },
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical',
        opacity: 0.4,
        // focused: { color: '#3bc', opacity: 0.8 }
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
        1: {}
      },
    };
    const a = 0.1;
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'type');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    data.addRows([
      [new Date(2019, 1),
        a, customTooltip(new Date(2018, 8), a, options.colors[0], 'T'),
        0.15, customTooltip(new Date(2018, 8), 0.15, options.colors[1], 'TB'),
        0.3, customTooltip(new Date(2018, 8), 0.3, options.colors[2], 'TOP')],
      [new Date(2019, 2),
        0.1, customTooltip(new Date(2018, 9), 0.1, options.colors[0], 'T'),
        0.16, customTooltip(new Date(2018, 9), 0.16, options.colors[1], 'TB'),
        0.2, customTooltip(new Date(2018, 9), 0.2, options.colors[2], 'TOP')],
      [new Date(2019, 3),
        0.18, customTooltip(new Date(2018, 10), 0.18, options.colors[0], 'T'),
        0.2, customTooltip(new Date(2018, 10), 0.2, options.colors[1], 'TB'),
        0.24, customTooltip(new Date(2018, 10), 0.24, options.colors[2], 'TOP')],
      [new Date(2019, 4),
        0.2, customTooltip(new Date(2018, 11), 0.2, options.colors[0], 'T'),
        0.3, customTooltip(new Date(2018, 11), 0.3, options.colors[1], 'TB'),
        0.35, customTooltip(new Date(2018, 11), 0.35, options.colors[2], 'TOP')],
      [new Date(2019, 5),
        0.1, customTooltip(new Date(2019, 0), 0.1, options.colors[0], 'T'),
        0.22, customTooltip(new Date(2019, 0), 0.22, options.colors[1], 'TB'),
        0.36, customTooltip(new Date(2019, 0), 0.36, options.colors[2], 'TOP')],
    ]);

    const chart = new google.visualization.LineChart(document.getElementById('my-char-line1'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function placeMarker(dataTable) {
      const cli = this.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      console.log(cli.getYLocation(dataTable.getValue(4, 3)));
      $('.overlay-marker-top')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-top')[0].style.left = '420px';
      $('.overlay-marker-top')[0].style.color = options.colors[2];

      $('.overlay-marker-tb')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-tb')[0].style.left = '420px';
      $('.overlay-marker-tb')[0].style.color = options.colors[1];

      $('.overlay-marker-t')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
      $('.overlay-marker-t')[0].style.left = '425px';
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
      width: 500,
      height: 300,
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

    data.addRows([
      [new Date(2018, 8),
        400, customTooltip(new Date(2018, 8), 400, options.colors[0], 'CT'),
        1100, customTooltip(new Date(2018, 8), 1100, options.colors[1], 'T'),
        1300, customTooltip(new Date(2018, 8), 1300, options.colors[2], 'TB'),
        1800, customTooltip(new Date(2018, 8), 1800, options.colors[3], 'TOP')],
      [new Date(2018, 9),
        501, customTooltip(new Date(2018, 9), 501, options.colors[0], 'CT'),
        752, customTooltip(new Date(2018, 9), 752, options.colors[1], 'T'),
        1250, customTooltip(new Date(2018, 9), 1250, options.colors[2], 'TB'),
        1501, customTooltip(new Date(2018, 9), 1501, options.colors[3], 'TB')],
      [new Date(2018, 10),
        525, customTooltip(new Date(2018, 10), 525, options.colors[0], 'CT'),
        530, customTooltip(new Date(2018, 10), 530, options.colors[1], 'T'),
        1240, customTooltip(new Date(2018, 10), 1240, options.colors[2], 'TB'),
        1500, customTooltip(new Date(2018, 10), 1500, options.colors[3], 'TOP')],
      [new Date(2018, 11),
        800, customTooltip(new Date(2018, 11), 800, options.colors[0], 'CT'),
        1020, customTooltip(new Date(2018, 11), 1020, options.colors[1], 'T'),
        1500, customTooltip(new Date(2018, 11), 1500, options.colors[2], 'TB'),
        1520, customTooltip(new Date(2018, 11), 1520, options.colors[3], 'TOP')],
      [new Date(2019, 0),
        150, customTooltip(new Date(2019, 0), 150, options.colors[0], 'CT'),
        1120, customTooltip(new Date(2019, 0), 1120, options.colors[1], 'T'),
        1450, customTooltip(new Date(2019, 0), 1450, options.colors[2], 'TB'),
        1780, customTooltip(new Date(2019, 0), 1780, options.colors[3], 'TOP')],
    ]);

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line2'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      console.log(cli.getYLocation(dataTable.getValue(4, 7)));
      $('.overlay-marker-top-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 7))) + 50 + 'px';
      $('.overlay-marker-top-2')[0].style.left = '420px';
      $('.overlay-marker-top-2')[0].style.color = options.colors[3];

      $('.overlay-marker-tb-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-tb-2')[0].style.left = '420px';
      $('.overlay-marker-tb-2')[0].style.color = options.colors[2];

      $('.overlay-marker-t-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-t-2')[0].style.left = '425px';
      $('.overlay-marker-t-2')[0].style.color = options.colors[1];

      $('.overlay-marker-ct-2')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
      $('.overlay-marker-ct-2')[0].style.left = '425px';
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
      width: 500,
      height: 300,
    };

    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});

    data.addRows([
      [new Date(2018, 8),
        100, customTooltip(new Date(2018, 8), 100, options.colors[0]),
        300, customTooltip(new Date(2018, 8), 300, options.colors[1]),
        400, customTooltip(new Date(2018, 8), 400, options.colors[2])],
      [new Date(2018, 9),
        501, customTooltip(new Date(2018, 9), 501, options.colors[0]),
        752, customTooltip(new Date(2018, 9), 752, options.colors[1]),
        850, customTooltip(new Date(2018, 9), 850, options.colors[2])],
      [new Date(2018, 10),
        525, customTooltip(new Date(2018, 10), 525, options.colors[0]),
        530, customTooltip(new Date(2018, 10), 530, options.colors[1]),
        640, customTooltip(new Date(2018, 10), 640, options.colors[2])],
      [new Date(2018, 11),
        100, customTooltip(new Date(2018, 11), 100, options.colors[0]),
        120, customTooltip(new Date(2018, 11), 120, options.colors[1]),
        800, customTooltip(new Date(2018, 11), 800, options.colors[2])],
      [new Date(2019, 0),
        150, customTooltip(new Date(2019, 0), 150, options.colors[0]),
        220, customTooltip(new Date(2019, 0), 220, options.colors[1]),
        420, customTooltip(new Date(2019, 0), 420, options.colors[2])],
    ]);

    const chart = new google.visualization.LineChart(document.getElementById('my-chart-line3'));
    google.visualization.events.addListener(chart, 'ready', placeMarker.bind(chart, data));
    chart.draw(data, options);

    function placeMarker(dataTable) {
      const cli = chart.getChartLayoutInterface();
      const chartArea = cli.getChartAreaBoundingBox();
      console.log(cli.getYLocation(dataTable.getValue(4, 5)));
      $('.overlay-marker-top-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 5))) + 50 + 'px';
      $('.overlay-marker-top-3')[0].style.left = '420px';
      $('.overlay-marker-top-3')[0].style.color = options.colors[2];

      $('.overlay-marker-tb-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 3))) + 50 + 'px';
      $('.overlay-marker-tb-3')[0].style.left = '420px';
      $('.overlay-marker-tb-3')[0].style.color = options.colors[1];

      $('.overlay-marker-t-3')[0].style.top = Math.floor(cli.getYLocation(dataTable.getValue(4, 1))) + 50 + 'px';
      $('.overlay-marker-t-3')[0].style.left = '425px';
      $('.overlay-marker-t-3')[0].style.color = options.colors[0];
    }

    function customTooltip(date: Date, value: number, color) {
      return `<table class="c-tooltip" style="color: ${color}; border: 1px solid ${color}"; width="90px">
                <tbody>
                  <tr>
                    <th colspan="2" ; font-weight: normal">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</th>
                  </tr>
                  <tr class="">
                    <td class="name">Top</td>
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

    data.addRows([
      ['0回', 0.1, 'ti2', 0.14, 'hi'],
      ['1回', 0.117, '', 0.260, ''],
      ['2回', 0.360, '', 0.300, ''],
      ['3回', 0.1030, '', 0.240, ''],
      ['4回', 0.1030, '', 0.140, ''],
      ['5回', 0.1030, '', 0.340, ''],
      ['6回', 0.1030, '', 0.240, ''],
      ['7回', 0.1030, '', 0.340, ''],
      ['8回', 0.1030, '', 0.240, ''],
      ['9回', 0.1030, '', 0.340, ''],
      ['10回', 0.030, '', 0.240, '']
    ]);
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
      width: 600,
      height: 300,
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('my-chart-column'));
    chart.draw(data, options);
  }
}
