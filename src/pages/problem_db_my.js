import React, { Component } from 'react'
import { Table, Grid, Row, Col, Alert, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { request } from '../util'

export default class ProblemDbMy extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {loaded: false}
  }
  componentDidMount() {
    this.get()
  }
  get() {
    request('/api/problem/my', 'GET', null)
    .then(resp => {
      this.setState({
        loaded: true,
        problems: resp.problems,
      })
    }).catch(err => this.setState({error: err.toString()}))
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <Grid>
        {this.state.error &&
          <Row key="error"><Col xs={12}><Alert bsStyle="danger">{this.state.error}</Alert></Col></Row>
        }
        {this.state.loaded ? [
        <Row key="3">
          <Col xs={1}>
            <Button bsStyle="primary" onClick={() => this.setState({redirect: "/problem-db/new"})}>创建新题目</Button>
          </Col>
        </Row>,
        <Row key="1">
          <Col xs={12}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Creation Time</th>
                </tr>
              </thead>
              <tbody>
              {this.state.problems.map(problem => 
                <tr>
                  <td><Link to={"/problem-db/view/" + problem.id}>{problem.title}</Link></td>
                  <td>{problem.create_time}</td>
                </tr>
              )}
              </tbody>
            </Table>
          </Col>
        </Row>
        ] :
        <Row key="2">
          <p>Loading...</p>
        </Row>
        }
      </Grid>
    )
  }
}
