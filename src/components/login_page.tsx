// 该文件实现登录。
// TODO: 美化

import React, { Component } from "react";
import {
  withNetwork,
  INetworkedComponentProps,
  INetworkProp
} from "../network";

import * as api from "../interfaces/syzoj.api";

interface LoginPageProps extends INetworkedComponentProps {
  data: api.LoginPage;
}

class LoginPage extends Component<LoginPageProps & INetworkProp, any> {
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
