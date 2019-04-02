import React, {Component} from "react"
import GoogleLogin from 'react-google-login';
import {hashHistory} from "react-router"

class GoogleLoginComponent extends Component {
  render () {
    const successResponse = (response) => {
      hashHistory.push({pathname: '/welcome', state: {userId: response.profileObj.email}});
    }
    const failureResponse = (response) => {
      alert("Invalid login attempt!")
    }
    return (
      <div>
        <GoogleLogin
          clientId="864053902439-o3s8qsvoluluhq4nntmoiudpvu66occ5.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={successResponse}
          onFailure={failureResponse}/>
      </div>
    )
  }
}
export default GoogleLoginComponent
