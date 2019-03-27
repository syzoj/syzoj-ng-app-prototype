import React, { Component, PureComponent } from "react";

const APIContext = React.createContext();

export class APIBase extends Component {
  constructor(props) {
    super(props);
    this.components = {};
  }
  render() {
    return (
      <APIContext.Provider value={this}>
        {this.props.children}
      </APIContext.Provider>
    );
  }
  get(path) {
    fetch(this.props.api + path, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
  // TODO: Add UI
  handleNetworkError(err) {
    console.log(err);
  }
  handleResponse(resp) {
    console.log(resp);
    if (resp.mutations)
      resp.mutations.forEach(mut => {
        this.components[mut.path]["N_" + mut.method](mut.value);
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

export function withNetwork(WrappedComponent) {
  return class extends React.Component {
    static contextType = APIContext;
    setRef(ref) {
      if (ref == null) {
        delete this.context.components[this.props.url];
      } else {
        this.context.components[this.props.url] = ref;
      }
    }
    doAction(action, data) {
      return this.context.doAction(this.props.url, action, data);
    }
    get(path) {
      return this.context.get(path);
    }
    render() {
      return (
        <WrappedComponent
          ref={ref => this.setRef(ref)}
          network={this}
          {...this.props}
        />
      );
    }
  };
}
