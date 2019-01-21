import React, { Component } from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { request, getSession, defaultUserId } from '../util'

export default class AppNav extends Component {
  logout() {
    request('/api/nav/logout', 'POST', {}).then(() => this.setState({})).catch(e => alert(e))
  }
  getAccountComponent() {
    let sess = getSession()
    if(sess.logged_in) {
      return (
        <Nav pullRight>
          <NavDropdown title={sess.user_name}>
            <NavItem onClick={() => this.logout()}>Logout</NavItem>
            <LinkContainer to="/problem-db/my"><NavItem>我的题目</NavItem></LinkContainer>
            <LinkContainer to="/submission/my"><NavItem>我的提交记录</NavItem></LinkContainer>
          </NavDropdown>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavDropdown title="Account">
            <LinkContainer to="/register">
              <MenuItem>Register</MenuItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <MenuItem>Login</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      )
    }
  }
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">SYZOJ</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/" exact>
            <NavItem>首页</NavItem>
          </LinkContainer>
          <LinkContainer to="/problems" exact isActive={(match, location) => location.pathname.match(/^(\/problems|\/problem\/)/)}>
            <NavItem>题库</NavItem>
          </LinkContainer>
        </Nav>
        {this.getAccountComponent()}
      </Navbar>
    )
  }
}
