import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

declare var google: any;
declare var googleLoaded: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('myChart') myChart;

  pageTitle = 'Title';

  public line_ChartData = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540]];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    google.charts.load('current', {'packages': ['line']});
    google.charts.setOnLoadCallback(this.drawChartLine1);
    google.charts.setOnLoadCallback(this.drawChartLine2);
    google.charts.setOnLoadCallback(this.drawChartLine3);

    google.charts.load('current', {'packages': ['bar']});
    google.charts.setOnLoadCallback(this.drawChartColumn);

  }
  drawChartLine1() {
    const a = 0.1;
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'type');

    data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');
    data.addColumn({type: 'string', role: 'annotationText', p: {html: true}});

    data.addRows([
      [new Date(2018, 8), 'aa', a, 0.13, 0.27, 'tooltipa'],
      [new Date(2018, 9), 'aa',  0.13, 0.19, 0.29, 'tooltipa'],
      [new Date(2018, 10), 'aa',  0.13, 0.30, 0.27, 'tooltipa'],
      [new Date(2018, 11), 'aa',  0.16, 0.22, 0.28, 'tooltipa'],
      [new Date(2019, 0), 'aa',  0.17, 0.28, 0.38, 'tooltipa'],
    ]);

    const options = {
      crosshair: { trigger: 'focus' },
      selectionMode: 'multiple',
      // Trigger tooltips
      // on selections.
      tooltip: {trigger: 'selection', isHtml: true},
      // Group selections
      // by x-value.
      aggregationTarget: 'category',
      legend: { position: 'none' },
      colors: ['black', 'blue', 'red'],
      titleTextStyle: {
        bold: true,
        fontSize: 20
      },
      axes: {
        y: {
          0: {side: 'right'},
        },
      },
      vAxis: {
        scaleType: 'linear',
        format: '#%',
        viewWindow: {min: 0, max: 0.4},
        'textStyle': {
          'fontSize': 18,
        },
        // ticks: [0, 0.1, 0.20, 0.30, 0.40]
      },
      hAxis: {
        ticks: [new Date(2018, 8), new Date(2018, 9), new Date(2018, 10), new Date(2018, 11),
          new Date(2019, 0)
        ]
      },
      width: 480,
      height: 300,
    };

    const chart = new google.charts.Line(document.getElementById('my-char-line1'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  drawChartLine2() {
    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', '');
    data.addColumn('number', '');

    data.addRows([
      [new Date(2018, 8),  501, 752, 1250, 1501],
      [new Date(2018, 9),  700, 750, 1400, 1700],
      [new Date(2018, 10),  525, 530, 1240, 1500],
      [new Date(2018, 11),  800, 1020, 1800, 1520],
      [new Date(2019, 0),  1150, 1020, 1450, 1780],
    ]);

    const options = {
      legend: { position: 'none' },
      vAxis: {
        format: '#k',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 18,
        },
        gridlines: {count: 5},
      },
      titleTextStyle: {
        bold: true,
        fontSize: 20
      },
      axes: {
        y: {
          0: {side: 'right'},
        },
      },
      width: 480,
      height: 300,
    };

    const chart = new google.charts.Line(document.getElementById('my-chart-line2'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  drawChartLine3() {
    const data = new google.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');

    data.addRows([
      [new Date(2018, 8),  250, 300, 510],
      [new Date(2018, 9),  255, 490, 600],
      [new Date(2018, 10),  260, 500, 610],
      [new Date(2018, 11),  300, 520, 740],
      [new Date(2019, 0),  400, 730, 900],
    ]);

    const options = {
      legend: { position: 'none' },
      colors: ['black', 'blue', 'red'],
      vAxis: {
        format: '',
        viewWindowMode: 'explicit',
        viewWindow: {min: 0},
        'textStyle': {
          'fontSize': 18,
        },
        ticks: [0, 150, 500, 750, 1000]
      },
      titleTextStyle: {
        bold: true,
        fontSize: 20
      },
      axes: {
        y: {
          0: {side: 'right'},
        },
      },
      width: 480,
      height: 300,
    };

    const chart = new google.charts.Line(document.getElementById('my-chart-line3'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  drawChartColumn() {

    const data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip'});

    data.addRows([
      ['0回', 0.1, 0.400, 'abc'],
      ['1回', 0.117, 0.260, 'abc'],
      ['2回', 0.360, 0.300, 'abc'],
      ['3回', 0.1030, 0.240, 'abc'],
      ['4回', 0.1030, 0.140, 'abc'],
      ['5回', 0.1030, 0.340, 'abc'],
      ['6回', 0.1030, 0.240, 'abc'],
      ['7回', 0.1030, 0.340, 'abc'],
      ['8回', 0.1030, 0.240, 'abc'],
      ['9回', 0.1030, 0.340, 'abc'],
      ['10回', 0.030, 0.240, 'abc']
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
        ticks: [0, 10, 20, 30, 40],
      },
      axes: {
        y: {
          0: {side: 'right'},
        },
      },
      titleTextStyle: {
        bold: true,
        fontSize: 20
      },
      legend: { position: 'none' },
      width: 480,
      height: 300,
    };

    const chart = new google.charts.Bar(document.getElementById('my-chart-column'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
