export function groupReducer(
  state = {
    group: null,
    mostPopularGroups: null,
    searchedGroups: null,
    groupBooks: null,
    groupUsers: null,
    groupBook: null,
  },
  action
) {
  switch (action.type) {
    case "SET_MOST_POPULAR_GROUPS":
      return {
        ...state,
        mostPopularGroups: action.payload,
      };
    case "SET_SEARCHED_GROUPS":
      return {
        ...state,
        searchedGroups: action.payload,
      };
    case "SET_GROUP_BOOKS":
      return {
        ...state,
        groupBooks: action.payload,
      };
    case "SET_GROUP_USERS":
      return {
        ...state,
        groupUsers: action.payload,
      };
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
      };
    case "SET_GROUP_BOOK":
      return {
        ...state,
        groupBook: action.payload,
      };
    default:
      return state;
  }
}
