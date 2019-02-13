import React, { Component } from 'react'
import { AlertError, wrapAlert } from '../components/alert'
import { request } from '../util'

class ContestRanklist extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    request('/api/contest/' + this.props.match.params.contest_id + '/ranklist', 'GET', null)
    .then(resp => {
      this.setState({ data: resp })
    }).catch(err => {
      this.props.alert({ class: AlertError, message: err.toString() })
    })
  }
  render() {
    return <pre  style={{"overflow-x": "auto", "white-space": "pre-wrap"}}>>{JSON.stringify(this.state)}</pre>
  }
}
export default wrapAlert(ContestRanklist)
