import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './org.routing';
import { NgaModule } from '../../../theme/nga.module';

import { PipeModule } from '../../../pipe/pipe.module';
import { ChartDesignModule } from '../../../components/chart/chart-design';
import { ChartExecutionModule } from '../../../components/chart/chart-execution';
import { ChartIssueModule } from '../../../components/chart/chart-issue';

import { DirectiveModule } from '../../../directive/directive.module';

import { OrgResolve } from './org.resolve';
import { OrgService } from '../../../service/client/org';
import { ProjectService } from '../../../service/client/project';
import { AccountService } from '../../../service/client/account';
import { ReportService } from '../../../service/client/report';

import { Org } from './org.component';
import { OrgView } from '../../org/view/view.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgaModule, routing,
    DirectiveModule,
    PipeModule,
    ChartDesignModule,
    ChartExecutionModule,
    ChartIssueModule,
  ],
  declarations: [Org, OrgView],
  providers: [
    AccountService, OrgService, ProjectService, OrgResolve, ReportService,
  ],
})
export class OrgModule {

}
