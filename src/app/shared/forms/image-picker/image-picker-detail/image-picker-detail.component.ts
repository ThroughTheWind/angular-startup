import { Image } from 'src/app/shared/models/Image';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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

  @ViewChild('detailContainer', {static: false}) detailContainer: ElementRef;

  image: Image;
  imageHeight: string = '300px';
  
  constructor(private cdk: ChangeDetectorRef) { }

  ngOnInit() {
    this.image = this.group.value as Image;
    this.group.valueChanges.subscribe(val => {
      this.image =  val;
    });
  }


  onDelete() {
    this.delete.emit();
  }

  refreshDisplay() {
    this.cdk.detectChanges();
    const ctn = this.detailContainer.nativeElement as HTMLElement;
    this.imageHeight = ctn.offsetHeight + 'px';
  }
}
