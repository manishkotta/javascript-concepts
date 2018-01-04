import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactDom from 'react-dom';
import Gauge from './gauge.component';
const interpolate = require('../../../../lib/color-interpolate');
import * as Color from '../../../../lib/color-conversion';


export default class SpeedoWidget extends React.Component {
    constructor(props) {
        super(props);

        const colors = _.map(props.segmentColors, segColor => Color.ToString(segColor));

        const { widgetBody, titleStyles, valueStyles , rangeValueStyles} = _.cloneDeep(props);

        widgetBody.backgroundColor = Color.ToString(props.appliedBackgroundColor);

        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}px`;

        rangeValueStyles.color = Color.ToString(rangeValueStyles.color);
        //rangeValueStyles.fontSize = `${rangeValueStyles.fontSize}px`;

        const isComboWidget = props.isComboWidget;

        this.state = {
            height: this.props.height,
            width: this.props.width,
            value: this.props.value,
            interpolateColor: interpolate((_.cloneDeep(colors))),
            max: this.props.max,
            min: this.props.min,
            label: `${this.props.displayValue}`,
            title: this.props.title,
            colors,
            valueStyles,
            titleStyles,
            widgetBody,
            isComboWidget,
            rangeValueStyles
        }
    }

    componentWillReceiveProps(nextProps) {
        const colors = _.map(nextProps.segmentColors, segColor => Color.ToString(segColor));

        const { widgetBody, titleStyles, valueStyles, rangeValueStyles } = _.cloneDeep(nextProps);

        widgetBody.backgroundColor = Color.ToString(nextProps.appliedBackgroundColor);

        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}px`;

        rangeValueStyles.color = Color.ToString(rangeValueStyles.color);
        //rangeValueStyles.fontSize = `${rangeValueStyles.fontSize}px`;


        const isComboWidget = nextProps.isComboWidget;

        this.setState({
            height: nextProps.height || this.state.height,
            width: nextProps.width || this.state.width,
            value: nextProps.value,
            interpolateColor: colors ? interpolate((_.cloneDeep(colors))) : this.state.interpolateColor,
            max: nextProps.max,
            min: nextProps.min,
            label: `${nextProps.displayValue}`,
            title: nextProps.title,
            colors,
            valueStyles,
            titleStyles,
            widgetBody,
            isComboWidget,
            rangeValueStyles
        })
    }

    shouldComponentUpdate(newProps, newState) {
        return (this.state.min !== newState.min
            || this.state.max !== newState.max
            || this.state.width !== newState.width
            || this.state.height !== newState.height
            || !_.isEqual(this.state.colors, newState.colors)
            || this.state.value !== newState.value
            || this.state.title !== newState.title
            || !_.isEqual(this.state.valueStyles, newState.valueStyles)
            || !_.isEqual(this.state.titleStyles, newState.titleStyles)
            || !_.isEqual(this.state.rangeValueStyles, newState.rangeValueStyles)
            || !_.isEqual(this.state.widgetBody, newState.widgetBody)
            || this.state.label !== newState.label);
    }

    render() {
        return (
            <div className="widget-content" style={this.state.widgetBody}>
                {this.renderGauge()}
            </div>
        );
    }

    renderGauge() {
        const minOfHeightAndwidth = this.state.height > this.state.width ? this.state.width * 0.75 : this.state.height * 0.75;
        let pcent = (this.state.value - this.state.min) / (this.state.max - this.state.min);
        if(isNaN(pcent)){
            pcent = 0;
        }
        const value =  pcent < 0 ? 0 : pcent > 1 ? 1 : pcent;
        const arrowColor = this.state.interpolateColor(value);

        return (
            <Gauge value={value * 100}
                size={minOfHeightAndwidth * 0.075}
                radius={minOfHeightAndwidth * 0.66}
                sections={this.state.colors}
                arrow={{ height: minOfHeightAndwidth * 0.5, width: minOfHeightAndwidth / 50, color: arrowColor }}
                label={this.state.label}
                valueStyles={this.state.valueStyles}
                title={this.state.title}
                titleStyles={this.state.titleStyles}
                rangeValueStyles ={this.state.rangeValueStyles}
                width={this.state.width}
                height={this.state.height}
                min={this.state.min}
                max={this.state.max}
                isComboWidget={this.state.isComboWidget}
            />
        );
    }
}

SpeedoWidget.PropTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    value: PropTypes.number,
    colors: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string
}

SpeedoWidget.defaultProps = {
    height: 0,
    width: 0,
    value: 50,
    colors: ["#8cc152", "#ffbe46", "#f23e3e"],
    min: 0,
    max: 100
}
