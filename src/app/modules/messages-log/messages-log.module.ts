import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesLogComponent } from './components/messages-log.component';



@NgModule({
  declarations: [MessagesLogComponent],
  imports: [
    CommonModule
  ],
  exports: [MessagesLogComponent]
})
export class MessagesLogModule { }
