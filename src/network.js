import React, { Component } from "react";
import { connect } from "react-redux";

const APIContext = React.createContext(null);

// Provides fetch-based network implementation.
class _APIBase extends Component {
  constructor(props) {
    super(props);
    this.base = props.api;
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
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
  handleNetworkError(err) {
    console.log(err);
  }
  handleResponse(resp) {
    console.log(resp);
    if (resp.mutations)
      resp.mutations.forEach(mut => {
        console.log(mut);
        let { "@type": typ, ...m } = mut;
        const typename = typ.substring(typ.indexOf("/") + 1);
        this.props.dispatch({ ...m, type: typename });
      });
  }
  doAction(url, action, data) {
    const u = this.props.api + url + "/" + action;
    fetch(u, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
}

export const APIBase = connect()(_APIBase);

export function withNetwork(WrappedComponent) {
  return class extends Component {
    static contextType = APIContext;
    componentDidUpdate(prevProps) {
      if (prevProps.url !== this.props.url) {
        console.log(prevProps, this.props);
        throw "Component's url changed";
      }
    }
    doAction(action, data) {
      return this.context.doAction(this.props.url, action, data);
    }
    get(path) {
      return this.context.get(path);
    }
    getBase() {
      return this.context.base;
    }
    render() {
      return <WrappedComponent network={this} {...this.props} />;
    }
  };
}
