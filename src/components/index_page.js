import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withNetwork } from "../base_component";

class IndexPage extends Component {
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
