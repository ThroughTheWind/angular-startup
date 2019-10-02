import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../models/Category';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: '../../components/category-form/category-form.component.html',
  styleUrls: ['../../components/category-form/category-form.component.less']
})
export class CategoryEditComponent extends CategoryFormComponent {

  get id() { return this.categoryForm.get('id').value; }

  constructor(protected fb: FormBuilder, protected service: CategoryService, protected router: Router, private route: ActivatedRoute,
    private cdk: ChangeDetectorRef, public dialog: MatDialog) {
    super(fb, service, router);
  }

  init() {
    this.title = 'Edit a category';
    this.isEdit = true;
    this.route.params.subscribe(routeParams => {
      const id = routeParams.id;
      this.service.getCategory(id).subscribe(category => {
        this.loadCategory(category);
      }, (error) => {
        this.apiError = error;
      });
    })    
  }

  reload() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getCategory(id).subscribe(category => {
      this.loadCategory(category);
    }, (error) => {
      this.apiError = error;
    });
  }

  save(category: Category) {
    return this.service.updateCategory(category);
  }

  cancel() {
    this.reload();
  }

  loadCategory(category: Category) {
    const valuesArray = this.categoryForm.controls.values as FormArray;
    while(valuesArray.length) {
      valuesArray.removeAt(0);
    }
    this.categoryForm.patchValue({
      id: category.id,
      label: category.label,
      description: category.description,
      values: []
    });
    for (const value of category.values) {      
      valuesArray.push(this.fb.group({
        label: value.label,
        color: value.color
      }));
    }
  }

  getControls() {
    const formGroup = super.getControls();
    formGroup.addControl('id', new FormControl('', Validators.required))
    return formGroup;
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {title: 'Confirm', text:`Do you wish to delete the category ${this.categoryForm.value.label} ?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.deleteCategoryById(this.categoryForm.value.id).subscribe(() => {
          this.handleSuccess();
        }, (error) => {
          this.apiError = error;
        })
      }
    });
    
  }
}
