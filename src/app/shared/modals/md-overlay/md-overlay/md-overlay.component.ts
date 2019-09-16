import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
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
    return this._targetElement;
  }

  private _position : OverlayPosition;

  @Input() set position(val: OverlayPosition) {
    this._position = val;
  }

  get position() {
    return this._position;
  }

  @Input() width: string;

  @Input() height: string;

  private _opened: boolean;

  @Input() set opened(val: boolean) {
    this._opened = val;
    this.openedChange.emit(val);
  }

  get opened() {
    return this._opened;
  }

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
