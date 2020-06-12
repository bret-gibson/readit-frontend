export function postReducer(state =  null , action) {
  switch (action.type) {
    case "SET_BOOK_POSTS":
      return action.payload;
    default:
      return state;
  }
}
