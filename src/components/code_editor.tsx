import React, { Component } from "react";
import ace from "brace";
import "brace/theme/tomorrow";
import "brace/mode/c_cpp";
import "brace/mode/pascal";

import * as model from "../interfaces/syzoj.model";

// 该文件实现一个代码编辑器，包含语言选择以及编辑框。
// TODO: 美化。
interface ICodeEditorProps {
  /** 接受一个参数，表示提交的代码。 */
  onSubmit(code: model.TraditionalJudgeCode): void;
}
interface ICodeEditorState {
  language: string;
}

export default class CodeEditor extends Component<
  ICodeEditorProps,
  ICodeEditorState
> {
  static language_list = ["cpp", "c", "pas"];
  static languages: {
    [key: string]: {
      name: string;
      mode: string;
    };
  } = {
    cpp: {
      name: "C++",
      mode: "ace/mode/c_cpp"
    },
    c: {
      name: "C",
      mode: "ace/mode/c_cpp"
    },
    pas: {
      name: "Pascal",
      mode: "ace/mode/pascal"
    }
  };
  refEditor: HTMLDivElement;
  editor: any;

  constructor(props: Readonly<ICodeEditorProps>) {
    super(props);
    this.state = { language: CodeEditor.language_list[0] };
  }
  onSubmit() {
    const code: model.TraditionalJudgeCode = {
      code: this.editor.getValue(),
      language: this.state.language
    };
    this.props.onSubmit(code);
  }
  render() {
    return (
      <div>
        <select
          value={this.state.language}
          onChange={e => this.setState({ language: e.target.value })}
        >
          {CodeEditor.language_list.map(language => (
            <option key={language} value={language}>
              {CodeEditor.languages[language].name}
            </option>
          ))}
        </select>
        <div ref={ref => (this.refEditor = ref)} style={{ height: "500px" }} />
        <button onClick={() => this.onSubmit()}>提交</button>
      </div>
    );
  }
  componentDidMount() {
    this.editor = ace.edit(this.refEditor);
    this.editor.setTheme("ace/theme/tomorrow");
    this.editor
      .getSession()
      .setMode(CodeEditor.languages[this.state.language].mode);
  }
}
