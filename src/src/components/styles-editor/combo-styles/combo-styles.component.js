import React from 'react';
import WidgetType from '../../../lib/enums/widget-type.enum';
import _ from 'lodash';
import '../../../styles/headerStyles.css';
import ColorPicker from '../../color-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const fonts = require("../constants").fonts;

export default class ComboStyles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: props.widget
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            widget: nextProps.widget
        })
    }
    updateProp(e, prop) {
        const widget = this.state.widget;
        widget.widgetBody[prop] = e;
        this.setState({ widget });
    }
    updateRefreshInterval(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e;
        this.setState({ widget });
    }
    updateWidget(e) {
        var widget = this.state.widget;
        for (var rowIndex = 0; rowIndex < widget.matrix.length; rowIndex++) {
            var row = widget.matrix[rowIndex];
            for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                if (row[columnIndex].widgetType === WidgetType.Text) {
                    row[columnIndex].titleStyles = _.cloneDeep(widget.widgetBody);
                }
                else {
                    let _widget = _.cloneDeep(widget);
                    row[columnIndex].valueStyles = _widget.widgetBody;
                    row[columnIndex].refreshInterval = _widget.refreshInterval;
                }
            }
        }
        this.props.UpdateWidgetStyles(widget);
    }
    render() {
        return (
            <div className=" col-md-12 col-sm-12 editorContent" >
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline"> Color: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <ColorPicker id="2" key="2" value={this.state.widget.widgetBody.color} updateColor={(e) => this.updateProp(e, "color")} defaultColor="red" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline">Font: </label>
                            </div>
                            <div className="col-sm-7 col-md-4" style={{ fontFamily: this.state.widget.widgetBody.fontFamily }}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.widget.widgetBody.fontFamily}
                                    options={fonts}
                                    placeholder="Select Font"
                                    onChange={(e) => this.updateProp(e.value, "fontFamily")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-5 col-md-4 labelContent">
                                <label className="control-label inline">Font size: </label>
                            </div>
                            <div className="col-sm-7 col-md-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.widget.widgetBody.fontSize}
                                    onChange={(e) => this.updateProp(e.target.value, "fontSize")} />
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
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.widget.refreshInterval ? this.state.widget.refreshInterval : ''}
                                    onChange={(e) => this.updateRefreshInterval(e.target.value, "refreshInterval")} />
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
        );
    }


}
