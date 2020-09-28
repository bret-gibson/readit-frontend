import React, { useState, useEffect } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setBookPosts } from "../actions/post";
import { Editor } from "@tinymce/tinymce-react";

function PostForm(props) {
  const [content, setContent] = useState("");

  //   const [updateToggle, setUpdateToggle] = useState({
  //     comment: "",
  //   });

  const handleChange = (content, editor) => {
    setContent(content);
  };

  useEffect(() => {
    if (props.previousContent) {
      setContent(props.previousContent);
    }
  }, []);

  const handleSubmit = () => {
    // fetch("http://localhost:3000/posts", {
    fetch("https://book-club-backend.herokuapp.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: props.user.id,
        group_book_id: props.groupBook.id,
        content: content,
        parent_id: null,
      }),
    }).then(() => {
      // fetch(`http://localhost:3000/group_books/${props.groupBook.id}`);
      fetch(
        `https://book-club-backend.herokuapp.com/group_books/${props.groupBook.id}`
      )
        .then((resp) => resp.json())
        .then((groupBookData) => {
          props.setBookPosts(groupBookData.posts);
          setContent("");
          props.setPostToggle(false);
        });
    });
  };

  const handleEdit = (e) => {
    // fetch(`http://localhost:3000/posts/${props.postId}`, {
    fetch(`https://book-club-backend.herokuapp.com/posts/${props.postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    }).then(() => {
      // fetch(`http://localhost:3000/group_books/${props.groupBook.id}`)
      fetch(
        `https://book-club-backend.herokuapp.com/group_books/${props.groupBook.id}`
      )
        .then((resp) => resp.json())
        .then((groupBookData) => {
          props.setBookPosts(groupBookData.posts);
          props.setEditToggle(false);
        });
    });
  };

  //   componentDidMount() {
  //     if (this.props.updateToggle === true) {
  //       this.setState({ comment: this.props.comment.comment_text });
  //     }
  //   }

  //   handleChange = (event) => {
  //     const value = event.target.value;
  //     const name = event.target.name;
  //     this.setState({
  //       [name]: value,
  //     });
  //   };

  //   handleSubmit = (event) => {
  //     event.preventDefault();
  //     this.props.doSubmit(this.state.comment);
  //     this.setState({
  //       comment: "",
  //     });
  //   };

  //   handleUpdate = (event) => {
  //     event.preventDefault();
  //     const newCommentObj = {
  //       user_id: this.props.userData.id,
  //       question_id: this.props.question.id,
  //       comment_text: this.state.comment,
  //     };
  //     fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newCommentObj),
  //     });
  //     this.setState({
  //       comment: "",
  //     });
  //   };

  //   style = {
  //     width: "30%",
  //   };

  //   render() {
  // if (this.props.updateToggle === true) {
  //   return (
  //     <div>
  //       <Form>
  //         <Form.Field style={this.style}>
  //           <TextArea
  //             name="comment"
  //             type="textarea"
  //             onChange={this.handleChange}
  //             value={this.state.comment}
  //           />
  //           {/* <input name='comment' type='textarea' onChange={this.handleChange} value={this.state.comment} /> */}
  //         </Form.Field>
  //         <Button
  //           color="violet"
  //           size="mini"
  //           type="submit"
  //           value="Update Comment"
  //           onClick={this.handleSubmit}
  //         >
  //           Submit
  //         </Button>
  //       </Form>
  //       <br />
  //     </div>
  //   );
  // } else {
  return (
    <div>
      {props.previousContent && props.postId ? (
        <Form>
          <Editor
            apiKey="flqstmmeoxdr0xeliwtq0xx10lz2a9vuha5bttpd1xhkzwld"
            name="content"
            value={content}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleChange}
          />
          {/* <input placeholder='Comment' name='comment' type='textarea' onChange={this.handleChange} value={this.state.comment} /> */}
          <Button
            color="violet"
            size="mini"
            type="submit"
            value="Save Edit"
            onClick={handleEdit}
          >
            Save Edit
          </Button>
        </Form>
      ) : (
        <Form>
          <Editor
            apiKey="flqstmmeoxdr0xeliwtq0xx10lz2a9vuha5bttpd1xhkzwld"
            name="content"
            value={content}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleChange}
          />
          {/* <Form.Field>
            <TextArea
              name="content"
              type="textarea"
              onChange={handleChange}
              value={content}
            />
          </Form.Field> */}

          <Button
            color="violet"
            size="mini"
            type="submit"
            value="Submit Post"
            onClick={handleSubmit}
          >
            Submit Post
          </Button>
        </Form>
      )}
    </div>
  );
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
    setBookPosts: (posts) => dispatch(setBookPosts(posts)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
);
