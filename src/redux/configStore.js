import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger/src";
import thunk from "redux-thunk";
import { usersReducer } from "./reducers/usersReducer";
import { contactsReducer } from "./reducers/contatcsReducer";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({ usersReducer, contactsReducer }),
  applyMiddleware(thunk, logger)
);
