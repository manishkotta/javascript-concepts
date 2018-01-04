import React from 'react';


//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;
import { Tab, Tabs } from 'react-bootstrap';
import 'react-date-picker/index.css';
import StatisticsCategory from '../../lib/enums/statistic-category.enum';
import 'react-select/dist/react-select.css';
import ThresholdTab from './tabs-threshold.component'
import DataMetricsContainer from '../../routes/dashboard/new-dashboard/components/data-metrics';
import WidgetType from '../../lib/enums/widget-type.enum';


// TODO: The below code will be used in future phases when filters will be integrated. So just commenting it 
// const ItemOptions = [
//                         { value: "Call Duration", label: 'Call Duration' },
//                         { value: "Queue Time", label: 'Queue Time' },
//                         { value: "Answer Time", label: 'Answer Time' }, 
//                         { value: "Hold Time", label: 'Hold Time' }
//                     ];
// const FunctionOptions = [
//                             { value: "Sum", label: 'Sum' }, 
//                             { value: "Average", label: 'Average' }, 
//                             { value: "Maximum", label: 'Maximum' }, 
//                             { value: "Minimum", label: 'Minimum' }
//                         ];
// const groupOptions = [
//     { value: "SimpleDataValues", label: 'Simple Data Values' },
//     { value: "DirectoryDataValues", label: 'Directory Data Values' },
//     { value: "CTIDataValues", label: 'CTI Data Values' },
//     { value: "Campaign", label: 'Campaign' },
//     { value: "ACD", label: 'ACD' },
//     { value: "Coach", label: 'Coach' },
//     { value: "MiscReporting", label: 'MiscReporting' },
//     { value: "Others", label: 'Others' }
// ];

const groupItemOptions = {
    "SimpleDataValues": [
        { value: "1", label: 'Siteid' },
        { value: "2", label: 'TypeId' },
        { value: "3", label: 'Date' },
        { value: "4", label: 'Duration' }
    ],
    "DirectoryDataValues": [
        { value: "1", label: 'Dialedgroupname' },
        { value: "2", label: 'Firstextensionname' },
        { value: "3", label: 'Dialedextensionname' },
        { value: "4", label: 'Diallednotesname' }
    ],
    "CTIDataValues": [
        { value: "1", label: 'Agentdate' },
        { value: "2", label: 'Queuedate' },
        { value: "3", label: 'Agentreadytime' },
        { value: "4", label: 'Signontime' }
    ],
    "Campaign": [
        { value: "1", label: 'Campaigncalluid' },
        { value: "2", label: 'Campaigncallname' },
        { value: "3", label: 'Campaigncallcompany' },
        { value: "4", label: 'Campaigncallwaittime' }
    ],
    "ACD": [
        { value: "1", label: 'Acdagenttime' },
        { value: "2", label: 'Acdanswertime' },
        { value: "3", label: 'Acdringtime' },
        { value: "4", label: 'Acdqueuetime' }],
    "Coach": [
        { value: "1", label: 'CoachAssessmentName' },
        { value: "2", label: 'CoachAssessmentCompleted' },
        { value: "3", label: 'CoachAssessmentAssessor' },
        { value: "4", label: 'CoachAssessmentStartTimeCoach 4' }
    ],
    "MiscReporting": [
        { value: "1", label: 'MiscSubject' },
        { value: "2", label: 'MiscPeople' },
        { value: "3", label: 'MiscGroup' },
        { value: "4", label: 'CTICyRecordFilename' }
    ],
    "Others": [
        { value: "1", label: 'Previousdatetotalcalltime' },
        { value: "2", label: 'Previous20daytotalcalltime' },
        { value: "3", label: 'Previousmonthtotalcalltime' },
        { value: "4", label: 'Previousdayagentreadytime' }
    ]
}

export default class TabsLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGroup: props.widget.appliedSettings ? props.widget.appliedSettings.dataMetrics.group : '',
            groupItemOptions: [],
            selectedGroupItem: props.widget.appliedSettings ? props.widget.appliedSettings.dataMetrics.item : '',
            selectedFunction: props.widget.appliedSettings ? props.widget.appliedSettings.dataMetrics.func : '',
            currentTab: "first"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedGroup: nextProps.widget.appliedSettings ? nextProps.widget.appliedSettings.dataMetrics.group : '',
            selectedGroupItem: nextProps.widget.appliedSettings ? nextProps.widget.appliedSettings.dataMetrics.item : '',
            selectedFunction: nextProps.widget.appliedSettings ? nextProps.widget.appliedSettings.dataMetrics.func : '',
            currentTab: nextProps.newDashboard.currentTab

        })
    }
    /**
   * To get the statistic category based on the comboId
   * @param {*} widgetId 
   */
    getStatisticCategory(wt) {
        if (wt.isComboWidget) {
            return _.find(this.props.newDashboard.widgets, widget => widget.id == wt.comboId).appliedSettings.dataMetrics.statisticCategory;
        }
        else {
            return wt.appliedSettings.dataMetrics.statisticCategory ? wt.appliedSettings.dataMetrics.statisticCategory : StatisticsCategory.RealTime;
        }
    }
    /**
     * To get the column optons for combo custom statistics
     * @param {*} wt 
     */
    getColumns(wt) {
        if (!wt.isComboWidget) {
            return [];
        }
        let comboWidget = _.find(this.props.newDashboard.widgets, widget => widget.id == wt.comboId);
        if (comboWidget.appliedSettings.dataMetrics.statisticCategory == StatisticsCategory.Custom && !comboWidget.appliedSettings.dataMetrics.columnOptions) {
            this.props.loadColumnsForTab(comboWidget.appliedSettings.dataMetrics.query, comboWidget.id);
        }
        return comboWidget.appliedSettings.dataMetrics.statisticCategory == StatisticsCategory.Custom ? comboWidget.appliedSettings.dataMetrics.columnOptions : [];
    }
    /**
     * To update the group option value
     * @param {*} selectedGroup 
     */
    updateGroupOptions(selectedGroup) {
        this.setState({
            selectedGroup: selectedGroup != null ? selectedGroup.value : '',
            groupItemOptions: selectedGroup != null ? groupItemOptions[selectedGroup.value] : []
        });
    }
    /**
     * To update the group item
     * @param {*} selectedGroupItem 
     */
    updateGroupItem(selectedGroupItem) {
        this.setState({
            selectedGroupItem: selectedGroupItem != null ? selectedGroupItem.value : '',
        });
    }
    /**
     * To update the function item
     * @param {*} selectedFunc 
     */
    updateFunction(selectedFunc) {
        this.setState({
            selectedFunction: selectedFunc != null ? selectedFunc.value : ''
        });
    }
    /**
     * To save the date metrics options
     */
    saveDataMetrics() {
        this.props.SaveMetrics(
            {
                id: Date.now(),
                desc: '',
                group: this.state.selectedGroup,
                item: this.state.selectedGroupItem,
                func: this.state.selectedFunction
            },
            this.props.widget.id
        );
    }
    render() {
        return (
            <section>
                {
                    !this.props.widget.isComboWidget &&
                    <button
                        type="button"
                        className="btn  btn-preview btn-primary col-md-2 pull-right btnPreviewRtl"
                        onClick={(e) => this.props.PreviewWidget(this.props.widget)}  >
                        {this.props.l.t('Preview', 'Preview')}
                    </button>
                }
                <Tabs
                    activeKey={this.state.currentTab}
                    id="top"
                    onSelect={(e) => this.props.topTabsClick(e)}>
                    {/*<Tab eventKey="third" title="Filters">
                        <FiltersContainer {...this.props} />
                    </Tab>*/}
                    {
                        !this.props.widget.isComboWidget &&
                        <Tab eventKey="first" title={this.props.l.t('Data_Metrics', 'Data Metrics')}>
                            <DataMetricsContainer {...this.props} />
                        </Tab>
                    }
                    {!(this.props.widget.widgetType == WidgetType.Pie || this.props.widget.widgetType == WidgetType.Bar || this.props.widget.widgetType == WidgetType.Combo) &&
                        <Tab eventKey={!this.props.widget.isComboWidget ? "second" : "first"} title="Threshold">

                            <ThresholdTab
                                l={this.props.l}
                                addThreshold={(e, widgetId) => this.props.AddThreshold(e, widgetId)}
                                widgetId={this.props.widget.id}
                                widget={this.props.widget}
                                testThreshold={(e, widgetId) => this.props.TestThreshold(e, widgetId)} 
                                statisticsCategoryId={this.getStatisticCategory(this.props.widget)}
                                columnOptions={this.getColumns(this.props.widget)}
                                widgetType={this.props.widget.widgetType} />

                        </Tab>}
                    {/*
                    <Tab eventKey="fourth" title="NewFilters">
                        <Filters {...this.props} />                        
                    </Tab>*/}
                </Tabs>
            </section> 
        );
    }


}
