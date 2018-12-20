import React, { Component } from 'react'
import { Grid, Row, Col, Alert, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { request }from '../util'

export default class ProblemDbNew extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { 'title': '', 'description': '' }
  }

  submit() {
    this.setState({error: null})
    request('/api/problem/create', 'POST', {
      title: this.state.title
    }).then(r => {
      this.setState({redirect: '/problem-db/view/' + r.problem_id})
    }).catch(e => this.setState({error: e.toString()}))
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let errorComponent = null
    if(this.state.error) {
      errorComponent = <Alert bsStyle="danger">{this.state.error}</Alert>
    }
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1 className="text-center">创建新题目</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <form onSubmit={(e) => { e.preventDefault(); this.submit() }}>
              {errorComponent}
              <FormGroup controlId="title">
                <ControlLabel>标题</ControlLabel>
                <FormControl type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})} placeHolder="标题" />
              </FormGroup>
              <Button bsStyle="primary" onClick={() => this.submit()}>创建</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}
