import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.less']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup;

  get label() { return this.categoryForm.get('label'); }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.getControls();
  }

  getControls() {
    return this.fb.group({
      label: ['', Validators.required],
      description: [''],
      values: this.fb.array([])
    })
  }

}
