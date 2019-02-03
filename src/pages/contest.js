import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ContestStatus from '../components/contest_status'
import ContestIndex from './contest_index'
import ContestRanklist from './contest_ranklist'

class Contest extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      <ContestStatus contestId={this.props.match.params.contest_id} />
      <Route path="/contest/:contest_id/index" component={ContestIndex} />
      <Route path="/contest/:contest_id/ranklist" component={ContestRanklist} />
    </div>
  }
}

export default (props) => <Contest key={props.match.params.contest_id} {...props} />
