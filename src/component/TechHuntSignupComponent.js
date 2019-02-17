import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import '../css/app.css'
import '../css/util.css'

class TechHuntSignupComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userPwd: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userId: this.state.email,
      userPwd: this.state.userPwd
    }
     const url = `/proxy?url=http://tech-hunt-api:8080/techhunt/user/createUser`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       console.log(response)
       if (response.data.status === "success") {
        hashHistory.push('/welcome');
      } else {
        hashHistory.push('/error');
      }
     })
    }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
        <div
          className="limiter"
          >
  		    <div
            className="container-login100"
            >
  			     <div
               className="wrap-login100 signup"
               >
  				       <form
                   className="login100-form validate-form p-l-55 p-r-55 p-t-110"
                   onSubmit={this.handleSubmit}
                   >
  			          <span
                    className="login100-form-title"
                    >
  				              Sign Up
  			          </span>
      					<div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Please enter first name"
                  >
      						<input
                    className="input100"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>
      					<div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate = "Please enter last name">
      						<input
                    className="input100"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate = "Please enter valid email">
      						<input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate = "Please enter password">
      						<input
                    className="input100"
                    type="password"
                    name="userPwd"
                    placeholder="Password"
                    value={this.state.userPwd}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>

      					<div
                  className="container-login100-form-btn m-b-30 m-t-30"
                  >
      						<button
                    className="login100-form-btn"
                  >
      							Register
      						</button>
      					</div>
  				   </form>
  			</div>
  		</div>
  	</div>
    )
  }
}

export default TechHuntSignupComponent
