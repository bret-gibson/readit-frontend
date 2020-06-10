// import React, { useState, useEffect } from "react";
// import { Button, Item, Grid } from "semantic-ui-react";
// import { connect } from "react-redux";
// import { withRouter, Link } from "react-router-dom";
// import { setGroupBooks, setGroupUsers, setGroup } from "../actions/group";

// function BookDiscussionPage(props) {
//   useEffect(() => {
//     let groupBooks = null;
//     let groupUsers = null;
//     let wrongHostString = document.location.toString();
//     let rightHostString = wrongHostString.replace("3001", "3000");
//     fetch(rightHostString)
//       .then((resp) => resp.json())
//       .then((group) => {
//         props.setGroup(group);
//         groupBooks = group.group_books;
//         groupUsers = group.group_users;
//       })
//       .then(() => {
//         props.setGroupBooks(groupBooks);
//         props.setGroupUsers(groupUsers);
//       });
//   }, []);

//   if (props.groupBooks === null && props.groupUsers === null) {
//     return <h1>Loading...</h1>;
//   } else {
//     return (
//       <div>
//         <h1>Welcome to {props.group.name}!</h1>
//         <Button size="huge" floated="right">
//           Join Group
//         </Button>
//         <h1>{props.group.description}</h1>
//         <h1>{props.group.group_books.status}</h1>
//         <Item.Group divided>
//           {props.groupBooks.map((groupBook) => {
//             return (
//               <Item>
//                 <Link to="">
//                   <Item.Image size="small" src={groupBook.book.thumbnail} />
//                 </Link>
//                 <Item.Content style={{ marginLeft: "20px" }}>
//                   <Link to="">
//                     <Item.Header>{groupBook.book.title}</Item.Header>
//                   </Link>
//                   <Item.Meta>
//                     <span>{groupBook.book.author}</span>
//                   </Item.Meta>
//                   <Item.Description>
//                     <p>{groupBook.status}</p>
//                   </Item.Description>
//                 </Item.Content>
//               </Item>
//             );
//           })}
//         </Item.Group>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     group: state.groups.group,
//     groupBooks: state.groups.groupBooks,
//     groupUsers: state.groups.groupUsers,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setGroup: (group) => dispatch(setGroup(group)),
//     setGroupBooks: (group) => dispatch(setGroupBooks(group)),
//     setGroupUsers: (group) => dispatch(setGroupUsers(group)),
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(GroupPage)
// );
