import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      show: false,
    };
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  addbook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: email,
    };
    // console.log(obj)
    axios
      .post(`https://can-of-books-b.herokuapp.com/addbooks`, obj)
      .then((result) => {
        this.setState({
          book: result.data,
        });
        console.log(result.data);
        this.props.getting(this.state.book);
      })
      .catch((err) => {
        console.log("Error on adding data");
      });
  };
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add a book
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add your book</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Form onSubmit={this.addbook}>
              <Modal.Body>
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" name="title" />
                <Form.Control size="lg" type="text" name="description" />
                <select name="status" id="status">
                  <option>Status menu</option>
                  <option value="Available">Available</option>
                  <option value="Not-Available">Not-Available</option>
                  <option value="On-Demand">On-Demand</option>
                </select>
              </Modal.Body>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withAuth0(BookFormModal);
