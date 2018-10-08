import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { TqlFiltersService } from './src/tql-filters.service';
import { TqlFiltersComponent } from './src/tql-filters.component';

export * from './src/tql-filters.component';
export * from './src/tql-filters.service';

@NgModule({
    declarations: [TqlFiltersComponent],
    exports: [TqlFiltersComponent],
    providers: [TqlFiltersService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
})
export class TqlFiltersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TqlFiltersModule,
            providers: [TqlFiltersService],
        };
    }
}
