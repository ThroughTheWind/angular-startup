import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { UploadDetailComponent } from './components/upload-detail/upload-detail.component';
import { UploadFilterComponent } from './components/upload-filter/upload-filter.component';
import { DisplayFileSizePipe } from './pipes/display-file-size.pipe';
import { UploadRoutingModule } from './upload-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DropZoneDirective,
    UploaderComponent,
    UploadsComponent,
    UploadDetailComponent,
    DisplayFileSizePipe,
    UploadFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatGridListModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    UploaderComponent,
    UploadsComponent,
    DisplayFileSizePipe
  ]
})
export class UploadModule { }
