import { ValidateImage } from '../form.validators';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ValidateUrl } from '../form.validators';
import { Upload } from '../../../modules/upload/models/Upload';
import { Image } from '../../models/Image';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.less']
})
export class ImagePickerComponent implements OnInit {
  @Input() parentForm: FormGroup;

  get images() { return this.parentForm.get('images'); }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  removeImage(index) {
    const images = this.parentForm.get('images') as FormArray;
    images.removeAt(index);
  }

  onUpload(upload: Upload) {
    const images = this.parentForm.get('images') as FormArray;
    images.push(this.fb.group({
      title: [''],
      url: [upload.downloadUrl],
      description: ['']
    }));
  }

  loadImages(images: Image[]) {
    const imagesArray = this.parentForm.controls.images as FormArray;
    for (const image of images) {
      imagesArray.push(this.fb.group({
        url: image.url,
        title: image.title,
        description: image.description
      }));
    }
  }
}
