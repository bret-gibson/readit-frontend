import React, { useState, useEffect } from "react";
import { Button, Item, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  setGroupBooks,
  setGroupUsers,
  setGroup,
  setGroupBook,
} from "../actions/group";

function GroupPage(props) {
  const handleGroupBookClick = (a) => {
    props.setGroupBook(a);
  };

  useEffect(() => {
    let groupBooks = null;
    let groupUsers = null;
    let wrongHostString = document.location.toString();
    let rightHostString = wrongHostString.replace("3001", "3000");
    fetch(rightHostString)
      .then((resp) => resp.json())
      .then((group) => {
        props.setGroup(group);
        groupBooks = group.group_books;
        groupUsers = group.users;
      })
      .then(() => {
        props.setGroupBooks(groupBooks);
        props.setGroupUsers(groupUsers);
      });
  }, []);

  if (
    props.groupBooks === null &&
    props.groupUsers === null &&
    props.group === null
  ) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>Welcome to {props.group.name}!</h1>
        {props.group.users.length === 1 ? (
          <h3>{props.group.users.length} member</h3>
        ) : (
          <h3>{props.group.users.length} members</h3>
        )}
        <Button size="huge" floated="right">
          Join Group
        </Button>
        <h1>{props.group.description}</h1>
        {props.group.group_books ? (
          <Item.Group divided>
            {props.group.group_books.map((groupBook) => {
              return (
                <Item>
                  <Link
                    to=""
                    onClick={() => {
                      handleGroupBookClick(groupBook);
                    }}
                  >
                    <Item.Image size="small" src={groupBook.book.thumbnail} />
                  </Link>
                  <Item.Content style={{ marginLeft: "20px" }}>
                    <Link
                      to=""
                      onClick={() => {
                        handleGroupBookClick(groupBook);
                      }}
                    >
                      <Item.Header>{groupBook.book.title}</Item.Header>
                    </Link>
                    <Item.Meta>
                      <span>{groupBook.book.author}</span>
                    </Item.Meta>
                    <Item.Description>
                      <p>{groupBook.status}</p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>
        ) : (
          <h1>This group has no books added!</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.groups.group,
    groupBooks: state.groups.groupBooks,
    groupUsers: state.groups.groupUsers,
    selectedGroupBook: state.groups.groupBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (group) => dispatch(setGroup(group)),
    setGroupBooks: (group) => dispatch(setGroupBooks(group)),
    setGroupUsers: (group) => dispatch(setGroupUsers(group)),
    setGroupBook: (groupBook) => dispatch(setGroupBook(groupBook)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupPage)
);
