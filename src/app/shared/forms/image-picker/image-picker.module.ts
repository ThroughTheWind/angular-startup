import { ImagePickerDetailComponent } from './image-picker-detail/image-picker-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from '../../../modules/upload/upload.module';



@NgModule({
  declarations: [
    ImagePickerComponent,
    ImagePickerDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadModule
  ],
  exports: [ImagePickerComponent]
})
export class ImagePickerModule { }
