import { OverlayPosition } from '../../enums/OverlayPosition';
import { Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';

export abstract class MdBaseOverlayComponent {

    protected _element: HTMLElement;
    protected _watchBackDrop: boolean = true;
    protected _position : OverlayPosition;
    
    constructor(protected elRef:ElementRef, protected cdk: ChangeDetectorRef) {
        this._element = elRef.nativeElement;
    }

    @Input() set position(val: OverlayPosition) {
        this._position = val;
        if(this.opened) {
            this.refreshPosition();
        }
    }

    @Input() closeOnBackDrop: boolean = true;
    
    @HostBinding('style.width') @Input() width;

    get position() {
        return this._position;
    }

    protected _opened: boolean = false;

    set opened(val: boolean) {
        this._opened = val;
        this.openedChange.emit(val);
    }

    get opened() {
        return this._opened;
    }

    @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    hide() {
        this._element.style.display = 'none';
        this.opened = false;
    }

    show() {
        this._watchBackDrop = false;
        if(this.closeOnBackDrop) {
            setTimeout(() => {
                this._watchBackDrop = true;
            }, 100)
        }
        this._element.style.display = 'block';
        this.cdk.detectChanges();
        this.refreshPosition();
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
        if(this._watchBackDrop) {
            this.hide();
        }
    }

    abstract refreshPosition();
}