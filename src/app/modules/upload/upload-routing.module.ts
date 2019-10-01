import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { UploadsComponent } from './pages/uploads/uploads.component';

const routes: Routes =  [
  {
    path: 'uploads',
    component: UploadsComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }