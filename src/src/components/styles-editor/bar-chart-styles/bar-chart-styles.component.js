import React from 'react';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const fonts = require("../constants").fonts;
import ToggleSwitch from '../../toggle-switch';


export default class BarChartStyles extends React.Component {
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
    render() {
        return (
            <div className=" col-md-12 col-sm-12 editorContent" >
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Background color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker 
                                    id="1" 
                                    key="1" 
                                    value={this.state.widget.widgetBody.backgroundColor}
                                    updateColor={(e) => { this.updateBodyStyle(e, "backgroundColor"); this.updateProp(e, "appliedBackgroundColor"); }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Use selected bar color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                    checkedNode={this.state.widget.useSelectedBarColor}
                                    onChange={(e) => this.updateProp(e, "useSelectedBarColor")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Bar color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker 
                                    disabled={!this.state.widget.useSelectedBarColor} 
                                    id="1" 
                                    key="1" 
                                    value={this.state.widget.barStyles.backgroundColor} 
                                    updateColor={(e) => { this.updateBarStyle(e, "backgroundColor") }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Bar value color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker 
                                    id="2" 
                                    key="2" 
                                    value={this.state.widget.barStyles.color} 
                                    updateColor={(e) => this.updateBarStyle(e, "color")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Bar value style: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.barStyles.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.barStyles.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateBarStyle(e.value, "fontFamily")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Bar value size: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={this.state.widget.barStyles.fontSize} 
                                    onChange={(e) => this.updateBarStyle(e.target.value, "fontSize")} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Show Y Axis: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                    checkedNode={this.state.widget.showYAxis}
                                    onChange={(e) => this.updateProp(e, "showYAxis")}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Y-Axis Text color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.yAxisStyles.color} updateColor={(e) => this.updateYAxisStyle(e, "color")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Y-Axis Font style: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.yAxisStyles.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.yAxisStyles.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateYAxisStyle(e.value, "fontFamily")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Y-Axis Font size: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.yAxisStyles.fontSize} onChange={(e) => this.updateYAxisStyle(e.target.value, "fontSize")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> X-Axis Text color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.xAxisStyles.color} updateColor={(e) => this.updateXAxisStyle(e, "color")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> X-Axis Font style: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.xAxisStyles.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.xAxisStyles.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateXAxisStyle(e.value, "fontFamily")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> X-Axis Font size: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.xAxisStyles.fontSize} onChange={(e) => this.updateXAxisStyle(e.target.value, "fontSize")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Title: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="text" className="form-control" value={this.state.widget.title} onChange={(e) => this.updateProp(e.target.value, "title")} />
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
                                <ColorPicker id="2" key="2" value={this.state.widget.titleStyles.color} updateColor={(e) => this.updateTitleStyle(e, "color")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Title font style: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.titleStyles.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.titleStyles.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateTitleStyle(e.value, "fontFamily")}
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
                                <input type="number" className="form-control" value={this.state.widget.titleStyles.fontSize} onChange={(e) => this.updateTitleStyle(e.target.value, "fontSize")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Enable Min Value: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                    checkedNode={this.state.widget.enableMin}
                                    onChange={(e) => this.updateProp(e, "enableMin")}
                                />
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
                                <input 
                                    type="number" 
                                    disabled={!this.state.widget.enableMin} 
                                    className="form-control" 
                                    value={this.state.widget.min} 
                                    onChange={(e) => this.updateProp(e.target.value, "min")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Enable Max Value: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                    checkedNode={this.state.widget.enableMax}
                                    onChange={(e) => this.updateProp(e, "enableMax")}
                                />
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
                                <input 
                                    type="number" 
                                    disabled={!this.state.widget.enableMax} 
                                    className="form-control" 
                                    value={this.state.widget.max} 
                                    onChange={(e) => this.updateProp(e.target.value, "max")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Enable bar lines: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ToggleSwitch
                                    className="form-control"
                                    nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                    checkedNode={this.state.widget.enableBarLines}
                                    onChange={(e) => this.updateProp(e, "enableBarLines")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Refresh interval (in sec): </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.refreshInterval} onChange={(e) => this.updateProp(e.target.value, "refreshInterval")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className=" col-md-offset-5   col-md-3 col-sm-offset-2 col-sm-8">
                        <button type="button" className=" btn btn-sm btn btn-primary btn-block " onClick={(e) => this.updateWidget(e)}>Save</button>
                    </div>
                </div>
            </div >
        )
    }

    updateBodyStyle(e, prop) {
        const widget = this.state.widget;
        widget.widgetBody[prop] = e;
        this.setState({ widget });
    }

    updateBarStyle(e, prop) {
        const widget = this.state.widget;
        widget.barStyles[prop] = e;
        this.setState({ widget });
    }

    updateXAxisStyle(e, prop) {
        const widget = this.state.widget;
        widget.xAxisStyles[prop] = e;
        this.setState({ widget });
    }

    updateYAxisStyle(e, prop) {
        const widget = this.state.widget;
        widget.yAxisStyles[prop] = e;
        this.setState({ widget });
    }

    updateTitleStyle(e, prop) {
        const widget = this.state.widget;
        widget.titleStyles[prop] = e;
        this.setState({ widget });
    }

    // TODO: The below generic method can be used to update appropriate property.

    updateProp(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e;
        this.setState({ widget });
    }

    updateWidget(e) {
        this.props.UpdateWidgetStyles(this.state.widget);
    }
}
