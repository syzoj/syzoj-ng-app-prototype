import React, { Component } from 'react'
import { AlertError, wrapAlert } from '../components/alert'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { request } from '../util'

class Submissions extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    request('/api/submissions' + this.props.location.search, 'GET', null)
    .then(resp => {
      resp.submissions = resp.submissions || []
      this.setState({ loading: false, data: resp })
    }).catch(err => {
      this.props.alert({ class: AlertError, message: err.toString()})
    })
  }

  render() {
    return <Grid>
      {this.state.loading && <Row key="1"><Col xs={12}>Loading...,</Col></Row>}
      {this.state.data && <div>
      <Row key="2">
        <Col xs={12}>
          <h1>提交记录</h1>
          <p>仅显示最近 50 条</p>
        </Col>
      </Row>
      <Row key="3">
        <Col xs={12}>
          <Table striped>
            <thead>
              <tr>
                <th>题目</th>
                <th>状态</th>
                <th>分数</th>
                <th>提交者</th>
                <th>语言</th>
                <th>提交时间</th>
                <th>查看</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.submissions.map(entry =>
                <tr>
                  <td><Link to={'/problem-db/view/' + entry.problem_id}>{entry.problem_title}</Link></td>
                  <td>{entry.submission_result_status}</td>
                  <td>{entry.submission_result_score}</td>
                  <td><Link to={'/user/' + entry.user_id}>{entry.user_username}</Link></td>
                  <td>{entry.submission_content_language}</td>
                  <td>{entry.submission_submit_time}</td>
                  <td><Link to={'/submission/view/' + entry.submission_id}>查看</Link></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row></div>}
    </Grid>
  }
}

export default wrapAlert((props) =>
  <Submissions key={props.location.search} {...props} />
)
