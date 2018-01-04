"use strict";
import React from 'react';
import BoxWidget from '../box-widget';
import ProgressBarWidget from '../progress-bar-widget';
import SpeedoWidget from '../speedometer-widget';
import PieWidget from '../pie-widget';
import BarChartWidget from '../bar-chart-widget';
import TextWidget from '../text-widget';
import PictureWidget from '../picture-widget';
import Combo from '../combo';
import CircularProgressComponent from '../circular-progress-widget';
import WidgetHeader from '../widget-header';
import WidgetType from '../../../../lib/enums/widget-type.enum';
import '../styles.css';
import _ from 'lodash';
import ClockWidget from '../clock';

let initialDataPulledWidgets = [];

export default class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            refreshWidget: this.getInterval(props)()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
        if (nextProps.pullData && _.findIndex(initialDataPulledWidgets, (w) => w === nextProps.widget.id) < 0) {
            initialDataPulledWidgets.push(nextProps.widget.id);
            nextProps.pullData(nextProps.dashboardId, nextProps.widget.id);
        }
    }

    getInterval(props) {
        return props.pullData
            ? () => {
                props.pullData(props.dashboardId, props.widget.id);
                initialDataPulledWidgets.push(props.widget.id);
                return props.enableRefresh && props.widget.refreshInterval > 0 ? setInterval(
                    () => {
                        props.pullData(props.dashboardId, props.widget.id);
                    },
                    props.widget.refreshInterval * 1000
                ) : 0;
            } : () => { return 0; };
    }

    componentWillUnmount() {
        if (this.props.enableRefresh && this.state.refreshWidget) {
            clearInterval(this.state.refreshWidget);
            this.setState({
                refreshWidget: {}
            })
            initialDataPulledWidgets = [];
        }
    }

    render() {
        let classToBeApplied = 'widget'; //combo-widget

        switch (this.props.widget.widgetType) {
            case WidgetType.Text:
            case WidgetType.Picture:

                classToBeApplied = 'widget no-text-shadow';
                break;
            case WidgetType.Combo:
                classToBeApplied = 'combo-widget';
                break;
            default:
                classToBeApplied = 'widget';
                break;
        }
        return (
            <div 
            style={{height: this.state.widget.height, width: this.state.widget.width}} 
            className={classToBeApplied} onClick={(e, event, widget)=>this.props.UpdateWidgetZIndex(e, event, this.state.widget)}>
                {
                    this.props.showIcons &&
                    <WidgetHeader {...this.props} />
                }
                {
                    this.renderContent()
                }
            </div>
        )
    }

    renderContent() {
        switch (this.state.widget.widgetType) {

            case WidgetType.Box:
                return (
                    <BoxWidget {...this.state.widget} IsEditing={this.props.showIcons} />
                );

            case WidgetType.Progress:
                return (
                    <ProgressBarWidget {...this.state.widget} l={this.props.l} IsEditing={this.props.showIcons} />
                );

            case WidgetType.Speedo:
                return (
                    <SpeedoWidget {...this.state.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetType.Text:
                return (
                    <TextWidget {...this.state.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetType.Picture:
                return (
                    <PictureWidget {...this.state.widget} dashboardId={this.state.id} PreviewActionPicture={this.state.PreviewActionPicture} IsEditing={this.props.showIcons} />
                );

            case WidgetType.Pie:
                return (
                    <PieWidget {...this.props.widget} IsEditing={this.props.showIcons} />
                );

            case WidgetType.Bar:
                return (
                    <BarChartWidget {...this.state.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetType.CircularProgress:
                return (
                    <CircularProgressComponent {...this.state.widget} IsEditing={this.props.showIcons} />
                );

            case WidgetType.Combo:
                return (
                    <Combo {...this.state.widget}
                        IsEditing={this.props.showIcons}
                        ToggleEditorMenu={this.state.ToggleEditorMenu}
                        ToggleSettingsMenu={this.state.ToggleSettingsMenu}
                        DeleteWidget={this.state.DeleteWidget}
                        UpdateWidgetZIndex={this.props.UpdateWidgetZIndex}
                        l={this.props.l}
                        />
                );
            case WidgetType.Clock:
                return (
                    <ClockWidget {...this.state.widget} IsEditing={this.props.showIcons} />
                );
            default:
                return (
                    <BoxWidget {...this.state.widget} IsEditing={this.props.showIcons} />
                );
        }
    }
}
