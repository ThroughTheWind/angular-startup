import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdOverlayComponent } from './md-overlay/md-overlay.component';
import { MaterialModule } from '../../../material.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';



@NgModule({
  declarations: [MdOverlayComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MdOverlayComponent, ClickOutsideDirective]
})
export class MdOverlayModule { }
