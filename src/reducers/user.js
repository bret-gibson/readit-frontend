export function userReducer(state = null, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.payload;

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
    // case "SET_SELECTED_USER":
    //   return {
    //     ...state,
    //     selectedUser: action.payload,
    //   };
    case "SET_USER_POSTS":
      return {
        ...state,
        userPosts: action.payload,
      };
    default:
      return state;
  }
}
