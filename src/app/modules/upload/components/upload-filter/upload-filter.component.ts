import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { Observable } from 'rxjs';
import { UploadFilters } from '../../models/UploadFilters';
import { UploadSortType } from '../../enums/upload-sort-type';

@Component({
  selector: 'app-upload-filter',
  templateUrl: './upload-filter.component.html',
  styleUrls: ['./upload-filter.component.less']
})
export class UploadFilterComponent implements OnInit {

  filterForm = this.fb.group({
    name: [''],
    extensions: [''],
    createdAt: this.fb.group({
      start: [''],
      end: ['']
    }),
    sortType: ['']
  });

  @Output() filtered = new EventEmitter<UploadFilters>();

  get startDate() { return this.filterForm.value.createdAt.start; }
  get endDate() { return this.filterForm.value.createdAt.end; }
  get maxStartDate() {
    return this.endDate ? this.endDate : new Date(Date.now());
  };
  get maxEndDate() { return new Date(Date.now()); }

  availableExtensions: Observable<string[]>;
  sortingTypes = Object.values(UploadSortType);
  
  constructor(private fb: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.availableExtensions = this.uploadService.getDistinctUploadExtensions();
  }

  onSubmit() {
    this.filtered.emit(this.filterForm.value as UploadFilters);
  }

}
