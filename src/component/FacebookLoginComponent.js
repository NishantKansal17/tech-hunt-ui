import React, {Component} from "react"
import FacebookLogin from 'react-facebook-login'
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
    return (
      <div>
        <FacebookLogin
          appId="287022562197733"
          fields="name,email,picture"
          cssClass="facebook_button"
          callback={responseFacebook}/>
      </div>
    )
  }
}
export default FacebookLoginComponent
