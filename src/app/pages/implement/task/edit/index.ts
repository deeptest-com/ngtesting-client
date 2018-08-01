import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchSelectModule } from '../../../../components/search-select';

import { UserService } from '../../../../service/user';

import { TaskEditService } from './src/task-edit.service';
import { TaskEditComponent } from './src/task-edit.component';

export * from './src/task-edit.component';
export * from './src/task-edit.service';

@NgModule({
    declarations: [TaskEditComponent],
    exports: [TaskEditComponent],
    providers: [TaskEditService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchSelectModule],
})
export class TaskEditModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TaskEditModule,
            providers: [UserService, TaskEditService],
        };
    }
}
