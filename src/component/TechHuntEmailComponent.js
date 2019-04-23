import React,{Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import '../css/app.css'
import '../css/util.css'
import utils from "./utils.js"

class TechHuntEmailComponent extends Component {
  constructor() {
    super()
    this.state = {
      emailTo: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let value = event.target.value
    let tos = value.split(",")
    this.setState({
      emailTo: tos
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {
      emailTo: this.state.emailTo
    }
    let cred = utils.getHeaders().authorization;
     const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/email/send`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       console.log(response)
       if (response.data.status === "success") {
         window.alert("Email sent successfully!")
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
                  <span className="login100-form-title">Send Email</span>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="questionDescription"
                    placeholder="Enter comma separated emails"
                    onChange={this.handleChange}
                    value={this.state.emailTo}>
                  </input>
                  <span className="focus-input100">
                  </span>
                </div>
                <div className="container-login100-form-btn m-b-30 m-t-30">
                  <button className="login100-form-btn">Send</button>
                </div>
              </form>
        </div>
      </div>
    </div>
    )
  }
}
export default TechHuntEmailComponent
