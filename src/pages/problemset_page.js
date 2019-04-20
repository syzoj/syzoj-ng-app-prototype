// 题库。
// TODO: 展示题库、搜索等功能。

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withNetwork } from "../network";

class problemsetPageEntry extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"/problem/" + this.props.data.problem_id}>
            {this.props.data.problem_title}
          </Link>
        </td>
      </tr>
    );
  }
}
const ProblemsetPageEntry = withNetwork(problemsetPageEntry);

class ProblemsetPage extends Component {
  onAddProblem() {
    this.props.network.doAction("create-problem", {
      problem_title: this.refTitle.value
    });
  }
  render() {
    return (
      <div>
        <Link to="/problem/create">创建题目</Link>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.onAddProblem();
          }}
        >
          <p>标题：</p>
          <input ref={ref => (this.refTitle = ref)} />
          <input type="submit" value="添加题目" />
        </form>
        <table>
          <thead>
            <tr>
              <th>标题</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.problem_entry ? (
              this.props.data.problem_entry.map(entry => (
                <ProblemsetPageEntry
                  key={entry.id}
                  url={this.props.url + "/" + entry.id}
                  data={entry}
                />
              ))
            ) : (
              <tr>
                <td colSpan={1}>无结果</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withNetwork(ProblemsetPage);
