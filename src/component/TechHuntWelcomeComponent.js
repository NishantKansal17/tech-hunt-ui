import React, {Component} from "react"
import {Container} from "react-bootstrap"
import MenuComponent from './MenuComponent';
import {hashHistory} from "react-router";
import axios from "axios"
import Header from './Header'
import Footer from './Footer'
import utils from "./utils.js"

class TechHuntWelcomeComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {
    let sessionId = this.props.location.state.sessionId;
    let userId = this.props.location.state.userId;
    utils.checkSessionTimeout(userId, sessionId).then(result => {
      if (result) {
        alert("Your session has expired. Please login again!");
        hashHistory.push('/');
        return;
      }
    })
  }

  render () {
    return (
      <div>
      <Header state={this.props.location.state}/>
        <Container className="m-b-0">
            <div className="tcMenu">
              <MenuComponent state={this.props.location.state}/>
            </div>
        </Container>
      <Footer />
    </div>
    );
  }
}
export default TechHuntWelcomeComponent
