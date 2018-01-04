import React from 'react';
import '../../../styles/headerStyles.css';
import 'react-select/dist/react-select.css';
import ToggleSwitch from '../../toggle-switch';
import Select from '../../dropdown';
import * as ConstantValues from '../../../constants/constantValues';
import * as  Date from '../../../lib/date-conversion';
var PropTypes = require('prop-types');

export default class ClockSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHoursFormat: props.widget.selectedHoursFormat,
            selectedTimeFormat: props.widget.selectedTimeFormat,
            selectedDateFormat: props.widget.selectedDateFormat,
            selectedTimeZoneItem: props.widget.timezoneLabel == "" ? null : props.widget.selectedTimeZoneItem,
            isAnalog: props.widget.isAnalog,
            tzoneText: props.tzoneText,
            disabled: true,
            displayDate: props.widget.isAnalog ? false : true,
            displayDays: props.widget.isAnalog ? false : true,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedHoursFormat: !nextProps.clock.selectedHoursFormat ? 0 : nextProps.clock.selectedHoursFormat,
            selectedTimeFormat: !nextProps.clock.selectedTimeFormat ? 0 : nextProps.clock.selectedTimeFormat,
            selectedDateFormat: nextProps.clock.selectedDateFormat,
            selectedTimeZoneItem: Object.keys(nextProps.clock.selectedTimeZoneItem).length === 0
                && nextProps.clock.selectedTimeZoneItem.constructor === Object ? null : nextProps.clock.selectedTimeZoneItem,
            tzoneText: nextProps.clock.tzoneText,
            isAnalog: nextProps.clock.isAnalog,
            displayDate: nextProps.clock.displayDate,
            displayDays: nextProps.clock.displayDays,
        })
    }

    render() {
        return (
            <div className="col-md-12 col-sm-12 editorContent">
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline" >{this.props.l.t("Clock Type:", "Clock Type:")} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    checkedNode={this.state.isAnalog}
                                    nodes={[{ label: "Analog", value: true }, { label: "Digital", value: false }]}
                                    onChange={(e) => this.props.updateClock(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.state.isAnalog ?
                        <div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="metrics-label col-md-4">
                                            <text>{this.props.l.t("Hours Format:", "Hours Format:")} </text>
                                        </div>
                                        <div className="col-md-5 col-sm-7">
                                            <Select
                                                value={this.state.selectedHoursFormat}
                                                disabled={this.state.isAnalog}
                                                placeholder='Select...'
                                                options={ConstantValues.hoursFormat}
                                                onChange={(e) => this.props.setSelectedHoursFormat(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="metrics-label col-md-4">
                                            <label className="control-label inline"> {this.props.l.t("Time Format:", "Time Format:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-5">
                                            <Select
                                                disabled={this.state.isAnalog}
                                                value={this.state.selectedTimeFormat}
                                                placeholder='Select...'
                                                options={ConstantValues.timeFormat}
                                                onChange={(e) => this.props.setSelectedTimeFormat(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline">{this.props.l.t("Display Days:", "Display Days:")}</label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ToggleSwitch
                                                disabled={this.state.isAnalog}
                                                className="form-control disabled"
                                                nodes={[{ label: "Yes", value: true, isDisabled: this.state.isAnalog }, { label: "No", value: false, isDisabled: this.state.isAnalog }]}
                                                checkedNode={this.state.displayDays}
                                                onChange={(e) => this.props.updateDisplayDays(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline">{this.props.l.t("Display Date:", "Display Date:")}</label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ToggleSwitch
                                                disabled={this.state.isAnalog}
                                                className="form-control disabled"
                                                nodes={[{ label: "Yes", value: true, isDisabled: this.state.isAnalog }, { label: "No", value: false, isDisabled: this.state.isAnalog }]}
                                                checkedNode={this.state.displayDate}
                                                onChange={(e) => this.props.updateDisplayDate(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="metrics-label col-md-4">
                                            <label className="control-label inline">{this.props.l.t("Date Format:", "Date Format:")}</label>
                                        </div>
                                        <div className="col-sm-7 col-md-5">
                                            <Select
                                                disabled={this.state.isAnalog}
                                                value={this.state.selectedDateFormat}
                                                placeholder='Select...'
                                                options={ConstantValues.dateFormats}
                                                onChange={(e) => this.props.setSelectedDateFormat(e)} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="metrics-label col-md-4">
                                <label className="control-label inline">{this.props.l.t("Time Zone:", "Time Zone:")}</label>
                            </div>
                            <div className="col-sm-7 col-md-5">

                                <Select
                                    value={this.state.selectedTimeZoneItem}
                                    placeholder='Select...'
                                    options={ConstantValues.timezoneList}
                                    onChange={(e) => this.props.setSelectedTimeZone(e)} />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t("Time Zone Label:", "Time Zone Label:")} </label>
                            </div>
                            <div className="col-sm-7 col-md-5">
                                <input type="text" className="form-control" value={this.state.tzoneText || ""} onChange={(e) => this.props.setTimeZonelabel(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-md-offset-5   col-md-3 col-sm-offset-2 col-sm-8">
                        <button
                            disabled={this.state.selectedTimeZoneItem ? false : true}
                            type="button"
                            className=" btn btn-sm btn btn-primary btn-block "
                            onClick={(e) => this.props.updateWidgetSettings(this.props)}>{this.props.l.t("Preview", "Preview")}
                        </button>
                    </div>
                </div>
            </div>
        )
    }


}
