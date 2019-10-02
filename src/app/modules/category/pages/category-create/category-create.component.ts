import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';
import { Router } from '@angular/router';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-category-create',
  templateUrl: '../../components/category-form/category-form.component.html',
  styleUrls: ['../../components/category-form/category-form.component.less']
})
export class CategoryCreateComponent extends CategoryFormComponent {

  constructor(protected fb: FormBuilder, protected service: CategoryService, protected router: Router) {
    super(fb, service, router);
  }

  init() {
    this.title = 'Create a new category';
  }

  save(category: Category) {
    return this.service.addCategory(category);
  }

  cancel() {}

}
