import React from "react"
import axios from "axios"
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
//import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
//import 'react-bootstrap-table/css/react-bootstrap-table.css'
import MaterialTable from 'material-table'

class PreloadedQuestionsComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    // this.setState({
    //   data: [
    //     {
    //       questionId: "ques_1",
    //       questionType: "A",
    //       questionDescription: "Test One",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "A",
    //       questionLanguage: "Java",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_2",
    //       questionType: "B",
    //       questionDescription: "Test Two",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "B",
    //       questionLanguage: "Python",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_1",
    //       questionType: "A",
    //       questionDescription: "Test One",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "A",
    //       questionLanguage: "Java",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_2",
    //       questionType: "B",
    //       questionDescription: "Test Two",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "B",
    //       questionLanguage: "Python",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_1",
    //       questionType: "A",
    //       questionDescription: "Test One",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "A",
    //       questionLanguage: "Java",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_2",
    //       questionType: "B",
    //       questionDescription: "Test Two",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "B",
    //       questionLanguage: "Python",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_1",
    //       questionType: "A",
    //       questionDescription: "Test One",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "A",
    //       questionLanguage: "Java",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_2",
    //       questionType: "B",
    //       questionDescription: "Test Two",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "B",
    //       questionLanguage: "Python",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_1",
    //       questionType: "A",
    //       questionDescription: "Test One",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "A",
    //       questionLanguage: "Java",
    //       questionDefault: "true"
    //     },
    //     {
    //       questionId: "ques_2",
    //       questionType: "B",
    //       questionDescription: "Test Two",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "B",
    //       questionLanguage: "Python",
    //       questionDefault: "true"
    //     }
    //   ]
    // })
    const url = `/proxy?url=http://tech-hunt-api:8080/techhunt/question`;
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
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Question Id', field: 'questionId' },
            { title: 'Question Type', field: 'questionType' },
            { title: 'Question Description', field: 'questionDescription'},
            { title: 'Question Options', field: 'questionOptions' },
            { title: 'Question Solution', field: 'questionSolution' },
            { title: 'Question Language', field: 'questionLanguage' },
            { title: 'Question Default', field: 'questionDefault' }
          ]}
          data={this.state.data}
          title="Tech Hunt Questions"
        />
      </div>
    )
  }
}

export default PreloadedQuestionsComponent
