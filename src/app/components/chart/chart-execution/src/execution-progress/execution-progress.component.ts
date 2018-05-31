import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'execution-progress',
  templateUrl: './execution-progress.html',
  styleUrls: ['./styles.scss'],
})
export class ExecutionProgressComponent implements OnInit {

  chartOption: any;

  _data: any = {};
  @Input() set data(model: any) {
    if (model) {
      this._data = model;
      this.genChart();
    }
  }

  constructor() {
  }

  ngOnInit(): any {

  }
  genChart(): any {
    let series: Array<any> = [];

    for (const key in this._data.series) {
      series.push({ name: key, type: 'line', data: this._data.series[key] });
    }

    this.chartOption = {
      title: {
        show: false,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        right: '0%',
        width: '15%',
        data: ['用例数'],
      },
      grid: {
        top: '15%',
        right: '15%',
        bottom: '5%',
        left: '5%',
        containLabel: true,
      },
      color: ['#2f4554', '#c23531'],
      xAxis: {
        type: 'category',
        name: '',
        splitLine: { show: false },
        data: this._data.xList,
        axisLabel : {
          interval: 0,
          rotate: 45,
          margin: 20,
        },
      },

      yAxis: [
        {
          name: '剩余用例（个）',
          type: 'value',
        },
        // {
        //   name: '剩余工作量（小时）',
        //   max: 70,
        //   type: 'value'
        // }
      ],
      series: series,
    };
  }

}
