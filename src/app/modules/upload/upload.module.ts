import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { UploadDetailComponent } from './components/upload-detail/upload-detail.component';
import { DisplayFileSizePipe } from './pipes/display-file-size.pipe';
import { UploadRoutingModule } from './upload-routing.module';

@NgModule({
  declarations: [
    DropZoneDirective,
    UploaderComponent,
    UploadsComponent,
    UploadDetailComponent,
    DisplayFileSizePipe
  ],
  imports: [
    CommonModule,
    UploadRoutingModule
  ],
  exports: [
    UploaderComponent,
    UploadsComponent,
    DisplayFileSizePipe
  ]
})
export class UploadModule { }
