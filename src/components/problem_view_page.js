import React, { Component } from "react";

import { withNetwork } from "../base_component";
import ProblemStatementComponent from "./problem_statement_component";
import ProblemJudgeComponent from "./problem_judge_component";
import ProblemSourceComponent from "./problem_source_component";
import ProblemStatementEdit from "./problem_statement_edit";

// Corresponding message: syzoj.api.ProblemViewPage
class ProblemViewPage extends Component {
  render() {
    return (
      <div>
        <div key="problem-title">
          <center>
            <h1>{this.props.data.problem_title || "[无标题]"}</h1>
          </center>
        </div>
        <button onClick={() => this.props.network.doAction("set-public", {})}>
          公开
        </button>
        {this.props.data.problem_entry
          ? this.props.data.problem_entry.map(entry => "已公开：" + entry.id)
          : "该题未公开"}
        {this.props.data.problem_statement ? (
          this.props.data.problem_statement.map(entry => (
            <div key={entry.id}>
              <ProblemStatementComponent
                url={this.props.url + "/statement/" + entry.id}
                data={entry.statement}
              />
            </div>
          ))
        ) : (
          <p>无题面</p>
        )}
        <p>添加题面：</p>
        <ProblemStatementEdit
          onSubmit={s =>
            this.props.network.doAction("add-statement", { statement: s })
          }
        />
        {this.props.data.problem_source ? (
          this.props.data.problem_source.map(entry => (
            <div key={entry.id}>
              <ProblemSourceComponent
                url={this.props.url + "/source/" + entry.id}
                data={entry.source}
              />
            </div>
          ))
        ) : (
          <p>无来源</p>
        )}
        {this.props.data.problem_judge ? (
          this.props.data.problem_judge.map(entry => (
            <div key={entry.id}>
              <ProblemJudgeComponent
                url={this.props.url + "/judge"}
                data={this.props.data.problem_judge}
              />
            </div>
          ))
        ) : (
          <p>不支持提交</p>
        )}
      </div>
    );
  }
}

export default withNetwork(ProblemViewPage);
