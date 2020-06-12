export function selectedUserReducer(state = null , action) {
  switch (action.type) {
    case "SET_SELECTED_USER":
      return action.payload.user;
    default:
      return state;
  }
}
