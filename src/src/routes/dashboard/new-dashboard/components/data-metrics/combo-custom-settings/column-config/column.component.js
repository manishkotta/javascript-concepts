"use srtict"
import React from 'react';
import _ from 'lodash';
import ColumnAccordion from './column-accordion.component';
import * as Color from '../../../../../../../lib/color-conversion';

export class ComboCustomColumns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            columnExpanded: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps,

        })
    }
    addSelectedLevels() {
        this.props.addThreshold(this.state.levels, this.props.widgetId);
    }
    removeLevel(id) {
        const levels = _.filter(this.state.levels, (level) => level.id !== id);
        let newLevel = 1;
        _.map(levels, (oldLevel) => oldLevel.level = newLevel++);

        this.setState({
            levels
        });
        this.props.updateLevel(levels);
    }


    addLevels() {
        var arrayCount = this.state.levels.length || 0;
        var levels = this.state.levels || [];
        _.map(levels, (level) => level.expanded = false);
        levels.push({
            id: Date.now(),
            level: arrayCount + 1,
            levelValue: null,
            expanded: true,
            column: {},
            showZeroValues: false,
            displayFormat: {},
            dateFormat: {}
        });

        this.setState({
            levels
        })

    }

    updateLevel(id, key, value) {
        const level = _.find(this.state.levels, (level) => level.id === id);
        level[key] = value;
        this.setState({
            level
        })
        this.props.updateLevel(this.state.levels)
    }

    handleClick(id) {
        const level = _.find(this.state.levels, (level) => level.id === id);
        level.expanded = !level.expanded;
        this.setState({ levels: this.state.levels });
    }
    ToggleColumn() {
        this.setState({ columnExpanded: !this.state.columnExpanded });

    }

    render() {
        return (
            <div id='tabContentArea' className='margin20'>
                {
                    this.state.widget.appliedSettings.dataMetrics.query &&
                    <div className="accordion">
                        <div className="accordion-header" onClick={() => this.ToggleColumn()}>
                            <span className="pull-left rtl-pull-left">{this.props.l.t('ChooseSLASHConfigure_Column','Choose/Configure Column')}</span>
                            {
                                this.state.columnExpanded
                                    ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                                    : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                            }
                        </div>
                        {this.state.columnExpanded &&
                            <div className='padding_15px'>
                                <div className='row' >
                                    <div className="col-md-3 col-sm-6">
                                        <button type="button" className="btn btn-primary pull-left rtl-pull-left" disabled={!this.state.dataMetrics.columnOptoins.length > 0 || this.state.levels.length > this.state.dataMetrics.columnOptoins.length || this.state.widget.appliedSettings.dataMetrics.query == ""} onClick={this.addLevels.bind(this)} >
                                            <i className="fa fa-plus"> </i>
                                            &nbsp;{this.props.l.t('Add_Column','Add Column')}
                                    </button>
                                    </div>

                                </div>

                                <ColumnAccordion
                                    {...this.state}
                                    removeLevel={this.removeLevel.bind(this)}
                                    updateLevel={this.updateLevel.bind(this)}
                                    handleClick={this.handleClick.bind(this)}
                                />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }


}

export default ComboCustomColumns
