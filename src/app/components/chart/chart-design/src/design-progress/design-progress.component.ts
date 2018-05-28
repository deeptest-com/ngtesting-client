import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'design-progress',
  templateUrl: './design-progress.html',
  styleUrls: ['./styles.scss'],
})
export class DesignProgressComponent implements OnInit {
  @Input() showTitle: boolean = false;
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
        text: '测试设计',
        show: this.showTitle,
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
        data: ['新增用例数', '合计用例数'],
      },
      grid: {
        top: '15%',
        right: '1%',
        bottom: '5%',
        left: '1%',
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
          name: '新增（个）',
          type: 'value',
        },
        {
          name: '累计（个）',
          type: 'value',
        },
      ],
      series: [
        {
          name: '新增数量',
          type: 'bar',
          yAxisIndex: 0,
          data: this._data.numbList,
        },
        {
          name: '累计数量',
          type: 'line',
          yAxisIndex: 1,
          data: this._data.totalList,
        },
      ],
    };
  }

}
