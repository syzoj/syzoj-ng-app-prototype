import React, { Component } from "react";

import { withNetwork } from "../base_component";
import ProblemStatementComponent from "./problem_statement_component";
import ProblemJudgeComponent from "./problem_judge_component";
import ProblemSourceComponent from "./problem_source_component";

class ProblemViewPage extends Component {
  render() {
    return (
      <div>
        <div key="problem-title">
          <center>
            <h1>{this.props.data.problem_title || "[无标题]"}</h1>
          </center>
        </div>
        {this.props.data.problem_statement ? (
          <ProblemStatementComponent
            url={this.props.url + "/statement"}
            data={this.props.data.problem_statement}
          />
        ) : (
          <p>无题面</p>
        )}
        {this.props.data.problem_source && (
          <ProblemSourceComponent
            url={this.props.url + "/source"}
            data={this.props.data.problem_source}
          />
        )}
        {this.props.data.problem_judge && (
          <ProblemJudgeComponent
            url={this.props.url + "/judge"}
            data={this.props.data.problem_judge}
          />
        )}
      </div>
    );
  }
}

export default withNetwork(ProblemViewPage);
