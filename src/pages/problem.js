import React, { Component } from 'react'
import { request } from '../util'
import { Grid, Row, Col } from 'react-bootstrap'
import { wrapAlert, AlertError } from '../components/alert'

class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    request('/api/problem/' + this.props.match.params.name, 'GET', null)
    .then(resp => {
      this.setState({data: resp})
    })
    .catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return <Grid>
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

export default wrapAlert(Problem)
