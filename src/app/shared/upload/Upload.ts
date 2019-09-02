import { AngularFireUploadTask } from '@angular/fire/storage';
import { UploadState } from './upload-state';
import { UploadDescription } from './UploadDescription';

export class Upload implements UploadDescription {
    
  file: File;
  name: string;
  downloadUrl: string;
  path: string;
  size: number;
  createdAt: Date = new Date();
  extension: string;
  task: AngularFireUploadTask;
  state: UploadState;
  id: string;
  constructor(file: File) {
    this.file = file;
  }
}


export function toUploadDescription(upload: Upload) {
  return {
    name: upload.name,
    path: upload.path,
    downloadUrl: upload.downloadUrl,
    size: upload.size,
    extension: upload.extension,
    createdAt: upload.createdAt
  } as UploadDescription;
}
