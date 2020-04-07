import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"
import {Card, Button, Form} from "react-bootstrap"
import ExamHeader from "./ExamHeader.js"

import '../css/app.css'
import '../css/util.css'
import utils from "./utils.js"
import jQuery from "jquery"

class UserPaperForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
       questions: [],
       answers: [],
       userId: "",
       token: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.buildRadioButtons = this.buildRadioButtons.bind(this);
  }
  componentDidMount() {
    var href = window.location.href;
    var splittedUrl = href.split("?");
    var queryParams = splittedUrl[1].split("&");
    var testPaperQParam = queryParams[0];
    var userIdQParam = queryParams[1];
    jQuery('#cover-spin').show();
    const tokenUrl = `/proxy?url=http://localhost:8088/techhunt/user/token/create/${userIdQParam.split("=")[1]}`;
    axios.get(
      tokenUrl, {
        "crossOrigin": true
      }
    ).then(response => {
      console.log("token: ", response.data.message);
      this.setState(prevState => {
        prevState["userId"] = userIdQParam.split("=")[1];
        prevState["token"] = response.data.message;
        return prevState
      });
      let cred = response.data.message;
      const url = `/proxy?_t=${cred}&url=http://localhost:8088/techhunt/testpaper/findPaperById/${userIdQParam.split("=")[1]}/${testPaperQParam.split("=")[1]}?showQuestion=true`;
      axios.get(
        url, {
          "crossOrigin": true
        }
      ).then(response => {
       jQuery('#cover-spin').hide();
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
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    var href = window.location.href;
    var splittedUrl = href.split("?");
    var queryParams = splittedUrl[1].split("&");
    var testPaperQParam = queryParams[0];
    var userIdQParam = queryParams[1];

    let testPaperId = testPaperQParam.split("=")[1];
    let cred = this.state.token;
    let submitterId = userIdQParam.split("=")[1];
    let data = {
      submitterId: submitterId,
      testPaperId: testPaperId,
      questionEntry: this.state.answers
    }
    console.log(data.questionEntry)
    jQuery('#cover-spin').show();
     const url = `/proxy?_t=${cred}&url=http://localhost:8088/techhunt/testpaper/evaluation/evaluate`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       jQuery('#cover-spin').hide();
       if (response.data.status === "success") {
         window.alert("Exam submitted successfully! Please check your email for exam result.")
         this.setState({
           answers: []
         });
         window.close();
      } else {
        window.alert(`${response.data.message}. Please try again!`);
        return;
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
  var answerArray = [];
  answerArray.push(e.target.value);
  const answer = { questionId: id, questionSolution: "", answersubmitted: answerArray };
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

      if (this.state.answers.some(answer => answer.questionId === id)) {
        console.log("loop1");
        answers = [...this.state.answers.filter(answer => answer.questionId !== id), answer];
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
            <ExamHeader userId={this.state.userId} />
            <div id="cover-spin"></div>
            <Card.Header as="h5">Tech Know Exam</Card.Header>
            <Card.Body>
                <Form style={{width: "100%"}}>
                    <div className="h4">
                      {iterator}
                    </div>
                    <Button variant="primary" type="button" size="lg" onClick={this.handleSubmit}>
                      Submit Evaluation
                    </Button>
                </Form>
            </Card.Body>
          </Card>
    );
  }
}
export default UserPaperForm
