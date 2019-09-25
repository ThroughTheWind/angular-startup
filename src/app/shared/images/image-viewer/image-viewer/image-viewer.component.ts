import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Image } from '../../../models/Image';
import { ImageOrientation } from '../enums/ImageOrientation';

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
    this._orientation = null;
    this.cdRef.detectChanges();
    const image = this._error ? this.errorImage.nativeElement as HTMLImageElement : this.displayedImage.nativeElement as HTMLImageElement;
    if(image.height > image.width) {
      this._orientation = ImageOrientation.PORTRAIT;
      image.style.marginTop = '0px';
    } else {
      this._orientation = ImageOrientation.LANDSCAPE;
      const imageContainer = this.imageContainer.nativeElement as HTMLElement;
      const emptySpace = imageContainer.offsetHeight - image.height;
      image.style.marginTop = emptySpace / 2 + 'px';
    }
    this.cdRef.detectChanges();
    this._loaded = true;
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

}
