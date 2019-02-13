import React, { Component } from 'react'
import { Col, Row, Grid, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap'
import { request } from '../util'
import { wrapAlert, AlertError } from '../components/alert'

class Register extends Component {
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
    if(!this.state.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
      this.setState({emailError: true})
      error = true
    }
    if(error) return

    request('/api/register', 'POST', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    }).then(resp => {
      this.props.history.push('/login')
    }).catch(err => {
      this.props.alert({class: AlertError, message: err.toString()})
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <form onSubmit={(e) => { e.preventDefault(); this.submit() }}>
              <FormGroup controlId="username" validationState={this.state.usernameError ? "error" : null}>
                <ControlLabel>用户名</ControlLabel>
                <FormControl type="text" value={this.state.username} placeholder="用户名" onChange={(e) => this.setState({username: e.target.value, usernameError: false})} />
                {this.state.usernameError && <HelpBlock>用户名必须为 3~32 个字符，由数字和大小写字母组成。</HelpBlock>}
              </FormGroup>
              <FormGroup controlId="password" validationState={this.state.passwordError ? "error" : null}>
                <ControlLabel>密码</ControlLabel>
                <FormControl type="password" value={this.state.password} placeholder="密码" onChange={(e) => this.setState({password: e.target.value, passwordError: false})} />
                {this.state.passwordError && <HelpBlock>密码至少为 6 个字符。</HelpBlock>}
              </FormGroup>
              <FormGroup controlId="email" validationState={this.state.emailError ? "error" : null}>
                <ControlLabel>邮箱</ControlLabel>
                <FormControl type="email" value={this.state.email} placeholder="邮箱" onChange={(e) => this.setState({email: e.target.value, emailError: false})} />
                {this.state.emailError && <HelpBlock>请输入合法的邮箱。</HelpBlock>}
              </FormGroup>
              <Button bsStyle="primary" onClick={() => this.submit()}>注册</Button>
            </form>
          </Col>
        </Row>
      </Grid>
      )
  }
}
export default wrapAlert(Register)
