import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../items.service';
import { Item } from '../models/Item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.less']
})
export class ItemsListComponent implements OnInit {
  items: Item[];
  constructor(public itemsService: ItemsService) { }

  ngOnInit() {
    this.items = this.itemsService.getItems();
  }

  delete(item: Item) {

  }

}
