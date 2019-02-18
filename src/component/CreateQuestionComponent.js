import React,{Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import '../css/app.css'
import '../css/util.css'

class CreateQuestionComponent extends Component {
  constructor() {
    super()
    this.state = {
      questionLanguage: "",
      questionType: "",
      questionOptions: "",
      questionSolution: "",
      questionDescription: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState(prevState => {
      //console.log(prevState)
      if (name === "questionOptions") {
        let questionOptions = value.split(",")
        prevState[name] = questionOptions
      } else {
        prevState[name] = value
      }
      //console.log(prevState)
      return prevState
    }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {
      questionLanguage: this.state.questionLanguage,
      questionType: this.state.questionType,
      questionOptions: this.state.questionOptions,
      questionSolution: this.state.questionSolution,
      questionDescription: this.state.questionDescription
    }
     const url = `/proxy?url=http://tech-hunt-api:8080/techhunt/question/create`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       console.log(response)
       if (response.data.status === "success") {
         window.alert("Question create successfully!")
        hashHistory.push('/welcome');
      } else {
        hashHistory.push('/error');
      }
     })
  }

  render() {
    return (
        <div className="limiter">
          <div className="container-login100">
             <div className="wrap-login100 signup">
             <form
               className="login100-form validate-form p-l-55 p-r-55 p-t-110"
               onSubmit={this.handleSubmit}>
                  <span className="login100-form-title">Create Question</span>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <label>
                    Select your language:
                    <select
                    name="questionLanguage"
                    value={this.state.questionLanguage}
                    onChange={this.handleChange}>
                      <option value="0">--Select--</option>
                      <option value="Java">Java</option>
                      <option value="Python">Python</option>
                      <option value="Java Script">Java Script</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <span className="focus-input100">
                  </span>
                </div>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <label>
                    Select question type:
                    <select
                    name="questionType"
                    value={this.state.questionType}
                    onChange={this.handleChange}>
                      <option value="0">--Select--</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </label>
                  <span className="focus-input100">
                  </span>
                </div>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="questionDescription"
                    placeholder="Question description"
                    onChange={this.handleChange}
                    value={this.state.questionDescription}>
                  </input>
                  <span className="focus-input100">
                  </span>
                </div>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="questionOptions"
                    placeholder="Enter comma separated text"
                    onChange={this.handleChange}
                    value={this.state.questionOptions}>
                  </input>
                  <span className="focus-input100">
                  </span>
                </div>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="questionSolution"
                    placeholder="Question solution"
                    onChange={this.handleChange}
                    value={this.state.questionSolution}>
                  </input>
                  <span className="focus-input100">
                  </span>
                </div>
                <div className="container-login100-form-btn m-b-30 m-t-30">
                  <button className="login100-form-btn">
                    Create
                  </button>
                </div>
              </form>
        </div>
      </div>
    </div>
    )
  }
}
export default CreateQuestionComponent
