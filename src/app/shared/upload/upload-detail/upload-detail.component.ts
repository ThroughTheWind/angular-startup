import { Observable } from 'rxjs';
import { Upload } from './../Upload';
import { Component, OnInit, Input } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.less']
})
export class UploadDetailComponent implements OnInit {

  @Input() upload: Upload;
  snapshot: Observable<UploadTaskSnapshot>;

  constructor() { }

  ngOnInit() {
    this.snapshot = this.upload.task.snapshotChanges();
  }

  isRunning(snapshot) {
    return snapshot.state === 'running' && !this.isFinished(snapshot);
  }

  isFinished(snapshot) {
    return !(snapshot.bytesTransferred < snapshot.totalBytes);
  }

}
