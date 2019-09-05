import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { UploadDetailComponent } from './components/upload-detail/upload-detail.component';
import { DisplayFileSizePipe } from './pipes/display-file-size.pipe';
import { UploadRoutingModule } from './upload-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    DropZoneDirective,
    UploaderComponent,
    UploadsComponent,
    UploadDetailComponent,
    DisplayFileSizePipe
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule
  ],
  exports: [
    UploaderComponent,
    UploadsComponent,
    DisplayFileSizePipe
  ]
})
export class UploadModule { }
