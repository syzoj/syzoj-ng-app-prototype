// 该文件用来展示题面。
// TODO: 补充一个前端 Markdown 的实现。

import React, { Component } from "react";

import * as model from "../interfaces/syzoj.model";

interface ProblemStatementComponentProps {
  data: model.ProblemStatement;
}

export default class ProblemStatementComponent extends Component<
  ProblemStatementComponentProps,
  any
> {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.data)}</pre>
      </div>
    );
  }
}
