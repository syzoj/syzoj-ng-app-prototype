// 该文件用来修改题面的 markdown 代码。
// TODO: 美化，加入编辑器、实时预览等功能。

import React, { Component } from "react";

export default class ProblemStatementEdit extends Component {
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({ markdown: { text: this.refText.value } });
  }
  render() {
    return (
      <form>
        <textarea ref={ref => (this.refText = ref)} />
        <input type="submit" onClick={e => this.onSubmit(e)} value="保存" />
      </form>
    );
  }
}
