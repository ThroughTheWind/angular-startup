import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryRoutingModule } from './category-routing.module';
import { MaterialModule } from '../../material.module';
import { CategoryNavComponent } from './components/category-nav/category-nav.component';
import { DefaultComponent } from './pages/default/default.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';
import { MccColorPickerModule } from 'material-community-components';



@NgModule({
  declarations: [CategoriesComponent, CategoryNavComponent, DefaultComponent, CategoryCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    MaterialModule,
    MccColorPickerModule.forRoot({
      empty_color: 'transparent',
      used_colors: ['#000000', '#FFFFFF', '#FFF555']
    })
  ]
})
export class CategoryModule { }
