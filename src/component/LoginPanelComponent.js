import React, {Component} from "react"
import axios from "axios"
import {Link, hashHistory} from "react-router"
import cookie from 'react-cookies'
import LoadingSpinner from "./LoadingSpinner.js"
import utils from "./utils.js"
import jQuery from "jquery"

import '../css/app.css'
import '../css/util.css'

class LoginPanelComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "",
      userPassword: "",
      loading: "none"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit (event) {
    event.preventDefault()
    let userId = this.state.userName
    let userPassword = this.state.userPassword
    localStorage.setItem("userId", userId)
    let cred = btoa(`${userId}:${userPassword}`)
    const url = `/proxy?_t=${cred}&url=http://localhost:8088/techhunt/user/validateUser/`;
    console.log(document.getElementById("cover-spin"))
    jQuery('#cover-spin').show();
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
      jQuery('#cover-spin').hide();
      if (response.data.status === "failure") {
        hashHistory.push('/error');
      } else {
        utils.setHeaders(response.data.sessionObject.sessionId, userId);
        //state is a reserved word in reactjs and can be use
        //to pass data while navigating using hashHistory
        hashHistory.push({pathname: '/welcome', state: {userId: userId, sessionId: response.data.sessionObject.sessionId}});
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
      <div className="col-4">
        <div>
          <div id="cover-spin"></div>
          <div style={{float: 'right', paddingRight: '50px', paddingTop: '20px'}}>
             <div className="wrap-login100">
                 <form
                   className="login100-form validate-form p-l-55 p-r-55 p-t-115"
                   onSubmit={this.handleSubmit}>
                  <span
                    className="login100-form-title">
                        TechKnow
                  </span>
                  <h3 className="txt4">Login to your account</h3>
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Please enter username">
                  <input
                    className="input100"
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.handleChange}>
                  </input>
                  <span className="focus-input100">
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
                  <span className="focus-input100">
                  </span>
                </div>
                <div className="text-right p-t-13 p-b-23">
                  <span className="txt1">
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
     </div>
    )
  }
}
export default LoginPanelComponent
