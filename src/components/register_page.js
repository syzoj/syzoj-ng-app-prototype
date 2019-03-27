import React, { Component } from "react";
import { withNetwork } from "../base_component";

// Corresponding message: syzoj.api.RegisterPage
class RegisterPage extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.register()}>Register</button>
      </div>
    );
  }
  register() {
    this.props.network.doAction("register", {
      user_name: "test",
      password: "test"
    });
  }
}

export default withNetwork(RegisterPage);
