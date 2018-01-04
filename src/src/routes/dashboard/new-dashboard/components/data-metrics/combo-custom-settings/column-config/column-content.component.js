import React from 'react';
import ColorPicker from '../../../../../../../components/color-picker';
import "../../../../../../../public/assets/styles/accordion.css"
import ToggleSwitch from "../../../../../../../components/toggle-switch";
import CustomSelect from '../../../../../../../components/custom-dropdown';
import * as Constants from '../../../../../../../constants/constantValues';
import _ from "lodash";

export default class ColumnContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    updateLevel(key, value) {
        this.props.updateLevel(this.state.id, key, value);
    }
    updateToogle(key, value) {
        this.props.updateLevel(this.state.id, key, value);
    }
    updateColumn(key) {
        this.props.updateLevel(this.state.id, "column", key);
    }
    updateDateFormat(key) {
        this.props.updateLevel(this.state.id, "dateFormat", key);
    }
    updateDisplayFormat(key) {
        this.props.updateLevel(this.state.id, "displayFormat", key);
    }
    onColumnChange(e) {
        if (e.value)
            this.props.updateLevel(this.state.id, "column", e)
    }
    onTypeChange(e) {
        if (e && e.value)
            this.updateDisplayFormat(e)
    }
    onDateFormatChange(e) {
        if (e.value)
            this.props.updateLevel(this.state.id, "dateFormat", e)
    }
    render() {
        return (
            <div className="accordion">
                <div className="accordion-header" onClick={this.props.handleClick.bind(this, this.state.id)}>
                    <span className="pull-left rtl-pull-left">{this.props.l.t('Column', 'Column') + ' ' + this.state.level} </span>
                    <i className='fa fa-trash-o pull-right accordion-icon' onClick={(e) => { this.props.removeLevel(); e.stopPropagation(); }} ></i>
                    {
                        this.state.expanded
                            ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                            : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                    }
                </div>
                <div className={(this.state.expanded) ? "fade-out active" : "fade-in active"}>
                    {
                        (this.state.expanded) &&
                        <div className="accordion-form-group">
                            <div className="accordion-row">
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('ColumnCOLON', 'Column:')} </span>
                                    <div className="col-md-11 col-sm-7">
                                        <CustomSelect name="field-group-options" value={this.state.dataMetrics.columnOptoins.length == 1 ? this.state.dataMetrics.columnOptoins[0] : this.state.column} options={this.state.dataMetrics.columnOptoins} placeholder='Select...'
                                            onChange={(e) => this.onColumnChange(e)} />
                                    </div>
                                </div>
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('TypeCOLON', 'Type:')} </span>
                                    <div className="col-md-11 col-sm-7">
                                        <CustomSelect name="field-group-options" value={this.state.displayFormat} options={this.state.dataMetrics.displayFormatOptions} placeholder='Select...'
                                            onChange={(e) => this.onTypeChange(e)} />
                                    </div>
                                </div>

                            </div>

                            <div className="accordion-row">
                                {
                                    (() => {
                                        switch (this.state.displayFormat && this.state.displayFormat.label) {
                                            case 'Number':
                                            case 'Decimal':
                                                return <div>
                                                    <div className="accordion-input-group">
                                                        <span>{this.props.l.t('_SummaryCOLON', ' Summary:')}</span>
                                                        <ToggleSwitch className="form-control" nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]} checkedNode={this.state.isSummary} ref="isSummary" onChange={this.updateToogle.bind(this, 'isSummary')} />
                                                    </div>
                                                    <div className="accordion-input-group">
                                                        <span> {this.props.l.t('Show_Zero_ValuesCOLON', 'Show Zero Values:')} </span>
                                                        <ToggleSwitch className="form-control" nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]} checkedNode={this.state.showZeroValues} ref="showZeroValues" onChange={this.updateToogle.bind(this, 'showZeroValues')} />
                                                    </div></div>
                                            case 'Date':
                                                return <div className="accordion-input-group">
                                                    <span> {this.props.l.t('Date_Format_COLON', 'Date Format :')} </span>
                                                    <div className="col-md-11 col-sm-7">
                                                        <CustomSelect name="field-group-options" value={this.state.dateFormat} options={Constants.dateFormats} placeholder='Select...'
                                                            onChange={(e) => this.onDateFormatChange(e)} />
                                                    </div>
                                                </div>
                                            default:
                                                null;
                                        }
                                    })()
                                }
                                <div className="accordion-input-group">
                                    <span>{this.props.l.t('Display_NameCOLON', 'Display Name:')} </span>
                                    <div className="col-md-11 col-sm-7">
                                        <input type='text' className="form-control" value={this.state.displayName ? this.state.displayName : ''} onChange={(e) => this.updateLevel('displayName', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


