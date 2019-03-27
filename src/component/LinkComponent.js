import React, {Component} from "react"

class LinkComponent extends Component {
  constructor(props){
    super(props);
    console.log(props.links.questionIds)
  }
  render () {
    return (
      <div>
        {this.props.links.questionIds.map((item, index) => (
          <div>
            <a style={{cursor: 'pointer'}}>{item}</a>
            <br></br>
          </div>
        ))}
      </div>
    )
  }
}
export default LinkComponent
