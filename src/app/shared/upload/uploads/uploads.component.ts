import { Upload } from './../Upload';
import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.less']
})
export class UploadsComponent implements OnInit {

  runningUploads: Observable<Upload[]>;
  successfullUploads: Observable<Upload[]>;
  cancelledUploads: Observable<Upload[]>;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.runningUploads = this.uploadService.getRunningUploads();
    this.successfullUploads = this.uploadService.getSuccessfullUploads();
    this.cancelledUploads = this.uploadService.getCancelledUploads();
  }

}
