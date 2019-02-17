import React from "react"
import axios from "axios"

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
    //       questionDefault: true
    //     },
    //     {
    //       questionId: "ques_2",
    //       questionType: "B",
    //       questionDescription: "Test Two",
    //       questionOptions: ["op_1","op_2"],
    //       questionSolution: "B",
    //       questionLanguage: "Python",
    //       questionDefault: true
    //     }
    //   ]
    // })
    const url = `/proxy?url=http://tech-hunt-api:8080/techhunt/question`;
    axios.get(
      url, {
        "crossOrigin": true
      }
    ).then(response => {
     console.log(response.data)
    })
  }
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Question Type</td>
              <td>Question Description</td>
              <td>Question Options</td>
              <td>Question Solution</td>
              <td>Question Language</td>
              <td>Question Default</td>
            </tr>
          </thead>
          <tbody>
            {

              this.state.data.map((k, i) => {

              let data = this.state.data[i];
              console.log(data)

                return (
                  <tr key={i}>
                    <td>{data.questionType}</td>
                    <td>{data.questionDescription}</td>
                    <td>{data.questionOptions}</td>
                    <td>{data.questionSolution}</td>
                    <td>{data.questionLanguage}</td>
                    <td>{data.questionDefault}</td>
                  </tr>
                )
              }
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default PreloadedQuestionsComponent
