import { AbstractControl } from '@angular/forms';

export const emailRegEx
  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const urlRegEx = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const imageRegEx = /\.(jpeg|jpg|gif|png)$/;

export function ValidateEmail(control: AbstractControl) {
  return emailRegEx.test(control.value) ? null : {validEmail: true};
}

export function ValidateUrl(control: AbstractControl) {
  return urlRegEx.test(control.value) ? null : {validUrl: true};
}

export function ValidateImage(control: AbstractControl) {
  return imageRegEx.test(control.value) ? null : {validImage: true};
}
