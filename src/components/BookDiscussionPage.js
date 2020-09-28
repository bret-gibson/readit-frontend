import React, { useState, useEffect } from "react";
import {
  Button,
  Item,
  Grid,
  Image,
  Comment,
  Header,
  Card,
  Divider,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setGroupBooks, setGroupUsers, setGroup } from "../actions/group";
import { setBookPosts } from "../actions/post";

import PostForm from "./PostForm";
import Post from "./Post";

function BookDiscussionPage(props) {
  const [postToggle, setPostToggle] = useState(false);
  const [buttonText, setButtonText] = useState("Submit A Post");

  useEffect(() => {
    let wrongHostString = document.location.toString();
    let rightHostString = wrongHostString.replace(
      "bret-gibson-book-club.netlify.app",
      "book-club-backend.herokuapp.com"
    );
    fetch(rightHostString)
      .then((resp) => resp.json())
      .then((groupBook) => {
        props.setBookPosts(groupBook.posts);
      });
  }, []);

  const handlePostButtonToggle = (e) => {
    setPostToggle(!postToggle);
    if (buttonText === "Submit A Post") {
      setButtonText("Close Post Form");
    } else {
      setButtonText("Submit A Post");
    }
  };

  const isUserInGroup = () => {
    let userInGroup = false;
    if (props.user && props.groupUsers) {
      props.groupUsers.forEach((user) => {
        if (user.id === props.user.id) {
          userInGroup = true;
        }
      });
    }
    return userInGroup;
  };

  if (props.groupBook === null) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div style={{ marginLeft: "50px", marginTop: "25px" }}>
        <Button
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </Button>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  paddingTop: "25px",
                  paddingBottom: "10px",
                  color: "white",
                }}
              >
                <h2>{props.group.name}'s Discussion for:</h2>
              </div>
              <div style={{ paddingLeft: "20px" }}>
                <Card
                  style={{
                    display: "inline-block",
                    padding: "20px",
                  }}
                >
                  <Image
                    src={props.groupBook.book.thumbnail}
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>{props.groupBook.book.title}</Card.Header>
                    <Card.Meta>
                      <span>By: {props.groupBook.book.author}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </div>
            </Grid.Column>

            <Grid.Column>
              <Comment.Group>
                <Header
                  as="h2"
                  dividing
                  style={{ paddingTop: "29px", color: "white" }}
                >
                  Discussion
                </Header>
                <Divider inverted />
                {isUserInGroup() ? (
                  <Button size="small" onClick={handlePostButtonToggle}>
                    {buttonText}
                  </Button>
                ) : null}
                {postToggle ? (
                  <PostForm
                    setPostToggle={setPostToggle}
                    setButtonText={setButtonText}
                    buttonText={buttonText}
                    postToggle={postToggle}
                  />
                ) : null}

                {props.posts.length > 0 ? (
                  props.posts.map((post) => {
                    return <Post post={post} postUser={post.user} />;
                  })
                ) : (
                  <div style={{ color: "white", padding: "20px" }}>
                    <h1>There are no posts yet!</h1>
                  </div>
                )}
              </Comment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    group: state.groups.group,
    groupBook: state.groups.groupBook,
    groupUsers: state.groups.groupUsers,
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (group) => dispatch(setGroup(group)),
    setGroupUsers: (group) => dispatch(setGroupUsers(group)),
    setBookPosts: (posts) => dispatch(setBookPosts(posts)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDiscussionPage)
);
