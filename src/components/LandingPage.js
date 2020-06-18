import React from "react";
import {
  Card,
  Grid,
  Image,
  Button,
  Header,
  Icon,
  Container,
  Segment,
  Divider,
  Form,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function LandingPage(props) {
  //   return this.props.user ? (
  return (
    <div style={{ marginBottom: "250px" }}>
      <div style={{ textAlign: "center", alignItems: "center" }}>
        <Image style={{ margin: "auto" }} size="small" src="/logo.png"></Image>
        <Container text>
          <Header
            as="h1"
            content="Welcome to readit!"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "0.5em",
              color: "white",
            }}
          />
          <Header
            as="h2"
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em",
              color: "white",
            }}
          >
            <ul
              style={{
                alignItems: "center",
                textAlign: "left",
                listStyle: "none",
              }}
            >
              <li>Create book clubs</li>
              <li>View and join any existing clubs</li>
              <li>Search books and add them to your book club</li>
              <li>Discuss books your club is reading</li>
              <li>Much More!</li>
            </ul>
          </Header>
          <Divider />
          <h2 style={{ color: "white" }}>Get Started</h2>
          <Link to="/browse-clubs">
            <Button size="huge">Browse Book Clubs</Button>
          </Link>

          <Link to="/browse-books">
            <Button size="huge">Browse Books</Button>
          </Link>
          <Divider />

          <Segment>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <h3>
                  In order to create and join clubs, please create an account
                </h3>
                <Link to="/create-account">
                  <Button>Sign Up</Button>
                </Link>
              </Grid.Column>

              <Grid.Column verticalAlign="middle">
                <h3>If you already have an account with us</h3>
                <Link to="/login">
                  <Button>Sign In</Button>
                </Link>
              </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
          </Segment>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(LandingPage));
