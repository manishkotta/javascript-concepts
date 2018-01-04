import React from 'react';
import WidgetType from '../../../../lib/enums/widget-type.enum';

export default class WidgetHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        let classToBeApplied = 'widget-heading' ; //combo-widget-heading

        switch(this.props.widget.widgetType ){
            case WidgetType.Combo:
            classToBeApplied = 'combo-widget-heading';
            break;
            default:
            classToBeApplied = 'widget-heading';
            break;
        }

        return (
            <div className={classToBeApplied}>
                <div className="widget-heading-icons-section">
                    <i className="widget-heading-icon fa fa-paint-brush"
                        onClick={() => this.props.ToggleEditorMenu(this.props.widget)} />&nbsp;&nbsp;
                    {
                          (((this.props.widget.widgetType != WidgetType.Text || this.props.isHeader) || this.props.widget.widgetType == WidgetType.Combo) && this.props.widget.widgetType != WidgetType.Picture) &&
                        <i className="widget-heading-icon fa fa-wrench"
                            onClick={() => this.props.ToggleSettingsMenu(this.props.widget)} />

                    }&nbsp;&nbsp;
                    {
                        !this.props.widget.isComboWidget &&
                        <i className="widget-heading-icon fa fa-trash-o" onClick={() => this.props.DeleteWidget(this.props.widget.id)} />
                    }

                </div>
            </div>
        );
    }
}
