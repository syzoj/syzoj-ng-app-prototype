import React, { Component } from 'react'
import { request } from '../util'
import { Grid, Row, Col, Alert } from 'react-bootstrap'

export default class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    request('/api/problem/' + this.props.match.params.name, 'GET', null)
    .then(resp => {
      this.setState({data: resp})
    })
    .catch(err => this.setState({err: err.toString()}))
  }
  dismissError() {
    this.setState({err: null})
  }
  render() {
    return <Grid>
      {this.state.err &&
        <Row key="err">
          <Col xs="12">
            <Alert bsStyle="danger" onDismiss={() => this.dismissError()}>{this.state.err}</Alert>
          </Col>
        </Row>}
      {this.state.data ? [
        <Row key="title" className="text-center">
          <Col xs="!2">
            <h1>
              <span>#{this.state.data.name}. </span>
              <span>{this.state.data.title}</span>
            </h1>
          </Col>
        </Row>,
        <Row key="content">
          <Col xs="12">
            <pre>{this.state.data.content || "无内容"}</pre>
          </Col>
        </Row>
      ] :
        <Row key="loading">
          <Col xs="12">
            <p>Loading...</p>
          </Col>
        </Row>
      }
    </Grid>
  }
}
