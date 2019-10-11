import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export const emailRegEx
  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const urlRegEx = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const imageRegEx = /\.(jpeg|jpg|gif|png)$/;

//8 caracters, with 1 upper/lower case, 1 special caracter
const passwordRegEx = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;

export function ValidateEmail(control: AbstractControl) {
  return emailRegEx.test(control.value) ? null : {validEmail: true};
}

export function ValidateUrl(control: AbstractControl) {
  return urlRegEx.test(control.value) ? null : {validUrl: true};
}

export function ValidateImage(control: AbstractControl) {
  return imageRegEx.test(control.value) ? null : {validImage: true};
}

export function ValidatePassword(control: AbstractControl) {
  return passwordRegEx.test(control.value) ? null : {validPassword: true};
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
