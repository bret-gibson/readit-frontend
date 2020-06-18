import React, { useState, useEffect } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Menu, Button, Image, Item } from "semantic-ui-react";
import { setCurrentUser } from "../actions/user";
import { connect } from "react-redux";

function AdminPanel(props) {
  const [editButton, setEditButton] = useState(true);
  const [manageBooksButton, setManageBooksButton] = useState(false);
  const [manageUsersButton, setManageUsersButton] = useState(false);

  const [groupData, setGroupData] = useState([]);

  const handleEditClick = () => {
    setEditButton(true);
    setManageBooksButton(false);
    setManageUsersButton(false);
  };

  const handleManageBooksClick = () => {
    setEditButton(false);
    setManageBooksButton(true);
    setManageUsersButton(false);
  };

  const handleManageUsersClick = (group) => {
    setEditButton(false);
    setManageBooksButton(false);
    setManageUsersButton(true);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/groups/${props.selectedGroup.id}`)
      .then((resp) => resp.json())
      .then((groupData) => {
        setGroupData(groupData);
      });
  }, []);
  if (editButton === true) {
    return (
      <div>
        <div style={{ color: "white" }}>
          <h1>{props.selectedGroup.name} Admin Panel</h1>
          <h1>Edit</h1>
        </div>

        <Menu
          compact={true}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Menu.Item name="edit club info" onClick={handleEditClick}>
            Edit Club Info
          </Menu.Item>
          <Menu.Item name="manage club books" onClick={handleManageBooksClick}>
            Manage Club Books
          </Menu.Item>
          <Menu.Item name="manage club users" onClick={handleManageUsersClick}>
            Manage Club Users{" "}
          </Menu.Item>
        </Menu>
      </div>
    );
  } else if (manageBooksButton === true) {
    return (
      <div>
        <h1>{props.selectedGroup.name} Admin Panel</h1>
        <h1>Books</h1>

        <Menu
          compact={true}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Menu.Item name="edit club info" onClick={handleEditClick}>
            Edit Club Info
          </Menu.Item>
          <Menu.Item name="manage club books" onClick={handleManageBooksClick}>
            Manage Club Books
          </Menu.Item>
          <Menu.Item name="manage club users" onClick={handleManageUsersClick}>
            Manage Club Users{" "}
          </Menu.Item>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{props.selectedGroup.name} Admin Panel</h1>
        <h1>Users</h1>

        <Menu
          compact={true}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Menu.Item name="edit club info" onClick={handleEditClick}>
            Edit Club Info
          </Menu.Item>
          <Menu.Item name="manage club books" onClick={handleManageBooksClick}>
            Manage Club Books
          </Menu.Item>
          <Menu.Item name="manage club users" onClick={handleManageUsersClick}>
            Manage Club Users{" "}
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
);
