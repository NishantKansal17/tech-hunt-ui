import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import '../css/app.css'
import '../css/util.css'

class CreateTestPaperComponent extends Component {
  constructor (props) {
    super(props)
    this.state={
      testName: "",
      data: props.location.state.data,
      selectedData: props.location.state.selectedData,
      show: "none"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLater = this.handleLater.bind(this)
    this.handleInvite = this.handleInvite.bind(this)
  }

  handleChange (event) {
    let value = event.target.value;
    this.setState(prevState => {
      prevState['testName'] = value
      return prevState
    })
  }

  handleLater (event) {
    hashHistory.push('/welcome');
  }

  handleInvite (event) {
    hashHistory.push('/emailquestion');
  }

  handleSubmit (event) {
    event.preventDefault()
    let questionIds = []
    this.state.selectedData.map((object, index) => {
      questionIds.push(object['questionId'])
    });
    let data = {
      testPaperId: this.state.testName,
      createrId: localStorage.getItem("userId"),
      questionIds: questionIds
    }
    console.log(data)
    const url = `http://localhost:8088/techhunt/testpaper/create`;
    axios.post(
      url, data, {
        "crossOrigin": true
      }
    ).then(response => {
      console.log(response)
      if (response.data.status === "success") {
        alert(response.data.message)
        this.setState({show: ""})
      } else {
        this.setState({show: "none"})
        hashHistory.push('/error');
      }
    })
  }

  render () {
    return (
      <div className="limiter">
        <div className="container-login100">
           <div className="wrap-login100 signup">
             <form
               className="login100-form validate-form p-l-55 p-r-55 p-t-110"
               onSubmit={this.handleSubmit}>
                  <span className="login100-form-title">Test Name</span>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="testName"
                    placeholder="Enter test name"
                    onChange={this.handleChange}
                    value={this.state.testName}>
                  </input>
                  <span className="focus-input100">
                  </span>
                </div>
                <div className="container-login100-form-btn m-b-30 m-t-30">
                  <button className="login100-form-btn">Create Test</button>
                </div>
                <div style={{display: this.state.show}}>
                  <div className="col1">
                    <button className="login100-form-btn" onClick={this.handleInvite}>Invite</button>
                  </div>
                  <br />
                  <div className="col2">
                    <button className="login100-form-btn" onClick={this.handleLater}>Later</button>
                  </div>
                </div>
              </form>
          </div>
      </div>
    </div>
    )
  }
}
export default CreateTestPaperComponent
