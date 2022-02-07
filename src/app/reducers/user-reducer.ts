import { createSelector } from "@ngrx/store";
import { Action } from "src/app/actions";
import { USER_ADD, USER_DELETE, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE } from "src/app/actions/user-action";
import { User } from "src/app/Models/User.model";
import { StoreUtility } from "../Utilities/store-utility";

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean,
  // user: User[];
  /* Using Entities and Ids */
  entities: {[id: number]: User},
  ids: number[]
  resError: any;
}

const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  error: false,
  // user: [],
  /* Using Entities and Ids */
  entities: {},
  ids: [],
  resError: {}
}

export function UserReducer(state = initialState, action: Action): any {
  switch(action.type) {
    case USER_LIST_REQUEST: {
      return {...state, loading: true}
    }
    case USER_LIST_ERROR: {
      console.log(action.errorPayload.errData);
      const responseError = action.errorPayload.errData.error;
      return {...state, error: true, loading: false, resError: responseError}
    }
    case USER_DELETE: {
      // const users = state.user.filter(data => data.id != action.payload.id);
      // return {...state, ...{user: users}}

      /* Using Entities and Ids */
      const id = action.payload.id;
      const newIds = state.ids.filter(data => data != id);
      const newEntities = StoreUtility.removeKeys(state.entities, id);
      return {...state, ...{entities: newEntities}, ids: newIds}
    }
    case USER_UPDATE: {
      // const users = state.user.filter(data => data.id != action.payload.data.id);
      // const updatedUser = users.concat(action.payload.data);
      // return {...state, ...{user: updatedUser}};

      /* Using Entities and Ids */

      const user = action.payload.data;
      const entity = {[user.id]: user};
      const updatedEntity = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntity}};
    }
    case USER_ADD: {
      // const user = action.payload.data;
      // const addedUser = state.user.concat(user);
      // return {...state, ...{user: addedUser}};

      /* Using Entities and Ids */

      const user = action.payload.data;
      const entity = {[user.id]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return {...state, ...{entities: newEntities}, ids: newIds};
    }
    case USER_LIST_SUCCESS: {
      // const updatedUsers = state.user.concat(action.payload.data);
      // return {...state, loading: false, loaded: true, user: updatedUsers, error: false, resError: []};

      /* Using Entities and Ids */

      const users = action.payload.data;
      const normalizeEntities = StoreUtility.normalize(users);
      const newEntities = {...state.entities, ...normalizeEntities};
      const ids = users.map((user:any) => user.id);
      const newIds = StoreUtility.filterDuplicateIds([{...state.ids, ...ids}]);
      return {...state, ...{loading: false, loaded: true, error: false, entities: newEntities, ids: newIds}}
    }
    default: {
      return state;
    }
  }
}

// selectors
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getEntities = (state: UserReducerState) => state.entities;
export const getIds = (state: UserReducerState) => state.ids;
export const getUsers = createSelector(getEntities, (entities) => StoreUtility.unNormalize(entities));
export const getUserError = (state: UserReducerState) => state.error;
export const getUserErrData = (state: UserReducerState) => state.resError;
