import React, {Component} from "react"
import {Router, Route, hashHistory} from "react-router"

import TechHuntLoginComponent from "../component/TechHuntLoginComponent"
import TechHuntWelcomeComponent from "../component/TechHuntWelcomeComponent"
import ErrorComponent from "../component/ErrorComponent"
import ForgotUserNamePasswordComponent from "../component/ForgotUserNamePasswordComponent"
import TechHuntSignupComponent from "../component/TechHuntSignupComponent"
import PreloadedQuestionsComponent from "../component/PreloadedQuestionsComponent"
import CreateQuestionComponent from "../component/CreateQuestionComponent"
import TechHuntEmailComponent from "../component/TechHuntEmailComponent"

class AppRouter extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={TechHuntLoginComponent}></Route>
        <Route path="/welcome" component={TechHuntWelcomeComponent}></Route>
        <Route path="/error" component={ErrorComponent}></Route>
        <Route path="/forgotpassword" component={ForgotUserNamePasswordComponent}></Route>
        <Route path="/signup" component={TechHuntSignupComponent}></Route>
        <Route path="/preloadedquestions" component={PreloadedQuestionsComponent}></Route>
        <Route path="/createquestion" component={CreateQuestionComponent}></Route>
        <Route path="/emailquestion" component={TechHuntEmailComponent}></Route>
      </Router>
    )
  }
}

export default AppRouter
