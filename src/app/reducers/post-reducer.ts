import { createSelector } from "@ngrx/store";
import { Action } from "../actions";
import { COMMENT_ADD, COMMENT_REMOVE, COMMENT_UPDATE, POST_ADD, POST_DELETE, POST_LIST_ERROR, POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_UPDATE } from "../actions/post-actions";
import { Post } from "../Models/Post.model";
import { StoreUtility } from "../Utilities/store-utility";

export interface postReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean,
  entities: {[id: number]: Post},
  ids: number[]
  resError: any;
}

export const initialState: postReducerState = {
  loading: false,
  loaded: false,
  error: false,
  entities: {},
  ids: [],
  resError: []
}

export function PostReducer(state = initialState, action: Action): any {
  switch(action.type) {
    case POST_LIST_REQUEST: {
      return {...state, loading: true}
    }
    case POST_LIST_ERROR: {
      console.log(action.errorPayload.errData);
      const responseError = action.errorPayload.errData.error;
      return {...state, error: true, loading: false, resError: responseError}
    }
    case POST_DELETE: {

      /* Using Entities and Ids */
      const id = action.payload.id;
      const newIds = state.ids.filter(data => data != id);
      const newEntities = StoreUtility.removeKeys(state.entities, id);
      return {...state, ...{entities: newEntities}, ids: newIds}
    }
    case POST_UPDATE: {
      /* Using Entities and Ids */

      const post = action.payload.data;
      const entity = {[post.id]: post};
      const updatedEntity = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntity}};
    }
    case POST_ADD: {

      /* Using Entities and Ids */

      const post = action.payload.data;
      const entity = {[post.id]: post};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, post.id]);
      return {...state, ...{entities: newEntities}, ids: newIds};
    }
    case POST_LIST_SUCCESS: {

      /* Using Entities and Ids */

      const posts = action.payload.data;
      const normalizeEntities = StoreUtility.normalize(posts);
      const newEntities = {...state.entities, ...normalizeEntities};
      const ids = posts.map((post:any) => post.id);
      const newIds = StoreUtility.filterDuplicateIds([{...state.ids, ...ids}]);
      return {...state, ...{loading: false, loaded: true, error: false, entities: newEntities, ids: newIds}}
    }
    case COMMENT_ADD: {
      const postId = action.payload.postId;
      const comment = action.payload.data;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      oldPost.comments.push(comment);
      const obj = {[postId]: oldPost};
      const entities = {...state.entities, ...obj};
      return {...state, ...{entities}};
    }
    case COMMENT_UPDATE: {
      const postId = action.payload.postId;
      const comment = action.payload.data;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      const oldPostRemoveComment = oldPost.comments.filter(data => data.id !== comment.id);
      oldPostRemoveComment.push(comment);
      oldPost.comments = oldPostRemoveComment;
      const obj = {[postId]: oldPost};
      const entities = {...state.entities, ...obj};
      return {...state, ...{entities}};
    }
    case COMMENT_REMOVE: {
      const postId = action.payload.postId;
      const commentId = action.payload.commentId;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      const oldPostRemoveComment = oldPost.comments.filter(data => data.id !== commentId);
      oldPost.comments = oldPostRemoveComment;
      const obj = {[postId]: oldPost};
      const entities = {...state.entities, ...obj};
      return {...state, ...{entities}};
    }
    default: {
      return state;
    }
  }
}


// selectors
export const getLoading = (state: postReducerState) => state.loading;
export const getLoaded = (state: postReducerState) => state.loaded;
export const getEntities = (state: postReducerState) => state.entities;
export const getIds = (state: postReducerState) => state.ids;
export const getPosts = createSelector(getEntities, (entities) => StoreUtility.unNormalize(entities));
export const getUserError = (state: postReducerState) => state.error;
export const getUserErrData = (state: postReducerState) => state.resError;
