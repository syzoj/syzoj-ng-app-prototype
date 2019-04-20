// 该文件实现登录。
// TODO: 美化

import React, { Component } from "react";
import { withNetwork } from "../network";

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
