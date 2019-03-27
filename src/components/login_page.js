import React, { Component } from "react";
import { withNetwork } from "../base_component";

// Corresponding message: syzoj.api.LoginPage
class LoginPage extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
  login() {
    this.props.network.doAction("login", {
      user_name: "test",
      password: "test"
    });
  }
}

export default withNetwork(LoginPage);
