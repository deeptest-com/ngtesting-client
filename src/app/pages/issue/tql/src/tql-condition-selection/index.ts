import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../../../../../pipe/pipe.module';

import { TqlConditionSelectionService } from './src/tql-condition-selection.service';
import { TqlConditionSelectionComponent } from './src/tql-condition-selection.component';

export * from './src/tql-condition-selection.component';
export * from './src/tql-condition-selection.service';

@NgModule({
    declarations: [TqlConditionSelectionComponent],
    exports: [TqlConditionSelectionComponent],
    providers: [TqlConditionSelectionService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, PipeModule],
})
export class TqlConditionSelectionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TqlConditionSelectionModule,
            providers: [TqlConditionSelectionService],
        };
    }
}
