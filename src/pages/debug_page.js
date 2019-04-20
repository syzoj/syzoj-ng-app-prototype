import React, { Component } from "react";
import { withNetwork } from "../network";

class debugPageAddJudger extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.network.doAction("add-judger", {})}>
          添加评测机
        </button>
      </div>
    );
  }
}

const DebugPageAddJudger = withNetwork(debugPageAddJudger);

class debugPage extends Component {
  render() {
    return (
      <div>
        <h1>Debug</h1>
        <DebugPageAddJudger url={this.props.url + "/add-judger"} />
      </div>
    );
  }
}
export default withNetwork(debugPage);
