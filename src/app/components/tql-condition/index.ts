import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { TqlConditionService } from './src/tql-condition.service';
import { TqlConditionComponent } from './src/tql-condition.component';

export * from './src/tql-condition.component';
export * from './src/tql-condition.service';

@NgModule({
    declarations: [TqlConditionComponent],
    exports: [TqlConditionComponent],
    providers: [TqlConditionService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
})
export class TqlConditionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TqlConditionModule,
            providers: [TqlConditionService],
        };
    }
}
