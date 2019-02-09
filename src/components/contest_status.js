import React, { Component } from 'react'
import { request } from '../util'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class ContestStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.socket = new WebSocket('ws://' + window.location.host + '/api/contest/' + this.props.contestId + '/status')
    this.socket.addEventListener('open', e => {
      console.log('open')
    })
    this.socket.addEventListener('message', e => {
      this.setState(JSON.parse(e.data))
    })
  }
  render() {
    return <Row>
      <Col xs={12}>
        <pre style={{"overflow-x": "auto", "white-space": "pre-wrap"}}>{JSON.stringify(this.state)}</pre>
      </Col>
      <Col xs={12}>
        <Link to={"/contest/" + this.props.contestId + "/index"}>Index</Link>
        <Link to={"/contest/" + this.props.contestId + "/ranklist"}>Ranklist</Link>
      </Col>
    </Row>
  }
}
