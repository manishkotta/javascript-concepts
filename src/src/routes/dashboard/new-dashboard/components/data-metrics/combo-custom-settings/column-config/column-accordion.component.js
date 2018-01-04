"use strict";
import React, { PropTypes } from 'react';
import _ from 'lodash';
import ColumnContent from './column-content.component';


export default class ColumnAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        })
    }

    render() {
        return (
            <div>
                {_.map(this.state.widget.appliedSettings.dataMetrics.query == "" ? [] : this.state.levels, (level, i) =>

                    <ColumnContent
                        {...this.state}
                        key={i}
                        removeLevel={this.props.removeLevel.bind(this, level.id)}
                        {...level}
                        updateLevel={this.props.updateLevel.bind(this)}
                        handleClick={this.props.handleClick.bind(this)}
                    />
                )}
            </div>
        );
    }
}
ColumnAccordion.PropTypes = {
    levels: PropTypes.array.isRequired
}