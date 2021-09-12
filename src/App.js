import React from "react";
import Header from "./Header";
import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Profile from "./Profile";
import BestBooks from "./BestBooks";
class App extends React.Component {
  render() {
    console.log("app", this.props);
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {!isAuthenticated && <Login />}
                {isAuthenticated && <BestBooks />}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              {isAuthenticated && <Profile />}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
