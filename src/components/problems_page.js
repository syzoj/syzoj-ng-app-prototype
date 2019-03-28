import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withNetwork } from "../base_component";

class problemsPageEntry extends Component {
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
const ProblemsPageEntry = withNetwork(problemsPageEntry);

// Corresponding message: syzoj.api.ProblemsPage
class ProblemsPage extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>标题</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.problem_entry ? (
              this.props.data.problem_entry.map(entry => (
                <ProblemsPageEntry
                  key={entry.id}
                  url={this.props.url + "/" + entry.id}
                  data={entry}
                />
              ))
            ) : (
              <tr>
                <td colspan="3">无结果</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withNetwork(ProblemsPage);
