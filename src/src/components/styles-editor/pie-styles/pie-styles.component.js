import React from 'react';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const fonts = require("../constants").fonts;

export default class PieStyles extends React.Component {
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
                                <label className="control-label inline"> Text color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.widgetBody.color} updateColor={(e) => this.updateBodyStyle(e, "color")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Font style: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.widgetBody.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.widgetBody.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateBodyStyle(e, "fontFamily")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Font size: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.widgetBody.fontSize} onChange={(e) => this.updateBodyStyle(e.target.value, "fontSize")} />
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
                                    onChange={(e) => this.updateTitleStyle(e, "fontFamily")}
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
            </div>
        )
    }

    updateBodyStyle(e, prop) {
        const widget = this.state.widget;
        widget.widgetBody[prop] = e;
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
