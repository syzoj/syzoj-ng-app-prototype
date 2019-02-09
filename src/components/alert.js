import React, { Component } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

export const AlertContext = React.createContext((msg) => alert(msg.message))

export function AlertError(props) {
  //return <Alert onDismiss={props.onDismiss} bsStyle="danger">{props.msg.message}</Alert>
  return <Modal show={true} onHide={props.onDismiss}>
    <Modal.Header closeButton>
      <Modal.Title>提示</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{props.msg.message}</p>
      <Button bsStyle="primary" onClick={props.onDismiss}>确定</Button>
    </Modal.Body>
  </Modal>
}

export function AlertInfo(props) {
  return <Modal show={true} onHide={props.onDismiss}>
    <Modal.Header closeButton>
      <Modal.Title>提示</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{props.msg.message}</p>
      <Button bsStyle="primary" onClick={props.onDismiss}>确定</Button>
    </Modal.Body>
  </Modal>
}

export class AlertGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {messages: [], id: 0}
  }
  alert(msg) {
    this.setState(prevState => {
      msg.id = prevState.id++
      prevState.messages.push(msg)
      return prevState
    })
  }
  render() {
    return <div>
      {this.state.messages.map((msg, i) => React.createElement(msg.class, {
        key: msg.id,
        msg: msg,
        onDismiss: () => this.setState(prevState => {
          prevState.messages = prevState.messages.filter(m => m.id !== msg.id)
          return prevState
        })
      }))}
    </div>
  }
}

export function wrapAlert(Class) {
    return function(props) {
      return <AlertContext.Consumer>
         {(alert) => <Class alert={alert} {...props} />}
      </AlertContext.Consumer>
    }
}
