import React from 'react';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const fonts = require("../constants").fonts;
import CustomSelect from '../../../components/custom-dropdown';
import ScrollTypeEnum from '../../../lib/enums/scroll-type-enum';
import WidgetType from '../../../lib/enums/widget-type.enum'


export default class TextStyles extends React.Component {
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
           var scrollType = [
            { value: ScrollTypeEnum.None, label: 'No Scroll' },
            { value: ScrollTypeEnum.RightToLeft, label: 'Right-Left' },
            { value: ScrollTypeEnum.LeftToRight, label: 'Left-Right' },
            { value: ScrollTypeEnum.BottomToTop, label: 'Bottom-Top' },
            { value: ScrollTypeEnum.TopToBottom, label: 'Top-Bottom' }
        ];
        return (
            <div className=" col-md-12 col-sm-12 editorContent" >
                {!this.state.widget.isComboWidget &&
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-5 col-md-4 labelContent">
                                    <label className="control-label inline"> Title: </label>
                                </div>
                                <div className="col-sm-7 col-md-4">
                                    <textarea rows="4" cols="50" className="form-control" value={this.state.widget.title} onChange={(e) => this.updateProp(e, "title")}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
                                    onChange={(e) => this.updateTitleFontFamily(e)}
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
                {!this.state.widget.isComboWidget &&
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-5 col-md-4 labelContent">
                                    <label className="control-label inline"> Scroll Type: </label>
                                </div>
                                <div className="col-md-5 col-sm-7">
                                    <CustomSelect name="field-group-options" value={this.state.widget.scrollType} placeholder='Select...' options={scrollType} onChange={(e) => this.textScroll(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!this.state.widget.isComboWidget &&
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-5 col-md-4 labelContent">
                                    <label className="control-label inline"> Scroll Speed: </label>
                                </div>
                                <div className="col-sm-7 col-md-4">
                                    <input type="number" className="form-control" value={this.state.widget.scrollSpeed} onChange={(e) => this.updateScrollTime(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className=" col-md-offset-5 col-md-3 col-sm-offset-2 col-sm-8">
                        <button type="button" className=" btn btn-sm btn btn-primary btn-block " onClick={(e) => this.updateWidget(e)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

    updateTitleColor(selectedColor) {
        const widget = this.state.widget;
        widget.titleStyles.color = selectedColor;
        this.setState({ widget });
    }

    updateTitleFontFamily(selectedFont) {
        const widget = this.state.widget;
        widget.titleStyles.fontFamily = selectedFont.value;
        this.setState({ widget });
    }

    updateTitleFontSize(e) {
        const widget = this.state.widget;
        widget.titleStyles.fontSize = e.target.value;
        this.setState({ widget });
    }
    textScroll(e) {
        const widget = this.state.widget;
        widget.scrollType = e;
        this.setState({ widget });
    }
    updateScrollTime(e) {
        const widget = this.state.widget;
        widget.scrollSpeed = e.target.value;
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
