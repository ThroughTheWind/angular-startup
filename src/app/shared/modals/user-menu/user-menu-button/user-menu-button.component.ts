import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UserMenuPanelComponent } from '../user-menu-panel/user-menu-panel.component';

@Component({
  selector: 'app-user-menu-button',
  templateUrl: './user-menu-button.component.html',
  styleUrls: ['./user-menu-button.component.less']
})
export class UserMenuButtonComponent implements OnInit {

  @ViewChild(CdkOverlayOrigin, {static: false}) _overlayOrigin: CdkOverlayOrigin;
  
  _opened: boolean = false;
  _ref: OverlayRef;

  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  openUserMenuPanel() {
    if(!this._opened) {
      let strategy = this.overlay.position()
        .connectedTo(
          this._overlayOrigin.elementRef,
          {originX: 'end', originY: 'bottom'},
          {overlayX: 'end', overlayY: 'top'} 
        );
      let config = new OverlayConfig({
        positionStrategy: strategy,
        hasBackdrop: false,
      });
      this._ref = this.overlay.create(config);
        
      this._ref.attach(new ComponentPortal(UserMenuPanelComponent, this.viewContainerRef));
      this._opened = true;
    }   
  }

  closeUserMenuPanel() {
    if(this._opened) {
      this._ref.detach();
      this._opened = false;
    }
  }

  toggleUserMenuPanel() {
    if(this._opened) {
      this.closeUserMenuPanel();
    } else {
      this.openUserMenuPanel();
    }
  }


}
