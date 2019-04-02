import React, {Component} from "react"
import {Container} from "react-bootstrap"
import MenuComponent from './MenuComponent';
import Header from './Header'
import Footer from './Footer'

class TechHuntWelcomeComponent extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.location.state)
  }
  render () {
    return (
      <div>
      <Header state={this.props.location.state}/>
        <Container className="m-b-0 tc-container">
            <div className="tcMenu">
              <MenuComponent />
            </div>
        </Container>
      <Footer />
    </div>
    );
  }
}
export default TechHuntWelcomeComponent
