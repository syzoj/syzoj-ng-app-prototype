import React, { Component } from 'react'
import { request } from '../util'
import { wrapAlert, AlertError } from '../components/alert'
import { Grid, Row, Col } from 'react-bootstrap'
import ProblemStatement from '../components/problem_statement'

class ContestProblem extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    request('/api/contest/' + this.props.match.params.contest_id + '/problem/' + this.props.match.params.entry_name, 'GET', null)
    .then(resp => {
      this.setState({ loading: false, data: resp })
    })
    .catch(err => {
      this.props.alert({ class: AlertError, message: err.toString() })
    })
  }
  render() {
    return <Grid>
      {this.state.loading && <Row><Col xs={12}><p>Loading...</p></Col></Row>}
      {this.state.data &&
      <div>
        <Row>
          <Col xs={12} className="h1">{this.state.data.problem.title}</Col>
        </Row>
        <Row>
          <Col xs={12}><ProblemStatement>{this.state.data.problem.statement}</ProblemStatement></Col>
        </Row>
      </div>
      }
    </Grid>
  }
}

export default wrapAlert(ContestProblem)
