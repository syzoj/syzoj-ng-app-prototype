import React, { Component } from 'react'
import { AlertError, wrapAlert } from '../components/alert'
import { request } from '../util'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Radio, Checkbox, Form, HelpBlock, Button } from 'react-bootstrap'

class ContestNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rules: this.ACM
    }
  }
  ACM = {
    judge_in_contest: true,
    see_result: true,
    rejudge_after_contest: false,
    ranklist_type: "realtime",
    ranklist_comp: "acm",
    ranklist_visibility: "public",
  }
  NOI = {
    judge_in_contest: false,
    see_result: false,
    rejudge_after_contest: true,
    ranklist_type: "defer",
    ranklist_comp: "lastsum",
    ranklist_visibility: "public",
  }
  IOI = {
    judge_in_contest: true,
    see_result: true,
    rejudge_after_contest: false,
    ranklist_type: "realtime",
    ranklist_comp: "maxsum",
    ranklist_visibility: null
  }

  submit() {
    request('/api/contest-new', 'POST', {
      title: this.refTitle.value,
      options: {
        start_time: this.refStart.value,
        duration: this.refDuration.value,
        rules: this.state.rules
      }
    }).then(resp => {
      this.props.history.push('/contest/view/' + resp.id)
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return (
      <Grid>
        <Form horizontal>
          <Row>
            <Col xs={12}><h1 className="text-center">创建新比赛</h1></Col>
          </Row>
          <Row>
            <Col className="h2" xs={12}>基本信息</Col>
          </Row>
          <FormGroup>
            <Col sm={2} xs={12} componentClass={ControlLabel}>标题</Col>
            <Col sm={10} xs={12}>
              <FormControl type="text" inputRef={(ref) => this.refTitle = ref} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} xs={12} componentClass={ControlLabel}>开始时间</Col>
            <Col sm={10} xs={12}>
              <FormControl type="Text" inputRef={(ref) => this.refStart = ref} placeholder="待定" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} xs={12} componentClass={ControlLabel}>时长</Col>
            <Col sm={10} xs={12}>
              <FormControl type="text" inputRef={(ref) => this.refDuration = ref} placeholder="待定" />
            </Col>
          </FormGroup>
          <Row>
            <Col className="h2" xs={12}>赛制</Col>
          </Row>
          <FormGroup>
            <Col sm={2} xs={12} componentClass={ControlLabel}>配置</Col>
            <Col sm={10} xs={12}>
              <Radio inline onChange={() => this.setState({rules: this.ACM})} checked={this.state.rules === this.ACM}>ACM</Radio>
              <Radio inline onChange={() => this.setState({rules: this.NOI})} checked={this.state.rules === this.NOI}>NOI</Radio>
              <Radio inline onChange={() => this.setState({rules: this.IOI})} checked={this.state.rules === this.IOI}>IOI</Radio>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} xs={12} componentClass={ControlLabel}>评测</Col>
            <Col sm={10} xs={12}>
              <Checkbox inline checked={this.state.rules.judge_in_contest} onChange={e => {let bool = e.target.checked;return this.setState(prevState => ({...prevState, rules: {...prevState.rules, judge_in_contest: bool}}))}}>赛中评测</Checkbox>
              <Checkbox inline checked={this.state.rules.see_result} onChange={e => {let bool = e.target.checked;return this.setState(prevState => ({...prevState, rules: {...prevState.rules, see_result: bool}}))}}>选手可查看实时结果</Checkbox>
              <Checkbox inline checked={this.state.rules.rejudge_after_contest} onChange={e => {let bool = e.target.checked;return this.setState(prevState => ({...prevState, rules: {...prevState.rules, rejudge_after_contest: bool}}))}}>赛后自动重测</Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2} xs={12}>排行榜</Col>
            <Col sm={10} xs={12}>
              <Radio inline checked={!this.state.rules.ranklist_type} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_type: null}}))}}>无排行榜</Radio>
              <Radio inline checked={this.state.rules.ranklist_type === "realtime"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_type: "realtime"}}))}}>实时排行榜</Radio>
              <Radio inline checked={this.state.rules.ranklist_type === "huge"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_type: "huge"}}))}}>大型排行榜</Radio>
              <Radio inline checked={this.state.rules.ranklist_type === "defer"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_type: "defer"}}))}}>赛后排行榜</Radio>
            </Col>
          </FormGroup>
          <FormGroup style={{display: (this.state.rules.ranklist_type ? "block" : "none")}}>
            <Col smOffset={2} sm={10} xs={12}>
              <Radio inline checked={!this.state.rules.ranklist_visibility} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_visibility: null}}))}}>仅管理员可见</Radio>
              <Radio inline checked={this.state.rules.ranklist_visibility === "players"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_visibility: "players"}}))}}>仅选手可见</Radio>
              <Radio inline checked={this.state.rules.ranklist_visibility === "public"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_visibility: "public"}}))}}>公开</Radio>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2} xs={12}>排序方式</Col>
            <Col sm={10} xs={12}>
              <Radio inline checked={this.state.rules.ranklist_comp == "maxsum"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_comp: "maxsum"}}))}}>每题最高分之和</Radio>
              <Radio inline checked={this.state.rules.ranklist_comp == "lastsum"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_comp: "lastsum"}}))}}>最后一次提交分数之和</Radio>
              <Radio inline checked={this.state.rules.ranklist_comp == "acm"} onChange={e => {this.setState(prevState => ({...prevState, rules: {...prevState.rules, ranklist_comp: "acm"}}))}}>以通过题数为第一关键字,罚时为第二关键字</Radio>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2} xs={12}>报名</Col>
            <Col sm={10} xs={12}>
              <p className="form-control-static">任何人均可报名</p>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2} xs={12}>可见性</Col>
            <Col sm={10} xs={12}>
              <p className="form-control-static">任何人均可看见</p>
            </Col>
          </FormGroup>
          <Row>
            <Col xs={12} className="text-center">
              <Button bsStyle="primary" onClick={() => this.submit()}>创建比赛</Button>
            </Col>
          </Row>
        </Form>
      </Grid>
    )
  }
}
export default wrapAlert(ContestNew)
