import React from 'react';
import _ from 'lodash';
import ReactDom from 'react-dom';
import Widget from '../widget';

export default class GridCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            // showIcons: props.showIcons,
            // allProps
        }

    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         ...nextProps,
    //         showIcons: nextProps.showIcons,
    //         // allProps
    //     });
    // }

    render() {
var color = this.className= this.className == "white" ? "green" : "white";
        return (
            <td className="gridBorder" onClick={() => this.changeMe(this)}>{this.state.data}</td>
        )
    }
  
     changeMe(el)
        {
            var whosChanged = null;
         el.style.backgroundColor = "#FE3000";
         el.style.color = "#000000";
         if (whosChanged != null)
             {
              whosChanged.style.backgroundColor = ""
              whosChanged.style.color = ""
             }
        whosChanged = el;
        }
    cellClick()
    {
        
        alert("hi");
    }
}
