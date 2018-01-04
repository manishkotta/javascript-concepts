import React from 'react';
import ColorPicker from '../color-picker';
import "../../public/assets/styles/accordion.css"
import ToggleSwitch from "../toggle-switch";
import CustomSelect from '../../components/custom-dropdown';
import StatisticsCategory from '../../lib/enums/statistic-category.enum';
import WidgetType from '../../lib/enums/widget-type.enum';
import _ from "lodash";


export default class ThresholdTabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
        this.soundFile = null;
        this.testThreshold = this.testThreshold.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    /**
     * To update the color
     * @param {*} color 
     */
    getSelectedColor(color) {
        this.props.updateLevel(this.state.id, "color", color);
    }

    /**
     * To update the levels based on key
     * @param {*} key 
     */
    updateLevel(key) {
        this.props.updateLevel(this.state.id, key, this.refs[key].value);
    }
    /**
     * To update the toggle buttons status
     * @param {*} key 
     * @param {*} value 
     */
    updateToogle(key, value) {
        this.props.updateLevel(this.state.id, key, value);
    }
    /**
     * To update the sound files
     * @param {*} key 
     */
    updateSoundFile(key) {
        this.soundFile = this.refs[key].files[0];
        this.props.updateLevel(this.state.id, key, this.refs[key].files[0]);
    }
    /**
     * To set the selected column for the column option drop down
     * @param {*} e 
     */
    onColumnChange(e) {
        this.setState({
            column: e
        })

    }
    /**
     *  This method is used to test threshold functionality
     */
    testThreshold(e){
        e.stopPropagation();
        this.props.handleTestClick(this.state.id);
     }
    render() {
        return (
            <div className="accordion">
                <div className="accordion-header" style={{ height: 32 }} onClick={this.props.handleClick.bind(this, this.state.id)}>
                    <span className="pull-left rtl-pull-left">{" Level " + this.state.level} </span>
                    {
                        this.state.expanded
                            ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                            : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                    }
                    <i className='fa fa-trash-o pull-right accordion-icon' onClick={(e) => { this.props.removeLevel(); e.stopPropagation(); }} ></i>
                    
                    <div className="row">
                        <div className="pull-right">
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.testThreshold}>{this.props.l.t('Test', 'Test')}</button>
                        </div>
                    </div>
                </div>


                <div className={(this.state.expanded) ? "fade-out active" : "fade-in active"}>
                    {
                        (this.state.expanded) &&
                        <div className="accordion-form-group">
                            {(this.props.statisticsCategoryId == StatisticsCategory.Custom && this.props.isComboWidget && this.props.widgetType == WidgetType.Text) &&
                                <div className="accordion-row">
                                    <div className="accordion-input-group">
                                        <span> {this.props.l.t('Column_COLON', 'Column :')} </span>
                                        <div className="col-md-7 col-sm-4 based-column">
                                            <CustomSelect name="field-group-options form-control" value={this.props.columnOptions.length == 1 ? this.props.columnOptions[0] : this.state.column} options={this.props.columnOptions} placeholder='Select...'
                                                onChange={(e) => this.onColumnChange(e)} />
                                        </div>
                                    </div>

                                </div>
                            }
                            <div className="accordion-row">
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('When_it_reaches_COLON', 'When it reaches :')} </span>

                                    <input type='text' value={this.state.levelValue ? this.state.levelValue : ''} ref="levelValue" className="form-control" onChange={this.updateLevel.bind(this, 'levelValue')} />
                                </div>
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('Color_COLON', 'Color :')}  </span>

                                    <ColorPicker id="1" className="form-control" key="1" value={this.state.color} updateColor={this.getSelectedColor.bind(this)} />
                                </div>
                            </div>

                            <div className="accordion-row">
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('Email_to_COLON', 'Email to :')} </span>

                                    <input type='email' className="form-control" value={this.state.emailTo ? this.state.emailTo : ''} ref="emailTo" onChange={this.updateLevel.bind(this, 'emailTo')} />
                                </div>

                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('SMS_to_COLON', 'SMS to :')} </span>

                                    <input type='text' className="form-control" value={this.state.smsTo ? this.state.smsTo : ''} ref="smsTo" onChange={this.updateLevel.bind(this, 'smsTo')} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
