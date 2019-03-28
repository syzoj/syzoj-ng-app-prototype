import React, { Component } from "react";

import { withNetwork } from "../base_component";

class ProblemStatementComponent extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.data)}</pre>
      </div>
    );
  }
}

export default withNetwork(ProblemStatementComponent);
