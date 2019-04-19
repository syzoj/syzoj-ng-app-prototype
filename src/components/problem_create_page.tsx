// 该文件用来创建一道题目。
// TODO: 美化。

import React, { Component } from "react";
import {
  withNetwork,
  INetworkedComponentProps,
  INetworkProp
} from "../network";
import * as api from "../interfaces/syzoj.api";

interface ProblemCreatePageProps extends INetworkedComponentProps {
  data: api.ProblemCreatePage;
}

class ProblemCreatePage extends Component<
  ProblemCreatePageProps & INetworkProp,
  any
> {
  refTitle: HTMLInputElement;
  render() {
    return (
      <div>
        <h1>添加新题</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          标题：
          <input type="text" required ref={ref => (this.refTitle = ref)} />
          <input type="submit" value="添加" />
        </form>
      </div>
    );
  }
  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // syzoj.api.ProblemCreateRequest
    this.props.network.doAction("create", {
      problem_title: this.refTitle.value
    });
  }
}
export default withNetwork(ProblemCreatePage);
