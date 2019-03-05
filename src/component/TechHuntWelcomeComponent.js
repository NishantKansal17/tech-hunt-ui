import React, {Component} from "react"
import {Container} from "react-bootstrap"
import MenuComponent from './MenuComponent';
import Header from './Header'
import Footer from './Footer'

class TechHuntWelcomeComponent extends React.Component {
  render () {
    return (
      <div>
      <Header />
        <Container className="m-b-0">
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
