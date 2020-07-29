import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { SearchImageComponent } from './components/search-image/search-image.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageListComponent } from './components/image-list/image-list.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent,
    SearchImageComponent,
    ImageListComponent,
    InfiniteScrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
