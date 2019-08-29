import { AngularFireUploadTask } from '@angular/fire/storage';

export class Upload {
    file: File;
    name: string;
    downloadUrl: string;
    path: string;
    createdAt: Date = new Date();
    task: AngularFireUploadTask;
    state: string;
    constructor(file: File) {
      this.file = file;
    }
}
