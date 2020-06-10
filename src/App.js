import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { setCurrentUser, setUserGroups } from "./actions/user";
import LandingPage from "./components/LandingPage";
import BookSearchContainer from "./components/BookSearchContainer";
import GroupSearchContainer from "./components/GroupSearchContainer";
import GroupPage from "./components/GroupPage";
import ProfilePage from "./components/ProfilePage";
import CreateGroupForm from "./components/CreateGroupForm";
import CreateUserForm from "./components/CreateUserForm";

function App(props) {
  // constructor() {
  //   super();
  //   this.state = { currentUser: null };
  // }

  // updateCurrentUser = (user) => {
  //   this.setState({ currentUser: user });
  // };
  // useEffect(() => {
  //   checkUserAuthentication();
  // });

  // const checkUserAuthentication = () => {
  //   console.log("mounted");
  //   if (localStorage.getItem("token")) {
  //     fetch("http://localhost:3000/decode_token", {
  //       headers: {
  //         Authenticate: localStorage.token,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((userData) => {
  //         // this.updateCurrentUser(userData);
  //         setCurrentUser(userData);
  //         //if error, don't update the state
  //       });
  //   } else {
  //     console.log("No token found, user is not authenticated");
  //   }
  // };
  // componentDidMount() {
  //   console.log("mounted");
  //   if (localStorage.getItem("token")) {
  //     fetch("http://localhost:3000/decode_token", {
  //       headers: {
  //         Authenticate: localStorage.token,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((userData) => {
  //         this.updateCurrentUser(userData);
  //         //if error, don't update the state
  //       });
  //   } else {
  //     console.log("No token found, user is not authenticated");
  //   }
  // }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3000/decode_token", {
        headers: {
          Authenticate: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          props.setCurrentUser(userData);
          props.setUserGroups(userData.groups);

          //if error, don't update the state
        });
    } else {
      console.log("No token found, user is not authenticated");
    }
  }, []);
  return (
    <div>
      <Nav
      // user={this.state.currentUser}
      // updateCurrentUser={this.updateCurrentUser}
      />
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route
          exact
          path="/users/:id"
          render={() => {
            return <ProfilePage />;
          }}
        />
        <Route
          exact
          path="/browse-books"
          render={() => <BookSearchContainer />}
        />
        <Route
          exact
          path="/browse-clubs"
          render={() => <GroupSearchContainer />}
        />
        <Route exact path="/create-club" render={() => <CreateGroupForm />} />
        <Route exact path="/create-account" render={() => <CreateUserForm />} />
        <Route exact path="/groups/:id" render={() => <GroupPage />} />
        <Route
          exact
          path="/login"
          render={() =>
            props.user === null ? (
              // <LoginForm updateCurrentUser={this.updateCurrentUser} />
              <LoginForm />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setUserGroups: (userGroups) => dispatch(setUserGroups(userGroups)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// export default withRouter(App);
