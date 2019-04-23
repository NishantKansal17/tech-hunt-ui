import React, {Component} from "react"
import {Container} from "react-bootstrap"
import MenuComponent from './MenuComponent';
import Header from './Header'
import Footer from './Footer'

class TechHuntWelcomeComponent extends React.Component {
  constructor(props){
    super(props);
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
