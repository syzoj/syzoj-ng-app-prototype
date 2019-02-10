import React, { Component } from 'react'
import { request } from '../util'
import { wrapAlert, AlertError, AlertInfo } from '../components/alert'
import { Grid, Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class ContestIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    this.get()
  }
  get() {
    request('/api/contest/' + this.props.match.params.contest_id + '/index', 'GET', null)
    .then(resp => {
      this.setState({ data: resp, loading: false })
      console.log(resp)
    }).catch(err => {
      this.props.alert({class: AlertError, message: err.toString()})
    })
  }
  register() {
    request('/api/contest/' + this.props.match.params.contest_id + '/register', 'POST', {})
    .then(resp => {
      this.props.alert({class: AlertInfo, message: "报名成功"})
      this.get()
    }).catch(err => {
      this.props.alert({class: AlertError, message: err.toString()})
    })
  }
  render() {
    return <Grid>
      {this.state.loading && <Row><Col xs={12}>Loading</Col></Row>}
      {this.state.data && [
        <Row>
          <Col xs={12} className="h1">
            {this.state.data.name}
            <Button onClick={() => this.register()}>报名</Button>
          </Col>
        </Row>,
        <Row>
          <Col xs={12}>{this.state.data.description}</Col>
        </Row>,
        <Row>
          <Col xs={12}>Running: {this.state.data.contest.running ? "Yes" : "No"}</Col>
        </Row>,
        this.state.data.contest.problems && <Row>
          <Col xs={12}>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.contest.problems.map(p =>
                  <tr>
                    <td>{p.entry_name}</td>
                    <td>{<Link to={'problem/' + p.entry_name}>{p.title}</Link>}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      ]}
    </Grid>
  }
}

export default wrapAlert(ContestIndex)
