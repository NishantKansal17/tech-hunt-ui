import React from "react"
import axios from "axios"

class ForgotUserNamePasswordComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      updateUserName: "",
      updateUserPassword: "",
      confirmUserPassword: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    //event.preventDefault
    const {name, value} = event.target
    this.setState(
      {
        [name]: value
      }
    )
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state.updateUserPassword)
    console.log(this.state.confirmUserPassword)
    if (this.state.updateUserPassword !== this.state.confirmUserPassword) {
      window.alert("User password and Confirm user password doesn't match!");
      return;
    }
    const url = `/proxy?url=http://localhost:8088/techhunt/user/updateUserCred`;
    let data = {
      userId: this.state.updateUserName,
      userPwd: this.state.updateUserPassword
    }
    axios.put(
      url, data, {
        "crossOrigin": true
      }
    ).then(response => {
      console.log(response)
      if (response.data.status === "success") {
        window.alert("Password updated successfully!")
        this.setState({
          updateUserName: "",
          updateUserPassword: "",
          confirmUserPassword: ""
        })
      } else {
        window.alert(response.data.message)
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
            <span className="login100-form-title">
              Change Password
            </span>
            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Please enter user id">
              <input
                type="text"
                name="updateUserName"
                className="input100"
                placeholder="User Id"
                onChange={this.handleChange}>
              </input>
              <span className="focus-input100"></span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Please enter user password">
              <input
                type="password"
                name="updateUserPassword"
                className="input100"
                placeholder="User Password"
                onChange={this.handleChange}>
              </input>
            </div>
            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Please re-enter user password">
              <input
                type="password"
                name="confirmUserPassword"
                className="input100"
                placeholder="Re-enter user password"
                onChange={this.handleChange}>
              </input>
            </div>
            <div className="container-login100-form-btn m-b-30 m-t-30">
              <button
              className="login100-form-btn">Update</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  }
}
export default ForgotUserNamePasswordComponent
