import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppTranslationModule } from '../app.translation.module';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../pipe/pipe.module';

import { RouteService } from '../service/route';
import { RequestService } from '../service/request';
import { SockService } from '../service/client/sock';

import { OrgService } from '../service/admin/org';
import { AlertService } from '../service/client/alert';
import { MsgService } from '../service/client/msg';
import { AccountService } from '../service/client/account';

import {
  BaThemeConfig,
} from './theme.config';

import {
  BaThemeConfigProvider,
} from './theme.configProvider';

import {
  BaBackTop,
  BaCard,
  BaMsgCenter,
  BaPageTop,

  BaMenuItem,
  BaMenu,
  BaSidebar,
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
} from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  baMenuPath,
} from './pipes';

import {
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService,
} from './services';

import {
  EqualPasswordsValidator,
} from './validators';

const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  BaMsgCenter,
  BaPageTop,

  BaSidebar,
  BaMenuItem,
  BaMenu,
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur,
];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  baMenuPath,
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,

  RouteService,
  RequestService,
  SockService,
  AccountService,
  OrgService,
  AlertService,
  MsgService,
  BaMenuService,
];

const NGA_VALIDATORS = [
  EqualPasswordsValidator,
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgbDropdownModule,
    PipeModule,
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES,
      ],
    };
  }
}
