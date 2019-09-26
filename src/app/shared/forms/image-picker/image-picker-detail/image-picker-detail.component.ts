import { Image } from 'src/app/shared/models/Image';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-picker-detail',
  templateUrl: './image-picker-detail.component.html',
  styleUrls: ['./image-picker-detail.component.less']
})
export class ImagePickerDetailComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() index: number;
  @Output() delete = new EventEmitter();

  image: Image;
  
  constructor() { }

  ngOnInit() {
    this.image = this.group.value as Image;
    this.group.valueChanges.subscribe(val => {
      this.image =  val;
    })
  }

  onDelete() {
    this.delete.emit();
  }
}
