import React, { useState, useEffect } from "react";
import { Button, Comment } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Moment from "react-moment";
import { setSelectedUser } from "../actions/selectedUser";
import { setBookPosts } from "../actions/post";

function Post(props) {
  const [editToggle, setEditToggle] = useState(false);

  const handleEditToggle = (e) => {
    setEditToggle(!editToggle);
  };

  const handleUserClick = (e) => {
    props.setSelectedUser(props.post.user);
    props.history.push(`/users/${props.post.user.id}`);
  };

  const handleDelete = (e) => {
    fetch(`http://localhost:3000/posts/${props.post.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch(`http://localhost:3000/group_books/${props.groupBook.id}`)
        .then((resp) => resp.json())
        .then((groupBookData) => {
          props.setBookPosts(groupBookData.posts);
        });
    });
  };

  if (props.user && props.user.id === props.post.user.id) {
    return editToggle ? (
      <div>
        <Comment>
          <Comment.Content>
            <Comment.Author as="a" onClick={handleUserClick}>
              {props.post.user.username}
            </Comment.Author>
            <Comment.Metadata>
              <div>
                <Moment fromNow>{props.post.created_at}</Moment>
              </div>
            </Comment.Metadata>
            <Comment.Text>{props.post.content}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={handleEditToggle}>
                Edit Post
              </Comment.Action>
              <Comment.Action onClick={handleDelete} style={{ color: "red" }}>
                Delete Post
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        <PostForm previousContent={props.post.content} postId={props.post.id} />
      </div>
    ) : (
      //   <div>
      //     <h4>{props.post.user.username} says...</h4>
      //     <p style={{ display: "inline-block", paddingBottom: "10px" }}>
      //       {props.post.content}
      //     </p>
      //     <Button size="mini" style={{ display: "inline-block" }}>
      //       Edit Post
      //     </Button>
      //     <Button size="mini" style={{ display: "inline-block" }}>
      //       Delete Post
      //     </Button>
      //   </div>
      <Comment>
        <Comment.Content>
          <Comment.Author as="a">{props.post.user.username}</Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow>{props.post.created_at}</Moment>
            </div>
          </Comment.Metadata>
          <Comment.Text>{props.post.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleEditToggle}>
              Edit Post
            </Comment.Action>
            <Comment.Action onClick={handleDelete} style={{ color: "red" }}>
              Delete Post
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  } else {
    return (
      //   <div>
      //     <h4>{props.post.user.username} says...</h4>
      //     <p>{props.post.content}</p>
      //   </div>
      <Comment>
        <Comment.Content>
          <Comment.Author as="a">{props.post.user.username}</Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow>{props.post.created_at}</Moment>
            </div>
          </Comment.Metadata>
          <Comment.Text>{props.post.content}</Comment.Text>
          {/* <Comment.Actions>
            <Comment.Action>Edit Post</Comment.Action>
            <Comment.Action style={{ fontColor: "red" }}>
              Delete Post
            </Comment.Action>
          </Comment.Actions> */}
        </Comment.Content>
      </Comment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    group: state.groups.group,
    groupBook: state.groups.groupBook,
    groupUsers: state.groups.groupUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedUser: (user) => dispatch(setSelectedUser(user)),
    setBookPosts: (posts) => dispatch(setBookPosts(posts)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
