import React, { Component } from 'react'
import { request } from '../util'
import { Grid, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { AlertError, wrapAlert } from '../components/alert'

class Contests extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    request('/api/contests', 'GET', null)
    .then(resp => this.setState({loading: false, data: resp}))
    .catch(err => { this.props.alert({class: AlertError, message: err.toString()}) })
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}><span className="h1">比赛</span><LinkContainer to="/contest-new"><Button bsStyle="primary">创建新比赛</Button></LinkContainer></Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.state.loading && "加载中..."}
            {this.state.data && 
              <Table striped>
                <thead>
                  <tr>
                    <th>标题</th>
                    <th>进行中</th>
                    <th>预定开始时间</th>
                    <th>时长</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.contests.map(contest => 
                    <tr>
                      <td><Link to={'/contest/' + contest.id + '/index'}>{contest.title}</Link></td>
                      <td>{contest.running ? "是" : "否"}</td>
                      <td>{contest.start_time}</td>
                      <td>TODO</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default wrapAlert(Contests)
