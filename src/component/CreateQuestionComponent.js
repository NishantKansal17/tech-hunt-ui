import React,{Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"
import {Card, Button, Form} from "react-bootstrap"


import '../css/app.css'
import '../css/util.css'
import utils from "./utils.js"

class CreateQuestionComponent extends Component {
  constructor() {
    super()
    this.state = {
      questionLanguage: "",
      questionType: "",
      questionOptions: "",
      questionSolution: "",
      questionDescription: "",
      questionDefault: false,
      multiQuestion: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target;
    console.log(name + ":" + value)
    this.setState(prevState => {
      //console.log(prevState)
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
      //console.log(prevState)
      return prevState
    }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {
      questionLanguage: this.state.questionLanguage,
      questionType: this.state.questionType,
      questionOptions: this.state.questionOptions,
      questionSolution: this.state.questionSolution,
      questionDescription: this.state.questionDescription,
      multiQuestion: this.state.multiQuestion
    }
    console.log(this.state)
    let cred = utils.getHeaders().authorization;
     const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/question/create`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       console.log(response)
       if (response.data.status === "success") {
         window.alert("Question created successfully!")
         this.setState(prevState => {
           prevState['questionLanguage'] = ""
           prevState['questionType'] = ""
           prevState['questionOptions'] = ""
           prevState['questionSolution'] = ""
           prevState['questionDescription'] = ""
           prevState['multiQuestion'] = false
           return prevState
         });
        //hashHistory.push('/welcome');
      } else {
        hashHistory.push('/error');
      }
     })
  }

  render() {
    return (
      <Card style={{width: "450%"}}>
        <Card.Header as="h5">Create Question</Card.Header>
        <Card.Body>
          <Card.Title>Question Details</Card.Title>
            <Form style={{width: "100%"}}>
              <Form.Group controlId="languageGroup">
                <Form.Label>Select your language</Form.Label>
                  <Form.Control as="select"
                    name="questionLanguage"
                    value={this.state.questionLanguage}
                    onChange={this.handleChange}>
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
                    value={this.state.questionType}
                    onChange={this.handleChange}>
                    <option value="0">--Select--</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="descriptionGroup">
                <Form.Label>Question description</Form.Label>
                  <Form.Control as="textarea"
                    name="questionDescription"
                    value={this.state.questionDescription}
                    onChange={this.handleChange}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="optionsGroup">
                <Form.Label>Question Options (Comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="questionOptions"
                    onChange={this.handleChange}
                    value={this.state.questionOptions}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="solutionGroup">
                <Form.Label>Question Solution (Comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="questionSolution"
                    onChange={this.handleChange}
                    value={this.state.questionSolution}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="multiChoiceGroup">
                <Form.Label>Is Multiple Choice Question</Form.Label>
                  <Form.Check
                    type="radio"
                    label="True"
                    name="multiQuestion"
                    onChange={this.handleChange}
                    value="multi-choice-1"
                  />
                <Form.Check
                  type="radio"
                  label="False"
                  name="multiQuestion"
                  onChange={this.handleChange}
                  value="multi-choice-2"
                  checked
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={this.handleSubmit}>
                Create
              </Button>
            </Form>
        </Card.Body>
      </Card>
    )
  }
}
export default CreateQuestionComponent
