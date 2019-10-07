import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuButtonComponent } from './user-menu-button/user-menu-button.component';
import { MaterialModule } from '../../../material.module';
import { UserMenuPanelComponent } from './user-menu-panel/user-menu-panel.component';



@NgModule({
  declarations: [UserMenuButtonComponent, UserMenuPanelComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [UserMenuButtonComponent],
  entryComponents: [UserMenuPanelComponent]
})
export class UserMenuModule { }
