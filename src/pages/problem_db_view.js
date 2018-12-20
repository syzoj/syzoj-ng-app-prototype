import React, { Component } from 'react'
import { Grid, Row, Col, Alert, Button } from 'react-bootstrap'
import { getFtpURL, request } from '../util'

export default class ProblemDbView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {loaded: false}
  }
  componentDidMount() {
    this.get()
  }
  get() {
    request('/api/problem/' + this.props.match.params.problem_id + '/view', 'GET', null)
    .then(resp => {
      console.log(resp)
      this.setState({
        loaded: true,
        title: resp.title,
        statement: resp.statement,
        is_owner: resp.is_owner,
        ftpUrl: getFtpURL(this.props.match.params.problem_id, resp.token)
      })
    }).catch(err => this.setState({error: err.toString()}))
  }
  resetToken() {
    request('/api/problem/' + this.props.match.params.problem_id + '/reset-token', 'POST', null)
    .then(resp => {
      this.setState({
        ftpUrl: getFtpURL(this.props.match.params.problem_id, resp.token)
      })
    }).catch(err => this.setState({error: err.toString()}))
  }
  update() {
    request('/api/problem/' + this.props.match.params.problem_id + '/update', 'POST', null)
    .then(resp => {
      this.get()
    }).catch(err => this.setState({error: err.toString()}))
  }
  render() {
    let errorComponent = null
    if(this.state.error) {
      errorComponent = <Row><Col xs={12}><Alert bsStyle="danger">{this.state.error}</Alert></Col></Row>
    }
    let statementComponent = null
    if(this.state.loaded) {
      let manageComponent = null
      if(this.state.is_owner) {
        manageComponent = [
          <Button bsStyle="primary" onClick={() => this.resetToken()}>重置链接</Button>,
          <Button onClick={() => this.update()}>刷新</Button>,
        ]
      }
      statementComponent = [
        <Row key="1">
          <Col xs={12}>
            <h1 className="text-center">{this.state.title || "无标题"}</h1>
          </Col>
        </Row>,
        <Row key="2">
          <Col xs={12}>
            <pre>{this.state.statement || "无内容"}</pre>
          </Col>
        </Row>,
        <Row key="3">
          <Col xs={12}>
            <p>你的 FTP 地址是：{this.state.ftpUrl}</p>
            {manageComponent}
          </Col>
        </Row>
      ]
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
