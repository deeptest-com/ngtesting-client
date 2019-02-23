import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipeModule } from '../../pipe/pipe.module';
import { DirectiveModule } from '../../directive/directive.module';
import { TableTreeComponent } from './src/table-tree.component';
import { TableRowComponent } from './src/table-row.component';

export * from './src/table-tree.component';

@NgModule({
  imports: [CommonModule, RouterModule, PipeModule, DirectiveModule],
  declarations: [TableTreeComponent, TableRowComponent],
  exports: [TableTreeComponent, TableRowComponent],
  providers: [],
})
export class TableTreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TableTreeModule,
      providers: [],
    };
  }
}
