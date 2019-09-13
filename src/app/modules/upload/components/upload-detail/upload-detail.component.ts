import { Observable } from 'rxjs';
import { Upload, toUploadDescription } from '../../models/Upload';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { UploadState } from '../../enums/upload-state';
import { UploadService } from '../../services/upload.service';
import { UploadDescription } from '../../models/UploadDescription';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

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
  color: string;

  get UploadState() { return UploadState; }

  constructor(private uploadService: UploadService, public dialog: MatDialog) { }

  ngOnInit() {
    if(this.upload.state === UploadState.RUNNING) {
      this.snapshot = this.upload.task.snapshotChanges();
      this.percentage = this.upload.task.percentageChanges();
    }
    switch(this.upload.state) {
      case UploadState.RUNNING:
        this.snapshot = this.upload.task.snapshotChanges();
        this.percentage = this.upload.task.percentageChanges();
        this.color='accent';
        break;
      case UploadState.SUCCESS:
        this.color='primary';
        break;
      case UploadState.CANCELLED:        
        this.color='warn';
        break;

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {title: 'Confirm', text:`Do you wish to delete the upload ${this.upload.name} ?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(this.uploadService.deleteUpload(this.upload)) {
          this.deleted.emit(this.upload);
        }
      }
    })
  }
}
