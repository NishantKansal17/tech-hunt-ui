import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

class ExamHeader extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
        <div className="tHeader">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <span><h3>TechKnow Online Exam</h3></span>
              </div>
              <ul className="nav navbar-nav navbar-left">
                <li><a style={{color: 'white'}}><span><i className="fa fa-user"></i></span> {this.props.userId}</a></li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }
}
export default ExamHeader
