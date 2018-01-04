"use strict";
import React, { PropTypes } from 'react';
import _ from 'lodash';
import ThresholdTabContent from './tabs-threshold-content.component';


export default class ThresholdAccordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ..._.cloneDeep(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ..._.cloneDeep(nextProps)
        })
    }

    render() {
        return (
            <div>
                {_.map(this.state.levels, (level) =>
                    <ThresholdTabContent
                        l={this.props.l}
                        key={level.id}
                        removeLevel={this.props.removeLevel.bind(this, level.id)}
                        {...level}
                        updateLevel={this.props.updateLevel.bind(this)} 
                        handleClick={this.props.handleClick.bind(this)}
                        statisticsCategoryId={this.props.statisticsCategoryId}
                        isComboWidget={this.props.isComboWidget}
                        columnOptions={this.props.columnOptions}
                        widgetType={this.props.widgetType}
                        handleTestClick={this.props.handleTestClick.bind(this)}
                    />
                )}
            </div>
        );
    }
}
ThresholdAccordion.PropTypes = {
    levels: PropTypes.array.isRequired
}