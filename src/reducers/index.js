import { userReducer } from "./user";
import { combineReducers } from "redux";
import { bookReducer } from "./book";
import { groupReducer } from "./group";
import { postReducer } from "./post";
import { activeBookReducer } from "./activeBook";
import { selectedUserReducer } from "./selectedUser";

const rootReducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  groups: groupReducer,
  posts: postReducer,
  activeBook: activeBookReducer,
  selectedUser: selectedUserReducer,
});

export default rootReducer;
