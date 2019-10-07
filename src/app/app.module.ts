import { UploadModule } from './modules/upload/upload.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { PostsModule } from './modules/posts/posts.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfirmDialogComponent } from './shared/modals/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ImageViewerModule } from './shared/images/image-viewer/image-viewer.module';
import { CategoryModule } from './modules/category/category.module';
import { UserMenuModule } from './shared/modals/user-menu/user-menu.module';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    ReactiveFormsModule,
    AuthenticationModule,
    PostsModule,
    UploadModule,
    CategoryModule,
    MaterialModule,
    ImageViewerModule,
    UserMenuModule
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
