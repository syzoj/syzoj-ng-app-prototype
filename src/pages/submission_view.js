import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { request } from '../util'
import { AlertError, wrapAlert } from '../components/alert'

class SubmissionView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {loaded: false}
  }
  componentDidMount() {
    this.get()
  }
  get() {
    request('/api/submission/view/' + this.props.match.params.submission_id, 'GET', null)
    .then(resp => {
      this.setState({
        submission: resp,
        loaded: true,
      })
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return (
      <Grid>
        {this.state.loaded ? [
          <Row key="1">
            <Col key="1" xs={12}>
              <p>
                Status: {this.state.submission.status}
              </p>
              <p>
                Message: {this.state.submission.message}
              </p>
              <p>
                Score: {this.state.submission.score}
              </p>
              <p>
                Language: {this.state.submission.language}
              </p>
              <p>
                Problem: <Link to={"/problem-db/view/" + this.state.submission.problem_id}>{this.state.submission.problem_title}</Link>
              </p>
              <p>
                submit_time: {this.state.submission.submit_time}
              </p>
            </Col>
            <Col key="2" xs={12}>
              <pre>
                {this.state.submission.code}
              </pre>
            </Col>
          </Row>
        ] : [
          <Row key="3">
            <Col xs={12}>
              <p>加载中...</p>
            </Col>
          </Row>,
        ]}
      </Grid>
    )
  }
}
export default wrapAlert(SubmissionView)
