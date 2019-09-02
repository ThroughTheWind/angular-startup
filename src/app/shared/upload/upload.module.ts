import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from '../file-upload/drop-zone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadsComponent } from './uploads/uploads.component';
import { UploadDetailComponent } from './upload-detail/upload-detail.component';
import { DisplayFileSizePipe } from './display-file-size.pipe';

@NgModule({
  declarations: [
    DropZoneDirective,
    UploaderComponent,
    UploadsComponent,
    UploadDetailComponent,
    DisplayFileSizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploaderComponent,
    UploadsComponent,
    DisplayFileSizePipe
  ]
})
export class UploadModule { }
