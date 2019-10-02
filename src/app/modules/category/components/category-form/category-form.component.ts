import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs';
import { ViewChildren, QueryList } from '@angular/core';
import { CategoryValueComponent } from '../category-value/category-value.component';


export abstract class CategoryFormComponent {
    categoryForm: FormGroup;
    apiError: string;
    title: string;
    isEdit: boolean = false;

    get label() { return this.categoryForm.get('label'); }
    get values() { return this.categoryForm.get('values'); }

    @ViewChildren(CategoryValueComponent) valueComponents: QueryList<CategoryValueComponent>;

    constructor(protected fb: FormBuilder, protected service: CategoryService, protected router: Router) { }

    ngOnInit() {
        this.categoryForm = this.getControls();
        this.init();
    }

    getControls() {
        return this.fb.group({
          label: ['', Validators.required],
          description: [''],
          values: this.fb.array([], Validators.required)
        })
    }
      
    addValue() {
        const values = this.categoryForm.get('values') as FormArray;
        values.push(this.fb.group({
          label: [''],
          color: ['']
        }));
    }
    
    onDeleteValue(index: number) {
        const values = this.categoryForm.get('values') as FormArray;
        values.removeAt(index);
    }
    
    onSubmit() {
        if(this.categoryForm.valid) {
          this.apiError = null;
          this.save(this.categoryForm.value as Category).subscribe(() => {
            this.handleSuccess();
          }, (apiError) => {
            this.handleError(apiError);
          })
        }
    }
    
    onReset() {
        this.apiError = null;
        const values = this.categoryForm.get('values') as FormArray;
        while(values.length) {
            values.removeAt(0);
        }
        this.cancel();
    }

    handleSuccess() {
        this.router.navigate(['categories']);
    }

    handleError(apiError) {
        this.apiError = apiError;
    }

    abstract init();

    abstract save(category: Category): Observable<{}>;

    abstract cancel();
      
}