import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error: string[] = [];
  private errorSubscription: Subscription;

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.error.subscribe(errorMessage => {
      this.error.push(errorMessage);
    });
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error.push(error.error.error);
      //this.error = error.message;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
    
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error.push(error.error.error);
        //this.error = error.message;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.onDelete().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError(index: number) {
    this.error.splice(index, 1);
  }

  ngOnDestroy() {
     this.errorSubscription.unsubscribe();
  }  
}
