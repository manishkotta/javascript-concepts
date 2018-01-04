import React from 'react';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const fonts = require("../constants").fonts;

export default class SpeedoStyles extends React.Component {
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
                                <label className="control-label inline"> {this.props.l.t('Segment_Color_1COLON', 'Segment Color 1:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="1" key="1" value={this.state.widget.segmentColors[0]} updateColor={(e) => this.updateSegmentColor(e, "0")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t('Segment_Color_2COLON', 'Segment Color 2:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="1" key="1" value={this.state.widget.segmentColors[1]} updateColor={(e) => this.updateSegmentColor(e, "1")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t('Segment_Color_3COLON', 'Segment Color 3:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="1" key="1" value={this.state.widget.segmentColors[2]} updateColor={(e) => this.updateSegmentColor(e, "2")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t('Background_ColorCOLON', 'Background Color:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="1" key="1" value={this.state.widget.widgetBody.backgroundColor} updateColor={(e) => this.updateBackgroundColor(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.state.widget.isComboWidget &&
                    <div>
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5 col-md-4 labelContent">
                                        <label className="control-label inline"> {this.props.l.t('TitleCOLON', 'Title:')} </label>
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
                                        <label className="control-label inline"> {this.props.l.t('Title_colorCOLON', 'Title color:')} </label>
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
                                        <label className="control-label inline"> {this.props.l.t('Title_fontCOLON', 'Title font:')} </label>
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
                                        <label className="control-label inline"> {this.props.l.t('Title_font_sizeCOLON', 'Title font size:')} </label>
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
                                <label className="control-label inline"> {this.props.l.t('Value_colorCOLON', 'Value color:')} </label>
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
                                <label className="control-label inline"> {this.props.l.t('Value_fontCOLON', 'Value font:')} </label>
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
                                <label className="control-label inline"> {this.props.l.t('Value_font_sizeCOLON', 'Value font size:')} </label>
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
                                <label className="control-label inline"> {this.props.l.t('MinCOLON', 'Min:')} </label>
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
                                <label className="control-label inline"> {this.props.l.t('MaxCOLON', 'Max:')} </label>
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
                                <label className="control-label inline"> {this.props.l.t('Range_colorCOLON', 'Range color:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.rangeValueStyles.color} updateColor={(e) => this.updateRangeValueColor(e)} defaultColor="red" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t('Range_fontCOLON', 'Range font:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.rangeValueStyles.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.rangeValueStyles.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateRangeValueFontFamily(e.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> {this.props.l.t('Range_font_sizeCOLON', 'Range font size:')} </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input type="number" className="form-control" value={this.state.widget.rangeValueStyles.fontSize} onChange={(e) => this.updateRangeValueFontSize(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.state.widget.isComboWidget &&
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-5 col-md-4 labelContent">
                                    <label className="control-label inline"> {this.props.l.t('Refresh_interval__in_sec_COLON', 'Refresh interval (in sec):')} </label>
                                </div>
                                <div className="col-sm-7 col-md-4">
                                    <input type="number" className="form-control" value={this.state.widget.refreshInterval} onChange={(e) => this.updateProp(e, "refreshInterval")} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className=" col-md-offset-5   col-md-3 col-sm-offset-2 col-sm-8">
                        <button type="button" className=" btn btn-sm btn btn-primary btn-block" onClick={(e) => this.updateWidget(e)}>{this.props.l.t('Save', 'Save')}</button>
                    </div>
                </div>
            </div>
        )
    }

    updateSegmentColor(selectedColor, segment) {
        const widget = this.state.widget;
        widget.segmentColors[segment] = selectedColor;
        this.setState({ widget });
    }

    updateBackgroundColor(selectedColor) {
        const widget = this.state.widget;
        widget.widgetBody.backgroundColor = selectedColor;
        widget.appliedBackgroundColor = selectedColor;
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

    updateRangeValueFontSize(e) {
        const widget = this.state.widget;
        widget.rangeValueStyles.fontSize = e.target.value;
        this.setState({ widget });
    }
    updateRangeValueColor(selectedColor) {
        const widget = this.state.widget;
        widget.rangeValueStyles.color = selectedColor;
        this.setState({ widget });
    }
    updateRangeValueFontFamily(selectedFont) {
        if (!selectedFont) {
            selectedFont = fonts[0].value
        }
        const widget = this.state.widget;
        widget.rangeValueStyles.fontFamily = selectedFont;
        this.setState({ widget });
    }
    updateProp(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e.target.value;
        this.setState({ widget });
    }

    updateWidget() {
        this.props.UpdateWidgetStyles(this.state.widget);
    }
}