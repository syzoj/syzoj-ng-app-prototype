import React, { Component } from 'react'
import { Tabs, Tab, Grid, Row, Col, Alert, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import AceEditor from 'react-ace'
import 'brace/mode/c_cpp'
import 'brace/theme/tomorrow'
import { getFtpURL, request } from '../util'

class ProblemDbViewStatement extends Component {
  render() {
    return (
      <pre>{this.props.statement || "无内容"}</pre>
    )
  }
}

export default class ProblemDbView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {loaded: false}
  }
  componentDidMount() {
    this.get()
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
  get() {
    request('/api/problem/' + this.props.match.params.problem_id + '/view', 'GET', null)
    .then(resp => {
      this.setState({
        loaded: true,
        title: resp.title,
        statement: resp.statement,
        is_owner: resp.is_owner,
        can_submit: resp.can_submit,
        ftpUrl: getFtpURL(this.props.match.params.problem_id, resp.token)
      })
    }).catch(err => this.setState({error: err.toString()}))
  }
  submit() {
    request('/api/problem/' + this.props.match.params.problem_id + '/submit', 'POST', {
      language: 'cpp',
      code: this.editor.editor.getSession().getValue(),
    }).then(resp => {
      this.setState({
        redirect: '/submission/view/' + resp.submission_id,
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
          <Row><Col xs={12}><Alert bsStyle="danger">{this.state.error}</Alert></Col></Row>
        }
        {this.state.loaded ? [
          <Row key="1">
            <Col xs={12}>
              <h1 className="text-center">{this.state.title || "无标题"}</h1>
            </Col>
          </Row>,
          <Row key="2">
            <Col xs={12}>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="题面">
                  <pre>{this.state.statement || "无题面"}</pre>
                </Tab>
                {this.state.can_submit &&
                <Tab eventKey={2} title="提交">
                  <p>提交</p>
                  <AceEditor mode="c_cpp" theme="tomorrow" ref={(ref) => this.editor = ref} />
                  <Button bsStyle="primary" onClick={() => this.submit()}>提交</Button>
                </Tab>
                }
                {this.state.is_owner &&
                <Tab eventKey={3} title="管理">
                  <Button key="1" bsStyle="primary" onClick={() => this.resetToken()}>重置链接</Button>
                  <Button key="2" onClick={() => this.update()}>刷新</Button>
                </Tab>
                }
              </Tabs>
            </Col>
          </Row>,
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
