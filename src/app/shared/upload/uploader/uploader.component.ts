import { UploadService } from './../upload.service';
import { Upload } from './../Upload';
import { Component, OnInit, EventEmitter, Output, HostListener, Input } from '@angular/core';
import { AttachSession } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.less']
})
export class UploaderComponent {
  isHovering: boolean;
  uploads: Upload[] = [];
  @Output() uploaded = new EventEmitter<Upload>();
  @Input() options: {
    accept: string,
    path: string,
    db: string
  };

  get accept() {
    return this.options ? this.options.accept : '';
  }

  constructor(private uploadService: UploadService) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  @HostListener('change', ['$event.target.files'])
  emitFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      if (this.checkFileType(files.item(i))) {
        const upload = this.uploadService.pushUpload(files.item(i), this.getPushOptions());
        if (upload) {
          this.uploads.push(upload);
          upload.task.then(() => {
            this.uploaded.emit(upload);
          });
        }
      }
    }
  }

  checkFileType(file: File) {
    if (this.options && this.options.accept) {
      return file.type.split('/')[0] === this.options.accept.split('/')[0] &&
        (this.options.accept.split('/')[1] === '*' || this.options.accept.split('/')[1] === file.type.split('/')[1]);
    }
    return true;
  }

  getPushOptions() {
    if (!this.options) { return {
      path: '',
      db: ''
    }; }
    return {
      path: this.options.path ? this.options.path : '',
      db: this.options.db ? this.options.db : ''
    };
  }
}
