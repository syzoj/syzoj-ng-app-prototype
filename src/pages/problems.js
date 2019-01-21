import React, { Component } from 'react'
import { request } from '../util'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Table, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import { wrapAlert, AlertError } from '../components/alert'

class Problems extends Component {
  constructor(props, context) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    request('/api/problems', 'GET', null)
    .then(resp => {
      this.setState({problems: resp})
    }).catch(err => this.props.alert({class: AlertError, message: err.toString()}))
  }
  render() {
    return <Grid>
      <Row key="banner">
        <Col xs="12">
          <FormGroup>
            <InputGroup>
              <FormControl type="text" placeholder="ID / 题目名" style={{width: "100%"}} />
              <InputGroup.Button>
                <Button bsStyle="primary">搜索</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      {this.state.problems ?
        <Row key="problems"><Col xs="12">
          <Table striped bordered>
            <thead>
              <tr>
                <th>编号</th>
                <th>题目名称</th>
                <th>通过</th>
                <th>提交</th>
                <th>通过率</th>
              </tr>
            </thead>
            <tbody>
              {this.state.problems.map(problem =>
                <tr>
                  <td>{problem.name}</td>
                  <td><Link to={'/problem/' + problem.name}>{problem.title}</Link></td>
                  <td>TODO</td>
                  <td>{problem.submit_num || "-"}</td>
                  <td>TODO</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col></Row>
      : <div>Loading</div>}
    </Grid>
  }
}
export default wrapAlert(Problems)
