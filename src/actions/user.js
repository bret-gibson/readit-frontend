// export const loginUser = (username, password) => {
//   return /*FUNCTION*/ (dispatch) => {
//     // console.log(process.env.REACT_APP_API_ENDPOINT);
//     dispatch(authenticatingUser());
//     // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`)
//     fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username: username,
//           password: password,
//         },
//       }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw response;
//         }
//       })
//       // {user: {}, jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'}
//       .then(({ user, jwt }) => {
//         localStorage.setItem("userData", user);
//         localStorage.setItem("token", jwt);
//         dispatch(setCurrentUser(user));
//       })
//       .catch((r) => r.json().then((e) => dispatch(failedLogin(e.message))));
//     // .then((jsonResponse) => {
//     //   localStorage.setItem('jwt', jsonResponse.jwt)
//     //   dispatch(setCurrentUser(jsonResponse.user))
//     // })
//   };
// };

// export const fetchCurrentUser = () => {
//   // takes the token in localStorage and finds out who it belongs to
//   return (dispatch) => {
//     dispatch(authenticatingUser());
//     fetch("http://localhost:3000/profile", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((response) => response.json())
//       .then(({ user }) => dispatch(setCurrentUser(user)));
//   };
// };

export const setCurrentUser = (userData) => ({
  type: "SET_CURRENT_USER",
  payload: userData,
});

export const failedLogin = (errorMsg) => ({
  type: "FAILED_LOGIN",
  payload: errorMsg,
});

export const setUserGroups = (userGroups) => ({
  type: "SET_USER_GROUPS",
  payload: userGroups,
});

export const setSelectedUser = (selectedUser) => ({
  type: "SET_SELECTED_USER",
  payload: selectedUser,
});

export const setUserPosts = (userPosts) => ({
  type: "SET_USER_POSTS",
  payload: userPosts,
});

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: "AUTHENTICATING_USER" });
