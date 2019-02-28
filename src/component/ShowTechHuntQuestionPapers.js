import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"

import MaterialTable from 'material-table'

import '../css/app.css'
import '../css/util.css'

class ShowTechHuntQuestionPapers extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      dataToDelete: []
    }
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete (event) {
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

  render () {
    return (
      <div className="limiter">
        <div className="container-login100">
             <div
               className="login100-form validate-form p-l-55 p-r-55 p-t-110">
                  <span className="login100-form-title">Preloaded Papers</span>
                <div
                  className="wrap-input100 validate-input m-b-16">
                  <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                      columns={[
                        { title: 'Test Paper Name', field: 'testPaperId' },
                        { title: 'Question Ids', field: 'questionIds' }
                      ]}
                      data={this.state.data}
                      title="Preloaded Papers"
                      options={{
                        selection: true
                      }}
                      onSelectionChange={(data) => {
                        this.setState(prevState => {
                          prevState.dataToDelete = data
                          return prevState
                        });
                      }}
                    />
                    <br/>
                    <div className="container-login100-form-btn">
          						<button className="login100-form-btn-small" onClick={this.handleDelete}>Delete</button>
          					</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    )
  }
}
export default ShowTechHuntQuestionPapers
