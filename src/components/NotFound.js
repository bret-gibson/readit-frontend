import React, { Fragment } from "react";
import { Header, Image } from "semantic-ui-react";

const NotFound = () => (
  <Fragment>
    <Header size="huge" inverted color="purple">
      Oops! Looks like this page doesn't exist!
    </Header>
  </Fragment>
);

export default NotFound;
