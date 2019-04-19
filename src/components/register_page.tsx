// 注册页面。
// TODO: 美化。

import React, { Component } from "react";
import { withNetwork, INetworkComponentProps } from "../network";
import * as api from "../interfaces/syzoj.api.d";

interface RegisterPageProps extends INetworkComponentProps {
  data: api.RegisterPage;
}
// Corresponding message: syzoj.api.RegisterPage
class RegisterPage extends Component<RegisterPageProps, any> {
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
