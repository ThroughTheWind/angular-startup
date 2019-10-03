import { Component, Input, ElementRef, Output, EventEmitter, HostBinding, ChangeDetectorRef } from '@angular/core';
import { OverlayPosition } from '../enums/OverlayPosition';
import { MdBaseOverlayComponent } from '../components/md-base-overlay/md-base-overlay.component';

@Component({
  selector: 'app-md-overlay',
  templateUrl: './md-overlay.component.html',
  styleUrls: ['./md-overlay.component.less']
})
export class MdOverlayComponent extends MdBaseOverlayComponent {

  private _targetElement: HTMLElement;

  @Input() set targetElement(val: any) {
    if(val instanceof HTMLElement) {
      this._targetElement = val;
    } else if(val.nativeElement) {
      this._targetElement = val.nativeElement;
    } else {
      this._targetElement = val['_elementRef'].nativeElement;
    }
  };

  @HostBinding('style.height') @Input() height;
  @HostBinding('style.top') top;
  @HostBinding('style.bottom') bottom;
  @HostBinding('style.left') left;
  @HostBinding('style.right') right;

  constructor(protected elRef:ElementRef, protected cdk: ChangeDetectorRef) {
    super(elRef, cdk);
  }


  refreshPosition() {
    this.top = 0;
    this.left = 0;
    switch(this.position) {
      case OverlayPosition.BOTTOM:
        this.top = this._targetElement.offsetTop + this._targetElement.offsetHeight + 16 + 'px';
        this.left = this._targetElement.offsetLeft + (this._targetElement.offsetWidth / 2) - (parseInt(this.width, 10) / 2)  + 'px'
        break;
      case OverlayPosition.TOP:

        break;
      case OverlayPosition.LEFT:

        break;
      case OverlayPosition.RIGHT:

        break;
    }    
  }
}
