import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import MaterialTable from 'material-table'
import { Modal, Button, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

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
      }
    }
    this.handleDeletePaper = this.handleDeletePaper.bind(this)
    this.getPaperDetails = this.getPaperDetails.bind(this)
    this.closeGet = this.closeGet.bind(this)
  }

  componentDidMount () {
    const url = `http://tech-hunt-api:8080/techhunt/testpaper/findAllPapers/${localStorage.getItem("userId")}`;
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

  handleDeletePaper (event) {
    let data = this.state.dataToDelete
    console.log(data)
    const url = `http://tech-hunt-api:8080/techhunt/testpaper/deletePaper/${localStorage.getItem("userId")}`;
    axios.delete(
      url, {data: data}, {
        "crossOrigin": true
      }
    ).then(response => {
      if (response.data.status === "success") {
        alert("Rows deleted!")
        const url = `http://tech-hunt-api:8080/techhunt/testpaper/findAllPapers/${localStorage.getItem("userId")}`;
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
      } else {
        alert(response.data.message)
      }
    })
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
    console.log(testPaperId)
    console.log(localStorage.getItem("userId"))
    const url = `http://tech-hunt-api:8080/techhunt/testpaper/findPaperById/${localStorage.getItem("userId")}/${testPaperId}`;
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

  render () {

      return (
        <div>
          <div className="btn-group float-left">
            <button className="btn btn-secondary btn-md button-border" onClick={this.handleDeletePaper}><i className="fa fa-plus"></i></button>
          </div>
          <div className="btn-group float-left">
            <button className="btn btn-secondary btn-md button-border" onClick={this.getPaperDetails}><i className="fa fa-eye"></i></button>
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
      </div>
      )
  }
}
export default ShowTechHuntQuestionPapers
