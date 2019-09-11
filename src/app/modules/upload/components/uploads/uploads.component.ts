import { Upload } from '../../models/Upload';
import { UploadService } from '../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadState } from '../../enums/upload-state';
import { UploadFilters } from '../../models/UploadFilters';
import { map } from 'rxjs/operators';
import { UploadSortType } from '../../enums/upload-sort-type';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.less']
})
export class UploadsComponent implements OnInit {

  runningUploads: Observable<Upload[]>;
  successfullUploads: Observable<Upload[]>;
  cancelledUploads: Observable<Upload[]>;
  filters: UploadFilters;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.runningUploads = this.uploadService.getRunningUploads();
    this.successfullUploads = this.uploadService.getSuccessfullUploads().pipe(
      map(this.filterUploads)
    );
    this.cancelledUploads = this.uploadService.getCancelledUploads();
  }

  cancelRunnings() {
    this.uploadService.cancelRunning();
  }

  onFiltered(filters: UploadFilters) {
    console.log(filters);
    this.filters = filters;
  }

  filterUploads(uploads: Upload[], index: number) : Upload[] {
    if(this.filters) {
      if(this.filters.name) {
        uploads = uploads.filter(up => RegExp(this.filters.name).test(up.name));
      }
      if(this.filters.extensions && this.filters.extensions.length > 0) {
        uploads = uploads.filter(up => this.filters.extensions.includes(up.extension));
      }
      if(this.filters.createdAt.start) {
        uploads = uploads.filter(up => up.createdAt >= this.filters.createdAt.start);
      }
      if(this.filters.createdAt.end) {
        uploads = uploads.filter(up => up.createdAt <= this.filters.createdAt.end);
      }
      if(this.filters.sortType) {
        switch(this.filters.sortType) {
          case UploadSortType.CREATEDAT:
            uploads = uploads.sort((a, b) => {return a.createdAt > b.createdAt ? -1 : 1})
            break;
          case UploadSortType.NAME:
            uploads = uploads.sort((a, b) => {return a.name > b.name ? -1 : 1})
            break;
          case UploadSortType.EXTENSION: 
            uploads = uploads.sort((a, b) => {return a.extension > b.extension ? -1 : 1})
            break;
        }
        uploads = uploads.sort()
      }
    }
    return uploads;
  }

}
