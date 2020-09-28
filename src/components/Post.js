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
    // props.setSelectedUser(props.postUser);
    props.history.push(`/users/${props.post.user.id}`);
    setEditToggle(false);
  };

  const handleDelete = (e) => {
    // fetch(`http://localhost:3000/posts/${props.post.id}`, {
    fetch(`https://book-club-backend.herokuapp.com/posts/${props.post.id}`, {
      method: "DELETE",
    }).then(() => {
      // fetch(`http://localhost:3000/group_books/${props.groupBook.id}`)
      fetch(
        `https://book-club-backend.herokuapp.com/group_books/${props.groupBook.id}`
      )
        .then((resp) => resp.json())
        .then((groupBookData) => {
          props.setBookPosts(groupBookData.posts);
        });
    });
  };

  if (props.user && props.user.id === props.post.user.id) {
    return editToggle ? (
      <div
        style={{
          border: "solid",
          borderRadius: "5px",
          borderColor: "#cbd4c2",
          padding: "20px",
          fontSize: "20px",
          marginTop: "15px",
        }}
      >
        <Comment>
          <Comment.Avatar src={props.post.user.avatar} />
          <Comment.Content>
            <div onClick={handleUserClick}>
              <Comment.Author style={{ color: "white" }} as="a">
                {props.post.user.username}
              </Comment.Author>
              <Moment
                fromNow
                style={{
                  paddingLeft: "10px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {props.post.created_at}
              </Moment>
            </div>
            <Comment.Text
              dangerouslySetInnerHTML={{ __html: props.post.content }}
              style={{ color: "white", paddingTop: "15px" }}
            ></Comment.Text>
            <Button onClick={handleEditToggle}>Edit Post</Button>
            <Button color="red" onClick={handleDelete}>
              Delete Post
            </Button>
            {/* <Comment.Actions>
              <Comment.Action onClick={handleEditToggle}>
                Edit Post
              </Comment.Action>
              <Comment.Action onClick={handleDelete} style={{ color: "red" }}>
                Delete Post
              </Comment.Action>
            </Comment.Actions> */}
          </Comment.Content>
        </Comment>
        <PostForm
          previousContent={props.post.content}
          postId={props.post.id}
          setEditToggle={setEditToggle}
        />
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
      <div
        style={{
          border: "solid",
          borderRadius: "5px",
          borderColor: "#cbd4c2",
          padding: "20px",
          fontSize: "20px",
          marginTop: "15px",
        }}
      >
        <Comment>
          <Comment.Avatar src={props.post.user.avatar} />
          <Comment.Content>
            <div onClick={handleUserClick}>
              <Comment.Author style={{ color: "white" }} as="a">
                {props.post.user.username}
              </Comment.Author>
              <Moment
                fromNow
                style={{
                  paddingLeft: "10px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {props.post.created_at}
              </Moment>
            </div>
            <Comment.Text
              dangerouslySetInnerHTML={{ __html: props.post.content }}
              style={{ color: "white", paddingTop: "15px" }}
            >
              {/* {props.post.content} */}
            </Comment.Text>
            {/* <Comment.Actions> */}
            {/* <Comment.Action as="button" onClick={handleEditToggle}> */}
            <Button onClick={handleEditToggle}>Edit Post</Button>
            {/* </Comment.Action> */}
            {/* <Comment.Action as="button" onClick={handleDelete}> */}
            <Button color="red" onClick={handleDelete}>
              Delete Post
            </Button>
            {/* </Comment.Action> */}
            {/* </Comment.Actions> */}
          </Comment.Content>
        </Comment>
      </div>
    );
  } else {
    return (
      //   <div>
      //     <h4>{props.post.user.username} says...</h4>
      //     <p>{props.post.content}</p>
      //   </div>
      <div
        style={{
          border: "solid",
          borderRadius: "5px",
          borderColor: "#cbd4c2",
          padding: "20px",
          fontSize: "20px",
          marginTop: "15px",
        }}
      >
        <Comment>
          <Comment.Avatar src={props.post.user.avatar} />

          <Comment.Content>
            <div onClick={handleUserClick}>
              <Comment.Author style={{ color: "white" }} as="a">
                {props.post.user.username}
              </Comment.Author>
              <Moment
                fromNow
                style={{
                  paddingLeft: "10px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {props.post.created_at}
              </Moment>
            </div>
            {/* <Comment.Metadata>
              <div>
                <Moment fromNow style={{ color: "white" }}>
                  {props.post.created_at}
                </Moment>
              </div>
            </Comment.Metadata> */}
            <Comment.Text
              dangerouslySetInnerHTML={{ __html: props.post.content }}
              style={{ color: "white", paddingTop: "15px" }}
            ></Comment.Text>
            {/* <Comment.Actions>
            <Comment.Action>Edit Post</Comment.Action>
            <Comment.Action style={{ fontColor: "red" }}>
              Delete Post
            </Comment.Action>
          </Comment.Actions> */}
          </Comment.Content>
        </Comment>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedUser: (user) => dispatch(setSelectedUser(user)),
    setBookPosts: (posts) => dispatch(setBookPosts(posts)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
