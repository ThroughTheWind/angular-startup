import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from '../file-upload/drop-zone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadsComponent } from './uploads/uploads.component';
import { UploadDetailComponent } from './upload-detail/upload-detail.component';

@NgModule({
  declarations: [
    DropZoneDirective,
    UploaderComponent,
    UploadsComponent,
    UploadDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploaderComponent,
    UploadsComponent
  ]
})
export class UploadModule { }
