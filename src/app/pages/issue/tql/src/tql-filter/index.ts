import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { TqlFilterService } from './src/tql-filter.service';
import { TqlFilterComponent } from './src/tql-filter.component';

export * from './src/tql-filter.component';
export * from './src/tql-filter.service';

@NgModule({
    declarations: [TqlFilterComponent],
    exports: [TqlFilterComponent],
    providers: [TqlFilterService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
})
export class TqlFilterModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TqlFilterModule,
            providers: [TqlFilterService],
        };
    }
}
