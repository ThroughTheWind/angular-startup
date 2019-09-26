import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostFilters } from '../../models/PostFilters';
import { PostSortType } from '../../enum/post-sort-type';

@Component({
  selector: 'app-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.less']
})
export class PostFilterComponent implements OnInit {

  filterForm = this.fb.group({
    name: [''],
    createdAt: this.fb.group({
      start: [''],
      end: ['']
    }),
    sortType: ['']
  });

  sortingTypes = Object.values(PostSortType);

  @Output() filtered = new EventEmitter<PostFilters>();

  get startDate() { return this.filterForm.value.createdAt.start; }
  get endDate() { return this.filterForm.value.createdAt.end; }
  get maxStartDate() {
    return this.endDate ? this.endDate : new Date(Date.now());
  };
  get maxEndDate() { return new Date(Date.now()); }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.filtered.emit(this.filterForm.value as PostFilters);
  }


}
