import { UploadFormComponent } from './upload-form/upload-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from '../file-upload/drop-zone.directive';

@NgModule({
  declarations: [
    UploadFormComponent,
    DropZoneDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploadFormComponent
  ]
})
export class UploadModule { }
