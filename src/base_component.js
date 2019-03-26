import React, { Component, PureComponent } from "react";

const APIContext = React.createContext();

export class APIBase extends Component {
  constructor(props) {
    super(props);
    this.components = { "#": this };
  }
  render() {
    return (
      <APIContext.Provider value={this}>
        {this.props.children}
      </APIContext.Provider>
    );
  }
  componentDidMount() {
    const path = this.props.location.pathname + this.props.location.search;
    this.get(this.props.api + path);
  }
  // exposed to server
  historyPush(data) {
    this.props.history.push(data.path);
  }
  get(path) {
    fetch(path, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
  handleNetworkError(err) {
    alert(err);
  }
  handleResponse(resp) {
    if (resp.mutations)
      resp.mutations.forEach(mut => {
        this.components[mut.path][mut.method](mut.value);
      });
  }
  doAction(url, action, data) {
    const u =
      this.props.api + this.props.location.pathname + url + "/" + action;
    fetch(u, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
}

export class BaseComponent extends PureComponent {
  static contextType = APIContext;
  componentDidMount() {
    this.context.components[this.props.url] = this;
  }
  componentWillUnmount() {
    delete this.context.components[this.props.url];
  }
  doAction(action, data) {
    return this.context.doAction(this.props.url, action, data);
  }
}
