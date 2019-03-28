import React, { Component } from "react";
import { withNetwork } from "../base_component";

class ProblemCreatePage extends Component {
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
  onSubmit(e) {
    e.preventDefault();
    // syzoj.api.ProblemCreateRequest
    this.props.network.doAction("create", {
      problem_title: this.refTitle.value
    });
  }
}
export default withNetwork(ProblemCreatePage);
