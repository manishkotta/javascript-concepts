import React from 'react';
import ComboWidget from './combo-widget.component';
import WidgetType from '../../../../lib/enums/widget-type.enum';
import ReactDom from 'react-dom';
import ScrollTypeEnum from '../../../../lib/enums/scroll-type-enum';

export default class Combo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }
    render() {
        return (
            <div  className={this.props.IsEditing ? "widget-content-wrapper" : "widget-content"}  >
                <ComboWidget {...this.state} />
            </div>
        );
    }
}



