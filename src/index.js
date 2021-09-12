import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
ReactDOM.render(
  <Auth0Provider
    domain="dev-i-58qs-d.us.auth0.com"
    clientId="rYgrAUBElAc5Jr3M9J7VBcpxVsVRfDrh"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
