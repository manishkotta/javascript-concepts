import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactDom from 'react-dom';
import '../styles.css';
import * as Color from '../../../../lib/color-conversion';

let d3Pie = require('d3Pie');

const segments = [
    "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
    "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
    "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
    "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
    "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7",
    "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
    "#65a620", "#2484c1", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
    "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
    "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
    "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
];

export default class PieWidget extends React.Component {
    constructor(props) {
        super(props);

        const { widgetBody, titleStyles } = _.cloneDeep(props);

        widgetBody.backgroundColor = Color.ToString(props.appliedBackgroundColor);
        widgetBody.color = Color.ToString(widgetBody.color);

        titleStyles.color = Color.ToString(titleStyles.color);

        this.state = {
            data: this.props.data,
            title: this.props.title,
            titleStyles,
            widgetBody,
            width: this.props.width,
            height: this.props.height
        }
    }

    componentWillReceiveProps(nextProps) {
        const { widgetBody, titleStyles } = _.cloneDeep(nextProps);

        widgetBody.backgroundColor = Color.ToString(nextProps.appliedBackgroundColor);
        widgetBody.color = Color.ToString(widgetBody.color);

        titleStyles.color = Color.ToString(titleStyles.color);

        this.setState({
            data: nextProps.data,
            title: nextProps.title,
            titleStyles,
            widgetBody,
            width: nextProps.width,
            height: nextProps.height
        });
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.state.title !== newState.title
            || this.state.width !== newState.width
            || this.state.height !== newState.height
            || !_.isEqual(this.state.data, newState.data)
            || !_.isEqual(this.state.titleStyles, newState.titleStyles)
            || !_.isEqual(this.state.widgetBody, newState.widgetBody)
        );
    }

    componentDidUpdate() {
        this.clearAndRenderPie();
    }

    clearAndRenderPie()
    {
        const el = ReactDom.findDOMNode(this).firstChild;
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }
        var chart = this.renderPie();
    }


    componentDidMount() {
        this.clearAndRenderPie();
    }

    renderPie() {
        return new d3Pie(`${this.props.id}`, {
            header: {
                title: {
                    text: this.state.title,
                    color: this.state.titleStyles.color,
                    fontSize: this.state.titleStyles.fontSize,
                    font: this.state.titleStyles.fontFamily,
                    location: "middle-middle"
                },
            },
            size: {
                canvasHeight: this.state.height,
                canvasWidth: this.state.width,
                pieOuterRadius: "90%"
            },
            data: {
                //sortOrder: "value-desc",
                content: _.map(this.state.data, (d, i) => {
                    return {
                        label: d.label,
                        value: _.reduce(d.data, (sum, x) => sum + x, 0),
                        color: segments[i % segments.length]
                    }
                })
            },
            labels: {
                outer: {
                    pieDistance: 11
                },
                inner: {
                    hideWhenLessThanPercentage: 0.5
                },
                mainLabel: {
                    color: this.state.widgetBody.color,
                    fontSize: this.state.widgetBody.fontSize,
                    font: this.state.widgetBody.fontFamily
                },
                percentage: {
                    color: "#ffffff",//todo with color invertion
                    decimalPlaces: 1,
                    fontSize: this.state.widgetBody.fontSize,
                    font: this.state.widgetBody.fontFamily
                },
                value: {
                    color: this.state.widgetBody.color,
                    fontSize: this.state.widgetBody.fontSize,
                    font: this.state.widgetBody.fontFamily
                },
                lines: {
                    enabled: true
                },
                truncation: {
                    enabled: true
                }
            },
            tooltips: {
                enabled: true,
                type: "placeholder",
                string: "{label}: {value}, {percentage}%",
                styles: {
                    color: "#ffffff",
                    fontSize: this.state.widgetBody.fontSize,
                    font: this.state.widgetBody.fontFamily
                }
            },
            effects: {
                load: {
                    effect: "none"
                },
                pullOutSegmentOnClick: {
                    effect: "linear",
                    speed: 400,
                    size: 8
                },
                highlightSegmentOnMouseover: true,
                highlightLuminosity: -0.4
            },
            misc: {
                gradient: {
                    enabled: false,
                    percentage: 75
                },
                colors: {
                    background: this.state.widgetBody.backgroundColor
                },
            }
        });
    }

    render() {
        return (
            <div className="widget-content">
                <div id={`${this.props.id}`}></div>
            </div>
        );
    }
}

PieWidget.PropTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    titleStyles: PropTypes.object,
    widgetBody: PropTypes.object,
}

// PieWidget.defaultProps = {
//     width: 0,
//     height: 0,
//     barCount: 10,
//     value: 1,
//     colors: ["#FF0000", "rgb(255, 232, 0)", "#00FF00"],
//     label: `${1 * 100}`,
//     max: 100
// }