import { userReducer } from "./user";
import { combineReducers } from "redux";
import { bookReducer } from "./book";
import { groupReducer } from "./group";

const rootReducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  groups: groupReducer,
});

export default rootReducer;
