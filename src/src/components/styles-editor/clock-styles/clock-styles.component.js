import React from 'react';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import 'react-select/dist/react-select.css';
var PropTypes = require('prop-types');
export default class ClockStyles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: this.props.widget
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            widget: nextProps.widget
        })
    }

    updateProp(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e.target.value;
        this.setState({ widget });
    }

    updateBackgroundColor(selectedColor) {
        const widget = this.state.widget;
        widget.widgetBody.ClockbackgroundColor = selectedColor;
        widget.widgetBody.appliedBackgroundColor = selectedColor;
        this.setState({ widget });
    }
    updateClockRoundingColor(selectedColor) {
        const widget = this.state.widget;
        widget.widgetBody.clockRoundingColor = selectedColor;
        this.setState({ widget });
    }

    updateHourHandColor(selectedColor) {
        const widget = this.state.widget;
        widget.hands.hourhandcolor = selectedColor;
        this.setState({ widget });
    }

    updateMinuteHandColor(selectedColor) {
        const widget = this.state.widget;
        widget.hands.minutehandcolor = selectedColor;
        this.setState({ widget });
    }

    updateSecondHandColor(selectedColor) {
        const widget = this.state.widget;
        widget.hands.secondhandcolor = selectedColor;
        this.setState({ widget });
    }

    updateNumberColor(selectedColor) {
        const widget = this.state.widget;
        widget.numberStyles.color = selectedColor;
        this.setState({ widget });
    }

    updateNumberSize(e) {
        const widget = this.state.widget;
        widget.numberStyles.fontSize = e.target.value;
        this.setState({ widget });
    }

    updateTimeZoneColor(selectedColor) {
        const widget = this.state.widget;
        widget.TimezoneStyles.color = selectedColor;
        this.setState({ widget });
    }

    updateTimeZoneSize(e) {
        const widget = this.state.widget;
        widget.TimezoneStyles.fontSize = e.target.value;
        this.setState({ widget });
    }

    updateWidgetTitle(e) {
        const widget = this.state.widget;
        widget.title = e.target.value;
        this.setState({ widget });
    }

    updateDateColor(selectedColor) {
        const widget = this.state.widget;
        widget.DateStyles.color = selectedColor;
        this.setState({ widget });
    }

    updateTimeColor(selectedColor) {
        const widget = this.state.widget;
        widget.TimeStyles.color = selectedColor;
        this.setState({ widget });
    }
    updateDateSize(e) {
        const widget = this.state.widget;
        widget.DateStyles.fontSize = e.target.value;
        this.setState({ widget });

    }
    updateTimeSize(e) {
        const widget = this.state.widget;
        widget.TimeStyles.fontSize = e.target.value;
        this.setState({ widget });

    }
    updateOuterBgcolor(selectedColor) {
        const widget = this.state.widget;
        widget.widgetBody.ClockOuterbackgroundColor = selectedColor;
        this.setState({ widget });
    }
    updateDaysColor(selectedColor) {
        const widget = this.state.widget;
        widget.DaysStyles.color = selectedColor;
        this.setState({ widget });
    }
    updateDaysSize(e) {
        const widget = this.state.widget;
        widget.DaysStyles.fontSize = e.target.value;
        this.setState({ widget });

    }
    updateCurrentDayColor(selectedColor){
        const widget = this.state.widget;
        widget.CurrentDayColor = selectedColor;
        this.setState({ widget })
    }
    updateWidget() {
        this.props.UpdateWidgetStyles(this.state.widget);
    }

    render() {
        return (
            <div className=" col-md-12 col-sm-12 editorContent">
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t("Background Color:", "Background Color:")} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="1" key="1" value={this.state.widget.widgetBody.ClockbackgroundColor} updateColor={(e) => this.updateBackgroundColor(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.widget.isAnalog
                        ?
                        <div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline">{this.props.l.t("Clock Border Color:", "Clock Border Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="1" key="1" value={this.state.widget.widgetBody.clockRoundingColor} updateColor={(e) => this.updateClockRoundingColor(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> Hour Hand Color: </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.hands.hourhandcolor} updateColor={(e) => this.updateHourHandColor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> Minute Hand Color: </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.hands.minutehandcolor} updateColor={(e) => this.updateMinuteHandColor(e)} defaultColor="green" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> Second Hand Color: </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.hands.secondhandcolor} updateColor={(e) => this.updateSecondHandColor(e)} defaultColor="brown" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Numbers Font Color:", "Numbers Font Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.numberStyles.color} updateColor={(e) => this.updateNumberColor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline">{this.props.l.t("Numbers Font Size:", "Numbers Font Size:")}  </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <input type="number" className="form-control" value={this.state.widget.numberStyles.fontSize} onChange={(e) => this.updateNumberSize(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("background color:", "Outer Background Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.widgetBody.ClockOuterbackgroundColor} updateColor={(e) => this.updateOuterBgcolor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Days Font Color:", "Days Font Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.DaysStyles.color} updateColor={(e) => this.updateDaysColor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Days Font Size:", "Days Font Size:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <input type="number" className="form-control" value={this.state.widget.DaysStyles.fontSize} onChange={(e) => this.updateDaysSize(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Current Day Font Color:", "Current Day Font Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.CurrentDayColor} updateColor={(e) => this.updateCurrentDayColor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Date Font Color:", "Date Font Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.DateStyles.color} updateColor={(e) => this.updateDateColor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Date Font Size:", "Date Font Size:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <input type="number" className="form-control" value={this.state.widget.DateStyles.fontSize} onChange={(e) => this.updateDateSize(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> {this.props.l.t("Time Font Color:", "Time Font Color:")} </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <ColorPicker id="2" key="2" value={this.state.widget.TimeStyles.color} updateColor={(e) => this.updateTimeColor(e)} defaultColor="red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-4 labelContent">
                                            <label className="control-label inline"> Time Font Size: </label>
                                        </div>
                                        <div className="col-sm-7 col-md-4">
                                            <input type="number" className="form-control" value={this.state.widget.TimeStyles.fontSize} onChange={(e) => this.updateTimeSize(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t("Time Zone Font Color:", "Time Zone Font Color:")} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.TimezoneStyles.color} updateColor={(e) => this.updateTimeZoneColor(e)} defaultColor="red" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t("Time Zone Font Size:", "Time Zone Font Size:")} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.TimezoneStyles.fontSize} onChange={(e) => this.updateTimeZoneSize(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-md-offset-5   col-md-3 col-sm-offset-2 col-sm-8">
                        <button type="button" className=" btn btn-sm btn btn-primary btn-block " onClick={(e) => this.updateWidget(e)}>{this.props.l.t("Save", "Save")}</button>
                    </div>
                </div>
            </div>
        )
    }

}

ClockStyles.contextTypes = {
    t: PropTypes.func
};