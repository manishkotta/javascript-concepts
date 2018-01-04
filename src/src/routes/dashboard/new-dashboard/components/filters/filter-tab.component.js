"use strict";
import React from 'react';
import _ from 'lodash';
import FilterControl from './filter-control.component';
import { Tab, Tabs, Nav, NavItem, Row, Col } from 'react-bootstrap';


export default class FilterTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ..._.cloneDeep(props)
        }

        this.loadData(props.Key, props.Controls);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ..._.cloneDeep(nextProps)
        });

        this.loadData(nextProps.Key, nextProps.Controls)
    }

    loadData(key, controls) {
        switch (key) {
            case "FILTER_ACD_AGENTS":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetACDAgents();
                }
                break;
            case "FILTER_AGENTS":
                if (controls[2].CheckList.length === 0) {
                    this.props.GetAgents();
                }
                break;
            case "FILTER_BREAK_TYPE":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetBreakTypes();
                }
                break;

            case "FILTER_DIRECTORY_TREE":
                if (controls[0].Nodes.length === 0) {
                    this.props.GetDirectories();
                }
                break;

            case "FILTER_CAMPAIGN":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetCampaigns();
                }

                break;
            case "FILTER_COMPLETION_CODE":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetCompletionCodes();
                }
                break;
            case "FILTER_SITE":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetSites();
                }
                break;

            case "FILTER_TRUNK_GROUP":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetTrunkGroups();
                }
                break;

            case "FILTER_TEAMS":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetTeams();
                }
                break;

            case "FILTER_QUEUE":
                if (controls[0].CheckList.length === 0) {
                    this.props.GetQueues();
                }
                break;

            case "FILTER_EMAIL_SMS":
                if (controls[1].Options.length === 0) {
                    this.props.GetEmailSMS();
                }
                break;
            case "FILTER_CALL_TYPE":
                if (controls[1].Options.length === 0) {
                    this.props.GetCallTypes();
                }
                break;
        }
    }
    render() {
        return (

            <div id={this.state.Key} >
                <div id='tabContentArea'>
                    {
                        _.map(this.state.Controls, (control) => {
                            const showControl = typeof control.IsVisible === "undefined" || (typeof control.IsVisible !== "undefined" && control.IsVisible);
                            return (
                                showControl &&
                                <FilterControl key={control.Key} control={control} changeControlValue={this.changeControlValue.bind(this)} />
                            );
                        })
                    }
                </div>
                <div className='row'>
                    <div className='col-md-offset-7 col-md-3' style={{ marginTop: '10px' }}>
                        <input className=" btn btn-sm btn btn-primary btn-block"
                            type="button"
                            onClick={!this.state.isEditMode ? this.addFilter.bind(this) : this.updateFilter.bind(this, this.state.filterId)}
                            value={!this.state.isEditMode ? "Add" : "Edit"} />
                    </div>
                </div>
            </div>

        )
    }
    changeControlValue(key, value, prop = "Value") {
        const state = Object.assign({}, this.state);
        _.find(state.Controls, control => control.Key === key)[prop] = value;

        this.setState({
            ...state
        })

        if (Object.prototype.toString.call(value) === '[object Object]' && typeof value.label !== "undefined") {
            value = value.label
        }

        this.resolveDependencies(key, value);
    }

    resolveDependencies(key, value) {
        _.forEach(
            _.filter(this.state.Dependencies, (dependency) => dependency.DependeeKey === key),
            (dependency) => {
                if (_.findIndex(dependency.DependeeValue, val => val === value) >= 0) {
                    _.forEach(dependency.DependentsKeys, (dependentKey) => {
                        if (_.find(this.state.Controls, (control) => control.Key === dependentKey)[dependency.DependentProp] !== dependency.DependentPropValue) {
                            this.changeControlValue(dependentKey, dependency.DependentPropValue, dependency.DependentProp); // for chnaging control state
                            this.changeControlValue(dependentKey, ""); // for resetting the state
                        }
                    });
                }
            }
        );
    }

    addFilter() {
        this.props.addFilter({
            id: Date.now(),
            desc: this.buildDesc(this.state.Type, _.cloneDeep(this.state.Controls)),
            key: this.state.Key,
            type: this.state.Type,
            data: _.cloneDeep(this.state.Controls)
        }, this.props.widgetId);
    }
    updateFilter(filterId) {
        this.props.updateFilter({
            id: filterId,
            desc: this.buildDesc(this.state.Type, _.cloneDeep(this.state.Controls)),
            key: this.state.Key,
            type: this.state.Type,
            data: _.cloneDeep(this.state.Controls)
        }, this.props.widgetId, filterId);

        this.props.resetEdit(this.state.Type);
    }

    buildDesc(type, controls) {
        controls = _.filter(controls, (control) => (typeof control.IsVisible === "undefined" || (typeof control.IsVisible !== "undefined" && control.IsVisible)) && !control.IsDisabled);
        let controlValues = {}
        _.map(controls, (control) =>
            controlValues[control.Key] = this.getControlValue(control)
        );
        switch (type) {
            case "Date":
                let desc = "Including calls made";
                if (controlValues["DATE_SELECTED"] === "Specified Dates") {
                    if (controlValues["START_DATE"] === controlValues["END_DATE"]) {
                        return desc + " on " + controlValues["START_DATE"]+ ".";
                    }
                    return desc + " between " + controlValues["START_DATE"] + " and " + controlValues["END_DATE"]+ ".";
                }
                else if (controlValues["DATE_SELECTED"] === "In The Last Time Period") {
                    return desc + " In " + controlValues["LAST_TIME_QUANTITY"] + " " + controlValues["LAST_TIME_UNITS"]+ ".";
                }
                else {
                    return desc + " " + controlValues["DATE_SELECTED"]+ ".";
                }

            case "ACD":
            case "ACD Agents":
            case "Break Type":
            case "Campaign":
            case "Completion Code":
            case "Queue":
            case "Site":
            case "Teams":
            case "Trunk Group":
                let typeIndex = type.toUpperCase().replace(/\ /g, "_");
                return (controlValues[typeIndex + "_EXCLUDE_OPTION"] ? "Exclude the " : "Include the ")
                    + (_.endsWith(type, 's') ? type : type + "s")
                    + " "
                    + controlValues[typeIndex + "_CHECK_LIST"];

            case "Extentions":
            case "Cost":
            case "Answer Time":
            case "Duration":
            case "Times Of The Day":
            case "Trunk Line":
                typeIndex = type.toUpperCase().replace(/\ /g, "_");
                return ("Including calls with " + type.toLowerCase() + " " + controlValues["SELECTING_" + typeIndex].toLowerCase()
                    + " " + controlValues[typeIndex + "_FROM_VALUE"]
                    + ((controlValues[typeIndex + "_TO_VALUE"]) ? (" and " + controlValues[typeIndex + "_TO_VALUE"]) : "")) + ".";

            case "Numbers Dialled":
            case "Access Code":
            case "Account Code":
            case "Authorization Code":
            case "Caller ID":
            case "Private Number":
                typeIndex = type.toUpperCase().replace(/\ /g, "_");
                return (controlValues[typeIndex + "_INCLUDE_EXCLUDE"] ? "Exclude " : "Include ")
                    + "calls with "
                    + (_.endsWith(type, 's') || _.endsWith(type, 'ed') ? type.toLowerCase() : type.toLowerCase() + "s")
                    + " "
                    + controlValues[typeIndex + "_COMPARE_OPERATOR"]
                    + " "
                    + controlValues[typeIndex + "_VALUE"]
                    + ".";

            case "Email/SMS":
                return (controlValues["EMAIL_SMS_INCLUDE_EXCLUDE"] + " ")
                        + (controlValues["EMAIL_SMS_OPTION"].toLowerCase() === "sms" 
                            ? "sms sent"
                            : controlValues["EMAIL_SMS_OPTION"].toLowerCase() === "print" 
                            ? "printed items" 
                            : "emails") + ".";

            case "Call Flag" :
                return (controlValues["CALL_FLAG_INCLUDE_EXCLUDE"] === "Exclude" ? "Excluding calls with call flags of" : "Including calls with call flags of ")
                        + controlValues["CALL_FLAG_OPTION"].toLowerCase()+ ".";
            case "Call Type" :
                return (controlValues["CALL_TYPE_INCLUDE_EXCLUDE"] === "Exclude" ? "Excluding " : "Including  ")
                        + controlValues["CALL_TYPE_OPTION"].toLowerCase() + " calls."


        }
    }

    getControlValue(control) {
        switch (control.Type) {
            case "dropdown":
                return !control.IsMultiSelect &&
                     control.Value.label;
            case "check-box-list-group":
                let checklistString = "";
                _.forEach(control.CheckList, (item) => {
                    if (item.checked) {
                        checklistString += item.label + ", ";
                    }
                });
                return checklistString.replace(new RegExp(', $'), '.').replace(/\,(?=[^,]*$)/, " and");
            case "checkbox":
                return control.Value ? control.Label : "";
            case "date":
                return control.Value.split("T")[0];
            default:
                return control.Value;
        }
    }
}