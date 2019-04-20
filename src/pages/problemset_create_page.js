import React, { Component } from "react";
import { withNetwork } from "../network";

class problemsetCreatePage extends Component {
  render() {
    return (
      <div>
        <h1>创建题库</h1>
        <button
          onClick={() =>
            this.props.network.doAction("create", { problemset_title: "test" })
          }
        >
          创建
        </button>
      </div>
    );
  }
}

export default withNetwork(problemsetCreatePage);
