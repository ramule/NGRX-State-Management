import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './Container/post/post.component';
import { UsersComponent } from './Container/users/users.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { YoutubeLayoutComponent } from './Components/youtube-layout/youtube-layout.component';

import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/app/reducers';
import { ErrorCmpComponent } from './Components/error-cmp/error-cmp.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UserEditComponent } from './Container/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserViewComponent } from './Container/user-view/user-view.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    ErrorCmpComponent,
    UserEditComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
