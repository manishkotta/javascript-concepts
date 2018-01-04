import React from 'react';
import _ from 'lodash';
import CustomSelect from '../../../../../../components/custom-dropdown';
import ToggleSwitch from '../../../../../../components/toggle-switch';
import StatisticCategory from '../../../../../../lib/enums/statistic-category.enum';
import CheckBoxListGroup from '../../../../../../components/check-box-list-group';
import RadioButtonGroup from '../../../../../../components/radio-button-group';
import WidgetType from '../../../../../../lib/enums/widget-type.enum';
import DragAndDropTable from '../../../../../../components/DragAndDropTable'

var comboEditItem = {};
export default class ComboRealTimeSettings extends React.Component {

    columns = [
        { name: 'Statistic Item', property: 'item.label' },
        { name: 'Aggregate Function', property: 'func.label' },
        { name: 'Display Format', property: 'displayFormat.label' },
        { name: 'Edit', property: 'Edit' },
        { name: 'Delete', property: 'Delete' },
    ]
    constructor(props) {
        super(props);
        //this.props.setSelectedStatisticCategory(props.dataMetrics.statisticCategory !== undefined ? props.dataMetrics.statisticCategory : StatisticCategory.RealTime, props.widget.widgetType, props.widget.id);
        let shouldEnableSetButton = props.widget.appliedSettings.dataMetrics.group;
        let shouldEnableAddItemButton = false;
        // shouldEnableAddItemButton = props.widget.appliedSettings.dataMetrics.group
        //     && props.widget.appliedSettings.dataMetrics.item
        //     && props.widget.appliedSettings.dataMetrics.func
        //     && props.widget.appliedSettings.dataMetrics.displayFormat
        // && props.widget.appliedSettings.dataMetrics.displayFormat

        //   shouldEnableAddItemButton =  !_.isEmpty(props.widget.appliedSettings.dataMetrics.widgetforStatisticItem,); 

        this.props.SetDataMetricsLoaded(true); // temporary
        this.state = {
            selectedGroup: props.widget.appliedSettings.dataMetrics.group,
            selectedItem: props.widget.appliedSettings.dataMetrics.item,
            selectedFunction: props.widget.appliedSettings.dataMetrics.func,
            selectedDisplayFormat: props.widget.appliedSettings.dataMetrics.displayFormat,
            groupOptions: props.dataMetrics.groupOptions || [],
            itemOptions: props.dataMetrics.itemOptions || [],
            functionOptions: props.dataMetrics.functionOptions || [],
            displayFormatOptions: props.dataMetrics.displayFormatOptions || [],
            statisticCategory: props.dataMetrics.statisticCategory || StatisticCategory.RealTime,
            widget: props.widget,
            openDrillDown: props.widget.appliedSettings.dataMetrics.group !== undefined ? true : false,
            drillDownOptions: props.dataMetrics.drillDownOptions || props.widget.appliedSettings.dataMetrics.drillDownOptions,
            enableAddItemButton: !_.isEmpty(props.widget.appliedSettings.dataMetrics.widgetforStatisticItem),
            enableSetButton: shouldEnableSetButton,
            isAddOpened: false,
            // comboSelectedStatisticItems: props.widget.appliedSettings.dataMetrics.comboSelectedStatisticItems,
            comboSelectedStatisticItems: props.dataMetrics.comboSelectedStatisticItems,
            applicableWidgets: props.dataMetrics.applicableWidgets || [],
            selectedWidgetforStatisticItem: props.widget.appliedSettings.dataMetrics.widgetforStatisticItem,
            isLoaded: true,
            items: this.rowLst,
            columns: this.columns
        }
    }
    deleteItem(e) {
    }
    editItem(e) {

    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== undefined
            && this.props.widget.appliedSettings.dataMetrics.statisticCategory !== undefined
            && nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== this.props.widget.appliedSettings.dataMetrics.statisticCategory) {
            this.props.setSelectedStatisticCategory(nextProps.widget.appliedSettings.dataMetrics.statisticCategory, nextProps.widget.widgetType, this.props.widget.id);
        }
        else if (nextProps.dataMetrics.statisticCategory === this.props.dataMetrics.statisticCategory && nextProps.widget.id !== this.props.widget.id) {
            this.props.setSelectedStatisticCategory(nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== undefined ? nextProps.widget.appliedSettings.dataMetrics.statisticCategory : StatisticCategory.RealTime, nextProps.widget.widgetType, this.props.widget.id);
            if (nextProps.widget.widgetType !== this.props.widget.widgetType) {
                this.props.updateWidgetSpecificStatisticCategories(nextProps.widget.widgetType);
            }
        }
        else {

            const newSelectedGroup = nextProps.dataMetrics.selectedGroup; // todo edited

            const newSelectedItem =
                !_.isEqual(nextProps.widget.appliedSettings.dataMetrics.item, this.state.widget.appliedSettings.dataMetrics.item)
                    ? nextProps.widget.appliedSettings.dataMetrics.item : nextProps.dataMetrics.selectedItem;

            const newSelectedFunction =
                !_.isEqual(nextProps.widget.appliedSettings.dataMetrics.func, this.state.widget.appliedSettings.dataMetrics.func)
                    ? nextProps.widget.appliedSettings.dataMetrics.func : nextProps.dataMetrics.selectedFunction;

            const newSelectedDisplayFormat =
                !_.isEqual(nextProps.widget.appliedSettings.dataMetrics.displayFormat, this.state.widget.appliedSettings.dataMetrics.displayFormat)
                    ? nextProps.widget.appliedSettings.dataMetrics.displayFormat : nextProps.dataMetrics.selectedDisplayFormat;

            const newselectedWidgetforStatisticItem =
                !_.isEqual(nextProps.widget.appliedSettings.dataMetrics.widgetforStatisticItem, this.state.widget.appliedSettings.dataMetrics.widgetforStatisticItem)
                    ? nextProps.widget.appliedSettings.dataMetrics.widgetforStatisticItem : nextProps.dataMetrics.selectedWidgetforStatisticItem;

            const statisticCategory =
                nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== this.state.widget.appliedSettings.dataMetrics.statisticCategory
                    ? nextProps.widget.appliedSettings.dataMetrics.statisticCategory : nextProps.dataMetrics.statisticCategory;

            const drillDownOptions = nextProps.dataMetrics.drillDownOptions;

            let shouldEnableSetButton = nextProps.dataMetrics.selectedGroup && nextProps.dataMetrics.comboSelectedStatisticItems && nextProps.dataMetrics.comboSelectedStatisticItems.length > 1;

            let shouldEnableAddItemButton = false;

            shouldEnableAddItemButton = !_.isEmpty(newselectedWidgetforStatisticItem);   // newSelectedGroup && newSelectedItem && newSelectedFunction && newSelectedDisplayFormat;
            let applicableWidgets = (nextProps.dataMetrics && nextProps.dataMetrics.applicableWidgets) || [{ value: WidgetType.Box, label: 'Box' }];
            this.setState({
                groupOptions: nextProps.dataMetrics.groupOptions,
                itemOptions: nextProps.dataMetrics.itemOptions || [],
                functionOptions: nextProps.dataMetrics.functionOptions || [],
                displayFormatOptions: nextProps.dataMetrics.displayFormatOptions || [],
                selectedGroup: nextProps.dataMetrics.selectedGroup,
                selectedItem: nextProps.dataMetrics.selectedItem,
                selectedFunction: nextProps.dataMetrics.selectedFunction,
                selectedDisplayFormat: nextProps.dataMetrics.selectedDisplayFormat,
                statisticCategory: nextProps.dataMetrics.statisticCategory,
                widget: nextProps.widget,
                // openDrillDown: nextProps.dataMetrics.openDrillDown !== undefined ? nextProps.dataMetrics.openDrillDown : this.state.openDrillDown,
                drillDownOptions,
                isDrillDownMultiSelect: nextProps.dataMetrics.isDrillDownMultiSelect,
                enableSetButton: shouldEnableSetButton,
                enableAddItemButton: shouldEnableAddItemButton,
                comboSelectedStatisticItems: nextProps.dataMetrics.comboSelectedStatisticItems,
                applicableWidgets: applicableWidgets,
                selectedWidgetforStatisticItem: nextProps.dataMetrics.selectedWidgetforStatisticItem,
                isLoaded: true

            })
        }
    }

    checkIsLoaded(nextProps) {
        // _.isEqual(nextProps.widget.appliedSettings.dataMetrics, {}) ||
        if (!nextProps.dataMetrics.isLoaded
            // ||
            // (_.isEqual(nextProps.widget.appliedSettings.dataMetrics.statisticCategory, nextProps.dataMetrics.statisticCategory)
            // //  &&
            //     // _.isEqualWith(nextProps.widget.appliedSettings.selectedGroup, nextProps.dataMetrics.selectedGroup, this.compare) 
            //     // &&
            //     // _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.item, nextProps.dataMetrics.selectedItem, this.compare) &&
            //     // _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.func, nextProps.dataMetrics.selectedFunction, this.compare) &&
            //     // _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.drillDownOptions, nextProps.dataMetrics.drillDownOptions, this.compareArr) &&
            //     // _.isEqualWith(nextProps.widget.appliedSettings.dataMetrics.displayFormat, nextProps.dataMetrics.selectedDisplayFormat, this.compare)
            // )
        ) {
            nextProps.SetDataMetricsLoaded(true);
        }
    }
    compare(objValue, othValue) {
        return objValue.id == othValue.id;
    }
    DeleteSelectedItem(e, comboSelectedStatisticItem) {
        if (!this.state.isEditMode) {
            this.props.removeComboStatisticItems(comboSelectedStatisticItem, this.props.widget.id);
        }

    }

    EditSelectedItem(e, comboSelectedStatisticItem) {
        this.clearEdit()
        this.setState({ isAddOpened: true, isEditMode: true });
        comboEditItem = comboSelectedStatisticItem;
        this.props.EditGridSelectedItem(comboSelectedStatisticItem, this.props.widget.id);
    }

    clearEdit() {
        let editItem = _.find(this.state.comboSelectedStatisticItems, c => c.isEditing == true);
        if (editItem) {
            editItem.isEditing = false;
        }

    }

    OpenAddItem(e) {
        this.setState({ isAddOpened: !this.state.isAddOpened, isEditMode: false });
        this.clearEdit()
        this.props.clearDropdowns();
    }

    CloseAddItem(e) {

        this.setState({ isAddOpened: false, isEditMode: false });
        this.clearEdit()
        this.props.clearDropdowns();
    }

    AddComboStatisticItem(e) {
        this.props.addComboStatisticItems({
            id: Date.now() + Math.floor(Math.random() * 10000),
            item: _.cloneDeep(this.state.selectedItem),
            func: _.cloneDeep(this.state.selectedFunction),
            displayFormat: _.cloneDeep(this.state.selectedDisplayFormat),
            widget: _.cloneDeep(this.state.selectedWidgetforStatisticItem),

        }, this.props.widget.id);
    }

    SaveEditedComboStatisticItem(e) {
        this.props.SaveEditedComboStatisticItem(comboEditItem, {
            item: _.cloneDeep(this.state.selectedItem),
            func: _.cloneDeep(this.state.selectedFunction),
            displayFormat: _.cloneDeep(this.state.selectedDisplayFormat),
            widget: _.cloneDeep(this.state.selectedWidgetforStatisticItem)
        }, this.props.widget.id);
    }

    saveComboDataMetrics() {

        this.props.SaveComboMetrics(this.state.statisticCategory, this.state.selectedGroup, this.state.comboSelectedStatisticItems, this.state.drillDownOptions, this.props.widget.id);
    }

    renderComboDrillDown() {

        if (!this.state.drillDownOptions) {
            this.props.getComboDrillDownMetaData(this.state.selectedGroup, this.props.widget.id);
        }
        else {
            return (
                <div className="row">
                    <div className="metrics-label col-md-4">
                        {this.props.l.t('Select_filter_s_COLON', 'Select filter(s):')}
                    </div>
                    <div className="drilldown-layout combo-drilldown-layout col-md-5 col-sm-7">
                        {
                            <CheckBoxListGroup checkList={this.state.drillDownOptions} onChange={(e) => this.props.updateComboDrillDownOptions(e, this.props.widget.id)} label="" />
                        }
                    </div>
                </div>
            );
        }
    }

    toggleDrillDown() {
        this.setState({
            openDrillDown: !this.state.openDrillDown
        })
    }

    onStatisticItemChange(e) {

        if (e.id)
            this.props.setItemAndGetFunctions(e)
        //this.props.getFunctionsData(e, this.state.widget.widgetType, this.state.widget.id)
    }

    onFunctionChange(e) {
        if (e.id)
            this.props.setFunctionAndGetDisplayFormat(e)
        // this.props.getSelectedDisplayFormat(e, this.state.widget.widgetType)
    }

    onDisplayFormatChange(e) {
        if (e.id)
            this.props.getApplicableWidget(e)
    }

    onGroupChange(e) {
        if (e.id) {
            this.setState({
                openDrillDown: true,
            })
        }
        this.CloseAddItem();
        this.props.getGridItemsData(e, this.state.widget.widgetType, this.state.widget.id)
    }
    /**
     * To change the order from up
     * @param {*} e 
     * @param {*} index 
     */
    onOrderChangeUp(e, index) {
        let comboSelectedStatisticItems = _.cloneDeep(this.state.comboSelectedStatisticItems);
        let elementUp = comboSelectedStatisticItems[index];
        comboSelectedStatisticItems[index] = comboSelectedStatisticItems[index - 1];
        comboSelectedStatisticItems[index - 1] = elementUp;
        this.updatecomboSelectedStatisticItems(comboSelectedStatisticItems);
    }
    /**
     * To change the order down 
     * @param {*} e 
     * @param {*} index 
     */
    onOrderChangeDown(e, index) {
        let comboSelectedStatisticItems = _.cloneDeep(this.state.comboSelectedStatisticItems);
        let elementDown = comboSelectedStatisticItems[index];
        comboSelectedStatisticItems[index] = comboSelectedStatisticItems[index + 1];
        comboSelectedStatisticItems[index + 1] = elementDown;
        this.updatecomboSelectedStatisticItems(comboSelectedStatisticItems);
    }

    onRowOrderChanged(rows) {
        console.log(rows)
        this.updatecomboSelectedStatisticItems(rows);
    }

    updatecomboSelectedStatisticItems(comboSelectedStatisticItems) {
        this.props.updatecomboSelectedStatisticItems(comboSelectedStatisticItems);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="metrics-label col-md-4">
                        <text>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </text>

                    </div>
                    <div className="col-md-5 col-sm-7">
                        <CustomSelect name="field-group-options" value={this.state.selectedGroup} placeholder='Select...' options={this.state.groupOptions} onChange={(e) => this.onGroupChange(e)} />
                    </div>
                    {
                        this.state.selectedGroup &&
                        <div className="drill-icon" onClick={(e) => this.toggleDrillDown(e)}>
                            <i className="fa fa-filter"></i>
                        </div>
                    }

                </div>
                <div className="row">
                    {
                        this.state.openDrillDown && this.state.selectedGroup &&
                        this.renderComboDrillDown()
                    }
                </div>
                <div>

                    {this.state.isAddOpened &&
                        <div >
                            <div className="row">
                                <div className="col-xs-12 box-header-button">
                                    <div className="box box-primary no-margin">
                                        <div className="box-header">
                                            <h3 className="box-title">{this.props.l.t('Add_SLASH_Edit', 'Add / Edit')}</h3>
                                            <div className="box-tools pull-right rtl-pull-right" style={{ position: 'relative', top: 0 }}>
                                                <button className="btn btn-box-tool" data-widget="remove" onClick={(e) => this.CloseAddItem(e)} ><i className="fa fa-remove"></i></button>
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>{this.props.l.t('Statistic_Item', 'Statistic Item')}</label>
                                                        <div className="row">
                                                            <div className="col-md-10 col-lg-12">
                                                                <CustomSelect name="field-item-options"
                                                                    value={this.state.selectedItem}
                                                                    placeholder='Select...'
                                                                    options={this.state.itemOptions}
                                                                    onChange={(e) => this.onStatisticItemChange(e)}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>{this.props.l.t('Aggregate_Function', 'Aggregate Function')}</label>
                                                        <div className="row">
                                                            <div className="col-md-10 col-lg-12">
                                                                <CustomSelect name="field-function-options"
                                                                    value={this.state.selectedFunction}
                                                                    placeholder='Select...'
                                                                    options={this.state.functionOptions}
                                                                    onChange={(e) => this.onFunctionChange(e)}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>{this.props.l.t('Display_Format', 'Display Format')}</label>
                                                        <div className="row">
                                                            <div className="col-md-10 col-lg-12">
                                                                <CustomSelect name="field-display-format-options"
                                                                    value={this.state.selectedDisplayFormat}
                                                                    placeholder='Select...'
                                                                    options={this.state.displayFormatOptions}
                                                                    onChange={(e) => this.onDisplayFormatChange(e)}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>{this.props.l.t('Select_Widget', 'Select Widget')}</label>
                                                        <div className="row">
                                                            <div className="col-md-10 col-lg-12">
                                                                <CustomSelect name="field-display-format-options"
                                                                    value={this.state.selectedWidgetforStatisticItem}
                                                                    placeholder='Select...'
                                                                    options={this.state.applicableWidgets}
                                                                    onChange={(e) => this.props.setApplicableWidget(e, this.state.widget.id)}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="pull-right rtl-pull-right box-row-button">
                                                    <div className="col-md-5">
                                                        {
                                                            !this.state.isEditMode &&
                                                            <button disabled={!this.state.enableAddItemButton} type="submit" className="btn btn-primary" onClick={(e) => this.AddComboStatisticItem(e)} >
                                                                {this.props.l.t('Add_Item', 'Add Item')}
                                                            </button>
                                                        }
                                                        {
                                                            this.state.isEditMode &&
                                                            <button disabled={!this.state.enableAddItemButton} type="submit" className="btn btn-primary" onClick={(e) => this.SaveEditedComboStatisticItem(e)} >
                                                                {this.props.l.t('Edit_Item', 'Edit Item')}
                                                            </button>
                                                        }
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button type="button" className="btn btn-primary" onClick={(e) => this.CloseAddItem(e)} >
                                                            {this.props.l.t('Cancel', 'Cancel')}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                            <br />
                        </div>
                    }
                    <div id="grid_base">

                        <div className="row">
                            <div className="col-xs-12 box-header-button">
                                <div className="box no-margin">
                                    <div className="box-header">
                                        <h3 className="box-title">{this.props.l.t('Selected_Statistic_items', 'Selected Statistic items')}</h3>
                                        <div className="box-tools pull-right rtl-pull-right" style={{ position: 'relative', top: 0 }}>
                                            <button id="inputform_base_but" className="btn btn-sm btn-primary box-header-button" type="button" onClick={(e) => this.OpenAddItem(e)} >
                                                {this.props.l.t('Add_Statistic_Item', 'Add Statistic Item')}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="table-responsive" style={{ display: 'none' }}>
                                                    <table id="example1" className="table table-bordered table-striped no-margin">
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>{this.props.l.t('Statistic_Item', 'Statistic Item')}</th>
                                                                <th>{this.props.l.t('Aggregate_Function', 'Aggregate Function')}</th>
                                                                <th>{this.props.l.t('Display_Format', 'Display Format')}</th>
                                                                <th>{this.props.l.t('Edit', 'Edit')}</th>
                                                                <th>{this.props.l.t('Delete', 'Delete')}</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                _.map(this.state.comboSelectedStatisticItems, (comboSelectedStatisticItem, i) => (
                                                                    (<tr key={i} className={comboSelectedStatisticItem.isEditing ? "edit-row" : ""}>
                                                                        <td className='td-center-align'>
                                                                            {
                                                                                comboSelectedStatisticItem.isDefault || i == this.state.comboSelectedStatisticItems.length - 1 ? <a className="td-disabled arrow-space "><i className="fa fa-caret-down icon-size" ></i></a> : <a className="arrow-space" onClick={(e) => this.onOrderChangeDown(e, i)} href="javascript:void(0)"><i className="fa fa-caret-down icon-size" ></i></a>
                                                                            }
                                                                            {
                                                                                comboSelectedStatisticItem.isDefault || i == 1 ? <a className="td-disabled"><i className="fa fa-caret-up icon-size" aria-hidden='true' ></i></a> : <a onClick={(e) => this.onOrderChangeUp(e, i)} href="javascript:void(0)" ><i className="fa fa-caret-up icon-size" ></i></a>
                                                                            }
                                                                        </td>
                                                                        <td>{comboSelectedStatisticItem.item.label}</td>
                                                                        <td>{comboSelectedStatisticItem.func.label}</td>
                                                                        <td>{comboSelectedStatisticItem.displayFormat.label}</td>
                                                                        {
                                                                            comboSelectedStatisticItem.isDefault ? <td className="td-disabled " ><i className="fa fa-edit"></i></td> : <td onClick={(e) => this.EditSelectedItem(e, comboSelectedStatisticItem)} ><i className="fa fa-edit pointer"></i></td>
                                                                        }
                                                                        {
                                                                            comboSelectedStatisticItem.isDefault ? <td className="td-disabled" ><i className="fa fa-trash-o"></i></td> : <td disabled={this.state.isEditMode} onClick={(e) => this.DeleteSelectedItem(e, comboSelectedStatisticItem)} ><i className="fa fa-trash-o pointer"></i></td>
                                                                        }

                                                                    </tr>)
                                                                ))
                                                            }


                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="table-responsive">
                                                    <DragAndDropTable rowOnDragClass={"drag-highlight"} columns={this.state.columns} rows={this.state.comboSelectedStatisticItems} onDelete={this.DeleteSelectedItem.bind(this)} onEdit={this.EditSelectedItem.bind(this)} onRowOrderChange={this.onRowOrderChanged.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className=" col-md-offset-10  col-md-4 col-sm-offset-6 col-sm-6">
                        <button disabled={!this.state.enableSetButton} type="button" onClick={() => this.saveComboDataMetrics()} className=" btn btn-primary" >{this.props.l.t('Apply', 'Apply')}</button>
                    </div>
                </div>
            </div>
        )
    }
}
