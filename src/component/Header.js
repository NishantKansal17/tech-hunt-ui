import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import {hashHistory} from "react-router"

class Header extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props)
    if (this.props === undefined || this.props.state === undefined) {
      alert("You are not logged in. First login and try again!")
      hashHistory.push('/');
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    var option = window.confirm("Are you sure you want to logout?")
    if (option) {
      hashHistory.push('/');
    }
  }

  render () {
    return (
        <div className="tHeader">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <span><h3>TechKnow Online Exam</h3></span>
              </div>
              <ul className="nav navbar-nav navbar-left">
                <li><a style={{color: 'white'}}><span><i className="fa fa-user"></i></span> {this.props.state.userId}</a></li>
                <li><a href="javascript:void(0);" onClick={this.handleLogout} style={{color: 'white'}}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }
}
export default Header
