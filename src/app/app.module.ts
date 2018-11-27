import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatToolbarModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostsService} from './posts/posts.service';

const routes: Routes = [
  // { path: 'create', component: CreateComponent },
  // { path: 'edit/:id', component: EditComponent },
  // { path: 'list', component: ListComponent },
  // { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
