import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Post } from 'src/app/Models/Post.model';
import { PrjRepositoryService } from 'src/app/services/prj-repository.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postsData: Post[] = [];
  loading: boolean = false;
  err: boolean = false;
  errData: any;
  isAlive: boolean = true;
  constructor(
    private prjRepo: PrjRepositoryService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const observer$ = this.prjRepo.getPostList();
    console.log('observer: ', observer$);
    const loading$ = observer$[0];
    const postData$ = observer$[1];
    const error$ = observer$[2];
    const errorData$ = observer$[3];
    postData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.postsData = data;
      console.log('postdata: ', this.postsData);
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data=> {
      this.loading = data;
      console.log('loadingdata: ', data);
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data=> {
      this.err = data;
      console.log('error: ', data);
    });
    errorData$.pipe(takeWhile(() => this.isAlive)).subscribe(data=> {
      this.errData = data;
      console.log('errordata: ', this.errData);
    });
  }

  onCommentAdd(commentVal: any, post: Post) {
    console.log("Post Id: ", post);
    console.log("comment value: ", commentVal);
    console.log(post.comments.length);
    const commentId = post.comments[post.comments.length - 1].id + 1;
    const commentData = {
      "id": commentId,
      "description": commentVal
    }
    this.prjRepo.addComment(commentData, post.id);
  }

  onDeleteComment(commentId: number, postId: number) {
    this.prjRepo.deleteComment(commentId, postId);
  }

  onEditComment(postId: number) {
    // Open one dialog box and give comment input box there to edit previous comment...
    console.log("post id: ", postId);
  }

}
