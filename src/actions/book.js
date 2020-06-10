export const setMostPopularBooks = (mostPopularBooks) => ({
  type: "SET_MOST_POPULAR_BOOKS",
  payload: mostPopularBooks,
});

export const setSearchedBooks = (books) => ({
  type: "SET_SEARCHED_BOOKS",
  payload: books,
});
