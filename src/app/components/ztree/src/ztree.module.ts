import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
import { MyToastyService } from '../../../service/my-toasty';
import { PrivilegeService } from '../../../service/privilege';

import { ZtreeComponent } from './ztree.component';
import { ZtreeService } from './ztree.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastyModule],
  declarations: [ZtreeComponent],
  exports: [ZtreeComponent],
  providers: [MyToastyService, ZtreeService, PrivilegeService]
})
export class ZtreeModule {

}
