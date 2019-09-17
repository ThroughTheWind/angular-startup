import { Component, OnInit, Input, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { OverlayPosition } from '../enums/OverlayPosition';

@Component({
  selector: 'app-md-overlay',
  templateUrl: './md-overlay.component.html',
  styleUrls: ['./md-overlay.component.less']
})
export class MdOverlayComponent implements OnInit {

  private _targetElement: ElementRef;

  @Input() set targetElement(val: ElementRef) {
    this._targetElement = val;
  };

  get targetElement() {
    return this._targetElement as ElementRef;
  }

  private _position : OverlayPosition;

  @Input() set position(val: OverlayPosition) {
    this._position = val;
  }

  get position() {
    return this._position;
  }

  private _opened: boolean = false;

  set opened(val: boolean) {
    this._opened = val;
    this.openedChange.emit(val);
  }

  get opened() {
    return this._opened;
  }

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('style.width') @Input() width;
  @HostBinding('style.height') @Input() height;
  @HostBinding('style.display') display;

  constructor() { }

  ngOnInit() {

  }

  hide() {
    this.display = 'none';
    this.opened = false;
  }

  show() {
    this.display = 'block';
    this.opened = true;
  }

  toggle() {
    if(this.opened) {
      this.hide();
    } else {
      this.show();
    }
  }

  onClickOutside(element: ElementRef) {
    
  }

}
