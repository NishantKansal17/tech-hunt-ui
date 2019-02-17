import React, {Component} from "react"
import {Container, Row, Col} from "react-bootstrap"
import {Link} from "react-router"
//import * as Bootstrap from 'bootstrap';
class TechHuntWelcomeComponent extends React.Component {
  render () {
    return (
      <div>
      <h3 className="tHeader">Tech Hunt</h3>
        <Container className="m-t-40 m-b-160">
          <Row>
            <Col>
              <div className="card-content">
                <Link to="/PreloadedQuestions" className="txt2 ques-link">
                  <div id="key1">
                    Load Test from Question Bank
                  </div>
                </Link>
              </div>
            </Col>
            <Col>
            <div className="card-content">
              <Link to="/" className="txt2 ques-link">
                <div id="key1">
                Create Custom Questions
                </div>
              </Link>
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="card-content">
              <Link to="/" className="txt2 ques-link">
                <div id="key1">
                Email Test
                </div>
              </Link>
            </div>
            </Col>
            <Col>
            <div className="card-content">
              <Link to="/" className="txt2 ques-link">
                <div id="key1">
                FAQ's
                </div>
              </Link>
            </div>
            </Col>
          </Row>
        </Container>
        <div className="tFooter">Copyright � 2019  TechHunt All Rights Reserved</div>
      </div>
    );
  }
}
export default TechHuntWelcomeComponent
