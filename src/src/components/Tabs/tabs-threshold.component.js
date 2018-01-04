"use srtict"
import React from 'react';
import _ from 'lodash';
import ThresholdAccordion from './tabs-threshold-accordion.component';
import * as Color from '../../lib/color-conversion';

export default class ThresholdTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: props.widget.appliedSettings ? props.widget.appliedSettings.thresholds : []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            levels: nextProps.widget.appliedSettings ? nextProps.widget.appliedSettings.thresholds : []
        })
    }

    /**
     * To add the selected levels to threshold list
     */
    addSelectedLevels() {
        this.props.addThreshold(this.state.levels, this.props.widgetId);
    }
    /**
     * To remove the levels
     * @param {*} id 
     */
    removeLevel(id) {
        const levels = _.filter(this.state.levels, (level) => level.id !== id);
        let newLevel = 1;
        _.map(levels, (oldLevel) => oldLevel.level = newLevel++);

        this.setState({
            levels
        });
    }

    /**
     * To add the levels
     */
    addLevels() {
        var arrayCount = this.state.levels.length || 0;
        var levels = this.state.levels || [];

        _.map(levels, (level) => level.expanded = false);

        levels.push({
            id: Date.now(),
            level: arrayCount + 1,
            levelValue: null,
            color: Color.getRandomColor(),
            soundFile: {},
            isContinuous: false,
            emailTo: '',
            smsTo: '',
            emailSubject: '',

            expanded: true
        });

        this.setState({
            levels
        })
    }
    /**
     * To update the levels list
     * @param {*} id 
     * @param {*} key 
     * @param {*} value 
     */
    updateLevel(id, key, value) {
        const level = _.find(this.state.levels, (level) => level.id === id);
        level[key] = value;
        this.setState({
            level
        })
    }
  /**
   * To expand accrodian.
   * @param {*} id 
   */
    handleClick(id) {
        const level = _.find(this.state.levels, (level) => level.id === id);
        level.expanded = !level.expanded;
        this.setState({ levels: this.state.levels });
    }
    handleTestClick(id) {
        const level = _.find(this.state.levels, (level) => level.id === id);

        this.props.testThreshold(level, this.props.widgetId);

    }

    render() {
        return (
            <div id='tabContentArea' className='margin20'>
                <div className='row' >
                    <div className="col-md-3 col-sm-6">
                        <button type="button" className="btn  btn-primary " onClick={this.addLevels.bind(this)} >
                            <i className="fa fa-plus"> </i>
                            &nbsp;New Threshold
                        </button>
                    </div>
                    <div className="col-md-offset-6  col-sm-offset-1  col-md-3 col-sm-5 ">
                        <button type="button" className="btn  btn-primary  pull-right" onClick={this.addSelectedLevels.bind(this)} >
                            Save all levels
                        </button>
                    </div>
                </div>

                <ThresholdAccordion
                    l={this.props.l}
                    levels={this.state.levels}
                    removeLevel={this.removeLevel.bind(this)}
                    updateLevel={this.updateLevel.bind(this)}
                    handleClick={this.handleClick.bind(this)}
                    statisticsCategoryId={this.props.statisticsCategoryId}
                    isComboWidget={this.props.widget.isComboWidget ? this.props.widget.isComboWidget : false}
                    columnOptions={this.props.columnOptions}
                    widgetType={this.props.widgetType}
                    handleTestClick={this.handleTestClick.bind(this)}
 
                />
            </div>
        )
    }


}

