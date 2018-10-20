import { NgModule } from '@angular/core';

import { MsgReadPipe } from './msg-read';
import { ImgPathPipe, ThumbPathPipe } from './img-path';
import { MapToArrayPipe } from './map-to-array';
import { TimePassedPipe } from './date';
import { ModelStatusPipe } from './model-status';
import { ExeStatusPipe } from './exe-status';
import { PercentPipe } from './percent';
import { MarkErrorPipe } from './mark-error';
import { ShowIfContainsPipe } from './contains';
import { PathToLinkPipe } from './misc';
import { FieldTypePipe, FieldApplyToPipe, FieldFormatPipe, TrueOrFalsePipe, DisableOrNotPipe } from './field-property';
import { PathToNamePipe } from './path-to-name';
import { MyFilterPipe } from './my-filter';
import { IdToNamePipe } from './id-to-name';

@NgModule({
  imports: [],

  declarations: [MsgReadPipe, ExeStatusPipe, PathToNamePipe, ImgPathPipe, ThumbPathPipe, MapToArrayPipe, TimePassedPipe,
    ModelStatusPipe, MarkErrorPipe, FieldTypePipe, FieldApplyToPipe, FieldFormatPipe, TrueOrFalsePipe,
    DisableOrNotPipe, PercentPipe, ShowIfContainsPipe, PathToLinkPipe, MyFilterPipe, IdToNamePipe],

  exports: [MsgReadPipe, ExeStatusPipe, PathToNamePipe, ImgPathPipe, ThumbPathPipe, MapToArrayPipe, TimePassedPipe,
    ModelStatusPipe, MarkErrorPipe, FieldTypePipe, FieldApplyToPipe, FieldFormatPipe, TrueOrFalsePipe,
    DisableOrNotPipe, ShowIfContainsPipe, PathToLinkPipe, MyFilterPipe, IdToNamePipe],
})
export class PipeModule {

}

