import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import CheckBoxListGroup from '../../../../../components/check-box-list-group';
import CheckBoxList from 'react-checkbox-list';
import CheckboxTree from '../../../../../components/checkbox-tree';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CheckBoxTree from '../../../../../components/check-box-tree';
import ToggleSwitch from '../../../../../components/toggle-switch';
import _ from "lodash";

export default class FilterControl extends React.Component {
    constructor(props) {
        super(props);

        let state = props.control;
        if (state.Type === "date" && !state.IsDisabled && state.Value === "") {
            this.changeControlValue(state.Key, new Date().toISOString());
        }

        this.state = {
            ...state
        }
    }

    componentWillReceiveProps(nextProps) {
        let state = nextProps.control;
        if (state.Type === "date" && !state.IsDisabled && state.Value === "") {
            this.changeControlValue(state.Key, new Date().toISOString());
        }

        this.setState({
            ...state
        })
    }

    render() {
        switch (this.state.Type) {
            case "dropdown":
                return (
                    <div className='row'>
                        {this.renderLabel()}
                        <div className={this.state.IsDisabled ? "col-md-6 disabled" : "col-md-6"}>
                            <Select name="form-field-name"
                                options={this.state.Options}
                                placeholder={this.state.PlaceHolder}
                                defaultSelected={this.state.Value}
                                value={this.state.Value}
                                disabled={this.state.IsDisabled}
                                onChange={this.changeControlValue.bind(this, this.state.Key)}
                                multi={this.state.IsMultiSelect}
                            />
                        </div>
                    </div>
                );
            case "number":
                return (
                    <div className='row'>
                        {this.renderLabel()}
                        <div className={"col-md-6"}>
                            <input type="number" className="dateField form-control"
                                ref={this.state.Key}
                                value={this.state.Value}
                                placeholder={this.state.PlaceHolder}
                                onChange={this.changeControlValue.bind(this, this.state.Key)}
                                disabled={this.state.IsDisabled}
                            />
                        </div>
                    </div>
                );
            case "date":
                return (
                    <div className='row'>
                        {this.renderLabel()}
                        <div className={this.state.IsDisabled ? "col-md-6 disabled" : "col-md-6"}>
                            <DatePicker className="dateField form-control" name="form-field-name"
                                value={this.state.Value}
                                placeholder={this.state.PlaceHolder}
                                disabled={this.state.IsDisabled}
                                onChange={this.changeControlValue.bind(this, this.state.Key)}
                            />
                        </div>
                    </div>
                );
            case "check-box-list-group":
                return (
                    <CheckBoxListGroup checkList={this.state.CheckList} label={this.state.Label} />
                );
            case "check-box-tree":
                return (
                    <CheckBoxTree nodes={this.state.Nodes} label={this.state.Label} />
                );

            case "checkbox":
                return (
                    <div className=''>
                        <div className='checkbox col-md-4'>
                            <label>
                                <input type="checkbox"
                                    ref={this.state.Key}
                                    checked={this.state.Value}
                                    onChange={this.changeCheckBoxValue.bind(this, this.state.Key)}
                                />
                                {this.state.Label}
                            </label>
                        </div>
                    </div>
                );
            case "text":
                return (
                    <div className='row'>
                        {this.renderLabel()}
                        <div className={this.state.IsDisabled ? "col-md-6 disabled" : "col-md-6"}>
                            <input type="text" className="dateField form-control"
                                ref={this.state.Key}
                                value={this.state.Value}
                                placeholder={this.state.PlaceHolder}
                                onChange={this.changeControlValue.bind(this, this.state.Key)}
                                disabled={this.state.IsDisabled}
                            />
                        </div>
                    </div>
                );
            case "toggle-switch":
                return (
                    <div className='row'>
                        <ToggleSwitch
                            nodes={this.state.Nodes}
                            onChange={this.changeControlValue.bind(this, this.state.Key)}
                            checkedNode={this.state.Value}
                        />
                    </div>
                );

        }
    }

    renderLabel() {
        return (<div className="col-md-4">
            {this.state.Label}
        </div>);
    }

    changeControlValue(key, selectedValue) {
        var value = '';
        try {
            value = (this.state.Type === "dropdown" || this.state.Type === "date" || this.state.Type === "toggle-switch") ?
                selectedValue : this.refs[key].value;
        }
        catch (e) {
            value = '';
        }
        finally {
            this.props.changeControlValue(key, value);
        }
    }

    changeCheckBoxValue(key) {
        this.props.changeControlValue(key, this.refs[key].checked);
    }

}