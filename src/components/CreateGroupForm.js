import React, { useState } from "react";
import { Card, Modal, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import { setGroup, setGroupUsers } from "../actions/group";
import { setUserGroups } from "../actions/user";

import { setActiveBook } from "../actions/activeBook";

function CreateGroupForm(props) {
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [groupId, setgroupId] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGroup = null;
    fetch("http://localhost:3000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: input.name[0],
          description: input.description[0],
          image_url: input.image[0],
          public: true,
          admin_user_id: props.user.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((group) => {
        newGroup = group;
      })
      .then(() => {
        fetch("http://localhost:3000/group_users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              user_id: props.user.id,
              group_id: newGroup.id,
            },
          }),
        });
      })
      .then(() => {
        props.setGroup(newGroup);
        props.setActiveBook(null);
        setgroupId(newGroup.id);
      })
      .then(() => {
        fetch(`http://localhost:3000/users/${props.user.id}`)
          .then((resp) => resp.json())
          .then((userData) => {
            props.setUserGroups(userData.groups);
          });
      });
  };

  // const cardStyle = {
  //   paddingLeft: "30px",
  // };

  const formStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
    margin: "auto",
    paddingBottom: "20px",
    paddingTop: "20px",
  };

  const headerStyle = {
    textAlign: "center",
  };
  return (
    <div style={{ paddingTop: "50px", color: "white" }}>
      <h1 style={headerStyle}>Start Your Own Book Club!</h1>
      <Card style={formStyle}>
        <Form>
          <Form.Field>
            <label>Club Name</label>
            <input
              placeholder="Name"
              name="name"
              type="text"
              onChange={handleChange}
              value={input.name}
            />
          </Form.Field>

          <Form.Field>
            <label>Club Description</label>
            <input
              placeholder="Description"
              name="description"
              type="text"
              onChange={handleChange}
              value={input.description}
            />
          </Form.Field>

          <Form.Field>
            <label>Club Image</label>
            <input
              placeholder="Image URL"
              name="image"
              type="text"
              onChange={handleChange}
              value={input.image}
            />
          </Form.Field>
          <Modal
            trigger={
              <Button type="submit" value="Submit Group" onClick={handleSubmit}>
                Create Club!
              </Button>
            }
            closeIcon
          >
            <Modal.Header>Club Created</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                Club {input.name} has been created!
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Link to={`/groups/${groupId}`}>
                <Button>Go to Club Page</Button>
              </Link>
            </Modal.Actions>
          </Modal>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    user: state.user,
    group: state.groups.group,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (group) => dispatch(setGroup(group)),
    setGroupUsers: (groupUsers) => dispatch(setGroupUsers(groupUsers)),
    setActiveBook: (book) => dispatch(setActiveBook(book)),
    setUserGroups: (userGroups) => dispatch(setUserGroups(userGroups)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm)
);
