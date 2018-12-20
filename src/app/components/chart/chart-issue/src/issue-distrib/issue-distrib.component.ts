import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'issue-distrib',
  templateUrl: './issue-distrib.html',
  styleUrls: ['./styles.scss'],
})
export class IssueDistribComponent implements OnInit {
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
      legend: {
        show: false,
      },
      padding: 0,
      color: ['#749f83', '#c23531', '#ca8622', '#c4ccd3'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },

      series: [
        {
          name: '分布',
          type: 'pie',
          radius: '70%',
          center: ['50%', '55%'],
          data: this._data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            normal: {
              label: {
                show: true,
                formatter: '{b} : {c} ({d}%)',
              },
              labelLine : { show: true },
            },
          },
        },
      ],
    };
  }

}
