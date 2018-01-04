import React from 'react';
import * as Color from '../../../../lib/color-conversion';
import _ from 'lodash';

export default class BoxWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.bindData(props);
    }
    componentWillReceiveProps(nextProps) {
        this.setState(this.bindData(nextProps))
    }

    bindData(requiredProps) {
        const { widgetBody, titleStyles, valueStyles } = _.cloneDeep(requiredProps);

        widgetBody.backgroundColor = Color.ToString(requiredProps.appliedBackgroundColor);

        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}px`;

        return {
            value: requiredProps.value,
            label: requiredProps.displayValue,
            title: requiredProps.title,
            isComboWidget: requiredProps.isComboWidget,
            widgetBody,
            titleStyles,
            valueStyles
        }

    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.state.value !== newState.value
            || this.state.title !== newState.title
            || this.state.label !== newState.label
            || !_.isEqual(this.state.valueStyles, newState.valueStyles)
            || !_.isEqual(this.state.titleStyles, newState.titleStyles)
            || !_.isEqual(this.state.widgetBody, newState.widgetBody)
        );
    }


    render() {
        return (
            <div className="widget-content centerAlign" style={this.state.widgetBody}>
                <div style={this.state.valueStyles}>
                    <span>{this.state.label}</span>
                </div>
                {(!this.state.isComboWidget) &&
                    <div className="widget-content-footer" style={this.state.titleStyles}>
                        <span>{this.state.title}</span>
                    </div>
                }
            </div>
        );
    }
}
