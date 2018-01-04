import React from 'react';
// import '../../../styles/headerStyles.css';
import _ from 'lodash';
import CustomSelect from '../../../../../../components/custom-dropdown';
import ToggleSwitch from '../../../../../../components/toggle-switch';
import StatisticCategory from '../../../../../../lib/enums/statistic-category.enum';
import CheckBoxListGroup from '../../../../../../components/check-box-list-group';
import RadioButtonGroup from '../../../../../../components/radio-button-group';
import CustomStatisticsSettings from '../custom-statistics-settings';
export default class DataMetrics extends React.Component {
    constructor(props) {
        super(props);
        //moved methods into willmount

        this.state = {
            selectedGroup: props.widget.appliedSettings.group,
            selectedItem: props.dataMetrics.selectedItem,
            selectedFunction: props.dataMetrics.selectedFunction,
            selectedDisplayFormat: props.dataMetrics.selectedDisplayFormat,
            groupOptions: props.dataMetrics.groupOptions || [],
            itemOptions: props.dataMetrics.itemOptions || [],
            functionOptions: props.dataMetrics.functionOptions || [],
            storeProcOptions: props.dataMetrics.storeProcOptions || [],
            displayFormatOptions: props.dataMetrics.displayFormatOptions || [],
            statisticCategory: props.dataMetrics.statisticCategory || StatisticCategory.RealTime,
            statisticCategoryOptions: props.dataMetrics.statisticCategoryOptions || [],
            widget: props.widget,
            openDrillDown: props.dataMetrics.openDrillDown !== undefined ? props.dataMetrics.openDrillDown : true,
            drillDownOptions: props.dataMetrics.drillDownOptions || props.widget.appliedSettings.dataMetrics.drillDownOptions,
            isDrillDownMultiSelect: props.dataMetrics.isDrillDownMultiSelect,
            enableSetButton: props.dataMetrics.statisticCategory == StatisticCategory.RealTime ? props.widget.appliedSettings.dataMetrics.group && props.widget.appliedSettings.dataMetrics.item && props.widget.appliedSettings.dataMetrics.func && props.widget.appliedSettings.dataMetrics.displayFormat : props.widget.appliedSettings.dataMetrics.group && props.widget.appliedSettings.dataMetrics.item,
            isDirty: false,
            isLoaded: false
        }
    }
    componentWillMount() {
        this.props.SetDataMetricsDirty(false);
        this.props.SetDataMetricsLoaded(false);
        this.props.getStoreProcs(); // havent touched this part
        // if (!((props.dataMetrics.statisticCategoryOptions && props.dataMetrics.statisticCategoryOptions.length) && (props.dataMetrics.groupOptions && props.dataMetrics.groupOptions.length))) {
        //     props.getMetaData(props.widget.widgetType);
        // }

        // this.props.setSelectedStatisticCategory(props.widget.appliedSettings.dataMetrics.statisticCategory !== undefined ? props.widget.appliedSettings.dataMetrics.statisticCategory : StatisticCategory.RealTime, props.widget.widgetType, props.widget.id);

    }
    componentWillReceiveProps(nextProps) {
        // this.checkIsDirty(nextProps);
         
        this.checkIsLoaded(nextProps);

        this.setState({
            groupOptions: nextProps.dataMetrics.groupOptions,
            itemOptions: nextProps.dataMetrics.itemOptions || [],
            functionOptions: nextProps.dataMetrics.functionOptions || [],
            storeProcOptions: nextProps.dataMetrics.storeProcOptions || [],
            displayFormatOptions: nextProps.dataMetrics.displayFormatOptions || [],
            selectedGroup: nextProps.dataMetrics.selectedGroup,
            selectedItem: nextProps.dataMetrics.selectedItem,
            selectedFunction: nextProps.dataMetrics.selectedFunction,
            selectedDisplayFormat: nextProps.dataMetrics.selectedDisplayFormat,
            statisticCategory: nextProps.dataMetrics.statisticCategory,
            statisticCategoryOptions: nextProps.dataMetrics.statisticCategoryOptions || [],
            widget: nextProps.widget,
            //openDrillDown: nextProps.dataMetrics.openDrillDown !== undefined ? nextProps.dataMetrics.openDrillDown : this.state.openDrillDown,
            drillDownOptions: nextProps.dataMetrics.drillDownOptions,
            isDrillDownMultiSelect: nextProps.dataMetrics.isDrillDownMultiSelect,
            enableSetButton: nextProps.dataMetrics.statisticCategory == StatisticCategory.RealTime ? nextProps.dataMetrics.selectedGroup && nextProps.dataMetrics.selectedGroup.id && nextProps.dataMetrics.selectedItem && nextProps.dataMetrics.selectedItem.id && nextProps.dataMetrics.selectedFunction && nextProps.dataMetrics.selectedFunction.id && nextProps.dataMetrics.selectedDisplayFormat && nextProps.dataMetrics.selectedDisplayFormat.id
                : nextProps.dataMetrics.selectedGroup && nextProps.dataMetrics.selectedItem && nextProps.dataMetrics.selectedGroup.id && nextProps.dataMetrics.selectedItem.id
            //enableSetButton:true
        })
    }

    checkIsLoaded(nextProps) {
        if (nextProps.widget.appliedSettings.dataMetrics.statisticCategory != StatisticCategory.Custom) {
            if (_.isEqual(nextProps.widget.appliedSettings.dataMetrics, {}) || nextProps.dataMetrics.isLoaded ||
                (_.isEqual(nextProps.widget.appliedSettings.dataMetrics.statisticCategory, nextProps.dataMetrics.statisticCategory) &&
                    _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.group, nextProps.dataMetrics.selectedGroup, this.compare) &&
                    _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.item, nextProps.dataMetrics.selectedItem, this.compare) &&
                    _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.func, nextProps.dataMetrics.selectedFunction, this.compare) &&
                    _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.drillDownOptions, nextProps.dataMetrics.drillDownOptions, this.compareArr) &&
                    //_.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.group, nextProps.dataMetrics.selectedGroup, this.compare) &&
                    _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.displayFormat, nextProps.dataMetrics.selectedDisplayFormat, this.compare))) {
                nextProps.SetDataMetricsLoaded(true);
            }
        }
        else {
            nextProps.SetDataMetricsLoaded(false);
        }
    }

    checkIsDirty(props) {
        if (props.dataMetrics.isLoaded &&
            (!_.isEqual(props.widget.appliedSettings.dataMetrics.statisticCategory, props.dataMetrics.statisticCategory) ||
                !_.isEqualWith(props.widget.appliedSettings.dataMetrics.group, props.dataMetrics.selectedGroup, this.compare) ||
                !_.isEqualWith(props.widget.appliedSettings.dataMetrics.item, props.dataMetrics.selectedItem, this.compare) ||
                !_.isEqualWith(props.widget.appliedSettings.dataMetrics.func, props.dataMetrics.selectedFunction, this.compare) ||
                !_.isEqualWith(props.widget.appliedSettings.dataMetrics.displayFormat, props.dataMetrics.selectedDisplayFormat, this.compare))
        )
            props.SetDataMetricsDirty(true);
        else
            props.SetDataMetricsDirty(false);
    }

    compare(objValue, othValue) {
        return objValue.id == othValue.id;
    }

    compareArr(objValue, othValue) {
        if (!objValue || !othValue)
            return false
        let compare = true
        _.forEach(objValue, (_obj) => {
            let val = _.find(othValue, (_oth) => (_obj == _oth.value || _obj.value == _oth.value)) // can add _oth.checked into find
            if (!val)
                compare = false
        })
        return compare
    }

    onGroupsChange(_statisticGroup) {
        if (!_statisticGroup.id)
            return;
        this.setState({
            openDrillDown: true
        });
        this.props.updateDrillDownOptions([]);
        this.props.setGroupAndGetItems(_statisticGroup)
    }

    onStatisticItemChange(_statisticItem) {
        if (_statisticItem.id) {
            //todo check if drill down is opened
            this.props.setItemAndGetFunctions(_statisticItem);
            this.props.getDrillDownMetaData(_statisticItem);
        }
    }

    onStatisticFunctionChange(_statisticFunction) {
        if (_statisticFunction.id)
            this.props.setFunctionAndGetDisplayFormat(_statisticFunction)
    }

    onDisplayFormatChange(_displayFormat) {
        if (_displayFormat.id)
            this.props.setSelectedDisplayFormat(_displayFormat)
    }

    saveDataMetrics() {
        this.props.SaveMetrics(
            {
                id: Date.now(),
                desc: '',
                group: _.cloneDeep(this.state.selectedGroup),
                item: _.cloneDeep(this.state.selectedItem),
                func: _.cloneDeep(this.state.selectedFunction),
                displayFormat: _.cloneDeep(this.state.selectedDisplayFormat),
                statisticCategory: _.cloneDeep(this.state.statisticCategory),
                drillDownOptions: _.cloneDeep(this.state.drillDownOptions)
            },
            this.props.widget.id
        );
        this.props.SetDataMetricsDirty(false);
    }

    toggleDrillDown() {
        this.setState({
            openDrillDown: !this.state.openDrillDown
        })
    }

    render() {
        return (
            <div className="col-md-12 edit-form" id='tabContentArea'>
                <div className="row">
                    <div className="metrics-label col-md-4">
                        <text>{this.props.l.t('StatisticsCOLON', 'Statistics:')} </text>
                    </div>
                    <div className="col-md-8 col-sm-8">
                        <ToggleSwitch
                            nodes={this.state.statisticCategoryOptions}
                            checkedNode={this.state.statisticCategory}
                            onChange={(e) => this.props.setSelectedStatisticCategory(e, this.state.widget.widgetType, this.state.widget.id)} />
                    </div>

                </div>
                {
                    (this.state.statisticCategory == StatisticCategory.Custom) ? <CustomStatisticsSettings {...this.props} /> :
                        <div id="realcyReport">
                            <div className="row">
                                <div className="metrics-label col-md-4">
                                    <text>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </text>
                                </div>
                                <div className="col-md-5 col-sm-7">
                                    <CustomSelect name="field-group-options" value={this.state.selectedGroup} placeholder='Select...' options={this.state.groupOptions} onChange={(e) => this.onGroupsChange(e)} />
                                </div>
                                {

                                    this.state.selectedItem && this.state.selectedItem.id && this.state.statisticCategory == StatisticCategory.RealTime &&
                                    <div className="drill-icon">
                                        <i onClick={(e) => this.toggleDrillDown(e)} className="fa fa-filter"></i>
                                    </div>
                                }
                            </div>
                            <div className="row">
                                <div className="metrics-label col-md-4">
                                    <text>{this.props.l.t('Statistic_Item', 'Statistic Item')} </text>
                                </div>
                                <div className="col-md-5 col-sm-7">
                                    <CustomSelect name="field-item-options" value={this.state.selectedItem} placeholder='Select...' options={this.state.itemOptions} onChange={(e) => this.onStatisticItemChange(e)} />

                                </div>
                            </div>
                            {
                                this.state.statisticCategory == StatisticCategory.RealTime && this.state.selectedGroup && this.state.selectedGroup.id && this.state.openDrillDown ?
                                    <div className="row">
                                        <div className="metrics-label col-md-4">
                                            {this.props.l.t('Select_filter_s_COLON', 'Select filter(s):')}
                                    </div>

                                        <div className="drilldown-layout col-md-5 col-sm-7">
                                            {
                                                this.state.drillDownOptions && this.state.drillDownOptions.length > 0 ?
                                                    this.state.isDrillDownMultiSelect
                                                        ? <CheckBoxListGroup checkList={this.state.drillDownOptions} onChange={(e) => this.props.updateDrillDownOptions(e)} label="" />
                                                        : <RadioButtonGroup radioList={this.state.drillDownOptions} onChange={(e) => this.props.updateDrillDownOptions(e)} label="" />
                                                    : <p className='padding10px'>   {this.props.l.t('Please_select_a_statistic_item', 'Please select a statistic item')} </p>
                                            }
                                        </div>
                                    </div> : null
                            }
                            <div className="row">
                                <div className="metrics-label col-md-4">
                                    <text>{this.props.l.t('Statistic_FunctionCOLON', 'Statistic Function:')} </text>
                                </div>
                                {
                                    this.state.statisticCategory == StatisticCategory.RealTime ?
                                        <div className="col-md-5 col-sm-7">
                                            <CustomSelect name="field-function-options" value={this.state.selectedFunction} placeholder='Select...' options={this.state.functionOptions} onChange={(e) => this.onStatisticFunctionChange(e)} />
                                        </div>
                                        : <div className="metrics-data-label col-md-5 col-sm-7">
                                            <text>{this.state.functionOptions && this.state.functionOptions.length > 0 ? this.state.functionOptions[0].label : 'None'}</text>
                                        </div>
                                }
                            </div>
                            <div className="row">
                                <div className="metrics-label col-md-4">
                                    <text>{this.props.l.t('Display_Format', 'Display Format')} </text>
                                </div>
                                {
                                    this.state.statisticCategory == StatisticCategory.RealTime ?
                                        <div className="col-md-5 col-sm-7">
                                            <CustomSelect name="field-display-format-options" value={this.state.selectedDisplayFormat} placeholder='Select...' options={this.state.displayFormatOptions} onChange={(e) => this.onDisplayFormatChange(e)} />
                                        </div> : <div className="metrics-data-label col-md-5 col-sm-7">
                                            <text >{this.state.displayFormatOptions && this.state.displayFormatOptions.length > 0 ? this.state.displayFormatOptions[0].label : 'None'}</text>
                                        </div>
                                }
                            </div>
                            <div className="row">
                                <div className=" col-md-offset-5  col-md-4 col-sm-offset-2 col-sm-6">
                                    <button disabled={!this.state.enableSetButton} type="button" onClick={() => this.saveDataMetrics()} className=" btn btn-md btn-primary btn-block" >{this.props.l.t('Apply', 'Apply')}</button>
                                </div>
                            </div>
                        </div>
                }
            </div>

        );
    }

}
