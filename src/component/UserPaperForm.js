import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"
import {Card, Button, Form} from "react-bootstrap"
//import Question from "./question"

import '../css/app.css'
import '../css/util.css'

class UserPaperForm extends Component {
  constructor() {
    super()
    this.state = {
       questions: [],
       answers: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
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
       if (question != null) {
         return {
           ...question
         }
       }
     });
     this.setState({questions: updatedQuestions});
     console.log("updatedQuestions: ", updatedQuestions);
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {
      submitterId: localStorage.getItem("userId"),
      testPaperId: "tim_test",
      questionEntry: this.state.answers
    }
    console.log("data submitted is: ", data);
     const url = `http://localhost:8088/techhunt/testpaper/evaluation/evaluate`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       console.log(response)
       if (response.data.status === "success") {
         window.alert("Exam submitted successfully!")
         this.setState({
           answers: []
         });
        //hashHistory.push('/welcome');
      } else {
        hashHistory.push('/error');
      }
     })
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
       <Card body style={{width: "80%", marginLeft: "1%", marginBottom:"1%"}}>
         <input
         type={type}
         name={id}
         value={choice}
         onChange={this.onInput}
      />
       <label>{choice}</label>
       </Card>
     </div>
    )
 })
}
onInput(e) {
  console.log("OnInput() > e.target: ", e.target);
  const id = e.target.name;
  const type = e.target.type;
  const answer = { id, questionSolution: "", answersubmitted: e.target.value };
  let answers;
  // if (type == "checkbox") {
  //   if (this.state.answers.filter(answer => answer.id === id)) {
  //     answers = [...this.state.answers.filter(answer => answer.id === id), answer]
  //     console.log("filter result> ",this.state.answers.filter(answer => answer.id === id));
  //     if (this.state.answers.indexOf(answer.id) >= 0) {
  //       //answers = [...this.state.answers.indexOf(answer.id === id)].concat(answer);
  //       console.log("after concat ansz is: ", answer);
  //     }
  //     console.log("chkbox answer is: ", answer);
  //   }
  // } else {
      let index = this.state.questions.findIndex(el => el.questionId === id);
      console.log("index found is: ", index);
      answer.questionSolution = this.state.questions[index].questionSolution;

      if (this.state.answers.some(answer => answer.id === id)) {
        console.log("loop1");
        answers = [...this.state.answers.filter(answer => answer.id !== id), answer];
        console.log("...this.state.answers is: ", [...this.state.answers]);
      } else {
        console.log("loop2");
        answers = [...this.state.answers, answer];
      }

      //answers[index] = {...answers[index], questionSolution: this.state.questions[index].questionSolution};
      //this.setState({ markers });
    //}
    this.setState({ answers }, () => console.log("answers are: ", this.state.answers));
  }
  render() {
    var iterator = this.state.questions.map((question, i) => {
      if (question != null) {
          var type = "";
          if (question.multiQuestion) {
            type = "checkbox"
          } else {
            type = "radio"
          }
          return (
            <div key={question.questionId}>
              <h4>Question: {question.questionDescription}</h4>
              <h4>Options: </h4>{this.buildRadioButtons(question.questionOptions, type, question.questionId)}
            </div>
          );
        }
        });
        return (
          <Card style={{width: "100rem", marginLeft: "12%"}}>
            <Card.Header as="h5">Tech Know Exam</Card.Header>
            <Card.Body>
                <Form style={{width: "100%"}}>
                    <div className="h4">
                      {iterator}
                    </div>
                    <Button variant="primary" type="button" size="lg" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                </Form>
            </Card.Body>
          </Card>
    );
  }
}
export default UserPaperForm
