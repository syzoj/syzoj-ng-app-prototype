import React, { Component } from "react"

import { request } from "./util"
window['request'] = request

export default class App extends Component {
  render() {
    return (
      "Hello World"
    );
  }
}
