import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from './Upload';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, filter } from 'rxjs/operators';

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
  }

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

  pushUpload(file: File, options: { path: string, db: string } = null): Upload | null {
    if(file) {
      const targetPath = options ? options.path ? options.path : DEFAULT_PATH : DEFAULT_PATH;
      const path = `${targetPath}${Date.now()}_${file.name}`;
      // Reference to storage bucket
      const ref = this.storage.ref(path);
      // The main task
      const task = this.storage.upload(path, file);
      const upload = {
        file,
        path,
        createdAt: new Date(),
        task,
        state: 'running'
      } as Upload;

      this.dataStore.runningUploads.push(upload);
      this.dataStore.runningUploads = this.dataStore.runningUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
      task
        .then(async snap => {
          const downloadUrl = await ref.getDownloadURL().toPromise();
          const targetDb = options ? options.db ? options.db : DEFAULT_DB : DEFAULT_DB;
          this.db.collection(targetDb).add( { downloadUrl, path });
          upload.downloadUrl = downloadUrl;
          upload.state = snap.state;
          this.uploadEnded(upload);
        })
        .catch(snap => {
          upload.state = snap.state;
          this.uploadCancelled(upload);
        });
      return upload;
    }
    return null;
  }

  uploadEnded(upload: Upload) {
    const uploads = this.dataStore.runningUploads;
    uploads.splice(uploads.indexOf(uploads.find(up => up.file === upload.file && up.createdAt === upload.createdAt)), 1)
    this.dataStore.runningUploads = uploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
  }

  uploadCancelled(upload: Upload) {
    this.uploadEnded(upload);
    this.dataStore.cancelledUploads.push(upload);
    this.dataStore.cancelledUploads = this.dataStore.cancelledUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.cancelledUploads.next(Object.assign({}, this.dataStore).cancelledUploads);
  }

  uploadSuccessful(upload: Upload) {
    this.uploadEnded(upload);
    this.dataStore.successfullUploads.push(upload);
    this.dataStore.successfullUploads = this.dataStore.successfullUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.successfullUploads.next(Object.assign({}, this.dataStore).successfullUploads);
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
