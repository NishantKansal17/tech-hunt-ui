import React,{Component} from "react"

class LoadingSpinner extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render () {
    return (
      <div>
        <div>
          <i className="fa fa-spinner fa-spin" /> Please wait...
        </div>
      </div>
    )
  }
}
export default LoadingSpinner;
