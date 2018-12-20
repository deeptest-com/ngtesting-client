import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularEchartsModule } from 'ngx-echarts';

import { IssueAgeComponent } from './src/issue-age/issue-age.component';
import { IssueDistribComponent } from './src/issue-distrib/issue-distrib.component';
import { IssueTrendComponent } from './src/issue-trend/issue-trend.component';

@NgModule({
    declarations: [IssueAgeComponent, IssueDistribComponent, IssueTrendComponent],
    exports: [IssueAgeComponent, IssueDistribComponent, IssueTrendComponent],
    providers: [],
    imports: [CommonModule, NgbTabsetModule, AngularEchartsModule],
})
export class ChartIssueModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChartIssueModule,
            providers: [],
        };
    }
}
