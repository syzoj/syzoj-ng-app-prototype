// 题库。
// TODO: 展示题库、搜索等功能。

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withNetwork, INetworkedComponentProps, INetwork } from "../network";
import * as api from "../interfaces/syzoj.api";

interface ProblemsPageEntryProps extends INetworkedComponentProps {
  data: any;
}

class problemsPageEntry extends Component<
  ProblemsPageEntryProps & { network: INetwork },
  any
> {
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

interface ProblemsPageProps extends INetworkedComponentProps {
  data: api.ProblemsPage;
}
// Corresponding message: syzoj.api.ProblemsPage
class ProblemsPage extends Component<
  ProblemsPageProps & { network: INetwork },
  any
> {
  refInput: HTMLInputElement;
  onAddProblem() {
    this.props.network.doAction("add-problem", {
      problem_id: this.refInput.value
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
          <input ref={ref => (this.refInput = ref)} />
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
                <ProblemsPageEntry
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

export default withNetwork(ProblemsPage);
