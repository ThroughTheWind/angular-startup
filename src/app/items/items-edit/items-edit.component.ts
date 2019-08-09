import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService } from '../items.service';
import { Item } from '../Item';
import { EditState } from '../../enum/edit-state';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.less']
})
export class ItemsEditComponent implements OnInit {
  state: EditState = EditState.CREATE;
  item: Item;
  constructor(public itemsService: ItemsService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  isCreateState() {
    return this.state === EditState.CREATE;
  }

  submit() {
    if (this.item) {
      switch (this.state) {
        case EditState.CREATE:
          if (this.itemsService.addItem(this.item)) {
            this.navigateToList();
          }
          break;
        case EditState.EDIT:
          if (this.itemsService.updateItem(this.item)) {
            this.navigateToList();
          }
          break;
      }
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const item = this.itemsService.getItem(id);
      if (item) {
        this.state = EditState.EDIT;
        this.item = item;
        return;
      }
      this.navigateToList();
    } else {
      this.item = {} as Item;
      this.state = EditState.CREATE;
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/items/list');
  }

}

