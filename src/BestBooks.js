import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import Card from "react-bootstrap/Card";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// import Carousel from "react-bootstrap/Carousel";

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
    axios.get(`http://localhost:3001/books?email=${email}`).then((result) => {
      this.setState({
        booksArr: result.data,
      });
    });
  };
  render() {
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>

        {this.state.booksArr.map((item) => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>Title: {item.title}</Card.Title>
                <Card.Text>Description: {item.description}</Card.Text>
                <Card.Text>Status: {item.status}</Card.Text>
                <Card.Text>Email: {item.email}</Card.Text>
              </Card.Body>
            </Card>
            // <Carousel>
            //   <Carousel.Item>
            //     <Carousel.Caption>
            //       Title: {item.title}
            //       Description: {item.description}
            //       Status: {item.status}
            //       Email: {item.email}
            //     </Carousel.Caption>
            //   </Carousel.Item>
            // </Carousel>
          );
        })}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
