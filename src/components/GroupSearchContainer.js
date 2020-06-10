import React, { useState, useEffect } from "react";
import { Card, Grid, Image, Button, Form } from "semantic-ui-react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setMostPopularGroups, setSearchedGroups } from "../actions/group";
import GroupSearchItem from "./GroupSearchItem";

function GroupSearchContainer(props) {
  //   return this.props.user ? (

  const [input, setInput] = useState({
    search: "",
  });

  useEffect(() => {
    let slicedGroups = null;
    fetch("http://localhost:3000/groups")
      .then((resp) => resp.json())
      .then((groups) => {
        function compare(a, b) {
          const groupBooksA = a.group_books.length;
          const groupBooksB = b.group_books.length;

          let comparison = 0;
          if (groupBooksA > groupBooksB) {
            comparison = -1;
          } else if (groupBooksA < groupBooksB) {
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
    fetch("http://localhost:3000/groups")
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
      <div>
        <h1>Find a Club!</h1>
        <Form>
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
        </Form>
        <h2>Most Popular Clubs</h2>
        <div
          style={{
            marginLeft: "100px",
            marginRight: "100px",
          }}
        >
          <Card.Group>
            {props.mostPopularGroups.map((group) => {
              return <GroupSearchItem key={group.id} group={group} />;
            })}
          </Card.Group>
        </div>
      </div>
    );
  } else if (props.searchedGroups !== null) {
    return (
      <div>
        <h1>Find a Club!</h1>
        <Form>
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
        </Form>
        <h2>Search Results</h2>
        <div
          style={{
            marginLeft: "100px",
            marginRight: "100px",
          }}
        >
          <Card.Group>
            {props.searchedGroups.map((group) => {
              return <GroupSearchItem key={group.id} group={group} />;
            })}
          </Card.Group>
        </div>
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
