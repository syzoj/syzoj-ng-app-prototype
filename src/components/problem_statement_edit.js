import React, { Component } from "react";

// Props:
// - onSubmit: required, receives a ProblemStatement object on submit
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
