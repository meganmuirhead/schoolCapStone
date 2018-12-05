import {Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  pleaseTitle = 'Please Enter a Post Title!';
  pleaseContent = 'Please Enter Valid Content!';
  // @Output() postCreated = new EventEmitter<Post>();
  constructor(public  postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
