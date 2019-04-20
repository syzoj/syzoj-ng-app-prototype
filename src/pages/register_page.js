// 注册页面。
// TODO: 美化。

import React, { Component } from "react";
import { withNetwork } from "../network";

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
