import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import Card from "react-bootstrap/Card";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import BookFormModal from "./Components/BookFormModal";
import UpdateFormModal from "./Components/UpdateFormModal";
import Row from "react-bootstrap/Row";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArr: [],
      showFlag: false,
      title: "",
      description: "",
      status: "",
      bookId: "",
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
  handleClose = () => {
    this.setState({
      showFlag: false,
    });
  };
  showUpdateFormModal = (item) => {
    this.setState({
      showFlag: true,
      title: item.title,
      description: item.description,
      status: item.status,
      bookId: item._id,
    });
  };

  updateBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: email,
    };
    axios
      .put(
        `https://can-of-books-b.herokuapp.com/updatebooks/${this.state.bookId}`,
        obj
      )
      .then((result) => {
        this.setState({
          booksArr: result.data,
          showFlag: false,
        });
      })
      .catch((err) => {
        console.log("Error in updating");
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <BookFormModal getting={this.getting} />
        <Row xs={1} md={3} className="g-4">
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
                      variant="dark"
                      onClick={() => this.deleteBook(item._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="warning"
                      onClick={() => this.showUpdateFormModal(item)}
                    >
                      Update
                    </Button>{" "}
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Row>
        <UpdateFormModal
          show={this.state.showFlag}
          handleClose={this.handleClose}
          title={this.state.title}
          description={this.state.description}
          status={this.state.status}
          updateBook={this.updateBook}
        />
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
