import React, { useState } from "react";
import { withRouter } from "react-router";
import { Grid, Header, Button, Form, Segment, Image } from "semantic-ui-react";
import {
  setCurrentUser,
  loginUser,
  authenticatingUser,
  failedLogin,
} from "../actions/user";
import { compose } from "redux";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

function CreateUserForm(props) {
  const [input, setInput] = useState({
    username: "",
    password: "",
    avatar: "",
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
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: input.username[0],
        password: input.password[0],
        avatar: input.avatar[0],
      }),
    })
      .then(() => {
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: input.username[0],
            password: input.password[0],
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
              props.setCurrentUser(userData.user_data);
            }
          });
      })
      .then(() => {
        return props.history.push("/");
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
            Create Your Account
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
              <Form.Input
                fluid
                icon="paperclip"
                iconPosition="left"
                placeholder="Avatar URL"
                type="avatar"
                name="avatar"
                value={input.avatar}
                onChange={handleChange}
              />
              <Button primary fluid size="large" onClick={handleLoginSubmit}>
                Create Account and Login
              </Button>
            </Segment>
          </Form>
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
    authenticatingUser: () => dispatch(authenticatingUser()),
    failedLogin: () => dispatch(failedLogin()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateUserForm)
);
