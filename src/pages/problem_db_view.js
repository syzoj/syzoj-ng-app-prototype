import React, { Component } from 'react'
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem} from 'react-bootstrap'
import ace from 'brace'
import 'brace/mode/c_cpp'
import 'brace/mode/pascal'
import 'brace/theme/tomorrow'
import { getFtpURL, request } from '../util'
import { AlertError, wrapAlert } from '../components/alert'

class TabEdit extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs="12">
            <FormGroup>
              <ControlLabel>标题</ControlLabel>
              <FormControl type="text" value={this.props.data.title} onChange={e => this.props.onChange({...this.props.data, title: e.target.value})} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>内容</ControlLabel>
              <FormControl componentClass="textarea" value={this.props.statement} onChange={e => this.props.onChange({...this.props.data, statement: e.target.value})} rows={30} />
            </FormGroup>
            <Button bsStyle="primary" onClick={e => this.props.onSubmit()}>编辑</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

class CodeSubmit extends Component {
  constructor(props) {
    super(props)
    this.state = { language: "cpp" }
  }
  modes = {
    "cpp": "c_cpp",
    "c": "c_cpp",
    "pas": "pascal",
  }
  componentDidMount() {
    this.editor = ace.edit(this.refEditor)
    this.editor.getSession().setMode('ace/mode/' + this.modes[this.state.language])
    this.editor.setTheme('ace/theme/tomorrow')
  }
  submit() {
    this.props.onSubmit({
      language: this.state.language,
      code: this.editor.getSession().getValue()
    })
  }
  setLanguage(lang) {
    this.setState({language: lang})
    this.editor.getSession().setMode('ace/mode/' + this.modes[lang])
  }
  render() {
    return ([
      <Row>
        <Col xs={12} sm={2}>
          <ListGroup>
            <ListGroupItem active={this.state.language === "cpp"} onClick={() =>this.setLanguage("cpp")}>C++</ListGroupItem>
            <ListGroupItem active={this.state.language === "c"} onClick={() =>this.setLanguage("c")}>C</ListGroupItem>
            <ListGroupItem active={this.state.language === "pas"} onClick={() =>this.setLanguage("pas")}>Pascal</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={12} sm={10}>
          <div ref={(ref) => this.refEditor = ref} style={{height: "500px"}} />
        </Col>
      </Row>,
      <Row>
        <Col xs={12} className="text-center">
          <Button onClick={() => this.submit()} bsStyle="primary">提交</Button>
        </Col>
      </Row>
    ])
  }
}
 
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
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  submit(val) {
    request('/api/problem-db/view/' + this.props.match.params.problem_id + '/submit', 'POST', {
      code: val,
    }).then(resp => {
      this.props.history.push('/submission/view/' + resp.id)
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
              <pre>{this.state.data.statement || "无题面"}</pre>
            </Col>
          </Row>,
          <Row key="4" style={{display: (this.state.data.can_submit ? 'block' : 'none')}}>
            <Col xs={12}>
              <CodeSubmit onSubmit={(val) => this.submit(val)} />
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
export default wrapAlert(ProblemDbView)
