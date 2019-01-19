import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import AppNav from "./components/nav"
import Index from "./components/index"
import Register from "./components/register"
import Login from "./components/login"
import ProblemDbNew from "./components/problem_db_new"
import ProblemDbView from "./components/problem_db_view"
import ProblemDbMy from "./components/problem_db_my"
import SubmissionMy from "./components/submission_my"
import SubmissionView from "./components/submission_view"
import Problems from "./components/problems"
import Problem from "./components/problem"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <Route path="/" exact component={Index} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/problem-db/new" exact component={ProblemDbNew} />
          <Route path="/problem-db/my" exact component={ProblemDbMy} />
          <Route path="/problem-db/view/:problem_id" component={ProblemDbView} />
          <Route path="/submission/my" exact component={SubmissionMy} />
          <Route path="/submission/view/:submission_id" exact component={SubmissionView} />
          <Route path="/problems" exact component={Problems} />
          <Route path="/problem/:name" exact component={Problem} />
        </div>
      </BrowserRouter>
    );
  }
}
