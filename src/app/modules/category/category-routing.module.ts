import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DefaultComponent } from './pages/default/default.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';

const routes: Routes =  [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthenticationGuard],    
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: DefaultComponent },
          { path: 'create', component: CategoryCreateComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }