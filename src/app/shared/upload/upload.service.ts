import { AngularFirestore } from '@angular/fire/firestore';
import { Upload, toUploadDescription } from './Upload';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { UploadState } from './upload-state';
import { UploadDescription } from './UploadDescription';
import { UploadOptions } from './UploadOptions';

const DEFAULT_PATH = 'files/';
const DEFAULT_DB = 'files';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  runningUploads: BehaviorSubject<Upload[]>;
  successfullUploads: BehaviorSubject<Upload[]>;
  cancelledUploads: BehaviorSubject<Upload[]>;
  dataStore: {
    runningUploads: Upload[],
    successfullUploads: Upload[],
    cancelledUploads: Upload[]
  };

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
    this.dataStore = {
      runningUploads: [],
      successfullUploads: [],
      cancelledUploads: []
    };
    this.runningUploads = new BehaviorSubject([]);
    this.successfullUploads = new BehaviorSubject([]);
    this.cancelledUploads = new BehaviorSubject([]);
  }

  pushUpload(file: File, options: UploadOptions = null): Upload | null {
    if (file) {
      const targetPath = options ? options.path ? options.path : DEFAULT_PATH : DEFAULT_PATH;
      const path = `${targetPath}${Date.now()}_${file.name}`;
      // Reference to storage bucket
      const ref = this.storage.ref(path);
      // The main task
      const task = this.storage.upload(path, file);
      const upload = {
        name: file.name,
        file,
        path,
        createdAt: new Date(),
        task,
        state: UploadState.RUNNING,
        extension: file.name.split('.').pop(),
        size: file.size,
      } as Upload;

      this.dataStore.runningUploads.push(upload);
      this.dataStore.runningUploads = this.dataStore.runningUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
      task
        .then(async snap => {
          upload.downloadUrl = await ref.getDownloadURL().toPromise();
          upload.state = UploadState.SUCCESS;
          this.addToCollection(toUploadDescription(upload));
          this.uploadSuccessfull(upload);
        })
        .catch(() => {
          upload.state = UploadState.CANCELLED;
          this.uploadCancelled(upload);
        });
      return upload;
    }
    return null;
  }

  uploadEnded(upload: Upload) {
    const uploads = this.dataStore.runningUploads;
    uploads.splice(uploads.indexOf(uploads.find(up => up.file === upload.file && up.createdAt === upload.createdAt)), 1);
    this.dataStore.runningUploads = uploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
  }

  uploadCancelled(upload: Upload) {
    this.uploadEnded(upload);
    this.dataStore.cancelledUploads.push(upload);
    this.dataStore.cancelledUploads = this.dataStore.cancelledUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.cancelledUploads.next(Object.assign({}, this.dataStore).cancelledUploads);
  }

  uploadSuccessfull(upload: Upload) {
    this.uploadEnded(upload);
    this.dataStore.successfullUploads.push(upload);
    this.dataStore.successfullUploads = this.dataStore.successfullUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.successfullUploads.next(Object.assign({}, this.dataStore).successfullUploads);
  }

  addToCollection(upload: UploadDescription, options: UploadOptions = null) {
    const targetDb = options ? options.db ? options.db : DEFAULT_DB : DEFAULT_DB;
    upload.id = this.db.createId();
    this.db.collection(targetDb).doc(upload.id).set(upload).then(() => {});
  }

  getRunningUploads(): Observable<Upload[]> {
    return this.runningUploads.asObservable();
  }

  getSuccessfullUploads(): Observable<Upload[]> {
    return this.successfullUploads.asObservable();
  }

  getCancelledUploads(): Observable<Upload[]> {
    return this.cancelledUploads.asObservable();
  }

  cancelRunning() {
    this.dataStore.runningUploads.forEach(upload => {
      upload.task.cancel();
    });
    this.dataStore.runningUploads = [];
    this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
  }
}
