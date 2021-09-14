import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import Card from "react-bootstrap/Card";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import BookFormModal from "./Components/BookFormModal";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArr: [],
    };
  }

  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get(`https://can-of-books-b.herokuapp.com/books?email=${email}`)
      .then((result) => {
        this.setState({
          booksArr: result.data,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  };
  getting = (obj) => {
    this.setState({
      booksArr: obj,
    });
  };
  deleteBook = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .delete(
        `https://can-of-books-b.herokuapp.com/deletebooks/${id}?email=${email}`
      )
      .then((result) => {
        this.setState({
          booksArr: result.data,
        });
      })
      .catch((err) => {
        console.log("Error on deleting");
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <BookFormModal getting={this.getting} />
        {this.state.booksArr.map((item) => {
          return (
            <>
              <Card>
                <Card.Body>
                  <Card.Title>Title: {item.title}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Text>Status: {item.status}</Card.Text>
                  <Card.Text>Email: {item.email}</Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => this.deleteBook(item._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
