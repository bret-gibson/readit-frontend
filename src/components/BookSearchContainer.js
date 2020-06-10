import React, { useState, useEffect } from "react";
import { Card, Grid, Image, Button, Form } from "semantic-ui-react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setMostPopularBooks, setSearchedBooks } from "../actions/book";
import BookSearchItem from "./BookSearchItem";

function BookSearchContainer(props) {
  //   return this.props.user ? (

  const [input, setInput] = useState({
    search: "",
  });

  //   const [mostPopular, setMostPopular] = useState({
  //     mostPopular: [],
  //   });

  //   const [searchedBooks, setSearchedBooks] = useState({
  //     searchedBooks: [],
  //   });

  useEffect(() => {
    let slicedBooks = null;
    fetch("http://localhost:3000/books")
      .then((resp) => resp.json())
      .then((books) => {
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
        books.sort(compare).slice(0, 12);
        slicedBooks = books.slice(0, 12);
      })
      .then(() => {
        props.setMostPopularBooks(slicedBooks);
        props.setSearchedBooks(null);

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
    let searchedBooks = null;
    fetch("http://localhost:3000/books")
      .then((resp) => resp.json())
      .then((books) => {
        searchedBooks = books.filter((book) => {
          return (
            book.title.toLowerCase().includes(input.search[0].toLowerCase()) ||
            book.author.toLowerCase().includes(input.search[0].toLowerCase())
          );
        });
        props.setSearchedBooks(searchedBooks);
        // books.sort(compare).slice(0, 12);
        // slicedBooks = books.slice(0, 12);
      });
  };

  if (props.searchedBooks === null && props.mostPopular !== null) {
    return (
      <div>
        <h1>Find a Book!</h1>
        <h4>Click on a book to add it to one of your clubs</h4>

        <Form>
          <Form.Field>
            <label>Search Books</label>
            <input
              onChange={handleChange}
              placeholder="Enter Book Title or Author Name"
              name="search"
              value={input.search}
            />
          </Form.Field>
          <Button onClick={handleSearchSubmit}>Search</Button>
        </Form>
        <h2>Most Popular Books</h2>
        <div
          style={{
            marginLeft: "100px",
            marginRight: "100px",
          }}
        >
          <Card.Group>
            {props.mostPopular.map((book) => {
              return <BookSearchItem key={book.id} book={book} />;
            })}
          </Card.Group>
        </div>
      </div>
    );
  } else if (props.searchedBooks !== null) {
    return (
      <div>
        <h1>Find a Book!</h1>
        <Form>
          <Form.Field>
            <label>Search Books</label>
            <input
              onChange={handleChange}
              placeholder="Enter Book Title or Author Name"
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
            {props.searchedBooks.map((book) => {
              return <BookSearchItem key={book.id} book={book} />;
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
    mostPopular: state.books.mostPopular,
    searchedBooks: state.books.searchedBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMostPopularBooks: (mostPopularBooks) =>
      dispatch(setMostPopularBooks(mostPopularBooks)),
    setSearchedBooks: (searchedBooks) =>
      dispatch(setSearchedBooks(searchedBooks)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookSearchContainer)
);
