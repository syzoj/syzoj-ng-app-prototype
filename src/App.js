import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import AppNav from "./components/nav"
import Index from "./pages/index"
import Register from "./pages/register"
import Login from "./pages/login"
import ProblemDbNew from "./pages/problem_db_new"
import ProblemDbView from "./pages/problem_db_view"
import ProblemDbMy from "./pages/problem_db_my"
import SubmissionMy from "./pages/submission_my"
import SubmissionView from "./pages/submission_view"

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
        </div>
      </BrowserRouter>
    );
  }
}
