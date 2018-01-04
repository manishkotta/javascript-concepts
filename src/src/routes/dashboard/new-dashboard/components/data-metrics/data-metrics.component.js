import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import './styles.css';
import WidgetType from '../../../../../lib/enums/widget-type.enum';
import GridSettings from './grid-settings';
import Settings from './settings';

export default class DataMetrics extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
             ...props
         };
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            ...nextProps
        });
        
    }

    render() {

        return (<Tab.Container id="left-tabs-example">
            <Row className="clearfix">
                <Col sm={12}>
                    {
                        this.renderSettings()
                    }
                </Col>

            </Row>
        </Tab.Container>

        );
    }

    renderSettings() {

    if (this.props.settings.widget.widgetType !== undefined) {
      switch (this.props.settings.widget.widgetType) {
        case WidgetType.Box:
        case WidgetType.Progress:
        case WidgetType.Speedo:
        case WidgetType.Pie:
        case WidgetType.Bar:
        case WidgetType.CircularProgress:
           return (<Settings widget={this.props.settings.widget} {...this.props} />);
        case WidgetType.Combo:
          return (
            <GridSettings widget={this.props.settings.widget} {...this.props} />
          );
        default:
          return (
            <div>Some error occured.</div>
          );
      }
    }
  }
}
