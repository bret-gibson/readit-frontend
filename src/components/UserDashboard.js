import React, { useState, useEffect } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Menu, Button, Image, Grid, Dropdown } from "semantic-ui-react";
import { setCurrentUser } from "../actions/user";
import { connect } from "react-redux";
import DashboardBooks from "./DashboardBooks";
import DashboardClubs from "./DashboardClubs";
import AdminPanel from "./AdminPanel";

function UserDashboard(props) {
  const [myBooksShow, setMyBooksShow] = useState(true);
  const [myClubsShow, setMyClubsShow] = useState(false);
  const [adminShow, setAdminShow] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleBooksClick = () => {
    setMyBooksShow(true);
    setMyClubsShow(false);
    setAdminShow(true);
  };

  const handleClubsClick = () => {
    setMyBooksShow(false);
    setMyClubsShow(true);
    setAdminShow(true);
  };

  const handleAdminClick = (group) => {
    setMyBooksShow(false);
    setMyClubsShow(false);
    setAdminShow(true);
    setSelectedGroup(group);
  };

  if (myBooksShow === true) {
    return (
      <div style={{ marginLeft: "50px", marginTop: "50px" }}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={5}>
              <h1 style={{ textAlign: "center", color: "white" }}>
                {props.user.username}'s Dashboard
              </h1>

              <Menu
                vertical
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <Menu.Item name="my active books" onClick={handleBooksClick}>
                  My Active Books
                </Menu.Item>
                <Menu.Item name="my clubs" onClick={handleClubsClick} />
                <Dropdown item text="Club Admin">
                  <Dropdown.Menu>
                    {props.user.groups.map((userGroup) => {
                      if (props.user.id === userGroup.admin_user_id) {
                        return (
                          <Dropdown.Item
                            onClick={() => {
                              handleAdminClick(userGroup);
                            }}
                          >
                            {userGroup.name}
                          </Dropdown.Item>
                        );
                      }
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Grid.Column>

            <Grid.Column width={11}>
              <DashboardBooks />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  } else if (myClubsShow === true) {
    return (
      <div style={{ marginLeft: "50px", marginTop: "50px" }}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={5}>
              <h1 style={{ textAlign: "center", color: "white" }}>
                {props.user.username}'s Dashboard
              </h1>

              <Menu
                vertical
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <Menu.Item name="my active books" onClick={handleBooksClick} />
                <Menu.Item name="my clubs" onClick={handleClubsClick} />
                <Dropdown item text="Club Admin">
                  <Dropdown.Menu>
                    {props.user.groups.forEach((userGroup) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            handleAdminClick(userGroup);
                          }}
                        >
                          {userGroup.name}
                        </Dropdown.Item>
                      );
                    })}
                    {/* <Dropdown.Item>Electronics</Dropdown.Item>
                      <Dropdown.Item>Automotive</Dropdown.Item>
                      <Dropdown.Item>Home</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Grid.Column>

            <Grid.Column width={11}>
              <DashboardClubs />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  } else if (adminShow === true) {
    return (
      <div style={{ marginLeft: "50px", marginTop: "50px" }}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={5}>
              <h1 style={{ textAlign: "center", color: "white" }}>
                {props.user.username}'s Dashboard
              </h1>

              <Menu
                vertical
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <Menu.Item name="my active books" onClick={handleBooksClick} />
                <Menu.Item name="my clubs" onClick={handleClubsClick} />
                <Dropdown item text="Club Admin">
                  <Dropdown.Menu>
                    {props.user.groups.forEach((userGroup) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            handleAdminClick(userGroup);
                          }}
                        >
                          {userGroup.name}
                        </Dropdown.Item>
                      );
                    })}
                    {/* <Dropdown.Item>Electronics</Dropdown.Item>
                      <Dropdown.Item>Automotive</Dropdown.Item>
                      <Dropdown.Item>Home</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Grid.Column>

            <Grid.Column width={11}>
              <AdminPanel selectedGroup={selectedGroup} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
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
  connect(mapStateToProps, mapDispatchToProps)(UserDashboard)
);
