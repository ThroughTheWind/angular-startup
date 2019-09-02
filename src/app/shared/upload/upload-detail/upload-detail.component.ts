import { Observable } from 'rxjs';
import { Upload, toUploadDescription } from './../Upload';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { UploadState } from '../upload-state';
import { UploadService } from '../upload.service';
import { UploadDescription } from '../UploadDescription';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.less']
})
export class UploadDetailComponent implements OnInit {

  @Input() upload: Upload;
  @Output() deleted = new EventEmitter<UploadDescription>();
  snapshot: Observable<UploadTaskSnapshot>;
  percentage: Observable<number>;

  get UploadState() { return UploadState; }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    if(this.upload.state === UploadState.RUNNING) {
      this.snapshot = this.upload.task.snapshotChanges();
      this.percentage = this.upload.task.percentageChanges();
    }    
    console.log(this.upload);
  }

  isRunning(snapshot) {
    return snapshot.state === 'running' && !this.isFinished(snapshot);
  }

  isFinished(snapshot) {
    return !(snapshot.bytesTransferred < snapshot.totalBytes);
  }

  deleteUpload() {
    if(this.uploadService.deleteUpload(this.upload)) {
      this.deleted.emit(this.upload);
    }
  }
}
