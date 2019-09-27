import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Image } from '../../../models/Image';
import { ImageOrientation } from '../enums/ImageOrientation';

const DEFAULT_HEIGHT = 400 + "px";

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.less']
})
export class ImageViewerComponent implements OnInit {

  _selectedIndex: number = 0;
  _images: Image[] = [];
  _orientation: ImageOrientation = null;
  _error: boolean = false;
  _errorImageUrl = 'https://cdn.pixabay.com/photo/2016/10/25/23/54/not-found-1770320_960_720.jpg';
  _loaded: boolean = false;
  _height: string;
  _width: string;

  get ImageOrientation() {
    return ImageOrientation;
  }
  get length() { return this._images ? this._images.length : 0; }
  get selectedImage() { 
    if(this.length) {
      return this._images[this._selectedIndex];
    } else {
      return null;
    }
  }

  @ViewChild('displayedImage', {static: false}) displayedImage: ElementRef;
  @ViewChild('errorImage', {static: false}) errorImage: ElementRef;
  @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
  @ViewChild('mainContainer', {static: false}) mainContainer: ElementRef;

  @Input() set height(val: string) {
    this._height = val;
    if(this._loaded) this.refreshDisplay();
  }

  @Input() set width(val: string) {
    this._width = val;
    if(this._loaded) this.refreshDisplay();
  }

  @Input() hoverEffect: boolean = false;

  @Input() set images(value: Image[] | Image) {
    this._selectedIndex = 0; 
    if(value) {
      if(value instanceof Array) {        
        this._images = value as Image[];
      } else {
        this._images = [value];
      }
    } else {
      this._images = [];
    }
  }

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit() {

  }

  onLoadImage() {
    this.refreshDisplay();
  }

  next() {
    this._loaded = false;
    this._error = false;
    this._selectedIndex++;
  }

  previous() {
    this._loaded = false;
    this._error = false;
    this._selectedIndex--;
  }

  invalidImage() {
    this._error = true;
  }

  refreshDisplay() {
    this._orientation = null;
    const container = this.mainContainer.nativeElement as HTMLElement;
    container.style.height = this._height ? this._height : DEFAULT_HEIGHT;
    if(this._width) container.style.width = this._width;
    this.cdRef.detectChanges();
    const image = this._error ? this.errorImage.nativeElement as HTMLImageElement : this.displayedImage.nativeElement as HTMLImageElement;
    if(image.height > image.width || container.offsetWidth > container.offsetHeight) {
      this._orientation = ImageOrientation.PORTRAIT;
      image.style.marginTop = '0px';
    } else {
      this._orientation = ImageOrientation.LANDSCAPE;
      this.cdRef.detectChanges();
      const imageContainer = this.imageContainer.nativeElement as HTMLElement;
      const emptySpace = imageContainer.offsetHeight - image.height;
      image.style.marginTop = emptySpace / 2 + 'px';
    }
    this._loaded = true;
  }

}
