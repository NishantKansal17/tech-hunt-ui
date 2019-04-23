import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import MaterialTable from 'material-table'
import { Modal, Button, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import utils from "./utils.js"

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css'

import LinkComponent from "./LinkComponent"

class ShowTechHuntQuestionPapers extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      dataToDelete: [],
      columns: [
        {
          dataField: 'testPaperId',
          text: 'Paper Id'
        },
        {
          dataField: 'questionIds',
          text: 'Question Ids'
        },
        {
          dataField: 'createrId',
          text: 'Created By'
        }
      ],
      selectedData: [],
      show: false,
      modalData: {
        testPaperId: "",
        createrId: "",
        questionIds: []
      },
      showEmail: false,
      email: ""
    }
    this.deleteQuestionPaper = this.deleteQuestionPaper.bind(this)
    this.getPaperDetails = this.getPaperDetails.bind(this)
    this.closeGet = this.closeGet.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.emailQuestionPaper = this.emailQuestionPaper.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
    this.closeEmail = this.closeEmail.bind(this)
  }

  componentDidMount () {
    let cred = utils.getHeaders().authorization;
    const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/testpaper/findAllPapers/${localStorage.getItem("userId")}`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
     let data = response.data;
     console.log(response.data)
     this.setState({
       data: data
     })
    })
  }

  deleteQuestionPaper () {
    var option = window.confirm("Are you sure to delete this question paper?")
    if (option) {
      let data = this.state.selectedData
      console.log(data)
      let cred = utils.getHeaders().authorization;
      const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/testpaper/deleteMultiPapersById/${localStorage.getItem("userId")}`;
      axios.delete(
        url, {data: data}, {
          "crossOrigin": true
        }
      ).then(response => {
        alert(response.data.message)
        const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/testpaper/findAllPapers/${localStorage.getItem("userId")}`;
        axios.get(
          url, {
            "crossOrigin": true
          }
        ).then(response => {
         let data = response.data;
         console.log(response.data)
         this.setState({
           data: data
         })
        })
      })
    }
  }
  getPaperDetails () {
    if (this.state.selectedData === undefined
    || this.state.selectedData.length === 0) {
      alert("Please select at least one row!")
      return
    }
    if (this.state.selectedData.length > 1) {
      alert("Please select only one row!")
      return
    }
    let testPaperId = this.state.selectedData[0]['testPaperId']
    let cred = utils.getHeaders().authorization;
    const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/testpaper/findPaperById/${localStorage.getItem("userId")}/${testPaperId}`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
      if (response.data !== undefined || response.data !== null) {
        console.log(response.data.status)
        this.setState(prevState => {
          prevState['modalData'] = response.data
          prevState['show'] = true
          return prevState
        });
        console.log(this.state)
      } else {
        alert(response.data.message)
      }
    })
  }
  closeGet () {
    this.setState(prevState => {
      prevState['show'] = false
      return prevState
    });
  }

  handleChange (event) {
    let value = event.target.value
    this.setState(prevState => {
      prevState['email'] = value
      return prevState
    });
  }

  closeEmail () {
    this.setState(prevState => {
      prevState['showEmail'] = false
      return prevState
    });
  }

  emailQuestionPaper () {
    this.setState(prevState => {
      prevState['showEmail'] = true
      return prevState
    });
  }

  sendEmail () {
    if (this.state.email === undefined || emails === '') {
      alert ("Email(s) can't be empty!")
      return
    }
    let emails = this.state.email.split(",")
    let data = {
      emailTo: emails,
      emailSubject: "<This is an invitation from tech-hunt for online exam TODO>",
      emailBody: "<This is an invitation from tech-hunt for online exam TODO>"
    }
    let cred = utils.getHeaders().authorization;
     const url = `http://localhost:3999/proxy?_t=${cred}&url=http://tech-hunt-api:8080/techhunt/email/send`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       console.log(response)
       if (response.data.status === "success") {
         window.alert("Email sent successfully!")
         this.setState(prevState => {
           prevState['showEmail'] = false
           return prevState
         });
      } else {
        window.alert(response.data.message)
      }
     })
  }

  render () {

      return (
        <div>
          <div className="btn-group float-left">
            <button
              className="btn btn-secondary btn-md button-border"
              title="View Question Paper"
              onClick={this.getPaperDetails}><i className="fa fa-eye"></i></button>
          </div>
          <div className="btn-group float-left">
            <button
              className="btn btn-danger btn-md button-border"
              title="Delete Question Paper"
              onClick={this.deleteQuestionPaper}><i className="fa fa-trash" aria-hidden="true"></i></button>
          </div>
          <div className="btn-group float-left">
            <button
              className="btn btn-success btn-md button-border"
              title="Email Question Paper"
              onClick={this.emailQuestionPaper}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
          </div>
          <BootstrapTable
            keyField='testPaperId'
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
          <Modal show={this.state.show} onShow={this.showExamDetailsOnModalOpen} onHide={this.closeGet}>
            <Modal.Header closeButton>
              <Modal.Title>Exam Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{width: "100%"}}>
                <Form.Group controlId="testPaperIdGroup">
                  <Form.Label>Paper Id: </Form.Label>
                  <Form.Control
                    type="text"
                    name="testPaperId"
                    value={this.state.modalData.testPaperId}>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="questionIdsGroup">
                  <Form.Label>Question Ids: </Form.Label>
                  <LinkComponent links={this.state.modalData}/>
                </Form.Group>
                <Form.Group controlId="createrIdGroup">
                  <Form.Label>Created By: </Form.Label>
                    <Form.Control
                      type="text"
                      name="createrId"
                      value={this.state.modalData.createrId}>
                    </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeGet}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showEmail} onHide={this.closeEmail}>
          <Modal.Header closeButton>
            <Modal.Title>Send Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="input100"
              type="text"
              name="email"
              placeholder="Comma Separated Emails"
              value={this.state.email}
              onChange={this.handleChange}>
            </input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeEmail}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.sendEmail}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      )
  }
}
export default ShowTechHuntQuestionPapers
