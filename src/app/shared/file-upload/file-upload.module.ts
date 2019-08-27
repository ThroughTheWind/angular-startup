import { UploaderComponent } from './uploader/uploader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { DropZoneDirective } from './drop-zone.directive';


@NgModule({
  declarations: [
    UploaderComponent,
    UploadTaskComponent,
    DropZoneDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploaderComponent
  ]
})
export class FileUploadModule { }
