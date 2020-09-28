import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Image,
  Button,
  Form,
  Item,
  Divider,
} from "semantic-ui-react";
import { connect, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setMostPopularGroups, setSearchedGroups } from "../actions/group";
import GroupSearchItem from "./GroupSearchItem";

function GroupSearchContainer(props) {
  //   return this.props.user ? (

  const [input, setInput] = useState({
    search: "",
  });

  useEffect(() => {
    let slicedGroups = null;
    // fetch("http://localhost:3000/groups")
    fetch("https://book-club-backend.herokuapp.com/groups")
      .then((resp) => resp.json())
      .then((groups) => {
        function compare(a, b) {
          const usersA = a.users.length;
          const usersB = b.users.length;

          let comparison = 0;
          if (usersA > usersB) {
            comparison = -1;
          } else if (usersA < usersB) {
            comparison = 1;
          }
          return comparison;
        }
        groups.sort(compare).slice(0, 12);
        slicedGroups = groups.slice(0, 12);
      })
      .then(() => {
        props.setMostPopularGroups(slicedGroups);
        props.setSearchedGroups(null);
        // setMostPopular({
        //   ...mostPopular,
        //   mostPopular: slicedBooks,
        // });
        // console.log(mostPopular);
      });
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // props.setSearchedBooks(searchedBooks)
    let searchedGroups = null;
    // fetch("http://localhost:3000/groups")
    fetch("https://book-club-backend.herokuapp.com/groups")
      .then((resp) => resp.json())
      .then((groups) => {
        searchedGroups = groups.filter((group) => {
          return group.name
            .toLowerCase()
            .includes(input.search[0].toLowerCase());
        });
        props.setSearchedGroups(searchedGroups);
        // books.sort(compare).slice(0, 12);
        // slicedBooks = books.slice(0, 12);
      });
  };

  if (props.searchedGroups === null && props.mostPopularGroups !== null) {
    return (
      <div style={{ marginLeft: "50px", marginTop: "25px", color: "white" }}>
        <h1>Find a Club!</h1>
        <h4>Search Book Clubs</h4>
        {/* <Form>
          <Form.Field>
            <label>Search Book Clubs</label>
            <input
              onChange={handleChange}
              placeholder="Search"
              name="search"
              value={input.search}
            />
          </Form.Field>
          <Button onClick={handleSearchSubmit}>Search</Button>
        </Form> */}
        <Form>
          <Form.Group widths="equal">
            <Form.Input>
              <input
                onChange={handleChange}
                placeholder="Search Book Clubs"
                name="search"
                value={input.search}
              />
            </Form.Input>
            <Form.Button
              style={{
                alignItems: "center",
              }}
              onClick={handleSearchSubmit}
            >
              Search
            </Form.Button>
          </Form.Group>
        </Form>
        <h2>Most Popular Clubs</h2>
        <Divider />
        <Item.Group divided>
          {props.mostPopularGroups.map((group) => {
            return (
              <Item key={group.id} group={group}>
                <Link to={`/groups/${group.id}`}>
                  <Item.Image size="small" src={group.image_url} />
                </Link>
                <Item.Content style={{ paddingLeft: "15px", color: "white" }}>
                  <Link to={`/groups/${group.id}`}>
                    <Item.Header>
                      <h1>{group.name}</h1>
                    </Item.Header>
                  </Link>
                  <Item.Description
                    style={{ alignItems: "center", color: "white" }}
                  >
                    <h4>Description:</h4>
                  </Item.Description>
                  <Item.Description
                    style={{ alignItems: "center", color: "white" }}
                  >
                    <p>{group.description}</p>
                  </Item.Description>
                </Item.Content>
              </Item>
            );
            // <GroupSearchItem key={group.id} group={group} />;
          })}
        </Item.Group>
      </div>
    );
  } else if (props.searchedGroups !== null) {
    return (
      <div style={{ marginLeft: "50px", marginTop: "25px", color: "white" }}>
        <h1>Find a Club!</h1>
        <h4>Search Book Clubs</h4>
        {/* <Form>
          <Form.Field>
            <label>Search Book Clubs</label>
            <input
              onChange={handleChange}
              placeholder="Search"
              name="search"
              value={input.search}
            />
          </Form.Field>
          <Button onClick={handleSearchSubmit}>Search</Button>
        </Form> */}

        <Form>
          <Form.Group widths="equal">
            <Form.Input>
              <input
                onChange={handleChange}
                placeholder="Search Book Clubs"
                name="search"
                value={input.search}
              />
            </Form.Input>
            <Form.Button
              style={{
                alignItems: "center",
              }}
              onClick={handleSearchSubmit}
            >
              Search
            </Form.Button>
          </Form.Group>
        </Form>

        <h2>Search Results</h2>
        <Divider />

        <Item.Group>
          {props.searchedGroups.map((group) => {
            return (
              <Item key={group.id} group={group}>
                <Link to={`/groups/${group.id}`}>
                  <Item.Image size="small" src={group.image_url} />
                </Link>
                <Item.Content style={{ paddingLeft: "15px", color: "white" }}>
                  <Link to={`/groups/${group.id}`}>
                    <Item.Header as="a">
                      <h1>{group.name}</h1>
                    </Item.Header>
                  </Link>
                  <Item.Description
                    style={{ alignItems: "center", color: "white" }}
                  >
                    <h4>Description:</h4>
                  </Item.Description>
                  <Item.Description
                    style={{ alignItems: "center", color: "white" }}
                  >
                    <p>{group.description}</p>
                  </Item.Description>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </div>
    );
  } else {
    return <h1> Loading...</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    mostPopularGroups: state.groups.mostPopularGroups,
    searchedGroups: state.groups.searchedGroups,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMostPopularGroups: (mostPopularGroups) =>
      dispatch(setMostPopularGroups(mostPopularGroups)),
    setSearchedGroups: (searchedGroups) =>
      dispatch(setSearchedGroups(searchedGroups)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupSearchContainer)
);
