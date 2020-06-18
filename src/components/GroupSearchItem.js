import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Image,
  Header,
  Modal,
  Item,
  Divider,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setGroup } from "../actions/group";

function GroupSearchItem(props) {
  // const handleGroupClick = () => {
  //   props.setGroup(props.group);
  // };
  return (
    <div style={{ color: "white" }}>
      {/* <Link to={`/groups/${props.group.id}`} onClick={handleGroupClick}>
        <Card style={{ display: "inline-block" }}>
          <Card.Content>
            <Card.Header>{props.group.name}</Card.Header>
            <Card.Description>{props.group.description}</Card.Description>
          </Card.Content>
        </Card>
      </Link> */}

      <Link to={`/groups/${props.group.id}`}>
        <Item.Image size="small" src={props.group.image_url} />
      </Link>
      <Item.Content>
        <Link to={`/groups/${props.group.id}`}>
          <Item.Header as="a">{props.group.name}</Item.Header>
        </Link>
        <Item.Description style={{ alignItems: "center" }}>
          <p>{props.group.description}</p>
        </Item.Description>
      </Item.Content>
      <Divider />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mostPopular: state.books.mostPopularGroups,
    searchedBooks: state.books.searchedGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (group) => dispatch(setGroup(group)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupSearchItem)
);
