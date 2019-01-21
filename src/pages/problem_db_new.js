import React, { Component } from 'react'
import { Grid, Row, Col, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'
import { request }from '../util'
import { wrapAlert, AlertError } from '../components/alert'

class ProblemDbNew extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { 'title': '' }
  }

  submit() {
    this.setState({error: null})
    request('/api/problem-db/new', 'POST', {
      title: this.state.title
    }).then(r => {
      this.props.history.push('/problem-db/view/' + r.problem_id)
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }

  render() {
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
export default wrapAlert(ProblemDbNew)
