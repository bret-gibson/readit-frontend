import React, { useState } from "react";
import { Card, Grid, Image, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import { setGroup, setGroupUsers } from "../actions/group";

function CreateGroupForm(props) {
  const [input, setInput] = useState({
    name: "",
    description: "",
  });

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
        props.setGroupUsers(newGroup.users);
        props.history.push(`/groups/${newGroup.id}`);
      });
  };

  const cardStyle = {
    paddingLeft: "30px",
  };

  const formStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  const headerStyle = {
    textAlign: "center",
  };
  return (
    <div style={cardStyle}>
      <Card style={formStyle}>
        <Card.Content style={headerStyle}>
          <b>Start Your Own Book Club!</b>
        </Card.Content>
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
          <Button type="submit" value="Submit Group" onClick={handleSubmit}>
            Create Club!
          </Button>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    group: state.groups.group,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (group) => dispatch(setGroup(group)),
    setGroupUsers: (groupUsers) => dispatch(setGroupUsers(groupUsers)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm)
);
