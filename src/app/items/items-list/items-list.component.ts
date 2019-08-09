import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../items.service';
import { Item } from '../Item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.less']
})
export class ItemsListComponent implements OnInit {
  items: Item[];
  constructor(public itemsService: ItemsService) { }

  ngOnInit() {
    this.getItems();
  }

  delete(item: Item) {
    this.itemsService.deleteItem(item);
    this.getItems();
  }

  getItems() {
    this.items = this.itemsService.getItems();
  }

}
