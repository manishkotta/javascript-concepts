import React from 'react';
import ReactDom from 'react-dom';
import * as Color from '../../../../lib/color-conversion';
import CircularArc from './circular-progress-arc';

export default class CircularProgressComponent extends React.Component {
    constructor(props) {
        super(props);
        const { titleStyles, valueStyles, widgetBody } = _.cloneDeep(props);
        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}`;
        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}`;
        this.state = {
            ...props, titleStyles, valueStyles
        }
    }
    componentWillReceiveProps(nextProps) {
        const { titleStyles, valueStyles, widgetBody } = _.cloneDeep(nextProps);
        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}`;
        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}`;
        this.setState({
            ...nextProps, titleStyles, valueStyles
        })
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            // this.state.min !== newState.min
            // || this.state.max !== newState.max

            // || this.state.ratio !== newState.ratio
            // ||
            this.state.width !== newState.width
            || this.state.height !== newState.height
            || !_.isEqual(this.state.valueStyles, newState.valueStyles)
            || !_.isEqual(this.state.titleStyles, newState.titleStyles)
            || !_.isEqual(this.state.widgetBody, newState.widgetBody)
            || this.state.title !== newState.title
            || this.state.value !== newState.value
            || this.state.min !== newState.min
            || this.state.max !== newState.max
            || this.state.appliedBackgroundColor !== newState.appliedBackgroundColor
            || this.state.showMaxValueOnWidget !== newState.showMaxValueOnWidget
        );
    }

    render() {
        return (
                <CircularArc {...this.state} />
        );
    }
}
