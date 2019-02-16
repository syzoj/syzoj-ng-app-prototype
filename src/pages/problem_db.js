import React, { Component } from 'react'
import { Table, Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { request } from '../util'
import { wrapAlert, AlertError } from '../components/alert'

class ProblemDb extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {loaded: false}
  }
  componentDidMount() {
    this.get()
  }
  get() {
    request('/api/problem-db' + this.props.location.search, 'GET', null)
    .then(resp => {
      resp.problems = resp.problems || []
      this.setState({
        loaded: true,
        problems: resp.problems,
      })
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return (
      <Grid>
        {this.state.loaded ? [
        <Row key="3">
          <Col xs={1}>
            <LinkContainer to="/problem-db/new">
              <Button bsStyle="primary">创建新题目</Button>
            </LinkContainer>
          </Col>
        </Row>,
        <Row key="1">
          <Col xs={12}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Creation Time</th>
                  <th>Submit</th>
                </tr>
              </thead>
              <tbody>
              {this.state.problems.map(problem => 
                <tr>
                  <td><Link to={"/problem-db/view/" + problem.id}>{problem.title}</Link></td>
                  <td>{problem.create_time}</td>
                  <td>{problem.public_stats && problem.public_stats.submission}</td>
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
ProblemDb = wrapAlert(ProblemDb)
export default (props) =>
  <ProblemDb key={props.location.search} {...props} />
