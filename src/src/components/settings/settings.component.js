import React from 'react'
import '../../styles/headerStyles.css'
import Dock from '../dock/lib'
import TabsLayout from '../Tabs'
import WidgetType from '../../lib/enums/widget-type.enum'
import ClockSettingsContainer from './clock-settings/clock-settings.container'
// import '../../styles/buttons.css'


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <Dock isVisible={this.props.settings.widget.showSettings !== undefined && this.props.settings.widget.showSettings} dimMode={'none'} >
          {/* you can pass a function as a child here */}
          <div className='dockHeader'>
            <span> {this.renderTitle()} </span>
            {/* todo: need to remove inline styles */}
            <i className="dock-close-button fa fa-times" onClick={this.props.ToggleSettingsMenu.bind(this, this.props.settings.widget)} />
          </div>
          {
            this.props.settings.widget.showSettings !== undefined && this.props.settings.widget.showSettings &&
            <div id='applySettings'>
              {this.renderSettings()}
            </div>
          }
        </Dock>
      </div>
    )
  }

  renderTitle() {
    switch (this.props.settings.widget.widgetType) {
      case WidgetType.Box:
        return 'Box Settings';

      case WidgetType.Progress:
        return 'Progress Settings';

      case WidgetType.Speedo:
        return 'Speedo Settings';

      case WidgetType.Text:
        return 'Text Settings';

      case WidgetType.Picture:
        return 'Picture Settings';

      case WidgetType.Pie:
        return 'Pie Settings';

      case WidgetType.Bar:
        return 'Bar Settings';

      case WidgetType.Clock:
        return 'Clock Settings';

      case WidgetType.CircularProgress:
        return 'Circular Progress Settings';

      case WidgetType.Combo:
        return this.props.l.t('Combo_Settings', 'Combo Settings');

      default:
        return 'Settings';
    }
  }
  renderSettings() {
    if (this.props.settings.widget.widgetType !== undefined) {
      switch (this.props.settings.widget.widgetType) {
        case WidgetType.Clock:
          return (
            <ClockSettingsContainer widget={this.props.settings.widget} {...this.props} />
          );
        default:
          return (
            <TabsLayout widget={this.props.settings.widget} {...this.props} />
          );
      }
    }
  }
}
