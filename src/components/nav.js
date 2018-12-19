import React, { Component } from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { request, getSession, defaultUserId } from '../util'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default class AppNav extends Component {
  logout() {
    request('/api/auth/logout', 'POST', {}).then(() => this.setState({})).catch(e => alert(e))
  }
  getAccountComponent() {
    let sess = getSession()
    if(sess.user_id && sess.user_id !== defaultUserId) {
      return (
        <Nav pullRight>
          <NavDropdown title={sess.user_name}>
            <NavItem onClick={() => this.logout()}>Logout</NavItem>
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
          <NavItem>首页</NavItem>
        </Nav>
        {this.getAccountComponent()}
      </Navbar>
    )
  }
}