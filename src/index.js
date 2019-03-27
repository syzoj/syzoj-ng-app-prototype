import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { APIBase, withNetwork } from "./base_component";

import "./styles.css";
import Any from "./components/any";

function App() {
  return (
    <Router>
      <Route component={Base} />
    </Router>
  );
}

function Base(props) {
  return (
    <APIBase api="http://127.0.0.1:5900/api" {...props}>
      <BasePage url="" {...props} />
    </APIBase>
  );
}

class basePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location != this.props.location) {
      this.refresh();
    }
  }
  refresh() {
    const path = this.props.location.pathname + this.props.location.search;
    this.props.network.get(path);
  }
  N_setBody(data) {
    this.setState({ data: data });
  }
  // TODO: add UI
  N_setError(err) {
    console.log(err);
  }
  N_redirect(data) {
    this.props.history.push(data.path);
  }
  render() {
    return this.state.data ? (
      <Any key="/page" url={this.props.url + "/page"} data={this.state.data} />
    ) : (
      "Loading"
    );
  }
}

const BasePage = withNetwork(basePage);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
