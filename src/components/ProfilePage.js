import React, { useEffect } from "react";
import {
  Button,
  Item,
  Grid,
  Card,
  ItemContent,
  ItemDescription,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setGroupBook } from "../actions/group";
import { setSelectedUser } from "../actions/selectedUser";

function ProfilePage(props) {
  const handleGroupBookClick = (groupBook) => {
    props.setGroupBook(groupBook);
  };

  useEffect(() => {
    let selectedUser = null;
    let wrongHostString = document.location.toString();
    let rightHostString = wrongHostString.replace("3001", "3000");
    fetch(rightHostString)
      .then((resp) => resp.json())
      .then((userData) => {
        selectedUser = userData;
      })
      .then(() => {
        props.setSelectedUser(selectedUser);
      });
  }, []);

  if (props.selectedUser) {
    return (
      <div>
        <h1>{props.selectedUser.username}'s Profile</h1>
        <h3>Member Of:</h3>
        <Item.Group divided>
          {props.selectedUser.groups.map((userGroup) => {
            return (
              <Item key={userGroup.id}>
                <Item.Content>
                  <Link to={`/groups/${userGroup.id}`}>
                    <Item.Header>
                      <h1>{userGroup.name}</h1>
                    </Item.Header>
                  </Link>
                  <Item.Description style={{ alignItems: "center" }}>
                    {userGroup.description}
                  </Item.Description>
                  {/* <ItemDescription>
                  {userGroup.books.map((book) => {
                    return <h2>{book.title}</h2>;
                  })}
                </ItemDescription> */}
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    // userGroups: state.user.userGroups,
    // user: state.user.user,
    selectedUser: state.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroupBook: (group) => dispatch(setGroupBook(group)),
    setSelectedUser: (user) => dispatch(setSelectedUser(user)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
