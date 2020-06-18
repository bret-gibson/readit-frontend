import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Item,
  Modal,
  Image,
  Card,
  Divider,
  Grid,
} from "semantic-ui-react";
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
  const [activeButtonText, setActiveButtonText] = useState(
    "Set Book as Active"
  );

  const [removeActiveButtonText, setRemoveActiveButtonText] = useState(
    "Remove Active Status"
  );

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

  const handleActiveRemove = (groupBook) => {
    props.setActiveBook(null);
    setRemoveActiveButtonText("Set Book as Active");
    // if (removeActiveButtonText === "Remove Active Status") {
    //   setRemoveActiveButtonText("Set Book as Active");
    // } else {
    //   setRemoveActiveButtonText("Remove Active Status");
    // }
    fetch(`http://localhost:3000/group_books/${groupBook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
      }),
    });
  };

  const handleSetActive = (groupBook) => {
    props.setActiveBook(groupBook);
    setActiveButtonText("Remove Active Status");
    // if (activeButtonText === "Set Book as Active") {
    //   setActiveButtonText("Remove Active Status");
    // } else {
    //   setActiveButtonText("Set Book as Active");
    // }

    fetch(`http://localhost:3000/group_books/${groupBook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: true,
      }),
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
        // props.setGroupUsers(group.users);

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
  }, [props.groupUsers]);
  if (
    props.groupBooks === null &&
    props.groupUsers === null &&
    props.group === null
  ) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div style={{ marginLeft: "50px", marginTop: "25px", color: "white" }}>
        <Button
          style={{ marginBottom: "10px" }}
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </Button>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={6}>
              <h1>Welcome to {props.group.name}</h1>
              {props.group.users.length === 1 &&
              props.group.users.length !== 0 ? (
                <h3>{props.group.users.length} member</h3>
              ) : (
                <h3>{props.group.users.length} members</h3>
              )}
              <h3 style={{ marginBottom: "5px" }}>
                <b>Group Description:</b>
              </h3>
              <p style={{ marginTop: "0px", fontSize: "16px" }}>
                {props.group.description}
              </p>
              {isUserInGroup() ? (
                <Button style={{ marginTop: "20px" }} disabled size="huge">
                  Already a member
                </Button>
              ) : (
                <Button
                  style={{ marginTop: "20px" }}
                  onClick={handleGroupJoin}
                  size="huge"
                >
                  Join Group
                </Button>
                // <Modal
                //   trigger={
                //     <Button
                //       style={{ marginTop: "20px" }}
                //       onClick={handleGroupJoin}
                //       size="huge"
                //     >
                //       Join Group
                //     </Button>
                //   }
                //   closeIcon
                // >
                //   <Modal.Header>Club Joined</Modal.Header>
                //   <Modal.Content>
                //     <Modal.Description>
                //       You have joined {props.group.name}!
                //     </Modal.Description>
                //   </Modal.Content>
                // </Modal>
              )}
            </Grid.Column>

            <Grid.Column>
              <div style={{ textAlign: "center" }}>
                {props.activeBook === null ? (
                  <h3>This group has no active book!</h3>
                ) : (
                  <div>
                    <h3>This Club Is Currently Reading</h3>
                    {/* <p>Click the card to view the discussion</p> */}

                    <Card
                      style={{ display: "inline-block", padding: "20px" }}
                      onClick={() => {
                        handleGroupBookClick(props.activeBook);
                      }}
                    >
                      <Image
                        size="mini"
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
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div style={{ paddingTop: "50px" }}>
          <h1>All Book Discussions</h1>
          <Divider />
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
                      style={{ color: "white" }}
                    >
                      {groupBook.book.title}
                    </Item.Header>
                    <Item.Meta style={{ color: "white" }}>
                      <span>{groupBook.book.author}</span>
                    </Item.Meta>

                    {isUserInGroup() ? (
                      groupBook.active ? (
                        <Button
                          onClick={() => {
                            handleActiveRemove(groupBook);
                          }}
                        >
                          {removeActiveButtonText}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            handleSetActive(groupBook);
                          }}
                        >
                          {activeButtonText}
                        </Button>
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
