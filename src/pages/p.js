import React, { Component } from 'react'
import { AlertError, wrapAlert } from '../components/alert'
import { request } from '../util'

class P extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    request('/api/p/' + this.props.match.params.short_name, 'GET', null)
    .then(resp => {
      this.props.history.replace('/problem-db/view/' + resp.problem_id)
    }).catch(err => {
      this.props.alert({ class: AlertError, message: err.toString() })
    })
  }
  render() {
    return <p>Redirecting...</p>
  }
}

export default wrapAlert(P)
