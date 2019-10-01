import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadsComponent } from './pages/uploads/uploads.component';
import { UploadDetailComponent } from './components/upload-detail/upload-detail.component';
import { UploadFilterComponent } from './components/upload-filter/upload-filter.component';
import { DisplayFileSizePipe } from './pipes/display-file-size.pipe';
import { UploadRoutingModule } from './upload-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    DropZoneDirective,
    UploaderComponent,
    UploadsComponent,
    UploadDetailComponent,
    DisplayFileSizePipe,
    UploadFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadRoutingModule,
    MaterialModule
  ],
  exports: [
    UploaderComponent,
    UploadsComponent,
    DisplayFileSizePipe
  ]
})
export class UploadModule { }
