export const setMostPopularGroups = (mostPopularGroups) => ({
  type: "SET_MOST_POPULAR_GROUPS",
  payload: mostPopularGroups,
});

export const setSearchedGroups = (groups) => ({
  type: "SET_SEARCHED_GROUPS",
  payload: groups,
});

export const setGroupBooks = (group) => ({
  type: "SET_GROUP_BOOKS",
  payload: group,
});

export const setGroupUsers = (groupUsers) => ({
  type: "SET_GROUP_USERS",
  payload: groupUsers,
});

export const setGroup = (group) => ({
  type: "SET_GROUP",
  payload: group,
});

export const setGroupBook = (groupBook) => ({
    type: "SET_GROUP_BOOK",
    payload: groupBook,
  });