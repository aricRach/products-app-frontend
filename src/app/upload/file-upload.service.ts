import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, Subject} from 'rxjs';
import { finalize } from 'rxjs/operators';
import {FileUpload} from './file-upload';
import {UserService} from '../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/uploads';

  private imageSubject = new Subject();
  imageObservable: Observable<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,
              private userService: UserService) {
    this.imageObservable = this.imageSubject.asObservable();
  }

  pushFileToStorage(fileUpload: FileUpload, productId: number): Observable<number> {
    const filePath = `${this.basePath}/${this.userService.getUser().email}/${productId}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL: string) => {
          this.imageSubject.next({downloadURL, productId});
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }


   deleteFileStorage(id: number): void {
    const storageRef = this.storage.ref(this.basePath + '/' + this.userService.getUser().email + '/' + id) ;
    storageRef.delete().subscribe(() => {
      console.log('file deleted');
    }, (err => {
      console.log(err);
    }
    ));
  }
}
