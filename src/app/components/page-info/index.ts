import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageInfoComponent } from './src/page-info.component';

export * from './src/page-info.component';

@NgModule({
    declarations: [PageInfoComponent],
    exports: [PageInfoComponent],
    providers: [],
    imports: [CommonModule],
})
export class PageInfoModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PageInfoModule,
            providers: [],
        };
    }
}
