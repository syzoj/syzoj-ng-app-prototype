import React, { Component } from "react";

import { withNetwork } from "../base_component";

class ProblemSourceComponent extends Component {
  render() {
    return "<ProblemSource />";
  }
}

export default withNetwork(ProblemSourceComponent);
