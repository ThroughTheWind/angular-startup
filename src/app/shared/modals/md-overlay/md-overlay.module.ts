import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdOverlayComponent } from './md-overlay/md-overlay.component';
import { MaterialModule } from '../../../material.module';



@NgModule({
  declarations: [MdOverlayComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MdOverlayComponent]
})
export class MdOverlayModule { }
