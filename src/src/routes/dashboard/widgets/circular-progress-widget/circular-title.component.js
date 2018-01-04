import React from 'react';
import ReactDom from 'react-dom';
var elementResizeEvent = require('element-resize-event');
import * as Color from '../../../../lib/color-conversion';
import CircularProgress from './circular-progress-widget.component';

export default class CircularTitle extends React.Component {
    constructor(props) {
        
        super(props);
         const { titleStyles, valueStyles,widgetBody } = _.cloneDeep(props);

       widgetBody.backgroundColor = Color.ToString(widgetBody.backgroundColor);

        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}px`;
        this.state = {
           // title: this.props.title
           ...props, titleStyles
        }
    }
    componentWillReceiveProps(nextProps) {
        
 const { titleStyles, valueStyles,widgetBody } = _.cloneDeep(nextProps);

       widgetBody.backgroundColor = Color.ToString(widgetBody.backgroundColor);

        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}px`;
        this.setState({
            //title: this.nextProps.title
             ...nextProps, titleStyles
        })
    }
    componentDidMount() {
        const node = ReactDom.findDOMNode(this);
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const el = node.firstChild;

        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }

        if (this.state.width !== width || this.state.height !== height) {
            setTimeout(() => {
                this.setState({
                    height,
                    width
                })
            }, 0);
        }
    }
    componentDidUpdate() {
        const node = ReactDom.findDOMNode(this);
        
                elementResizeEvent(node, () => {
                    const width = node.offsetWidth;
                    const height = node.offsetHeight;
                    if (this.state.width !== width || this.state.height !== height) {
                        this.setState({
                            height,
                            width
                        });
                    }
                });
        
                const el = node.firstChild;
                while (el.hasChildNodes()) {
                    el.removeChild(el.firstChild);
                }
        
                const width = node.offsetWidth;
                const height = node.offsetHeight;
                if (this.state.width !== width || this.state.height !== height) {
                    setTimeout(() => {
                        this.setState({
                            height,
                            width
                        })
                    }, 0);
                }
          }

    render() {
        
        return (
            <div className = "widget-content-wrapper" id={`cp${this.props.id}`}>
                 <div style={this.state.titleStyles}>
                   <span> {this.state.title}</span>
                </div>
                <CircularProgress {...this.state} />
            </div>
        );
    }
}
