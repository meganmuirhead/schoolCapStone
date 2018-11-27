import {Post} from './post.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(): any {
    return [...this.posts];
  }
  getPostUpdateListener(): any {
    return this.postsUpdated.asObservable();
  }


  // @ts-ignore
  // getPosts() {
  //   return [...this.posts];
  // }
  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }
  // @ts-ignore
  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
