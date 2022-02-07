import { Comments, Post } from "../Models/Post.model";

export const POST_LIST_REQUEST = "Post List Request";
export const POST_LIST_SUCCESS = "Post List Success";
export const POST_LIST_ERROR = "Post List Error";
export const POST_DELETE = "Post Delete";
export const POST_UPDATE = "Post Update";
export const POST_ADD = "Post Add";
export const COMMENT_ADD = "Comment Add";
export const COMMENT_REMOVE = "Comment Remove";
export const COMMENT_UPDATE = "Comment Update";

export class PostListRequestAction {
  readonly type = POST_LIST_REQUEST;
}

export class PostListSuccessAction {
  readonly type = POST_LIST_SUCCESS;

  constructor(public payload?: {data: Post[]}) {}
}

export class PostListErrorAction {
  readonly type = POST_LIST_ERROR;

  constructor(public errorPayload?: {errData: any}) {}
}

export class PostDeleteAction {
  readonly type = POST_DELETE;

  constructor(public payload?: {id: number}) {}
}

export class PostUpdateAction {
  readonly type = POST_UPDATE;

  constructor(public payload?: {data: Post}) {}
}

export class PostAddAction {
  readonly type = POST_ADD;

  constructor(public payload?: {data: Post}) {}
}

export class CommentAddAction {
  readonly type = COMMENT_ADD;
  constructor(public payload?: {data: Comments, postId: number}) {}
}

export class CommentRemoveAction {
  readonly type = COMMENT_REMOVE;
  constructor(public payload?: {commentId: number, postId: number}) {}
}

export class CommentUpdateAction {
  readonly type = COMMENT_UPDATE;
  constructor(public payload?: {data: Comments, postId: number}) {}
}
