import React, {Component} from "react"
//import {Link} from "react-router"
import {Treebeard} from 'react-treebeard';

const data = [
  {
    name: 'Load Test from Question Bank',
    route: /PreloadedQuestions,
  },
  {
    name: 'Create Custom Questions',
    route: /createquestion,
  }

    // children: [
    //     {
    //         name: 'parent',
    //         children: [
    //             { name: 'child1' },
    //             { name: 'child2' }
    //         ]
    //     },
    //     {
    //         name: 'loading parent',
    //         loading: true,
    //         children: []
    //     },
    //     {
    //         name: 'parent',
    //         children: [
    //             {
    //                 name: 'nested parent',
    //                 children: [
    //                     { name: 'nested child 1' },
    //                     { name: 'nested child 2' }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
];
class MenuComponent extends Component {
  constructor(props){
        super(props);
        this.state = {
          cursor: {
            active: ""
          }
        };
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor)
        {
          this.state.cursor.active = false;
        }
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
            <Treebeard
                data={data}
                <Link to={route} className="txt2 link">{data}</Link>
            />
        );
    }
}

export default MenuComponent
