import React, { useState, useEffect } from "react";
import { Button, Item, Modal, Image, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import {
  setGroupBooks,
  setGroupUsers,
  setGroup,
  setGroupBook,
} from "../actions/group";
import { setBookPosts } from "../actions/post";
import { setActiveBook } from "../actions/activeBook";

function GroupPage(props) {
  const handleGroupBookClick = (groupBook) => {
    fetch(`http://localhost:3000/group_books/${groupBook.id}`)
      .then((resp) => resp.json())
      .then((groupBookData) => {
        props.setGroupBook(groupBookData);
        props.setBookPosts(groupBookData.posts);
      })
      .then(() => {
        props.history.push(`/group_books/${groupBook.id}`);
      });
  };

  const isUserInGroup = () => {
    let userInGroup = false;
    if (props.user) {
      props.group.users.forEach((user) => {
        if (user.id === props.user.id) {
          userInGroup = true;
        }
      });
    }
    return userInGroup;
  };

  const handleGroupJoin = (e) => {
    fetch("http://localhost:3000/group_users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          user_id: props.user.id,
          group_id: props.group.id,
        },
      }),
    }).then(() => {
      fetch(`http://localhost:3000/groups/${props.group.id}`)
        .then((resp) => resp.json())
        .then((groupData) => {
          props.setGroupUsers(groupData);
        });
    });
  };

  useEffect(() => {
    let groupBooks = null;
    let groupUsers = null;
    let activeBook = null;
    let wrongHostString = document.location.toString();
    let rightHostString = wrongHostString.replace("3001", "3000");
    fetch(rightHostString)
      .then((resp) => resp.json())
      .then((group) => {
        props.setGroup(group);
        props.setGroupUsers(group.users);

        groupBooks = group.group_books;
        // activeBook = groupBooks.find((book) => {
        //   return book.active === true;
        // });
        groupBooks.forEach((book) => {
          if (book.active === true) {
            activeBook = book;
          }
        });
        groupUsers = group.users;
      })
      .then(() => {
        props.setGroupBooks(groupBooks);
        props.setGroupUsers(groupUsers);
        if (activeBook) {
          props.setActiveBook(activeBook);
        }
      });
  }, [props.activeBook]);

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
        {props.group.users.length === 1 && props.group.users.length !== 0 ? (
          <h3>{props.group.users.length} member</h3>
        ) : (
          <h3>{props.group.users.length} members</h3>
        )}
        {isUserInGroup() ? (
          <Button disabled size="huge" floated="right">
            Already a member
          </Button>
        ) : (
          <Modal
            trigger={
              <Button onClick={handleGroupJoin} size="huge" floated="right">
                Join Group
              </Button>
            }
            closeIcon
          >
            <Modal.Header>Club Joined</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                You have joined {props.group.name}!
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )}
        <h3>{props.group.description}</h3>
        <div style={{ textAlign: "center" }}>
          {/* {props.activeBook ? (
            <h3>This group has no active book!</h3>
          ) : (
            <div>
              <h3>Currently Reading</h3>
              <Card style={{ display: "inline-block" }}>
                <Image
                  src={props.activeBook.book.thumbnail}
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>{props.activeBook.book.title}</Card.Header>
                  <Card.Meta>
                    <span>By: {props.activeBook.book.author}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            </div>
          )} */}
        </div>
        {props.groupBooks ? (
          <Item.Group divided>
            {props.groupBooks.map((groupBook) => {
              return (
                <Item key={groupBook.id}>
                  {/* <Link
                    to={``}
                    onClick={() => {
                      handleGroupBookClick(groupBook);
                    }}
                  > */}
                  <Item.Image
                    onClick={() => {
                      handleGroupBookClick(groupBook);
                      return <Redirect to={`/group_books/${groupBook.id}`} />;
                    }}
                    size="small"
                    src={groupBook.book.thumbnail}
                  />
                  {/* </Link> */}
                  <Item.Content style={{ marginLeft: "20px" }}>
                    {/* <Link
                      to=""
                      onClick={() => {
                        handleGroupBookClick(groupBook);
                      }}
                    > */}
                    <Item.Header
                      onClick={() => {
                        handleGroupBookClick(groupBook);
                      }}
                    >
                      {groupBook.book.title}
                    </Item.Header>
                    <Item.Meta>
                      <span>{groupBook.book.author}</span>
                    </Item.Meta>
                    <Item.Description>
                      <p>{groupBook.status}</p>
                    </Item.Description>
                    {isUserInGroup() ? (
                      groupBook.active ? (
                        <Button>Remove Active Status</Button>
                      ) : (
                        <Button>Set Book as Active</Button>
                      )
                    ) : null}
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
    user: state.user,
    groupBooks: state.groups.groupBooks,
    groupUsers: state.groups.groupUsers,
    selectedGroupBook: state.groups.groupBook,
    groupBook: state.groups.groupBook,
    activeBook: state.activeBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (group) => dispatch(setGroup(group)),
    setGroupBooks: (group) => dispatch(setGroupBooks(group)),
    setGroupUsers: (group) => dispatch(setGroupUsers(group)),
    setGroupBook: (groupBook) => dispatch(setGroupBook(groupBook)),
    setBookPosts: (posts) => dispatch(setBookPosts(posts)),
    setActiveBook: (book) => dispatch(setActiveBook(book)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupPage)
);
