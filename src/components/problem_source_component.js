import React, { Component } from "react";

import { withNetwork } from "../base_component";

class ProblemSourceComponent extends Component {
  render() {
    return <p>{JSON.stringify(this.props.data)}</p>;
  }
}

export default withNetwork(ProblemSourceComponent);
