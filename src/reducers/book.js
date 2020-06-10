export function bookReducer(
  state = { mostPopular: null, searchedBooks: null },
  action
) {
  switch (action.type) {
    case "SET_MOST_POPULAR_BOOKS":
      return {
        ...state,
        mostPopular: action.payload,
      };
    case "SET_SEARCHED_BOOKS":
      return {
        ...state,
        searchedBooks: action.payload,
      };
    default:
      return state;
  }
}
