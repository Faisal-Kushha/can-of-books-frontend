import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";

class UpdateFormModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update a book</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Modal.Body>
              <Form onSubmit={this.props.updateBook}>
                <Form.Group className="title" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={this.props.title}
                  />
                </Form.Group>
                <Form.Group className="description" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    defaultValue={this.props.description}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Select
                    name="status"
                    id="status"
                    defaultValue={this.props.status}
                  >
                    <option defaultValue={this.props.status}>
                      Status menu
                    </option>
                    <option value="Available">Available</option>
                    <option value="Not-Available">Not-Available</option>
                    <option value="On-Demand">On-Demand</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="info" type="submit">
                  Update
                </Button>{" "}
              </Form>
            </Modal.Body>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateFormModal);
