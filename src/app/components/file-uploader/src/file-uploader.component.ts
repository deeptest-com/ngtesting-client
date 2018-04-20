import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { CONSTANT } from '../../../utils/constant';
import { RouteService } from '../../../service/route';
import { Utils } from '../../../utils/utils';
import { Deferred } from '../../../service/deferred';

@Component({
  selector: 'file-uploader',
  styleUrls: ['./file-uploader.scss'],
  templateUrl: './file-uploader.html',
  providers: [],
})
export class FileUploaderComponent implements OnInit, AfterViewInit {
  @Output() uploadedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() mimeType: string[];
  file: string = '';

  uploader: FileUploader;
  uploadedFile: any;
  hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  uploaderOptions: FileUploaderOptions = {
    url: CONSTANT.SERVICE_URL + CONSTANT.UPLOAD_URI,
    authToken: CONSTANT.TOKEN,
    autoUpload: true,
    allowedMimeType: this.mimeType,
    filters: [{
      name: 'upload', fn: (item: any) => {
        return true;
      },
    }],
  };

  @Input() set ifile(f: any) {
    this.file = f;
    this.init();
  }

  constructor(private routeService: RouteService) {
    this.init();
  }

  public ngOnInit(): void {

  }
  public ngAfterViewInit() {
    console.log(11);
  }

  init (): void {
    this.uploader = new FileUploader(this.uploaderOptions);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.onUploadCompleteItem(item, response, status, headers);
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  selectFile(): void {
    this.uploader.clearQueue();
    jQuery('#upload-input').click();
  }
  fileOver(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  onUploadCompleteItem (item: any, response: any, status: any, headers: any) {
    const json = JSON.parse(response);
    console.log(json);
    this.uploader.clearQueue();

    if (json.code == 1) {
      this.uploadedFile = json;
      this.file = json.uploadPath;

      const deferred = new Deferred();
      deferred.promise.then((data) => {
        console.log('onUploadCompleteItem', data);
      }).catch((err) => {console.log('err', err); });

      this.uploadedEvent.emit({
        data: this.file,
        deferred: deferred,
      });

    } else if (json.code == -100) {
      this.routeService.navTo('/login');
    }
  }

}
