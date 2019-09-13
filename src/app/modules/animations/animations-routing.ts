import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoAnimationsComponent } from './components/demo-animations/demo-animations.component';

const routes: Routes =  [
  {
    path: 'animations',
    component: DemoAnimationsComponent,    
  }, {
      path: '', redirectTo: 'animations', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimationsRoutingModule { }
