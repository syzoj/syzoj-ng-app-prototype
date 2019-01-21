import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { request } from '../util'
import { AlertError, wrapAlert } from '../components/alert'

class ProblemDbMy extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {loaded: false}
  }
  componentDidMount() {
    this.get()
  }
  get() {
    request('/api/submission/my', 'GET', null)
    .then(resp => {
      this.setState({
        loaded: true,
        submissions: resp.submissions,
      })
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return (
      <Grid>
        {this.state.loaded ?
        <Row key="1">
          <Col xs={12}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
              {this.state.submissions.map(submission => 
                <tr>
                  <td><Link to={"/problem-db/view/" + submission.problem_id}>{submission.problem_title}</Link></td>
                  <td>{submission.submission_status}</td>
                  <td>{submission.submit_time}</td>
                  <td><Link to={"/submission/view/" + submission.submission_id}>View</Link></td>
                </tr>
              )}
              </tbody>
            </Table>
          </Col>
        </Row>
        :
        <Row key="2">
          <p>Loading...</p>
        </Row>
        }
      </Grid>
    )
  }
}
export default wrapAlert(ProblemDbMy)
