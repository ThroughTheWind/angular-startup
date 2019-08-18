import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, first } from 'rxjs/operators';

import { Item } from '../../models/Item';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { EditState } from 'src/app/enum/edit-state';


@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.less']
})
export class ItemsEditComponent implements OnInit {
  state: EditState = EditState.CREATE;
  itemForm = this.fb.group({
    name: ['', Validators.required, this.validateNameNotTaken.bind(this)],
    description: ['', Validators.required],
  });
  item: Item;
  apiError: string = null;

  get name() { return this.itemForm.get('name'); }
  get description() { return this.itemForm.get('description'); }

  constructor(public itemsService: ItemsService, private router: Router, private route: ActivatedRoute, private location: Location,
              private fb: FormBuilder) { }

  isCreateState() {
    return this.state === EditState.CREATE;
  }

  onSubmit() {
    if (this.itemForm.valid) {
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
      this.resetForm();
    }
  }

  resetForm() {
    this.itemForm.patchValue({
      name: '',
      description: ''
    });
    this.item = {} as Item;
  }

  getItem(id) {
    this.itemsService.getItem(id).subscribe((item) => {
      if (item) {
        this.item = item;
        this.itemForm.patchValue({
          name: item.name,
          description: item.description
        });
      } else {
        this.navigateToList();
      }
    });
  }

  fetchItem(): Item {
    const item = this.itemForm.valid ? this.itemForm.value as Item : null;
    if (item && !this.isCreateState()) { item.id = this.item.id; }
    return item;
  }

  addItem() {
    const item = this.fetchItem();
    if (item) {
      this.itemsService.addItem(item).subscribe(() => this.navigateToList(), (err) => this.apiError = err);
    }
  }

  updateItem() {
    const item = this.fetchItem();
    if (item) {
      this.itemsService.updateItem(item).subscribe(() => this.navigateToList(), (err) => this.apiError = err);
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/items/list');
  }

  validateNameNotTaken(control: AbstractControl) {
    let id: string = null;
    if (!this.isCreateState()) { id = this.item.id; }
    return this.itemsService.checkNameNotTaken(control.value, id)
      .pipe(
        map(res => res ? null : {nameTaken: true}),
        first()
      );
  }

}

