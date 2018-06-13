import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing }       from './prj.routing';
import { NgaModule } from '../../../../theme/nga.module';

import { DirectiveModule } from '../../../../directive/directive.module';
import { PipeModule } from '../../../../pipe/pipe.module';
import { ChartDesignModule } from '../../../../components/chart/chart-design';
import { ChartExecutionModule } from '../../../../components/chart/chart-execution';

import { ProjectView } from '../../../project/project/view/view.component';

import { PrjResolve } from './prj.resolve';
import { ReportService } from '../../../../service/report';
import { ProjectService } from '../../../../service/project';
import { AccountService } from '../../../../service/account';

import { Prj } from './prj.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgaModule, routing,
    DirectiveModule,
    PipeModule,
    ChartDesignModule,
    ChartExecutionModule,
  ],
  declarations: [Prj, ProjectView],
  providers: [
    AccountService, ProjectService, PrjResolve, ReportService,
  ]
})
export class PrjModule {

}
