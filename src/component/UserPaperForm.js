import React, {Component} from "react"
import axios from "axios"
// import {Link, hashHistory} from "react-router"
import {Card, Form} from "react-bootstrap"
//import Question from "./question"

import '../css/app.css'
import '../css/util.css'

class UserPaperForm extends Component {
  constructor() {
    super()
    this.state = {
       questions: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildRadioButtons = this.buildRadioButtons.bind(this);
  }
  componentDidMount() {
    const url = `http://tech-hunt-api:8080/techhunt/testpaper/findPaperById/${localStorage.getItem("userId")}/tim_test?showQuestion=true`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
     const questions = response.data.questions;
     console.log("const questions is: ", questions);
     const updatedQuestions = questions.map(question => {
       return {
         ...question
       }
     });
     this.setState({questions: updatedQuestions});
     console.log("updatedQuestions: ", updatedQuestions);
    })
  }

  handleSubmit (event) {

    }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  }
  buildRadioButtons(arr, type, id) {
   return arr.map((choice, i) => {
     return (
       <div key={i}>
         <input
         type={type}
         name={id}
         value={choice}
         onChange={this.onInput}
      />
       <label>{choice}</label>
     </div>
    )
 })
}
  render() {
    var iterator = this.state.questions.map((question, i) => {
          var type = "";
          if (question.multiQuestion) {
            type = "checkbox"
          } else {
            type = "radio"
          }
          return (
            <div key={question.questionId}>
              <h4>{question.questionDescription}</h4>
              {this.buildRadioButtons(question.questionOptions, type, question.questionId)}
            </div>
          );
        });
        return (
          <Card style={{width: "100rem", "margin-left": "12%"}}>
            <Card.Header as="h5">Tech Know Exam</Card.Header>
            <Card.Body>
              <Card.Title>Questions</Card.Title>
                <Form style={{width: "100%"}}>
                    <div className="h4">
                      {iterator}
                    </div>
                </Form>
            </Card.Body>
          </Card>
    );
  }
}
export default UserPaperForm
