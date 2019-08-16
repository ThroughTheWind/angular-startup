import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesLogModule } from './modules/messages-log/messages-log.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessagesLogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
