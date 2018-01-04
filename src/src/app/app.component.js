import React, { PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import NotificationContainer from '../components/notifications';
import * as authMan from "../authentication/auth-manager";
import SpinnerContainer from '../components/spinner';
import * as CssUtils from '../utilities/CssUtils';


export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    authMan.setAuthTokenRefreshInitialized(false);
    //let culture = "he-IL";
    let culture = navigator.language;
    this.props.GetLocalizationData(culture);
  }

  componentWillReceiveProps(nextProps) {
    let path = nextProps.l.isRtl ? "/assets/vendors/bootstrap/css/bootstrap-rtl.css" : "";
    CssUtils.ReplaceCss("rtlCss", path)
  }

  static propTypes = {
    routes: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { routes, store } = this.props;
    return (
      <div dir={this.props.l.dir}>
        <Provider store={store} routes={routes}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
            <NotificationContainer />
            <SpinnerContainer />
          </div>
        </Provider>
        <div dir="ltr" className="navbar-fixed-bottom">
          <button onClick={() => this.props.GetLocalizationData("en-us")}>en-us</button>
          <button onClick={() => this.props.GetLocalizationData("en-AU")}>en-AU</button>
          <button onClick={() => this.props.GetLocalizationData("he-IL")}>he</button>
        </div>
      </div>
    )
  }
}
