import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-value',
  templateUrl: './category-value.component.html',
  styleUrls: ['./category-value.component.less']
})
export class CategoryValueComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() index: number;

  @Output() delete = new EventEmitter<number>();

  @ViewChild('valueIcon', {static: false}) valueIcon: ElementRef;

  get label() { return this.group.get('label'); }
  get color() { return this.group.get('color'); }

  constructor(private cdk: ChangeDetectorRef) { }

  ngOnInit() {
    if(this.color.value) {
      this.changeColor(this.color.value);
    }
  }

  changeColor(color: string = null) {
    this.cdk.detectChanges();
    let icon = null;
    if(this.valueIcon.nativeElement) {
      icon = this.valueIcon.nativeElement as HTMLElement; 
    } else {
      icon = this.valueIcon['_elementRef'].nativeElement;
    }
    icon.style.color = color ? color : this.color.value;
  }

  onDelete() {
    this.delete.emit(this.index);
  }

}
