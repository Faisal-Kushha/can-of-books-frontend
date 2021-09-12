import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class MyFavoriteBooks extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Card style={{ width: "23rem" }}>
          <Card.Body>
            <Card.Title>My Favorite Books</Card.Title>
            <Card.Text>This is a collection of my favorite books</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>The Secret by Rhonda Byrne</ListGroupItem>
            <ListGroupItem>The Da Vinci Code by Dan Brown.</ListGroupItem>
            <ListGroupItem>Inferno by Dan Brown</ListGroupItem>
          </ListGroup>
        </Card>
      </Jumbotron>
    );
  }
}

export default MyFavoriteBooks;
