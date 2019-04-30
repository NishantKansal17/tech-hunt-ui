import React,{Component} from "react";
import {Row, Col, Button, FormField, InputGroup, FormControl , Form, Badge} from 'react-bootstrap';

class TagsInput extends Component {
  constructor(props) {
    super(props)
    this.addTag = this.addTag.bind(this)
  }

  addTag(tagValue, tagChoice) {
    const { name, onClick } = this.props;
    onClick(name, tagValue, tagChoice)
   }

  render() {
    let tags = this.props.tags;
    return (
      <div>
         <div>
          {tags && tags.map((tag, index) => <Badge pill variant="info" onClick={(e) => {this.addTag(tag.value, tag.choice)}}
                    style={{padding: "7px",cursor: "pointer", fontSize: "10px", margin: "1px 5px 1px 1px"}} key={index} type="success-inverted">{tag.choice}</Badge>)}
        </div>
      </div>
    )
  }
}

export default TagsInput
