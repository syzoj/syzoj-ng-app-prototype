import React, { Component } from 'react'

export default class ContestRanklist extends Component {
  render() {
    return "Contest " + this.props.match.params.contest_id + " ranklist"
  }
}
