import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'issue-trend',
  templateUrl: './issue-trend.html',
  styleUrls: ['./styles.scss'],
})
export class IssueTrendComponent implements OnInit {
  @Input() title: string;
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
    this.chartOption = {
      title: {
        text: this.title,
        show: true,
        top: 'top',
        left: 'center',
        textStyle: {
          fontSize: '15',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        right: '0%',
        width: '15%',
        data: ['总数', '修复'],
      },
      grid: {
        top: '15%',
        right: '15%',
        bottom: '5%',
        left: '5%',
        containLabel: true,
      },
      color: ['#c23531', '#2f4554'],
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
          name: '数量（个）',
          type: 'value',
        },
      ],
      series: [
        {
          name: '总数',
          type: 'line',
          yAxisIndex: 0,
          data: this._data.totalListCreate,
        },
        {
          name: '修复',
          type: 'line',
          yAxisIndex: 0,
          data: this._data.totalListFinal,
        },
      ],
    };
  }

}
