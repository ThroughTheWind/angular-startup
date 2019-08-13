import { Item } from './../../Item';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Output() deleted = new EventEmitter<Item>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.item);
  }

}
