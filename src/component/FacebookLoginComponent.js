import React, {Component} from "react"
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import {hashHistory} from "react-router"

class FacebookLoginComponent extends Component {
  render () {
    const responseFacebook = (response) => {
      if (response.accessToken === undefined) {
        alert("Invalid login attempt!")
      } else {
        hashHistory.push({pathname: '/welcome', state: {userId: response.email}});
      }
    }
    const successResponse = (response) => {
      hashHistory.push({pathname: '/welcome', state: {userId: response.email}});
    }
    const failureResponse = (response) => {
      alert("Invalid login attempt!")
      return
    }
    return (
      <div>
        <FacebookLogin
          appId="287022562197733"
          fields="name,email,picture"
          cssClass="btn-facebook"
          callback={responseFacebook}/>
          <GoogleLogin
          clientId="864053902439-o3s8qsvoluluhq4nntmoiudpvu66occ5.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={successResponse}
          onFailure={failureResponse}/>
      </div>
    )
  }
}
export default FacebookLoginComponent
