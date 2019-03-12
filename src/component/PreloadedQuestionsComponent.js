import React from "react"
import axios from "axios"
import { Modal, Button } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {hashHistory} from "react-router"

class PreloadedQuestionsComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      selectedData: [],
      columns: [
        {
          dataField: 'questionId',
          text: 'Question Id'
        },
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
        }
      ],
      show: false,
      testName: ""
    }
    this.handleNext = this.handleNext.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    const url = `http://tech-hunt-api:8080/techhunt/question`;
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
  }

  handleNext (event) {
    //hashHistory.push({pathname: '/createtest', state: this.state})
    this.setState(prevState => {
      prevState['show'] = true
      return prevState
    })
  }

  handleClose () {
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

  handleSave (event) {
    console.log(this.state)
    this.setState(prevState => {
      prevState['show'] = false
      return prevState
    });
  }

  render() {
    return (
      <div>
        <div className="btn-group float-right">
          <button className="btn btn-primary btn-md" onClick={this.handleNext}>Next</button>
        </div>
        <BootstrapTable
          keyField='questionId'
          data={ this.state.data }
          columns={ this.state.columns }
          selectRow={{
            mode: 'checkbox',
            clickToSelect: true
          }}
          pagination={ paginationFactory() }
          />
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
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
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
    )
  }
}

export default PreloadedQuestionsComponent
