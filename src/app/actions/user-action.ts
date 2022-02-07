import { User } from "src/app/Models/User.model";

export const USER_LIST_REQUEST = "User List Request";
export const USER_LIST_SUCCESS = "User List Success";
export const USER_LIST_ERROR = "User List Error";
export const USER_DELETE = "User Delete";
export const USER_UPDATE = "User Update";
export const USER_ADD = "User Add";

export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}

export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;

  constructor(public payload?: {data: User[]}) {}
}

export class UserListErrorAction {
  readonly type = USER_LIST_ERROR;

  constructor(public errorPayload?: {errData: any}) {}
}

export class UserDeleteAction {
  readonly type = USER_DELETE;

  constructor(public payload?: {id: number}) {}
}

export class UserUpdateAction {
  readonly type = USER_UPDATE;

  constructor(public payload?: {data: User}) {}
}

export class UserAddAction {
  readonly type = USER_ADD;

  constructor(public payload?: {data: User}) {}
}
