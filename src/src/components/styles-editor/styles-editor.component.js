import React from 'react';
import BoxStyles from './box-styles';
import ProgressBarStyles from './progress-bar-styles';
import SpeedoStyles from './speedo-styles';
import TextStyles from './text-styles';
import PictureStyles from './picture-styles';
import PieStyles from './pie-styles';
import BarChartStyles from './bar-chart-styles';
import CircularProgressStyles from './circular-progress-styles';
import ComboStyles from './combo-styles';
import ClockStyles from './clock-styles';
import Dock from '../dock/lib';
import WidgetType from '../../lib/enums/widget-type.enum';
import ToggleSwitch from '../toggle-switch';
import _ from 'lodash';

export default class StylesEditor extends React.Component {
    constructor(props) {
        super(props);
        const { editor } = props;
        this.state = {
            widget: _.cloneDeep(editor.widget)
        };
    }
    componentWillReceiveProps(nextProps) {
        const { editor } = nextProps;
        this.setState({
            widget: _.cloneDeep(editor.widget)
        })
    }
    render() {
        return (
            <Dock isVisible={this.props.editor.widget.showEditor !== undefined && this.props.editor.widget.showEditor} dimMode={'none'} >
                <div>
                    <div className="dockHeader">
                        {this.renderTitle()}
                        <i className="dock-close-button fa fa-times" onClick={() => this.props.ToggleEditorMenu(this.state.widget)} />
                    </div>
                    {
                        this.state.widget.isComboWidget &&
                        this.renderComboStyles()
                    }
                    {
                        this.renderEditor()
                    }
                </div>
            </Dock>
        )
    }

    renderComboStyles() {
        return (
            <div className="padding_0px  editorContent">
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-5 col-md-4 labelContent">
                            <label className="control-label inline"> Apply to column:  </label>
                        </div>
                        <div className="col-sm-7 col-md-4">
                            <ToggleSwitch
                                className="form-control"
                                nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                checkedNode={!!this.state.applyToColumn}
                                onChange={(e) => this.updateApplyToColumn(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderEditor() {
        if (this.state.widget.widgetType !== undefined) {
            switch (this.state.widget.widgetType) {
                case WidgetType.Box:
                    return (
                        <BoxStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );

                case WidgetType.Progress:
                    return (
                        <ProgressBarStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Speedo:
                    return (
                        <SpeedoStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Text:
                    return (
                        <TextStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Picture:
                    return (
                        <PictureStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Pie:
                    return (
                        <PieStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Bar:
                    return (
                        <BarChartStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Clock:
                    return (
                        <ClockStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.CircularProgress:
                    return (
                        <CircularProgressStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                case WidgetType.Combo:
                    return (
                        <ComboStyles {...this.state} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    );
                default:
                    return (
                        <div>Sytles not present for this widget</div>
                    );
            }
        }

    }

    renderTitle() {
        switch (this.state.widget.widgetType) {
            case WidgetType.Box:
                return 'Box Styles';

            case WidgetType.Progress:
                return 'Progress Styles';

            case WidgetType.Speedo:
                return 'Speedo Styles';

            case WidgetType.Text:
                return 'Text Styles';

            case WidgetType.Picture:
                return 'Picture Styles';

            case WidgetType.Pie:
                return 'Pie Styles';

            case WidgetType.Bar:
                return 'Bar Styles';

            case WidgetType.Clock:
                return 'Clock Styles';

            case WidgetType.CircularProgress:
                return 'Circular Progress Styles';

            case WidgetType.Combo:
                return 'Combo Styles';

            default:
                return 'Styles';
        }
    }

    updateApplyToColumn(value) {
        if (this.state.widget.isComboWidget) {
            this.setState({
                applyToColumn: value
            });
        }
    }


    UpdateWidgetStyles(widget) {
        if (widget.isComboWidget && this.state.applyToColumn) {
            let comboWidget = _.find(this.props.newDashboard.widgets, (w) => w.id === widget.comboId);

            let wColumnIndex = this.getColumnIndex(comboWidget.matrix, widget.id);
            if (wColumnIndex != undefined) {
                for (var rowIndex = 1; rowIndex < comboWidget.matrix.length; rowIndex++) {
                    var cWidget = comboWidget.matrix[rowIndex][wColumnIndex];
                    if (cWidget.id !== widget.id) {
                        cWidget.appliedBackgroundColor = _.cloneDeep(widget.appliedBackgroundColor);
                        cWidget.widgetBody = _.cloneDeep(widget.widgetBody);
                        cWidget.refreshInterval = _.cloneDeep(widget.refreshInterval);
                        cWidget.title = widget.widgetType !== WidgetType.Text ? _.cloneDeep(widget.title) : cWidget.title;
                        cWidget.valueStyles = _.cloneDeep(widget.valueStyles);
                        cWidget.titleStyles = _.cloneDeep(widget.titleStyles);
                        cWidget.rangeValueStyles = _.cloneDeep(widget.rangeValueStyles);
                        cWidget.segmentColors = _.cloneDeep(widget.segmentColors);
                        cWidget.showMaxValueOnWidget = _.cloneDeep(widget.showMaxValueOnWidget);
                        cWidget.min = _.cloneDeep(widget.min);
                        cWidget.max = _.cloneDeep(widget.max);
                    }
                    this.props.UpdateWidgetStyles(cWidget);
                }
            }
            this.updateApplyToColumn(false);
        }
        this.props.UpdateWidgetStyles(widget);
        this.props.UpdateEditorWidget(widget); // Updating editor store too keep changes applied 
    }

    getColumnIndex(matrix, widgetId) {
        for (var rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
            var row = matrix[rowIndex];
            for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                var widget = row[columnIndex];
                if (widget.id === widgetId) {
                    return columnIndex;
                }
            }
        }
    }
}
