import { Image } from 'src/app/shared/models/Image';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker-detail',
  templateUrl: './image-picker-detail.component.html',
  styleUrls: ['./image-picker-detail.component.less']
})
export class ImagePickerDetailComponent implements OnInit {

  @Input() image: Image;
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit();
  }
}
