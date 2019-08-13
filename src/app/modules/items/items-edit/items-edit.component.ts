import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService } from '../items.service';
import { Item } from '../Item';
import { EditState } from '../../../enum/edit-state';

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
          this.addItem();
          break;
        case EditState.EDIT:
          this.updateItem();
          break;
      }
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.state = EditState.EDIT;
      this.getItem(id);
    } else {
      this.state = EditState.CREATE;
      this.item = {} as Item;
    }
  }

  getItem(id) {
    const item = this.itemsService.getItem(id).subscribe((item) => {
      if (item) {
        this.item = item;
      } else {
        this.navigateToList();
      }
    });
  }

  addItem() {
    this.itemsService.addItem(this.item)
      .subscribe((success) => {
        if (success) { this.navigateToList(); }
      });
  }

  updateItem() {
    this.itemsService.updateItem(this.item)
      .subscribe((success) => {
        if (success) { this.navigateToList(); }
      });
  }

  navigateToList() {
    this.router.navigateByUrl('/items/list');
  }

}

