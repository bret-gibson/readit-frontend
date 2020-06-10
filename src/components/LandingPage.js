import React from "react";
import { Card, Grid, Image, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function LandingPage(props) {
  //   return this.props.user ? (
  return (
    <Grid columns={3}>
      <Grid.Column></Grid.Column>

      <Grid.Column style={{ textAlign: "center" }}>
        <h1>Welcome to Flatiron Bookclub!</h1>
        {/* <h3>At Flatiron Bookclub you can</h3> */}
        <ul style={{ textAlign: "left" }}>
          <li>Create book clubs</li>
          <li>View and join any existing clubs</li>
          <li>Search book and add them to your book club</li>
          <li>Discuss books your club is reading</li>
          <li>Much More!</li>
        </ul>
        <h3>Get Started</h3>
        <Link to="/browse-groups">
          <Button>Browse Book Clubs</Button>
        </Link>
        <h3>Or</h3>
        <Link to="/browse-books">
          <Button>Browse Books</Button>
        </Link>

        <h3>In order to create and join clubs, please create an account:</h3>
        <Link to="/create-account">
          <Button>Sign Up</Button>
        </Link>
        <h3>Or</h3>
        <Link to="/login">
          <Button>Sign In</Button>
        </Link>
      </Grid.Column>

      <Grid.Column></Grid.Column>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};


export default withRouter(connect(mapStateToProps)(LandingPage));
