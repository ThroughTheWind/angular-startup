import { ImagePickerDetailComponent } from './image-picker-detail/image-picker-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from '../../../modules/upload/upload.module';
import { MaterialModule } from '../../../material.module';
import { ImageViewerModule } from '../../images/image-viewer/image-viewer.module';
import { MccColorPickerModule } from 'material-community-components';

@NgModule({
  declarations: [
    ImagePickerComponent,
    ImagePickerDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadModule,
    MaterialModule,
    ImageViewerModule,
    MccColorPickerModule.forRoot({
      empty_color: 'transparent',
      used_colors: ['#000000', '#FFFFFF', '#FFF555']
    })
  ],
  exports: [ImagePickerComponent]
})
export class ImagePickerModule { }
