import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import '../css/app.css'
import '../css/util.css'
import utils from "./utils.js"

class TokenValidationComponent extends Component {
  constructor (props) {
    super(props)
    console.log(props.location.state)
    this.state = {
      token: "",
      data: props.location.state
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let value = event.target.value
    console.log(value)
    this.setState (prevState => {
      prevState['token'] = value
      prevState['data'] = this.state.data
      console.log(prevState)
      return prevState
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    let data = this.state.data
    console.log(data)
    let cred = utils.getHeaders().authorization;
    const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/user/validateToken/${this.state.token}`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
       if (response.data.status === "success") {
         const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/user/createUser`;
          axios.post(
            url, data, {
              "crossOrigin": true
            }
          ).then(response => {
            console.log(response)
            if (response.data.status === "success") {
              window.alert("User had been created!")
              hashHistory.push('/');
           } else {
              hashHistory.push('/error');
           }
          })
       } else {
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
                <span className="login100-form-title">Validate Token</span>
              <div
                className="wrap-input100 validate-input m-b-16">
                <input
                  className="input100"
                  type="text"
                  name="token"
                  placeholder="Enter valid token"
                  onChange={this.handleChange}
                  value={this.state.token}>
                </input>
                <span className="focus-input100">
                </span>
              </div>
              <div className="container-login100-form-btn m-b-30 m-t-30">
                <button className="login100-form-btn">Validate</button>
              </div>
            </form>
      </div>
    </div>
  </div>
    )
  }
}
export default TokenValidationComponent
