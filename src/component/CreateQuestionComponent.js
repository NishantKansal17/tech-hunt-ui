import React,{Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"
import {Card, Button, Form, Row, Col, Badge, InputGroup, FormControl} from "react-bootstrap"
import TagsInput from "./TagsInputComponent"
import AutoComplete from "./AutoCompleteComponent"


import '../css/app.css'
import '../css/util.css'
import utils from "./utils.js"

class CreateQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      validated: false,
      isMultiQuestion: false,
      questionOptions: [{value:"", correct: false}],
      questionSolution: [],
      questionDescription: "",
      answerDescription: "",
      questionPoint: "",
      languages: [{value:"Java", choice:"Java"}, {value:"Python", choice:"Python"}, {value:"JavaScript", choice:"JavaScript"}, {value:"Ruby", choice:"Ruby"}],
      languageTyped: "",
      questionLanguage: "",
      type: [{value:0, choice:"Easy"}, {value:1, choice:"Medium"}, {value:2, choice:"Hard"}],
      questionType: "",
      tags: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChoiceAdd = this.handleChoiceAdd.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.addTag = this.addTag.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.deleteChoice = this.deleteChoice.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleValueSelect = this.handleValueSelect.bind(this)
  }

  componentDidMount () {
    let sessionId = this.props.state.sessionId;
    let userId = this.props.state.userId;
    utils.checkSessionTimeout(userId, sessionId).then(result => {
      if (result) {
        alert("Your session has expired. Please login again!");
        hashHistory.push('/');
        return;
      }
    })
  }

  addTag(key, tagValue, tagChoice) {
    let tags = this.state.tags
    let { questionType,questionLanguage } = this.state
    if(Object.keys(tags).indexOf(key) === -1) {
      switch(key) {
        case "language":
          questionLanguage = tagValue
          this.setState ({
            questionLanguage
          })
          break
        case "difficulty":
          questionType = tagValue
          this.setState ({
            questionType
          })
          break
      }
      let newInput = Object.assign({}, tags, {[key] : tagChoice});
      this.updateTags(newInput);
    } else {
      alert("Only one option can be selected")
    }
   }

   removeTag = (removeTag) => {
    delete this.state.tags[removeTag]
    this.updateTags(this.state.tags);
   }

   updateTags = (tags) => {
    	this.setState({
    		tags
    	})
    }

  handleChange(event) {
    let {name, value} = event.target;
    console.log(name + ":" + value)
    this.setState(prevState => {
      //console.log(prevState)
      if (name.indexOf("questionChoice") != -1) {
        let questionChoice = name.split(":")
        prevState.questionOptions[questionChoice[1]].value = value
      } else if (name === "isMultiQuestion") {
        if (value === "true") {
          alert("You have selected multiple choice question. Please enter comma separated answer descriptions!");
          prevState[name] = value
        } else {
          prevState[name] = value
        }
      } else {
        prevState[name] = value
      }
      return prevState
    })
  }

  handleCancel() {
    this.setState( (prevState) => {
      prevState.questionType = ""
      prevState.questionOptions = [{value:"", correct: false}]
      prevState.questionSolution = []
      prevState.questionDescription = ""
      prevState.answerDescription = ""
      prevState.questionPoint = ""
      prevState.questionLanguage = ""
      return prevState
    })
  }

  handleValueSelect(userInput) {
    if(userInput !== "") {
      this.setState({
        languageTyped : ""
      })
      this.addTag("language", userInput, userInput)
    } else {
      alert("Please enter value")
    }
  }

  handleChoiceAdd(event) {
    event.preventDefault();
    let length = this.state.questionOptions.length;
    if(this.state.questionOptions[length-1].value !== "") {
      if (length < 4) {
        this.setState(prevState => {
          prevState.questionOptions = [...this.state.questionOptions, {value:"", correct: false}];
          return prevState
        })
      } else {
        alert("Maximum of 4 choices are allowed")
      }
    } else {
      alert("Please provide the value in option first");
    }
  }

  deleteChoice(index) {
    this.state.questionOptions.splice(index, 1)
    this.setState(prevState => {
      prevState.questionOptions = this.state.questionOptions
      return prevState
    })
  }

  handleChoice(event, index) {
      let correct = this.state.questionOptions[index].correct;
      this.setState(prevState => {
        prevState.questionOptions[index].correct = !correct
        return prevState
      })
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault()
    this.setState({ validated: true });
    if (form.checkValidity() !== false) {
      //Hanlde question right options
      let questionSolution = this.state.questionSolution.map(choice => {
        if(choice.correct)
          return choice.value
      }).filter(choice => choice)

      let questionOptions = this.state.questionOptions.map(choice => {
            return choice.value
      })

      let data = {
        questionType: this.state.questionType,
        questionOptions: questionOptions,
        questionSolution: questionSolution,
        answerDescription: this.state.answerDescription,
        questionLanguage: this.state.questionLanguage,
        questionDescription: this.state.questionDescription,
        questionPoint: this.state.questionPoint,
        questionType: this.state.questionType,
        isMultiQuestion: this.state.isMultiQuestion
      }
       console.log(this.state);
       let cred = utils.getHeaders(this.props.state.userId).authorization;
       const url = `/proxy?_t=${cred}&url=http://localhost:8088/techhunt/question/create`;
       axios.post(
         url, data, {
           "crossOrigin": true
         }
       ).then(response => {
         console.log(response)
         if (response.data.status === "success") {
           window.alert("Question created successfully!")
           this.setState( (prevState) => {
             prevState.questionType = ""
             prevState.questionOptions = [{value:"", correct: false}]
             prevState.questionSolution = []
             prevState.questionDescription = ""
             prevState.answerDescription = ""
             prevState.questionPoint = ""
             prevState.questionLanguage = ""
             prevState.validated = false
             prevState.tags = {}
             prevState.isMultiQuestion = false
             return prevState
           })
        } else {
          hashHistory.push('/error');
        }
       })
    }
  }

  render() {
    let { validated,tags } = this.state
    const languageSuggestion = ["Html", "Css", "JavaScript", "Java", "Python", "Ruby", "C", "C++", "PHP", "Swift"]
    let tagsToShow = []
    for(let i in tags) {
      tagsToShow.push(<Badge pill variant="warning" style={{padding: "10px",fontSize: "10px", margin: "1px 1px 1px 1px"}} key={i} type="success-inverted">{tags[i]} <i className="fa fa-times" style={{cursor: "pointer"}} onClick={() => this.removeTag(i)}></i></Badge>);
    }
    return (
      <Card style={{width: "1100px", margin:"2px"}}>
      <Card.Body>
        <Card.Title><h2>Create Question</h2></Card.Title>
          <Form style={{position: "relative",top: "15px", bottom: "30px"}} noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
            <Form.Group as={Row} controlId="questionType">
              <Form.Label column md="2">Select Question Type</Form.Label>
              <Col md="4">
                <Form.Control as="select"
                  name="isMultiQuestion"
                  value={this.state.isMultiQuestion}
                  onChange={this.handleChange} required>
                  <option value="--Select--">--Select--</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Control>
                <Form.Control.Feedback style={{fontSize: "larger"}} type="invalid">
                  Please select question type.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <br />

            <Form.Group as={Row} controlId="questionType">
              <Form.Label as="h2" column md="2">Question Text</Form.Label>
              <Col md="7">
              <InputGroup>
                <Form.Control as="textarea"
                  name="questionDescription" placeholder="Enter the question description"
                  value={this.state.questionDescription}
                  onChange={this.handleChange} required>
                </Form.Control>
                <Form.Control.Feedback style={{fontSize: "larger"}} type="invalid">
                  Please write a question.
                </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Form.Group>

            <br />

            <Form.Group as={Row} controlId="questionType">
              <Form.Label as="h2" column md="2">Question Choices</Form.Label>
              <Col md="7">
                {
                  this.state.questionOptions.map((choice, index) => {
                    let nameChoice = `questionChoice:${index}`
                    let nameButtonChoice = `questionButtonChoice:${index}`
                    return [
                      <Form.Group key={index} controlId="optionsGroup" as={Row}>
                        <Col md="9">
                          <Form.Control
                            type="text"
                            column
                            required
                            autoComplete="off"
                            name={nameChoice}
                            placeholder="Enter Answer Choices"
                            onChange={this.handleChange}
                            value={choice.value}>
                          </Form.Control>
                          <Form.Control.Feedback style={{fontSize: "larger"}} type="invalid">
                            Please write a answer choice.
                          </Form.Control.Feedback>
                         </Col>
                         <Col md="3">
                            <Button title="Toggle to select/deselect the right option" variant={choice.correct ? "success" : "danger"} name={nameButtonChoice} onClick={(event) => this.handleChoice(event,index)}>
                                <i name={nameButtonChoice} className={choice.correct ? "fa fa-check" : "fa fa-times"}></i>
                            </Button>
                            {this.state.questionOptions.length > 1 &&
                              <Button title="Delete this option" variant="secondary" style={{marginLeft: "5px"}} name="deleteChoice" onClick={() => this.deleteChoice(index)}>
                                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                              </Button>
                            }
                         </Col>
                      </Form.Group>
                    ]
                  })
                }
                <Button variant="link" style={{marginTop: "-15px"}} onClick={this.handleChoiceAdd}>Add more choices</Button>
              </Col>
            </Form.Group>

            <br />

            <Form.Group as={Row} controlId="answerDescription">
              <Form.Label as="h2" column md="2">Answer Description</Form.Label>
              <Col md="7">
                <Form.Control as="textarea"
                  name="answerDescription" placeholder="Enter the answer description"
                  value={this.state.answerDescription}
                  onChange={this.handleChange}>
                </Form.Control>
              </Col>
            </Form.Group>

            <br />

            <Form.Group as={Row} controlId="selectLanguage">
              <Form.Label as="h2" column md="2">Select Language</Form.Label>
              <Col md="7">
                <Form.Group as={Row} style={{marginLeft: "-1px"}}>
                  <TagsInput name="language" tags={this.state.languages} onClick={this.addTag}/>
                  <AutoComplete defaultValue={this.state.languageTyped} suggestions={languageSuggestion} onSelect={this.handleValueSelect} />
                </Form.Group>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="selectDifficulty">
              <Form.Label as="h2" column md="2">Select Difficulty</Form.Label>
              <Col md="7">
                <Form.Group as={Row} style={{marginLeft: "-1px"}}>
                    <TagsInput name="difficulty" tags={this.state.type} onClick={this.addTag}/>
                </Form.Group>
              </Col>
            </Form.Group>

            <br/>

            <Form.Group as={Row} controlId="addPoints">
              <Form.Label as="h2" column md="2">Points</Form.Label>
              <Col md="7">
              <div>
                <InputGroup>
                  <FormControl
                    placeholder="Enter Points"
                    name="questionPoint"
                    md="2"
                    autoComplete="off"
                    column
                    value={this.state.questionPoint}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback style={{fontSize: "larger"}} type="invalid">
                    Please enter question points.
                  </Form.Control.Feedback>
                </InputGroup>
             </div>
              </Col>
            </Form.Group>

            <br/>

            <Form.Group as={Row} controlId="addTags">
              <Form.Label as="h2" column md="1">Tags:</Form.Label>
              <Col md="7">
              <div>
                {tagsToShow}
             </div>
              </Col>
            </Form.Group>

            <br />

            <Form.Group as={Row} controlId="addButtons">
              <Col md="2">
              </Col>
              <Col md="6">
                <Button variant="success" className="footer" type="submit" >
                   Save Question
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}
export default CreateQuestionComponent
