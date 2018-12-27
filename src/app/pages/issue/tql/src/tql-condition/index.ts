import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../../../../../pipe/pipe.module';

import { TqlConditionService } from './tql-condition.service';
import { TqlConditionComponent } from './tql-condition.component';

import { TqlConditionCheckService, TqlConditionCheckComponent } from './tql-condition-check';
import { TqlConditionDatetimeService, TqlConditionDatetimeComponent } from './tql-condition-datetime';
import { TqlConditionTextService, TqlConditionTextComponent } from './tql-condition-text';

@NgModule({
  declarations: [TqlConditionComponent, TqlConditionCheckComponent, TqlConditionDatetimeComponent,
    TqlConditionTextComponent],

  exports: [TqlConditionComponent, TqlConditionCheckComponent, TqlConditionDatetimeComponent,
    TqlConditionTextComponent],

  providers: [TqlConditionService, TqlConditionCheckService,
    TqlConditionDatetimeService, TqlConditionTextService],

  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, PipeModule],
})
export class TqlConditionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TqlConditionModule,
      providers: [TqlConditionService, TqlConditionCheckService,
        TqlConditionDatetimeService, TqlConditionTextService],
    };
  }
}
