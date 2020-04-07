import React, {Component} from "react"
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios"

import utils from "./utils.js"

class LinkComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      data: {}
    }
    this.handleHyperLink = this.handleHyperLink.bind(this)
    this.handleModalValueChange = this.handleModalValueChange.bind(this)
    this.close = this.close.bind(this)
  }

  handleHyperLink (text) {
    console.log(this.props.links)
    let cred = utils.getHeaders(this.props.links.userId).authorization;
    const url = `/proxy?_t=${cred}&url=http://localhost:8088/techhunt/question/${text}`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
     let data = response.data;
     this.setState(prevState => {
       prevState['data'] = data
       prevState['show'] = true
       return prevState
     })
    })
  }

  handleModalValueChange (event) {
    let {name, value} = event.target;
    this.setState(prevState => {
      if (name === "questionOptions") {
        let questionOptions = value.split(",")
        prevState[name] = questionOptions
      } else {
        if (name === "multiQuestion") {
          if (value === "multi-choice-1") {
            prevState[name] = true
          } else {
            prevState[name] = false
          }
        } else {
            prevState[name] = value
        }
      }
      return prevState
    }
    )
  }

  close () {
    this.setState(prevState => {
      prevState['show'] = false
      return prevState
    })
  }

  render () {
    return (
      <div>
        <div>
          {this.props.links.data.questionIds.sort().map((item, index) => (
            <div>
              <a id={item+"-"+index}
                style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
                onClick={() => this.handleHyperLink(item)}>{item}</a>
              <br></br>
            </div>
          ))}
        </div>
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Question Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{width: "100%"}}>
              <Form.Group controlId="languageGroup">
                <Form.Label>Select your language</Form.Label>
                  <Form.Control as="select"
                    name="questionLanguage"
                    value={this.state.data.questionLanguage}>
                    <option value="0">--Select--</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="Java Script">Java Script</option>
                    <option value="Other">Other</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="questionTypeGroup">
                <Form.Label>Select question type</Form.Label>
                  <Form.Control as="select"
                    name="questionType"
                    value={this.state.data.questionType}>
                    <option value="0">--Select--</option>
                      <option value="1">Easy</option>
                      <option value="2">Medium</option>
                      <option value="3">Hard</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="descriptionGroup">
                <Form.Label>Question description</Form.Label>
                  <Form.Control as="textarea"
                    name="questionDescription"
                    value={this.state.data.questionDescription}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="optionsGroup">
                <Form.Label>Question Options (Comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="questionOptions"
                    value={this.state.data.questionOptions}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="solutionGroup">
                <Form.Label>Question Solution (Comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="questionSolution"
                    value={this.state.data.answerDescription}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="multiChoiceGroup">
                <Form.Label>Is Multiple Choice Question</Form.Label>
                  <Form.Check
                    type="radio"
                    label="True"
                    name="multiQuestion"
                    checked={this.state.data.multiQuestion}
                  />
                <Form.Check
                  type="radio"
                  label="False"
                  name="multiQuestion"
                  checked={this.state.data.multiQuestion == false}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.close}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default LinkComponent
