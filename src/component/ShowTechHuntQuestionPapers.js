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
                <div>
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
                    <div className="">
          						<button className="" onClick={this.handleDelete}>Delete</button>
          					</div>
            </div>
    )
  }
}
export default ShowTechHuntQuestionPapers
