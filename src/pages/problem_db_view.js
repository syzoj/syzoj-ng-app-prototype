import React, { Component } from 'react'
import { Tabs, Tab, Grid, Row, Col, Button, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import AceEditor from 'react-ace'
import 'brace/mode/c_cpp'
import 'brace/theme/tomorrow'
import { getFtpURL, request } from '../util'
import { AlertError, wrapAlert } from '../components/alert'

const TabEdit = (props) =>
  <Grid>
    <Row>
      <Col xs="12">
        <FormGroup>
          <ControlLabel>标题</ControlLabel>
          <FormControl type="text" value={props.data.title} onChange={e => props.onChange({...props.data, title: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>内容</ControlLabel>
          <FormControl componentClass="textarea" value={props.statement} onChange={e => props.onChange({...props.data, statement: e.target.value})} rows={30} />
        </FormGroup>
        <Button bsStyle="primary" onClick={e => props.onSubmit()}>编辑</Button>
      </Col>
    </Row>
  </Grid>

class TabManage extends Component {
  constructor(props) {
    super(props)
    this.state = {modal_publicize: false}
  }
  render() {
    return (
      <div>
        {this.props.data.can_publicize &&
          <Button key="1" onClick={() => this.setState({modal_publicize: true})}>公开</Button>}
        <p>该题目在以下题库中出现过：</p>
        {this.props.data.entry.map(entry =>
          <p>{entry.problemset_name}: {entry.name}</p>
        )}
        <ModalPublicize show={this.state.modal_publicize} onDismiss={() => this.setState({modal_publicize: false})} onSubmit={() => {this.setState({modal_publicize: false});this.props.onRefresh()}} />
      </div>
    )
  }
}

class ModalPublicize extends Component {
  constructor(props) {
    super(props)
    this.state = {name: ""}
  }
  submit() {
    request('/api/problem-db/view/' + this.props.problem_id + '/publicize', 'POST', {
      name: this.state.name
    }).then(resp => {
      this.props.onSubmit()
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>公开</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>输入公开名称:</p>
          <FormGroup>
            <FormControl type="text" style={{width: "100%"}} value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
          </FormGroup>
          <Button bsStyle="primary" onClick={() => this.submit()}>确认</Button>
          <Button onClick={this.props.onDismiss}>取消</Button>
        </Modal.Body>
      </Modal>
    )
  }
}
ModalPublicize = wrapAlert(ModalPublicize)
  
class ProblemDbView extends Component {
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
  submit() {
    request('/api/problem-db/view/' + this.props.match.params.problem_id + '/submit', 'POST', {
      language: 'cpp',
      code: this.editor.editor.getSession().getValue(),
    }).then(resp => {
      this.props.history.push('/submission/view/' + resp.submission_id)
    }).catch(err => alert(err))
  }
  render() {
    return (
      <Grid>
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
                {this.state.data.edit &&
                <Tab eventKey={3} title="编辑">
                  <TabEdit data={this.state.data.edit} onChange={(data) => this.setState({editData: data})} onSubmit={() => this.doEdit()}  />
                </Tab>}
                {this.state.data.manage &&
                <Tab eventKey={4} title="管理">
                  <TabManage data={this.state.data.manage} onChange={(data) => alert("TODO")} onRefresh={() => this.get()}/>
                </Tab>}
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
export default wrapAlert(ProblemDbView)
