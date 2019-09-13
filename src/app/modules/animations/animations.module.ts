import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { DemoAnimationsComponent } from './components/demo-animations/demo-animations.component';
import { AnimationsRoutingModule } from './animations-routing';



@NgModule({
  declarations: [DemoAnimationsComponent],
  imports: [
    CommonModule,
    AnimationsRoutingModule,
    MaterialModule,
  ]
})
export class AnimationsModule { }
