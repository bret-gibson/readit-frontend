import React, { useState, useEffect } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Menu, Button, Image, Card, Divider } from "semantic-ui-react";
import { setCurrentUser } from "../actions/user";
import { connect } from "react-redux";
import { setGroupBook, setGroupUsers } from "../actions/group";
import { setBookPosts } from "../actions/post";

function DashboardBooks(props) {
  const handleGroupBookClick = (groupBook) => {
    fetch(`http://localhost:3000/group_books/${groupBook.id}`)
      .then((resp) => resp.json())
      .then((groupBookData) => {
        props.setGroupBook(groupBookData);
        props.setBookPosts(groupBookData.posts);
      })
      .then(() => {
        fetch(`http://localhost:3000/groups/${groupBook.group_id}`)
          .then((resp) => resp.json())
          .then((groupData) => {
            props.setGroupUsers(groupData.users);
          });
      })
      .then(() => {
        props.history.push(`/group_books/${groupBook.id}`);
      });
  };
  return (
    <div>
      <div style={{ color: "white" }}>
        <h1>My Active Books</h1>
      </div>
      <Divider />
      {props.user.groups.map((group) => {
        return group.group_books.map((groupBook) => {
          if (groupBook.active === true) {
            return (
              <div style={{ padding: "15px", display: "inline-block" }}>
                <Card
                  onClick={() => {
                    handleGroupBookClick(groupBook);
                  }}
                  style={{ display: "inline-block", padding: "20px" }}
                >
                  <Image src={groupBook.book.thumbnail} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{groupBook.book.title}</Card.Header>
                    <Card.Meta>
                      <span>By: {groupBook.book.author}</span>
                      <h3>Club: {group.name}</h3>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </div>
            );
          }
        });
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroupBook: (groupBook) => dispatch(setGroupBook(groupBook)),
    setBookPosts: (posts) => dispatch(setBookPosts(posts)),
    setGroupUsers: (group) => dispatch(setGroupUsers(group)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardBooks)
);
