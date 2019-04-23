import React from "react"
import axios from "axios"
import { Modal, Button, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css'

import {hashHistory} from "react-router"
import utils from "./utils.js"

class PreloadedQuestionsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectedData: [],
      questionModalData: {
        questionType: "",
        questionDescription: "",
        questionOptions: "",
        questionSolution: "",
        questionLanguage: "",
        questionDefault: false,
        multiQuestion: false
      },
      columns: [
        {
          dataField: 'questionType',
          text: 'Question Type'
        },
        {
          dataField: 'questionDescription',
          text: 'Question Description'
        },
        {
          dataField: 'questionOptions',
          text: 'Question Options'
        },
        {
          dataField: 'questionSolution',
          text: 'Question Solution'
        },
        {
          dataField: 'questionLanguage',
          text: 'Question Language'
        },
        {
          dataField: 'questionDefault',
          text: 'Question Default'
        },
        {
          dataField: 'multiQuestion',
          text: 'Multiple Choice'
        }
      ],
      show: false,
      testName: "",
      showGetAndEdit: false
    }
    this.handleCreatePaper = this.handleCreatePaper.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.getQuestionDetails = this.getQuestionDetails.bind(this)
    this.closeGetAndEdit = this.closeGetAndEdit.bind(this)
    this.doneGetAndEdit = this.doneGetAndEdit.bind(this)
    this.showQuestionDetailsOnModalOpen = this.showQuestionDetailsOnModalOpen.bind(this)
    this.handleModalValueChange = this.handleModalValueChange.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }

  componentDidMount() {
    let authHeader = utils.getHeaders(this.props.state.userId)
    if (authHeader === undefined || authHeader === null) {
      alert("Invalid user session.")
      hashHistory.push('/');
    }
    let cred = authHeader.authorization
    const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8088/techhunt/question`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
      console.log(response)
     let data = response.data;
     this.setState(prevState => {
       prevState['data'] = data
       return prevState
     })
    })
    .catch((response) => {
      if (response.message.includes("401")) {
        alert(response.message)
        hashHistory.push('/');
      }
    })
  }

  handleCreatePaper (event) {
    //hashHistory.push({pathname: '/createtest', state: this.state})
    this.setState(prevState => {
      prevState['show'] = true
      return prevState
    })
  }

  handleCancel () {
    this.setState(prevState => {
      prevState['show'] = false
      return prevState
    });
  }

  handleChange (event) {
    let value = event.target.value
    this.setState(prevState => {
      prevState['testName'] = value
      return prevState
    });
  }

  handleDone (event) {
    let questionIds = []
    this.state.selectedData.map((object, index) => {
      questionIds.push(object['questionId'])
    });
    let data = {
      testPaperId: this.state.testName,
      createrId: localStorage.getItem("userId"),
      questionIds: questionIds
    }
    let authHeader = utils.getHeaders()
    let cred = authHeader.authorization
    if (authHeader === undefined || authHeader === null) {
      alert("Invalid user session.")
      hashHistory.push('/');
    }
    const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/testpaper/create`;
    axios.post(
      url, data, {
        "crossOrigin": true
      }
    ).then(response => {
      console.log(response)
      if (response.data.status === "success") {
        alert(response.data.message)
        this.setState(prevState => {
          prevState['show'] = false
          return prevState
        });
        hashHistory.push('/welcome');
      } else {
        this.setState(prevState => {
          prevState['show'] = false
          return prevState
        });
        hashHistory.push('/error');
      }
    })
  }

  getQuestionDetails () {
    console.log(this.state.selectedData)
    console.log(this.state.selectedData.length)
    if (this.state.selectedData === undefined
    || this.state.selectedData.length === 0) {
      alert("Please select at least one row!")
      return
    }
    if (this.state.selectedData.length > 1) {
      alert("Please select only one row!")
      return
    }
    this.setState(prevState => {
      prevState['showGetAndEdit'] = true
      return prevState
    });
  }

  closeGetAndEdit () {
    this.setState(prevState => {
      prevState['showGetAndEdit'] = false
      return prevState
    });
  }

  doneGetAndEdit () {
    alert("Done!")
  }

  showQuestionDetailsOnModalOpen () {
    this.setState(prevState => {
      prevState['questionModalData'] = this.state.selectedData[0]
      return prevState
    });
  }

  handleModalValueChange (event) {
    let {name, value} = event.target;
    console.log(name + ":" + value)
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

  deleteQuestion () {
    var option = window.confirm("Are you sure to delete this question?")
    if (option) {
      let questions = []
      var isOK = true
      this.state.selectedData.map(function(item, index){
        if (item.questionDefault == true) {
          alert("You are not allowed to delete default question(s)!")
          isOK = false
          return
        }
        questions.push(item.questionId)
      })
      if (!isOK) {
        return
      }
      let authHeader = utils.getHeaders()
      let cred = authHeader.authorization
      if (authHeader === undefined || authHeader === null) {
        alert("Invalid user session.")
        hashHistory.push('/');
      }
      const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/question/deleteMultiQuestions/${questions}`;
      axios.delete(
        url, {
          "crossOrigin": true
        }
      ).then(response => {
        if (response.data.status === "success") {
          alert(response.data.message)
          const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/question`;
          axios.get(
            url, {
              "crossOrigin": true
            }
          ).then(response => {
           let data = response.data;
           this.setState(prevState => {
             prevState['data'] = data
             return prevState
           })
          })
        } else {
          alert(response.data.message)
        }
      })
    } else {
      return
    }
  }

  render() {
    return (
      <div>
        <div className="btn-group float-left">
          <button className="btn btn-secondary btn-md button-border" onClick={this.handleCreatePaper}><i className="fa fa-plus"></i></button>
        </div>
        <div className="btn-group float-left">
          <button className="btn btn-secondary btn-md button-border" onClick={this.getQuestionDetails}><i className="fa fa-eye"></i></button>
        </div>
        <div className="btn-group float-left">
          <button className="btn btn-danger btn-md button-border" onClick={this.deleteQuestion}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        <BootstrapTable
          keyField='questionId'
          data={ this.state.data }
          columns={ this.state.columns }
          selectRow={{
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
              if (isSelect) {
                this.setState(prevState => {
                  prevState['selectedData'].push(row)
                  return prevState
                });
              } else {
                let array = []
                this.state.selectedData.map(function(item, index) {
                  if (item.questionId !== row.questionId) {
                    array.push(item)
                  }
                })
                console.log(array)
                this.setState(prevState => {
                  prevState['selectedData'] = array
                  return prevState
                });
              }
              console.log(this.state.selectedData)
            }
          }}
          pagination={ paginationFactory() }
          />
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Paper Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="input100"
              type="text"
              name="testName"
              placeholder="Test Paper Name"
              value={this.state.testName}
              onChange={this.handleChange}>
            </input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleDone}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showGetAndEdit} onShow={this.showQuestionDetailsOnModalOpen} onHide={this.closeGetAndEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Question Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{width: "100%"}}>
            <Form.Group controlId="languageGroup">
              <Form.Label>Select your language</Form.Label>
                <Form.Control as="select"
                  name="questionLanguage"
                  onChange={this.handleModalValueChange}
                  value={this.state.questionModalData.questionLanguage}>
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
                  onChange={this.handleModalValueChange}
                  value={this.state.questionModalData.questionType}>
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
                  onChange={this.handleModalValueChange}
                  value={this.state.questionModalData.questionDescription}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="optionsGroup">
              <Form.Label>Question Options (Comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="questionOptions"
                  onChange={this.handleModalValueChange}
                  value={this.state.questionModalData.questionOptions}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="solutionGroup">
              <Form.Label>Question Solution (Comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="questionSolution"
                  onChange={this.handleModalValueChange}
                  value={this.state.questionModalData.questionSolution}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="multiChoiceGroup">
              <Form.Label>Is Multiple Choice Question</Form.Label>
                <Form.Check
                  type="radio"
                  label="True"
                  name="multiQuestion"
                  value="multi-choice-1"
                  onChange={this.handleModalValueChange}
                />
              <Form.Check
                type="radio"
                label="False"
                name="multiQuestion"
                value="multi-choice-2"
                onChange={this.handleModalValueChange}
                checked
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeGetAndEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.doneGetAndEdit}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

export default PreloadedQuestionsComponent
