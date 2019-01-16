import React, { Component } from 'react'
import { Tabs, Tab, Grid, Row, Col, Alert, Button, Modal, FormGroup, FormControl } from 'react-bootstrap'
import AceEditor from 'react-ace'
import 'brace/mode/c_cpp'
import 'brace/theme/tomorrow'
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
    request('/api/problem-db/view/' + this.props.match.params.problem_id, 'GET', null)
    .then(resp => {
      this.setState({
        loaded: true,
        data: resp,
      })
    }).catch(err => this.setState({error: err.toString()}))
  }
  modal_publicize_confirm() {
    request('/api/problem-db/view/' + this.props.match.params.problem_id + '/publicize', 'POST', {
      name: this.state.modal_publicize_name
    }).then(resp => {
      this.modal_publicize_dismiss()
      this.get()
    }).catch(err => this.setState({modal_publicize_error: err.toString()}))
  }
  submit() {
    request('/api/problem-db/view/' + this.props.match.params.problem_id + '/submit', 'POST', {
      language: 'cpp',
      code: this.editor.editor.getSession().getValue(),
    }).then(resp => {
      this.props.history.push('/submission/view/' + resp.submission_id)
    }).catch(err => this.setState({error: err.toString()}))
  }
  modal_publicize_dismiss() {
    this.setState({modal_publicize_error: null, modal_publicize: false, modal_publicize_name: ""})
  }
  render() {
    return (
      <Grid>
        {this.state.error &&
          <Row><Col xs={12}><Alert bsStyle="danger" onDismiss={() => this.setState({error: null})}>{this.state.error}</Alert></Col></Row>
        }
        {this.state.loaded ? [
          <Row key="1">
            <Col xs={12}>
              <h1 className="text-center">{this.state.data.title || "无标题"}</h1>
            </Col>
          </Row>,
          <Row key="2">
            <Col xs={12}>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="题面">
                  <pre>{this.state.data.statement || "无题面"}</pre>
                </Tab>
                {this.state.data.can_submit &&
                <Tab eventKey={2} title="提交">
                  <p>提交</p>
                  <AceEditor mode="c_cpp" theme="tomorrow" ref={(ref) => this.editor = ref} />
                  <Button bsStyle="primary" onClick={() => this.submit()}>提交</Button>
                </Tab>
                }
                {this.state.data.is_owner &&
                <Tab eventKey={3} title="管理">
                  {this.state.data.can_publicize &&
                    <Button key="1" onClick={() => this.setState({modal_publicize: true})}>公开</Button>}
                  {this.state.data.public_name &&
                    <p>名称:<span>{this.state.data.public_name}</span></p>}
                  <Modal show={this.state.modal_publicize} onHide={() => this.modal_publicize_dismiss()}>
                    <Modal.Header closeButton>
                      <Modal.Title>公开</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {this.state.modal_publicize_error &&
                        <Alert bsStyle="danger" onDismiss={() => this.setState({modal_publicize_error: null})}>{this.state.modal_publicize_error}</Alert>
                      }
                      <p>输入公开名称:</p>
                      <FormGroup>
                        <FormControl type="text" style={{width: "100%"}} value={this.state.modal_publicize_name} onChange={(e) => this.setState({modal_publicize_name: e.target.value})} />
                      </FormGroup>
                      <Button bsStyle="primary" onClick={() => this.modal_publicize_confirm()}>确认</Button>
                      <Button onClick={() => this.modal_publicize_dismiss()}>取消</Button>
                    </Modal.Body>
                  </Modal>
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
