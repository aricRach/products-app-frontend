import {Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import {FileUploadService} from '../file-upload.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit, OnDestroy {

  @Input() percent: number;
  @Output() fileUploaded = new EventEmitter<string>();
  @Output() fileSelected = new EventEmitter<File>();
  selectedFiles: FileList;
  private subscription: Subscription;

  constructor(private uploadService: FileUploadService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.uploadService.imageObservable.subscribe((url: string) => {
      this.fileUploaded.emit(url);
    }));
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.fileSelected.emit(event.target.files.item(0));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
