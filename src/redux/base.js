import { combineReducers } from "redux";
import { SET_BODY } from "./action";

const body = (prevState = null, action) => {
  if (action.type === SET_BODY) {
    return action.body;
  }
  return prevState;
};

export const baseReducer = combineReducers({ body });
