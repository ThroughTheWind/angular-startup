import { AngularFirestore } from '@angular/fire/firestore';
import { Upload, toUploadDescription } from '../models/Upload';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { UploadState } from '../enums/upload-state';
import { UploadDescription } from '../models/UploadDescription';
import { UploadOptions } from '../models/UploadOptions';
import { map } from 'rxjs/operators';

const DEFAULT_PATH = 'files/';
const DEFAULT_DB = 'files';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  runningUploads: BehaviorSubject<Upload[]>;
  cancelledUploads: BehaviorSubject<Upload[]>;
  dataStore: {
    runningUploads: Upload[],
    cancelledUploads: Upload[]
  };

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
    this.dataStore = {
      runningUploads: [],
      cancelledUploads: []
    };
    this.runningUploads = new BehaviorSubject([]);
    this.cancelledUploads = new BehaviorSubject([]);
  }

  pushUpload(file: File, options: UploadOptions = null): Observable<Upload | null> {
    return new Observable(observer => {
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
          extension: file.name.indexOf('.') > 0 ? file.name.split('.').pop() : '',
          size: file.size,
        } as Upload;
  
        this.dataStore.runningUploads.push(upload);
        this.dataStore.runningUploads = this.dataStore.runningUploads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
        task
          .then(async snap => {
            upload.downloadUrl = await ref.getDownloadURL().toPromise();
            upload.state = UploadState.SUCCESS;
            this.addToCollection(upload);
            this.uploadEnded(upload);
            observer.next(upload);
          })
          .catch(() => {
            upload.state = UploadState.CANCELLED;
            this.uploadCancelled(upload);
            observer.error(upload);
          });
      }
    });    
  }

  deleteUpload(upload: UploadDescription) {
    if(!upload) return false;
    try {
      this.storage.ref(upload.path).delete();
      this.db.collection(upload.db).doc(upload.id).delete();
    } catch(e) {
      return false;
    }
    return true;
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

  addToCollection(upload: Upload, options: UploadOptions = null) {
    const targetDb = options ? options.db ? options.db : DEFAULT_DB : DEFAULT_DB;
    upload.db = targetDb;
    upload.id = this.db.createId();
    this.db.collection(targetDb).doc(upload.id).set(toUploadDescription(upload)).then(() => {});
  }

  getRunningUploads(): Observable<Upload[]> {
    return this.runningUploads.asObservable();
  }

  getSuccessfullUploads(): Observable<Upload[]> {
    return this.db.collection<Upload>(DEFAULT_DB).valueChanges().pipe(
      map(uploads => {
        return uploads.map(upload => {
          upload.state = UploadState.SUCCESS;
          upload.createdAt = new Date(upload.createdAt['seconds'] * 1000);
          return upload;
        });
      })
    );
  }

  getDistinctUploadExtensions(): Observable<string[]> {
    return this.db.collection<Upload>(DEFAULT_DB).valueChanges().pipe(
      map(uploads => {
        return Array.from(new Set(uploads.map(upload => upload.extension))).sort();
      })
    );
  }

  getCancelledUploads(): Observable<Upload[]> {
    return this.cancelledUploads.asObservable();
  }

  cancelRunning() {
    this.dataStore.runningUploads.forEach(upload => {
      upload.task.resume();
      upload.task.cancel();
    });
    this.dataStore.runningUploads = [];
    this.runningUploads.next(Object.assign({}, this.dataStore).runningUploads);
  }
}
