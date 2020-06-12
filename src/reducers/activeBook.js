export function activeBookReducer(state = null , action) {
  switch (action.type) {
    case "SET_ACTIVE_BOOK":
      return  action.payload;
    default:
      return state;
  }
}
