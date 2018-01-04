import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import LoginFormReducer, * as LoginReducer from '../routes/Login/Reducers/LoginFormReducer'
import * as authMan from "../authentication/auth-manager";

export default function requiresAuth(Component, options) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      
      debugger

      if (!this.props.user.userInitalized)
        this.props.initializeUserFromCache(authMan.getAuth()); // on refresh try to initalize user from local storage
    }
    componentWillMount() {
      this.checkAndRedirect();
    }
    componentWillReceiveProps(nextProps) {
      this.checkAndRedirect();
    }
    componentDidUpdate() {
    }

    checkAndRedirect() {
      debugger
      if (!this.props.user.userInitalized)
        return

      const { roles } = options ? options : {};

      if (!authMan.isAuthenticated())// TODO : move this function to reducer
        return browserHistory.push('/login');

      if (!this.props.user.pingInitiated) {
        this.props.initiatePing();
      }

      if (!authMan.isAuthTokenRefreshInitialized()) {
        authMan.triggerRefreshToken();
      }

      if (!this.authorize(authMan.getAuth(), roles)) {
        browserHistory.push('/login');
      }

    }

    authorize(auth, authorizedRoles) {
      if (!authorizedRoles)
        return true;

      let authorized = false;
      const userRoles = auth.roles.split(',');
      _.forEach(userRoles, (urole) => {
        if (authorizedRoles.includes(urole)) {
          authorized = true;
        }
      });

      return authorized;
    }

    render() {
      return (
        <div className="authenticated">
          <Component {...this.props} />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      initiatePing: () => {
        dispatch(LoginReducer.InitiatePing())
        dispatch(LoginReducer.SetTokenRefreshTimeout())
      },
      initializeUserFromCache: (userData) => {
        dispatch(LoginReducer.initializeUserFromCache(userData))
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
