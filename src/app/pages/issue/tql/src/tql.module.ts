import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../../pipe/pipe.module';

import { Tql } from './tql.component';

import { TqlService } from './tql.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, PipeModule],
  declarations: [Tql],
  exports: [Tql],
  providers: [TqlService],
})
export class TqlModule {
}
