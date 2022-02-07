import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, retry, take, takeWhile } from 'rxjs';
import { CommentAddAction, CommentRemoveAction, CommentUpdateAction, PostListErrorAction, PostListRequestAction, PostListSuccessAction } from '../actions/post-actions';
import {
  UserAddAction,
  UserDeleteAction,
  UserListErrorAction,
  UserListRequestAction,
  UserListSuccessAction,
  UserUpdateAction,
} from '../actions/user-action';
import { Comments } from '../Models/Post.model';
import { User } from '../Models/User.model';
import {
  getPostError,
  getPostErrorDt,
  getPostLoaded,
  getPostLoading,
  getPosts,
  getUserById,
  getUserError,
  getUserErrorDt,
  getUserLoaded,
  getUserLoading,
  getUsers,
  RootReducerState,
} from '../reducers';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class PrjRepositoryService {
  constructor(
    private restApiService: RestApiService,
    private store: Store<RootReducerState>
  ) {}

  getUserList(
    force = false
  ): [
    Observable<boolean>,
    Observable<any>,
    Observable<boolean>,
    Observable<any>
  ] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUsersData$ = this.store.select(getUsers);
    const getUserError$ = this.store.select(getUserError);
    const getUserErrorData$ = this.store.select(getUserErrorDt);
    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        console.log('data: ', data);
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new UserListRequestAction());
          this.restApiService.getUsers().pipe(retry(2)).subscribe(
            (res) => {
              this.store.dispatch(new UserListSuccessAction({ data: res }));
            },
            (error) => {
              console.log(error);
              this.store.dispatch(new UserListErrorAction({ errData: error }));
            }
          );
        }
      });

    return [loading$, getUsersData$, getUserError$, getUserErrorData$];
  }

  deleteUser(id: number) {
    this.store.dispatch(new UserDeleteAction({ id }));
  }

  updateUser(data: User) {
    //API call to update user and update it in store
    this.store.dispatch(new UserUpdateAction({ data }));
  }

  addUser(data: User) {
    //API call to add user and update it in store
    this.store.dispatch(new UserAddAction({ data }));
  }

  getUserById(id: number, force = false) {
    console.log("id in repo: ", id);
    const users$ = this.store.select((state) => getUserById(state, id));
    users$.pipe(take(1)).subscribe((res) => {
      if (force || !res) {
        return this.restApiService.getUser(id).subscribe((data) => {
          this.store.dispatch(new UserAddAction({ data }));
        });
      }
      return res;
    });
    return users$;
  }

  getPostList(force = false): [Observable<boolean>,Observable<any>,Observable<boolean>,Observable<any>] {
    const postLoading$ = this.store.select(getPostLoading);
    const postLoaded$ = this.store.select(getPostLoaded);
    const getPostData$ = this.store.select(getPosts);
    const getPostError$ = this.store.select(getPostError);
    const getPostErrorData$ = this.store.select(getPostErrorDt);
    combineLatest([postLoading$, postLoaded$])
    .pipe(take(1))
    .subscribe((data) => {
      console.log('data: ', data);
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new PostListRequestAction());
        this.restApiService.getPosts().subscribe(
          (res) => {
            this.store.dispatch(new PostListSuccessAction({ data: res }));
          },
          (error) => {
            console.log(error);
            this.store.dispatch(new PostListErrorAction({ errData: error }));
          }
        );
      }
    });
    return [postLoading$, getPostData$, getPostError$, getPostErrorData$];
  }

  addComment(comment: Comments, postId: number) {
    return this.store.dispatch(new CommentAddAction({data: comment, postId: postId}))
  }

  updateComment(comment: Comments, postId: number) {
    return this.store.dispatch(new CommentUpdateAction({data: comment, postId: postId}))
  }

  deleteComment(commentId: number, postId: number) {
    return this.store.dispatch(new CommentRemoveAction({commentId: commentId, postId: postId}))
  }
}
