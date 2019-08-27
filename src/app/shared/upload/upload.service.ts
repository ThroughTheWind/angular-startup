import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from './Upload';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private af: AngularFireStorage, private afs: AngularFirestore) { }

  pushUpload(file: File) {
    /*return new Observable(observer => {
      const fileId = this.afs.createId();
      const ref = this.af.ref(fileId);
      const task = ref.put(file);
      const uploadProgess = task.percentageChanges;
      const downloadUrl = task.downloadUrl();

    });*/

  }
}
