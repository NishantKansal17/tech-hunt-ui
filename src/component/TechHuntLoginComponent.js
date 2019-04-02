import React, {Component} from "react"

import FacebookLoginComponent from "./FacebookLoginComponent"
import GoogleLoginComponent from "./GoogleLoginComponent"
import LoginImageComponent from "./LoginImageComponent"
import LoginPanelComponent from "./LoginPanelComponent"

class TechHuntLoginComponent extends Component {
  render () {
    return (
    <div>
      <div className="row">
        <LoginImageComponent />
        <LoginPanelComponent />
      </div>
      <div className="row">
        <div className="col-md-6 text-right">
          <FacebookLoginComponent />
        </div>
        <div className="col-md-6 text-left">
          <GoogleLoginComponent />
        </div>
      </div>
    </div>
    )
  }
}
export default TechHuntLoginComponent
