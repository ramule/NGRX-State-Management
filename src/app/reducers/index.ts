import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromUser from "./user-reducer";
import * as fromPosts from "./post-reducer";

export interface RootReducerState {
  users: fromUser.UserReducerState;
  posts: fromPosts.postReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  posts: fromPosts.PostReducer
}

// got the state of user
export const getUserState = (state: RootReducerState) => state.users;

// exporting user state into component
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserError = createSelector(getUserState, fromUser.getUserError);
export const getUserErrorDt = createSelector(getUserState, fromUser.getUserErrData);

export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
}


// got the state of user
export const getPostState = (state: RootReducerState) => state.posts;
// exporting user state into component
export const getPostLoaded = createSelector(getPostState, fromPosts.getLoaded);
export const getPostLoading = createSelector(getPostState, fromPosts.getLoading);
export const getPostEntities = createSelector(getPostState, fromPosts.getEntities);
export const getPosts = createSelector(getPostState, fromPosts.getPosts);
export const getPostError = createSelector(getPostState, fromPosts.getUserError);
export const getPostErrorDt = createSelector(getPostState, fromPosts.getUserErrData);

export const getPostById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
}
