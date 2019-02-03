import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import { AlertGroup, AlertContext } from './components/alert'
import AppNav from "./components/nav"
import Index from "./pages/index"
import Register from "./pages/register"
import Login from "./pages/login"
import ProblemDbNew from "./pages/problem_db_new"
import ProblemDbView from "./pages/problem_db_view"
import ProblemDb from "./pages/problem_db"
import Submissions from './pages/submissions'
import SubmissionView from "./pages/submission_view"
import Contests from './pages/contests'
import ContestNew from './pages/contest_new'
import Contest from './pages/contest'

import { request } from "./util"
window['request'] = request

export default class App extends Component {
  alert(msg) {
    if(this.refAlert)
      return this.refAlert.alert(msg)
    return alert(msg.message)
  }
  render() {
    return (
      <BrowserRouter>
        <AlertContext.Provider value={(msg) => this.alert(msg)}>
          <AlertGroup ref={(ref) => this.refAlert = ref} />
          <AppNav />
          <Route path="/" exact component={Index} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/problem-db/new" exact component={ProblemDbNew} />
          <Route path="/problem-db" exact component={ProblemDb} />
          <Route path="/problem-db/view/:problem_id" component={ProblemDbView} />
          <Route path="/contests" exact component={Contests} />
          <Route path="/contest/new" exact component={ContestNew} />
          <Route path="/contest/:contest_id" component={Contest} />
          <Route path="/submissions" exact component={Submissions} />
          <Route path="/submission/view/:submission_id" exact component={SubmissionView} />
        </AlertContext.Provider>
      </BrowserRouter>
    );
  }
}
