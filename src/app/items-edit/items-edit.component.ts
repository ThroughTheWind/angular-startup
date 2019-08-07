import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../models/Item';
import { EditState } from '../enum/edit-state';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.less']
})
export class ItemsEditComponent implements OnInit {
  state: EditState = EditState.CREATE;
  item: Item;
  constructor(public itemsService: ItemsService) { }

  isCreateState() {
    return this.state === EditState.CREATE;
  }

  submit() {
    if (this.item) {
      switch (this.state) {
        case EditState.CREATE:
          this.itemsService.addItem(this.item);
          break;
        case EditState.EDIT:
          this.itemsService.updateItem(this.item);
          break;
      }
    }
  }

  ngOnInit() {
  }

}

