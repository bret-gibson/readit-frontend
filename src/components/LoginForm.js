import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Header,
  Button,
  Form,
  Segment,
  Message,
  Image,
} from "semantic-ui-react";
import {
  setCurrentUser,
  authenticatingUser,
  failedLogin,
  setUserPosts,
} from "../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function LoginForm(props) {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
  };

  //When form is submitted, make a fetch to "log in the user"
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let userIdToSearch = "";
    // fetch("http://localhost:3000/login", {
    fetch("https://book-club-backend.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: input.username,
        password: input.password,
      }),
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log("response from the server", userData);
        if (userData.error_message) {
          alert(userData.error_message);
        } else {
          userIdToSearch = userData.user_data.id;
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userId", userData.user_data.id); //added this to store current user
        }
      })
      .then(() => {
        // fetch(`http://localhost:3000/users/${userIdToSearch}`)
        fetch(`https://book-club-backend.herokuapp.com/users/${userIdToSearch}`)
          .then((resp) => resp.json())
          .then((userData) => {
            props.setCurrentUser(userData.user);
            props.setUserPosts(userData.user.posts);
          });
      });
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" style={{ color: "white" }}>
            <Image
              style={{ display: "inline-block" }}
              size="huge"
              src="/logo.png"
            ></Image>
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleLoginSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={input.username}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
              <Button primary fluid size="large" onClick={handleLoginSubmit}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New here?
            <Link to="/create-account">
              <Button primary size="tiny" style={{ marginLeft: "15px" }}>
                Sign up!
              </Button>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (userData) => dispatch(setCurrentUser(userData)),
    setUserPosts: (userPosts) => dispatch(setUserPosts(userPosts)),
    authenticatingUser: () => dispatch(authenticatingUser()),
    failedLogin: () => dispatch(failedLogin()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
