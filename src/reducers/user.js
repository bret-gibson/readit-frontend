export function userReducer(state = { user: null, userGroups: null }, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "AUTHENTICATING_USER":
      return {
        ...state,
        message: "Authenticating user",
      };
    case "FAILED_LOGIN":
      return {
        ...state,
        message: "Login failed",
      };
    case "SET_USER_GROUPS":
      return {
        ...state,
        userGroups: action.payload,
      };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
}
