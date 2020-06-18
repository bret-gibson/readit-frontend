import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Select, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function BookSearchItem(props) {
  const [optionsData, setOptionsData] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState(0);

  useEffect(() => {
    // userGroupsOptions(props.user.user.groups);
    if (props.user || props.user.groups) {
      userGroupsOptions(props.user.groups);
    }
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
    <div style={{ padding: "15px" }}>
      <Modal
        trigger={
          <Card
            style={{
              display: "inline-block",
              paddingTop: "10px",
            }}
          >
            {/* <Image
              style={{ margin: "auto" }}
              size="medium"
              centered={true}
              ui={false}
              src={props.book.thumbnail}
            /> */}
            <div style={{ paddingLeft: "45px" }}>
              <img src={props.book.thumbnail} height={300} width={200} />
            </div>
            <Card.Content>
              <Card.Header>{props.book.title}</Card.Header>
              <Card.Meta>
                <span>By: {props.book.author}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        }
        closeIcon
      >
        <Modal.Header>Book Details</Modal.Header>
        <Modal.Content image>
          <Image
            src={props.book.thumbnail}
            style={{ height: "150px", width: "100px" }}
          />
          <Modal.Description>
            <h2>{props.book.title}</h2>
            <h4>By: {props.book.author}</h4>

            <p>
              <b>Summary:</b> {props.book.summary}
            </p>
            <p>
              <b>Pages:</b> {props.book.pages}
            </p>
            <p>
              <b>Average Rating:</b> {props.book.average_rating}
            </p>
            <p>
              <b>ISBN-13:</b> {props.book.isbn13}
            </p>
            <p>
              <b>ISBN-10:</b> {props.book.isbn10}
            </p>
            {props.user ? (
              <div>
                <p>Pick a club to add this book to:</p>
                <Form>
                  <Select
                    onChange={handleChange}
                    placeholder="Select Book Club"
                    value={selectedGroup.id}
                    options={optionsData}
                  />
                  <Modal
                    trigger={
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={handleBookAdd}
                      >
                        Add Book to Club
                      </Button>
                    }
                    closeIcon
                  >
                    <Modal.Header>Book Added</Modal.Header>

                    <Modal.Content>
                      <Modal.Description>
                        {props.book.title} has been added!
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                </Form>
              </div>
            ) : (
              <p>Please log in to add this book to a club!</p>
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    user: state.user,
    mostPopular: state.books.mostPopular,
    searchedBooks: state.books.searchedBooks,
  };
};

export default withRouter(connect(mapStateToProps)(BookSearchItem));
