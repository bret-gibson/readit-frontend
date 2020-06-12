import React, { useState, useEffect } from "react";
import { Button, Item, Grid, Image, Comment, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setGroupBooks, setGroupUsers, setGroup } from "../actions/group";
import { setBookPosts } from "../actions/post";

import PostForm from "./PostForm";
import Post from "./Post";

function BookDiscussionPage(props) {
  const [postToggle, setPostToggle] = useState(false);
  const [buttonText, setButtonText] = useState("Submit A Post");

  //   useEffect(() => {
  //     //   let wrongHostString = document.location.toString();
  //     //   let rightHostString = wrongHostString.replace("3001", "3000");
  //     fetch(`http://localhost:3000/group_books/${props.groupBook.id}`)
  //       .then((resp) => resp.json())
  //       .then((groupBook) => {
  //         props.setBookPosts(groupBook.posts);
  //       });
  //   }, []);

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
    if (props.user) {
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
      <div>
        <h2>{props.groupBook.book.title}</h2>
        <h3>{props.groupBook.book.author}</h3>
        <Image src={props.groupBook.book.thumbnail}></Image>
        <h4>Summary: {props.groupBook.book.summary}</h4>
        {/* <h3>Discussion: </h3> */}
        <Comment.Group>
          <Header as="h3" dividing>
            Posts
          </Header>
          {isUserInGroup() ? (
            <Button size="small" onClick={handlePostButtonToggle}>
              {buttonText}
            </Button>
          ) : null}
          {postToggle ? <PostForm /> : null}

          {props.posts.map((post) => {
            //   return <p>{post.content}</p>;
            return <Post post={post} />;
          })}
        </Comment.Group>
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
