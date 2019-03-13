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
      testName: ""
    }
    this.handleCreatePaper = this.handleCreatePaper.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
    const url = `http://tech-hunt-api:8080/techhunt/testpaper/create`;
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

  render() {
    return (
      <div>
        <div className="btn-group float-left">
          <button className="btn btn-primary btn-md" onClick={this.handleCreatePaper}>Create Paper</button>
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
                if (!this.state.selectedData.includes(row)) {
                  this.setState(prevState => {
                    prevState['selectedData'].push(row)
                    return prevState
                  });
                }
              } else {
                if (this.state.selectedData.includes(row)) {
                  this.setState(prevState => {
                    delete prevState['selectedData'][rowIndex]
                    return prevState
                  });
                }
              }
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
    </div>
    )
  }
}

export default PreloadedQuestionsComponent
