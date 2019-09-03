import { ValidateImage } from '../form.validators';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ValidateUrl } from '../form.validators';
import { Upload } from '../../../modules/upload/models/Upload';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.less']
})
export class ImagePickerComponent implements OnInit {

  imageForm = this.fb.group({
    title: [''],
    description: [''],
    url: ['', [Validators.required, ValidateUrl, ValidateImage]]
  });
  @Input() parentForm: FormGroup;

  get images() { return this.parentForm.get('images'); }
  get url() { return this.imageForm.get('url'); }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  removeImage(index) {
    const images = this.parentForm.get('images') as FormArray;
    images.removeAt(index);
  }

  onSubmit() {
    const images = this.parentForm.get('images') as FormArray;
    images.push(this.fb.group(this.imageForm.value));
    this.imageForm.reset({
      title: '',
      description: '',
      url: ''
    });
  }

  onUpload(upload: Upload) {
    console.log(upload);
    const images = this.parentForm.get('images') as FormArray;
    images.push(this.fb.group({
      title: [''],
      url: [upload.downloadUrl],
      description: ['']
    }));
    console.log(images);
    console.log(this.parentForm);
  }

}
