import React, { Component } from 'react'
import { Col, Row, Grid, Button, ControlLabel, FormControl, FormGroup, HelpBlock, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { request } from '../util'

export default class Register extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      username: "",
      password: "",
      usernameError: false,
    }
  }

  submit() {
    let error = false
    if(!this.state.username.match(/^[0-9A-Za-z]{3,32}$/)) {
      this.setState({usernameError: true})
      error = true
    }
    if(this.state.password.length < 6) {
      this.setState({passwordError: true})
      error = true
    }
    if(error) return

    request('/api/auth/register', 'POST', {
      username: this.state.username,
      password: this.state.password,
    }).then(resp => {
      this.setState({redirect: '/'})
    }).catch(err => {
      this.setState({error: err.toString()})
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let usernameComponent = null
    if(this.state.usernameError) {
      usernameComponent = <HelpBlock>用户名必须为 3~32 个字符，由数字和大小写字母组成。</HelpBlock>
    }
    let passwordComponent = null
    if(this.state.passwordError) {
      passwordComponent = <HelpBlock>密码至少为 6 个字符。</HelpBlock>
    }
    return (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            {this.state.error ?
              <Alert bsStyle="danger">{this.state.error}</Alert>
            : null}
            <form>
              <FormGroup controlId="username" validationState={this.state.usernameError ? "error" : null}>
                <ControlLabel>用户名</ControlLabel>
                <FormControl type="text" value={this.state.username} placeholder="用户名" onChange={(e) => this.setState({username: e.target.value, usernameError: false})} />
                {usernameComponent}
              </FormGroup>
              <FormGroup controlId="password" validationState={this.state.passwordError ? "error" : null}>
                <ControlLabel>密码</ControlLabel>
                <FormControl type="password" value={this.state.password} placeholder="密码" onChange={(e) => this.setState({password: e.target.value, passwordError: false})} />
                {passwordComponent}
              </FormGroup>
              <Button bsStyle="primary" onClick={() => this.submit()}>注册</Button>
            </form>
          </Col>
        </Row>
      </Grid>
      )
  }
}
