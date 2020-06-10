import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Header,
  Button,
  Form,
  Segment,
  Message,
} from "semantic-ui-react";
import {
  setCurrentUser,
  loginUser,
  authenticatingUser,
  failedLogin,
} from "../actions/user";
import { compose } from "redux";
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
    fetch("http://localhost:3000/login", {
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
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userId", userData.user_data.id); //added this to store current user
        }
      })
      .then(() => {
        fetch(`http://localhost:3000/users/${localStorage.getItem("userId")}`)
          .then((resp) => resp.json())
          .then((userData) => {
            props.setCurrentUser(userData);
          });
      });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <img src="/static/images/logo.png" alt="logo" className="image" />{" "}
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
            <Button color="teal" fluid size="large" onClick={handleLoginSubmit}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New here?
          <Link to="/create-account">
            <Button size="tiny" style={{ marginLeft: "15px" }}>
              Sign up!
            </Button>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (userData) => dispatch(setCurrentUser(userData)),
    authenticatingUser: () => dispatch(authenticatingUser()),
    failedLogin: () => dispatch(failedLogin()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
