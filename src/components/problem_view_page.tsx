// 该文件用来显示一道题目。
// TODO: 美化。

import React, { Component } from "react";

import {
  withNetwork,
  INetworkedComponentProps,
  INetworkProp
} from "../network";
import ProblemStatementComponent from "./problem_statement_component";
import ProblemStatementEdit from "./problem_statement_edit";
import CodeEditor from "./code_editor";

import * as api from "../interfaces/syzoj.api";
import * as model from "../interfaces/syzoj.model";
import * as judge from "../interfaces/syzoj.judge";

// 将题目的评测信息交给对应的组件来显示。目前只支持 traditional 类评测。
// 无需改动。
function ProblemJudgeEntry(props) {
  if (props.data.traditional)
    return (
      <TraditionalJudgeEntry
        {...props}
        url={props.url + "/traditional"}
        data={props.data.traditional}
      />
    );
  else return <p>"Unknown"</p>;
}

interface TraditionalJudgeEntryProps extends INetworkedComponentProps {
  data: unknown;
}
interface TraditionalJudgeEntryState {
  judging: boolean;
  result?: judge.JudgeResponse;
}
// 展示并修改 traditional 类的评测信息，包括时间限制、空间限制、测试点情况等。
// TODO: 实现展示、修改、提交功能。
class traditionalJudgeEntry extends Component<
  TraditionalJudgeEntryProps & INetworkProp,
  TraditionalJudgeEntryState
> {
  webSocket: WebSocket;
  constructor(props) {
    super(props);
    this.state = { judging: false };
  }
  submit(d: model.TraditionalJudgeCode) {
    this.setState({ judging: true, result: null });
    let url = new URL(this.props.network.getBase());
    url.protocol = url.protocol == "http:" ? "ws:" : "wss:";
    this.webSocket = new WebSocket(url.toString() + this.props.url + "/submit");
    this.webSocket.addEventListener("open", e => {
      this.webSocket.send(JSON.stringify({ code: d }));
    });
    this.webSocket.addEventListener("message", e => {
      this.setState({
        result: JSON.parse(e.data) as judge.JudgeResponse,
        judging: false
      });
    });
  }
  // Corresponding message: syzoj.judge.JudgeResponse
  N_setResult(result: judge.JudgeResponse) {
    console.log(result);
    this.setState({ judging: false, result: result });
  }
  render() {
    return (
      <div>
        <h2>传统题</h2>
        <p>
          评测配置：<pre>{JSON.stringify(this.props.data)}</pre>
        </p>
        <CodeEditor onSubmit={d => this.submit(d)} />
        {this.state.judging && <p>评测中</p>}
        {this.state.result && (
          <div>
            <p>评测结果：</p>
            <pre>{JSON.stringify(this.state.result)}</pre>
          </div>
        )}
      </div>
    );
  }
}

const TraditionalJudgeEntry = withNetwork(traditionalJudgeEntry);

interface ProblemViewPageProps extends INetworkedComponentProps {
  data: api.ProblemViewPage;
}
// 展示题面、提交方式等信息。
// TODO: 美化并完善功能。
// Corresponding message: syzoj.api.ProblemViewPage
class ProblemViewPage extends Component<
  ProblemViewPageProps & INetworkProp,
  any
> {
  debugSubmit() {
    this.props.network.doAction("submit-judge-traditional", {
      code: {}
    });
  }
  render() {
    return (
      <div>
        <div key="title">
          <h1>{this.props.data.problem_title || "[无标题]"}</h1>
        </div>
        {this.props.data.problem_statement ? (
          <div key="statement">{this.props.data.problem_statement}</div>
        ) : (
          <p>无题面</p>
        )}
        <p>添加题面：</p>
        <ProblemStatementEdit
          onSubmit={s =>
            this.props.network.doAction("set-statement", { statement: s })
          }
        />
        {this.props.data.problem_judge ? (
          <div key="judge">
            <ProblemJudgeEntry
              url={this.props.url + "/judge"}
              data={this.props.data.problem_judge}
            />
          </div>
        ) : (
          <button
            onClick={() =>
              this.props.network.doAction("add-judge-traditional", {
                data: {
                  time_limit: 1000000000,
                  memory_limit: 1024000000
                }
              })
            }
          >
            添加评测
          </button>
        )}
      </div>
    );
  }
}

export default withNetwork(ProblemViewPage);
