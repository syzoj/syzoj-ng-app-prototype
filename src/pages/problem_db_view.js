import React, { Component } from 'react'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import { getGitURL, request } from '../util'

export default class ProblemDbView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  componentDidMount() {
    request('/api/problem/' + this.props.match.params.problem_id + '/view', 'GET', null)
    .then(resp => {
      console.log(resp)
      this.setState({statement: resp.statement, gitUrl: getGitURL(resp.git_repo, resp.git_token)})
    }).catch(err => this.setState({error: err.toString()}))
  }
  render() {
    let errorComponent = null
    if(this.state.error) {
      errorComponent = <Row><Col xs={12}><Alert bsStyle="danger">{this.state.error}</Alert></Col></Row>
    }
    let statementComponent = null
    if(this.state.statement) {
      statementComponent = [
        <Row key="1">
          <Col xs={12}>
            <h1 className="text-center">{this.state.statement.title || "无标题"}</h1>
          </Col>
        </Row>,
        <Row key="2">
          <Col xs={12}>
            <pre>{this.state.statement.statement || "无内容"}</pre>
          </Col>
        </Row>,
        <Row key="3">
          <Col xs={12}>
            <p>你的 Git 地址是：{this.state.gitUrl}</p>
          </Col>
        </Row>
      ]
      console.log(this.state.statement)
    } else {
      statementComponent = <p>加载中...</p>
    }
    return (
      <div>
        <Grid>
          {errorComponent}
          {statementComponent}
        </Grid>
      </div>
    )
  }
}
