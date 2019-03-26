import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { APIBase, BaseComponent } from "./base_component";

import "./styles.css";
import Any from "./components/any";

function App() {
  return (
    <Router>
      <Route path="/" component={Base} />
    </Router>
  );
}

function Base(props) {
  return (
    <APIBase api="http://127.0.0.1:5900/api" {...props}>
      <BasePage url="" />
    </APIBase>
  );
}

class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setBody(body) {
    console.log(body);
    this.setState({ data: body });
  }
  setError(err) {
    console.log(err);
  }
  render() {
    return this.state.data ? (
      <Any key="/page" url={this.props.url + "/page"} data={this.state.data} />
    ) : (
      "Loading"
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
