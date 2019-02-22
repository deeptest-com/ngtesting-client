import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastyModule } from 'ng2-toasty';
import { FileUploadModule } from 'ng2-file-upload';
import { PipeModule } from '../../pipe/pipe.module';

import { FileUploaderComponent } from './src/file-uploader.component';

export * from './src/file-uploader.component';

@NgModule({
  imports: [CommonModule, RouterModule, PipeModule, ToastyModule, FileUploadModule],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent],
  providers: [],
})
export class FileUploaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FileUploaderModule,
      providers: [],
    };
  }
}
