import {Post} from './post.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
 constructor(private http: HttpClient) {

 }
  getPosts(): any {
   this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
     .subscribe((postData) => {
       this.posts = postData.posts;
       this.postsUpdated.next([...this.posts]);
     });
    // return [...this.posts];
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
    const post: Post = {id: null, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
