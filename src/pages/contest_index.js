import React, { Component } from 'react'
import { request } from '../util'
import { wrapAlert, AlertError } from '../components/alert'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class ContestIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    request('/api/contest/' + this.props.match.params.contest_id + '/index', 'GET', null)
    .then(resp => {
      this.setState({ data: resp, loading: false })
      console.log(resp)
    }).catch(err => {
      this.props.alert({class: AlertError, message: err.toString()})
    })
  }
  render() {
    return <Grid>
      {this.state.loading && <Row><Col xs={12}>Loading</Col></Row>}
      {this.state.data && [
        <Row>
          <Col xs={12} className="h1">{this.state.data.name}</Col>
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
