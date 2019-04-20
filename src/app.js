import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { APIBase, withNetwork } from "./network";
import { baseReducer } from "./redux/base";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { pages } from "./pages/pages";
import "./styles.css";

const store = createStore(baseReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route component={Base} />
      </Router>
    </Provider>
  );
}

function Base(props) {
  return (
    <APIBase api="http://127.0.0.1:5900/api">
      <BasePage url="" {...props} />
    </APIBase>
  );
}

class basePage extends Component {
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.refresh();
    }
  }
  refresh() {
    const path = this.props.location.pathname + this.props.location.search;
    this.props.network.get("/page" + path);
  }
  render() {
    if (!this.props.body) {
      return "Loading";
    }
    let { "@type": typ, ...m } = this.props.body;
    const typename = typ.substring(typ.indexOf("/") + 1);
    const Component = pages[typename];
    return (
      <Component
        key={this.props.location.pathname}
        url={this.props.url + "/page" + this.props.location.pathname}
        data={m}
      />
    );
  }
}

const mapStateToProps = state => ({ body: state.body });

const BasePage = connect(mapStateToProps)(withNetwork(basePage));
