import React from 'react';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const fonts = require("../constants").fonts;
import ToggleSwitch from '../../toggle-switch';


export default class CircularProgressStyles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: props.widget
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            widget: nextProps.widget
        })
    }
    render() {
        return (
            <div className=" col-md-12 col-sm-12 editorContent" >

                {!this.state.widget.isComboWidget &&
                    <div>
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5 col-md-4 labelContent">
                                        <label className="control-label inline"> Title: </label>
                                    </div>
                                    <div className="col-sm-7 col-md-4">
                                        <input type="text" className="form-control" value={this.state.widget.title} onChange={(e) => this.updateProp(e, "title")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5 col-md-4 labelContent">
                                        <label className="control-label inline"> Title color: </label>
                                    </div>
                                    <div className="col-sm-7 col-md-4">
                                        <ColorPicker id="2" key="2" value={this.state.widget.titleStyles.color} updateColor={(e) => this.updateTitleColor(e)} defaultColor="red" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5 col-md-4 labelContent">
                                        <label className="control-label inline"> Title font: </label>
                                    </div>
                                    <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.titleStyles.fontFamily }}>
                                        <Select
                                            name="form-field-name"
                                            value={this.state.widget.titleStyles.fontFamily}
                                            options={fonts}
                                            placeholder="Select Font"
                                            onChange={(e) => this.updateTitleFontFamily(e.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5 col-md-4 labelContent">
                                        <label className="control-label inline"> Title font size: </label>
                                    </div>
                                    <div className="col-sm-7 col-md-4">
                                        <input type="number" className="form-control" value={this.state.widget.titleStyles.fontSize} onChange={(e) => this.updateTitleFontSize(e)} />
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
                                <label className="control-label inline"> Value color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.valueStyles.color} updateColor={(e) => this.updateValueColor(e)} defaultColor="red" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Value font: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.valueStyles.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.valueStyles.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateValueFontFamily(e.value)}

                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Value font size: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.valueStyles.fontSize} onChange={(e) => this.updateValueFontSize(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Min: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.min} onChange={(e) => this.updateProp(e, "min")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Max: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.max} onChange={(e) => this.updateProp(e, "max")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Show Max Value:  </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                    checkedNode={this.state.widget.showMaxValueOnWidget}
                                    onChange={(e) => this.updateMaxValue(e, "showMaxValueOnWidget")}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Arc color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.widgetBody.backgroundColor} updateColor={(e) => this.updateBorderStyle(e, "color")} />
                            </div>
                        </div>
                    </div>
                </div>
                {!this.state.widget.isComboWidget &&
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-5 col-md-4 labelContent">
                                    <label className="control-label inline"> Refresh interval (in sec): </label>
                                </div>
                                <div className="col-sm-7 col-md-4">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        value={this.state.widget.refreshInterval} 
                                        onChange={(e) => this.updateRefreshInterval(e.target.value, "refreshInterval")} />
                                </div>
                            </div>
                        </div>
                    </div>}

                <div className="row">
                    <div className=" col-md-offset-5   col-md-3 col-sm-offset-2 col-sm-8">
                        <button type="button" className=" btn btn-sm btn btn-primary btn-block " onClick={(e) => this.updateWidget(e)}>Save</button>
                    </div>
                </div>
            </div >
        )
    }

    updateTitleStyle(e, prop) {
        const widget = this.state.widget;
        widget.titleStyles[prop] = e;
        this.setState({ widget });
    }
    updateTitleColor(selectedColor) {
        const widget = this.state.widget;
        widget.titleStyles.color = selectedColor;
        this.setState({ widget });
    }

    updateTitleFontFamily(selectedFont) {
        const widget = this.state.widget;
        widget.titleStyles.fontFamily = selectedFont;
        this.setState({ widget });
    }

    updateTitleFontSize(e) {
        const widget = this.state.widget;
        widget.titleStyles.fontSize = e.target.value;
        this.setState({ widget });
    }

    updateValueFontSize(e) {
        const widget = this.state.widget;
        widget.valueStyles.fontSize = e.target.value;
        this.setState({ widget });
    }

    updateValueColor(selectedColor) {
        const widget = this.state.widget;
        widget.valueStyles.color = selectedColor;
        this.setState({ widget });
    }

    updateValueFontFamily(selectedFont) {
        const widget = this.state.widget;
        widget.valueStyles.fontFamily = selectedFont;
        this.setState({ widget });
    }

    updateBorderStyle(selectedColor) {
        const widget = this.state.widget;
        widget.widgetBody.backgroundColor = selectedColor;
        widget.appliedBackgroundColor = selectedColor;
        this.setState({ widget });
    }

    updateMaxValue(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e;
        this.setState({ widget });
    }


    updateRefreshInterval(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e;
        this.setState({ widget });
    }

    // TODO: The below generic method can be used to update appropriate property.

    updateProp(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e.target.value;
        this.setState({ widget });
    }

    updateWidget(e) {
        this.props.UpdateWidgetStyles(this.state.widget);
    }
}
