import { Upload } from '../../models/Upload';
import { UploadService } from '../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadState } from '../../enums/upload-state';
import { UploadFilters } from '../../models/UploadFilters';
import { map } from 'rxjs/operators';
import { UploadSortType } from '../../enums/upload-sort-type';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.less'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class UploadsComponent implements OnInit {
  runningUploads: Observable<Upload[]>;
  runningLength: number = -1;
  successfullUploads: Observable<Upload[]>;
  successLength: number = -1;
  cancelledUploads: Observable<Upload[]>;
  cancelledLength: number = -1;
  filters: UploadFilters;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.runningUploads = this.uploadService.getRunningUploads().pipe(
      map(uploads => {
        this.runningLength = uploads.length;
        return uploads;
      })
    );
    this.loadSuccessfulUploads();
    this.cancelledUploads = this.uploadService.getCancelledUploads().pipe(
      map(uploads => {
        this.cancelledLength = uploads.length;
        return uploads;
      })
    );;
  }

  cancelRunnings() {
    this.uploadService.cancelRunning();
  }

  onFiltered(filters: UploadFilters) {
    this.filters = filters;
    this.loadSuccessfulUploads();
  }

  loadSuccessfulUploads() {
    this.successfullUploads = this.uploadService.getSuccessfullUploads().pipe(
      map(uploads => {
        this.successLength = -1;
        uploads = this.filterUploads(uploads);
        this.successLength = uploads.length;
        return uploads;
      })
    );
  }

  filterUploads(uploads: Upload[]) : Upload[] {
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
      }
    }
    return uploads;
  }

}
