import React, { useState, useEffect } from "react";
import { Card, Button, Image, Form, Modal, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function BookSearchItem(props) {
  const [optionsData, setOptionsData] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState(0);

  useEffect(() => {
    userGroupsOptions(props.user.user.groups);
  }, []);

  const userGroupsOptions = (userGroups) => {
    let options = [];
    options = userGroups.map((userGroup) => {
      return {
        key: userGroup.id,
        text: userGroup.name,
        value: userGroup.id,
      };
    });
    return setOptionsData(options);
  };

  const handleChange = (e) => {
    optionsData.filter((item) => {
      if (item.text === e.target.innerText) {
        return setSelectedGroup(item);
      }
    });
  };

  const handleBookAdd = (e) => {
    fetch("http://localhost:3000/group_books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group_id: selectedGroup.key,
        book_id: props.book.id,
      }),
    });
  };

  return (
    <div>
      <Modal
        trigger={
          <Card style={{ display: "inline-block" }}>
            <Image src={props.book.thumbnail} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{props.book.title}</Card.Header>
              <Card.Meta>
                <span>By: {props.book.author}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        }
      >
        <Modal.Header>Book Details</Modal.Header>
        <Modal.Content image>
          <Image src={props.book.thumbnail} wrapped size="medium" />
          <Modal.Description>
            <h2>{props.book.title}</h2>
            <h4>By: {props.book.author}</h4>

            <p>Summary: {props.book.summary}</p>
            <p>Pages: {props.book.pages}</p>
            <p>Average Rating: {props.book.average_rating}</p>
            <p>ISBN-13: {props.book.isbn13}</p>
            <p>ISBN-10: {props.book.isbn10}</p>
            <p>Pick a club to add this book to:</p>
            <Form>
              <Select
                onChange={handleChange}
                placeholder="Select Book Club"
                value={selectedGroup.id}
                options={optionsData}
              />
              <Button onClick={handleBookAdd}>Add Book to Club</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    mostPopular: state.books.mostPopular,
    searchedBooks: state.books.searchedBooks,
  };
};

export default withRouter(connect(mapStateToProps)(BookSearchItem));
