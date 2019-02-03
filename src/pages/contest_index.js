import React, { Component } from 'react'

export default class ContestIndex extends Component {
  render() {
    return "Contest " + this.props.match.params.contest_id + " index"
  }
}
