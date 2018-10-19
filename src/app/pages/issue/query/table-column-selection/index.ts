import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../../../../pipe/pipe.module';

import { TableColumnSelection } from './src/table-column-selection.component';

export * from './src/table-column-selection.component';

@NgModule({
  declarations: [TableColumnSelection],
  exports: [TableColumnSelection],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, PipeModule],
})
export class TableColumnSelectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TableColumnSelectionModule,
      providers: [],
    };
  }
}
