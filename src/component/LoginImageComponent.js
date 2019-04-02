import React, {Component} from "react"

import '../css/app.css'

class LoginImageComponent extends Component {
  render () {
    return (
      <div className="col-8" style={{float: 'right', paddingLeft: '50px', paddingTop: '30px'}}>
        <div className="row">
          <div className="column">
            <a href="https://docs.angularjs.org" target="_blank">
              <img src={require("../images/angularjs.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://docs.aws.amazon.com" target="_blank">
              <img src={require("../images/aws.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://docs.docker.com" target="_blank">
              <img src={require("../images/docker.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://docs.oracle.com/javase/8/docs/api" target="_blank">
              <img src={require("../images/java.png")} style={{width: '100%'}}></img>
            </a>
          </div>






          <div className="column">
            <a href="https://kubernetes.io/docs/tutorials/kubernetes-basics" target="_blank">
              <img src={require("../images/k8s.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://docs.mongodb.com/manual" target="_blank">
              <img src={require("../images/mongodb.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://api.jquery.com" target="_blank">
              <img src={require("../images/jquery.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://docs.python.org" target="_blank">
              <img src={require("../images/python.png")} style={{width: '100%'}}></img>
            </a>
          </div>
        </div>
        <div className="row" style={{paddingTop: '30px'}}>
          <div className="column">
            <a href="https://reactjs.org/tutorial/tutorial.html" target="_blank">
              <img src={require("../images/reactjs.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
          <a href="https://vuejs.org/v2/guide" target="_blank">
            <img src={require("../images/vuejs.png")} style={{width: '100%'}}></img>
          </a>
          </div>
          <div className="column">
            <a href="https://hadoop.apache.org/docs/r3.2.0" target="_blank">
              <img src={require("../images/hadoop.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://kafka.apache.org/documentation" target="_blank">
              <img src={require("../images/kafka.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://maven.apache.org/guides/index.html" target="_blank">
              <img src={require("../images/maven.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://dev.mysql.com/doc" target="_blank">
              <img src={require("../images/mysql.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://spring.io/docs" target="_blank">
              <img src={require("../images/spring.png")} style={{width: '100%'}}></img>
            </a>
          </div>
        </div>
        <div className="row" style={{paddingTop: '30px'}}>
          <div className="column">
            <a href="https://developer.android.com/docs" target="_blank">
              <img src={require("../images/android.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://github.com/d3/d3/wiki" target="_blank">
              <img src={require("../images/d3js.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://golang.org/doc" target="_blank">
              <img src={require("../images/golang.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
              <img src={require("../images/javascript.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://help.ubuntu.com" target="_blank">
              <img src={require("../images/linux.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://google.com" target="_blank">
              <img src={require("../images/microservices.png")} style={{width: '100%'}}></img>
            </a>
          </div>
        </div>
        <div className="row" style={{paddingTop: '30px'}}>
          <div className="column">
            <a href="https://google.com" target="_blank">
              <img src={require("../images/sqlserver.png")} style={{width: '100%'}}></img>
            </a>
          </div>
          <div className="column">
            <a href="https://nodejs.org/en/docs/" target="_blank">
              <img src={require("../images/nodejs.png")} style={{width: '100%'}}></img>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginImageComponent
