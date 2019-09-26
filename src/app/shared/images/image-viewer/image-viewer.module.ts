import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MaterialModule } from '../../../material.module';



@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ImageViewerComponent
  ]
})
export class ImageViewerModule { }
