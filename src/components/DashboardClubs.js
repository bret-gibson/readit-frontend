import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Menu, Button, Image, Item, Divider } from "semantic-ui-react";
import { setCurrentUser } from "../actions/user";
import { connect } from "react-redux";

function DashboardClubs(props) {
  return (
    <div>
      <div style={{ color: "white" }}>
        <h1>My Clubs</h1>
      </div>
      <Divider />
      <Item.Group divided>
        {props.user.groups.map((group) => {
          return (
            <Item>
              <Item.Image size="small" src={group.image_url} />
              <Item.Content>
                <Link to={`/groups/${group.id}`}>
                  <Item.Header as="a">{group.name}</Item.Header>
                </Link>
                <Item.Description style={{ color: "white" }}>
                  <p>{group.description}</p>
                  {/* <p>
                    Many people also have their own barometers for what makes a
                    cute dog.
                  </p> */}
                </Item.Description>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
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
  connect(mapStateToProps, mapDispatchToProps)(DashboardClubs)
);
