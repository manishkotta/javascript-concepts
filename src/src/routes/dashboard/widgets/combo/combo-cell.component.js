import React from 'react';
import Widget from '../widget';
import WidgetType from '../../../../lib/enums/widget-type.enum'
export default class ComboCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            showIcons: props.showIcons,
            // allProps
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps,
            showIcons: nextProps.showIcons,
            // allProps
        });
    }

render() {
    let width = `${this.state.eachRowWidth ? this.state.eachRowWidth : 0}px`;
    let height = `${this.state.isHeader ? (this.state.adjustedHeaderHeight || 0) : (this.state.eachRowHeight || 0)}px`;
    
        return (
            <td
                className="combo-cell"
                style={{
                    width: width,
                    height: height
                }}>
                <Widget
                    widget={this.state.cell}
                    dashboardId={this.state.Id}
                    showIcons={this.state.IsEditing}
                    ToggleEditorMenu={this.state.ToggleEditorMenu}
                    ToggleSettingsMenu={this.state.ToggleSettingsMenu}
                    DeleteWidget={this.state.DeleteWidget}
                    UpdateWidgetZIndex={this.props.UpdateWidgetZIndex}
                    l={this.props.l}
                    isHeader={this.state.isHeader} 
                    />
            </td>
        )
    }


}
