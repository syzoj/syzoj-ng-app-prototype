// 该文件为首页。
// TODO: 美化。

import React, { Component } from "react";
import { withNetwork } from "../network";
import { Link } from "react-router-dom";
class IndexPage extends Component {
  render() {
    return (
      <div>
        <p>首页</p>
        <Link to="/login">登录</Link>
        <Link to="/register">注册</Link>
        <Link to="/problemset/create">创建题库</Link>
        <Link to="/problemset/_B4JbogYE3o0U1bc">进入题库</Link>
        <Link to="/problem/uQZVSm0p90sydh7T">进入题目</Link>
      </div>
    );
  }
}
export default withNetwork(IndexPage);
