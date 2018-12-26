import { Component, Input, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../../utils";

@Component({
  selector: 'issue-age',
  templateUrl: './issue-age.html',
  styleUrls: ['./styles.scss'],
})
export class IssueAgeComponent implements OnInit {
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
    let legendData = [];
    let seriesData = [];

    this._data.xList = this._data.xList.map(function (item) {
      return item + '天';
    });

    for (const key in this._data) {
      if (key == 'xList') {
        continue;
      }
      legendData.push(key);
      seriesData.push(
        {
          name: key,
          type: 'bar',
          stack: '数量',
          data: this._data[key],
        },
      );
    }

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
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow',
        },
      },
      grid: {
        top: '15%',
        right: '60px',
        bottom: '8%',
        left: '3%',
        containLabel: true,
      },
      legend: {
        right: '0%',
        width: '15%',
        data: legendData,
      },
      color: CONSTANT.CHART_COLORS,

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
          name: '数量',
          type : 'value',
        },
      ],
      series : seriesData,
    };
  }

}
