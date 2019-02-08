import React, { Component } from 'react'
import { Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import ace from 'brace'
import 'brace/mode/c_cpp'
import 'brace/mode/pascal'
import 'brace/theme/tomorrow'

export default class CodeEditor extends Component {
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
