import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { CONSTANT } from '../../../utils/constant';
import { RouteService } from '../../../service/route';
import { Utils } from '../../../utils/utils';
import { Deferred } from '../../../service/deferred';
import { MyToastyService } from '../../../service/my-toasty';

@Component({
  selector: 'file-uploader',
  styleUrls: ['./file-uploader.scss'],
  templateUrl: './file-uploader.html',
  providers: [],
})
export class FileUploaderComponent implements OnInit, AfterViewInit {
  @Output() uploadedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() mimeType: string[];
  @Input() maxFileSize: number = 100; // MB
  @Input() showDropZone: boolean = true;
  file: any = {};

  uploader: FileUploader;
  uploadedFile: any;
  hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  errorMessage: string;

  uploaderOptions: FileUploaderOptions = {
    url: CONSTANT.SERVICE_URL + CONSTANT.UPLOAD_URI,
    authToken: CONSTANT.TOKEN,
    autoUpload: true,
    allowedMimeType: this.mimeType,
    maxFileSize: this.maxFileSize * 1024  * 1024,
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

  constructor(private routeService: RouteService, private toastyService: MyToastyService) {
    this.init();
  }

  public ngOnInit(): void {

  }
  public ngAfterViewInit() {
  }

  init (): void {
    this.uploader = new FileUploader(this.uploaderOptions);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.onUploadCompleteItem(item, response, status, headers);
    };
    this.uploader.onWhenAddingFileFailed = (item, filter, options) =>
      this.onWhenAddingFileFailed(item, filter, options);
  }
  onWhenAddingFileFailed(item: any, filter: any, options: any) {
    switch (filter.name) {
      case 'fileSize':
        this.errorMessage = `文件大小超过了${this.maxFileSize}M的限制。`;
        break;
      case 'mimeType':
        const allowedTypes = this.mimeType.join();
        this.errorMessage = `仅支持上传这些类型的文件："${allowedTypes}。`;
        break;
      default:
        this.errorMessage = `未知错误：filter is ${filter.name}。`;
    }
    if (this.errorMessage) {
      this.toastyService.warning({ title: '文件上传失败', msg: this.errorMessage });
    }
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
      this.file = { name: json.origName, path: json.uploadPath };

      const deferred = new Deferred();
      deferred.promise.then((data) => {
        console.log('onUploadCompleteItem', data);
      }).catch((err) => { console.log('err', err); });

      this.uploadedEvent.emit({
        data: this.file,
        deferred: deferred,
      });

    } else if (json.code == -100) {
      this.routeService.navTo('/login');
    }
  }

}
