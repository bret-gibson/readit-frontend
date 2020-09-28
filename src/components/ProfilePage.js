import React, { useEffect } from "react";
import {
  Button,
  Item,
  Grid,
  Card,
  ItemContent,
  ItemDescription,
  Image,
  Divider,
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
    let rightHostString = wrongHostString.replace(
      "bret-gibson-book-club.netlify.app",
      "book-club-backend.herokuapp.com"
    );
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
      <div style={{ marginLeft: "50px", marginTop: "25px", color: "white" }}>
        <Button
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </Button>
        <h1>{props.selectedUser.username}'s Profile</h1>
        <Image size={"small"} src={props.selectedUser.avatar} />
        <h2>Member Of:</h2>
        <Divider />
        <Item.Group divided>
          {props.selectedUser.groups.map((userGroup) => {
            return (
              <Item key={userGroup.id}>
                {/* <Image src={userGroup.image_url} /> */}
                <Item.Header>
                  <Image size={"small"} src={userGroup.image_url} />
                </Item.Header>
                <Item.Content style={{ paddingLeft: "15px" }}>
                  <Link to={`/groups/${userGroup.id}`}>
                    <Item.Header>
                      <h1>{userGroup.name}</h1>
                    </Item.Header>
                  </Link>
                  <Item.Description
                    style={{ alignItems: "center", color: "white" }}
                  >
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
