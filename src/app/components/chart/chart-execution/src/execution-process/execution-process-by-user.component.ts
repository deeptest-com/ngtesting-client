import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'execution-process-by-user',
  templateUrl: './execution-process.html',
  styleUrls: ['./styles.scss'],
})
export class ExecutionProcessByUserComponent implements OnInit {

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
    let legendData = [];
    let seriesData = [];

    for (const key in this._data.series) {
      const name = key.split('-')[0];
      legendData.push(name);
      seriesData.push(
        {
          name: name,
          type: 'bar',
          stack: '过程',
          data: this._data.series[key],
        },
      );
    }

    this.chartOption = {
      title: {
        text: '测试执行',
        show: this.showTitle,
        top: 'top',
        left: 'center',
        textStyle: {
          fontSize: '15',
        },
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow',
        },
      },
      grid: {
        top: '15%',
        right: '15%',
        bottom: '8%',
        left: '3%',
        containLabel: true,
      },
      legend: {
        right: '0%',
        width: '15%',
        data: legendData,
      },
      // color: ['#749f83', '#c23531', '#ca8622'],

      xAxis : [
        {
          type : 'category',
          axisLabel : {
            interval: 0,
            rotate: 45,
            margin: 10,
          },
          data : this._data.xList,
        },
      ],
      yAxis : [
        {
          name: '执行数（个）',
          type : 'value',
        },
      ],
      series : seriesData,
    };
  }

}
