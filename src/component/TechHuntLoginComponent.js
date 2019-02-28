import React, {Component} from "react"
import axios from "axios"
import {Link, hashHistory} from "react-router"

import '../css/app.css'
import '../css/util.css'

class TechHuntLoginComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "",
      userPassword: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let userId = this.state.userName
    let userPassword = this.state.userPassword
    localStorage.setItem("userId", userId)
    const url = `http://tech-hunt-api:8080/techhunt/user/validateUser/${userId}/${userPassword}`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
      console.log(response)
      if (response.data.status === "failure") {
        hashHistory.push('/error');
      } else {
        hashHistory.push('/welcome');
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
               className="wrap-login100"
               >
  				       <form
                   className="login100-form validate-form p-l-55 p-r-55 p-t-115"
                   onSubmit={this.handleSubmit}
                   >
  			          <span
                    className="login100-form-title"
                    >
  				              Tech Hunt
  			          </span>
                  <h3 className="txt4">Login to your account</h3>
      					<div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Please enter username"
                  >
      						<input
                    className="input100"
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>
      					<div
                  className="wrap-input100 validate-input"
                  data-validate = "Please enter password">
      						<input
                    className="input100"
                    type="password"
                    name="userPassword"
                    placeholder="Password"
                    value={this.state.userPassword}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>
      					<div
                  className="text-right p-t-13 p-b-23"
                  >
      						<span
                    className="txt1"
                    >
      							Forgot &nbsp;
      						</span>
                  <Link to="/forgotpassword" className="txt2 link">Username / Password?</Link>
      					</div>
      					<div className="container-login100-form-btn">
      						<button className="login100-form-btn">Login</button>
      					</div>
                <br />
      					<div className="text-center p-t-10 p-b-20">
      						<span className="txt1 p-b-9">Don’t have an account?</span>
                  <br/>
                  <Link to="/signup" className="txt2 link">Sign up now</Link>
      					</div>
  				   </form>
  			</div>
  		</div>
  	</div>
    )
  }
}

export default TechHuntLoginComponent
