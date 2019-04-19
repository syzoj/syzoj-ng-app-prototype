// 该文件为首页。
// TODO: 美化。

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  withNetwork,
  INetworkedComponentProps,
  INetworkProp
} from "../network";
import * as api from "../interfaces/syzoj.api";

interface IndexPageProps extends INetworkedComponentProps {
  data: api.IndexPage;
}

class IndexPage extends Component<IndexPageProps & INetworkProp, any> {
  render() {
    return (
      <div>
        <p>首页</p>
        <Link to="/problems">题库</Link>
      </div>
    );
  }
}
export default withNetwork(IndexPage);
