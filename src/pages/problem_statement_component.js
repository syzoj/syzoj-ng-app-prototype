// 该文件用来展示题面。
// TODO: 补充一个前端 Markdown 的实现。

import React, { Component } from "react";
export default class ProblemStatementComponent extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.data)}</pre>
      </div>
    );
  }
}
