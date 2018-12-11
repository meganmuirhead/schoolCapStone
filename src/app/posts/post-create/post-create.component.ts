import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {Post} from '../post.model';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  private post: Post;
  pleaseTitle = 'Please Enter a Post Title!';
  pleaseContent = 'Please Enter Valid Content!';
  // @Output() postCreated = new EventEmitter<Post>();
  constructor(public  postsService: PostsService, public route: ActivatedRoute) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   id: null,
    //   title: form.value.title,
    //   content: form.value.content
    // };
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
