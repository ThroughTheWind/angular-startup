import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

import { ItemsService } from '../items.service';
import { Item } from '../Item';
import { EditState } from '../../../enum/edit-state';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.less']
})
export class ItemsEditComponent implements OnInit {
  state: EditState = EditState.CREATE;
  itemForm = this.fb.group({
    id: ['', Validators.required, this.validateIdNotTaken.bind(this)],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  get name() { return this.itemForm.get('name'); }
  get id() { return this.itemForm.get('id'); }
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
      id: '',
      name: '',
      description: ''
    });
  }

  getItem(id) {
    this.itemsService.getItem(id).subscribe((item) => {
      if (item) {
        this.itemForm.patchValue({
          id: item.id,
          name: item.name,
          description: item.description
        });
      } else {
        this.navigateToList();
      }
    });
  }

  fetchItem(): Item {
    return this.itemForm.valid ? this.itemForm.value as Item : null;
  }

  addItem() {
    const item = this.fetchItem();
    if (item) {
      this.itemsService.addItem(item)
        .subscribe((success) => {
          if (success) { this.navigateToList(); }
        });
    }
  }

  updateItem() {
    const item = this.fetchItem();
    if (item) {
      this.itemsService.updateItem(item)
        .subscribe((success) => {
          if (success) { this.navigateToList(); }
        });
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/items/list');
  }

  validateIdNotTaken(control: AbstractControl) {

    if (!this.isCreateState) { return null; }
    return this.itemsService.checkIdNotTaken(control.value).pipe(
      map((doesntExists) => doesntExists ? null : {idTaken: true})
    );
  }

}

