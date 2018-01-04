import React from 'react'
import { push, replace } from 'react-router-redux'
import { browserHistory, Router } from 'react-router'
import * as authService from '../../../api/auth.service';
import * as authMan from "../../../authentication/auth-manager";
import ResponseStatusEnum from '../../../lib/enums/response-status-enum';
import * as Constants from '../../../constants/constantValues';

export const SAVE_LOGIN = "SAVE_LOGIN";
export const LOGIN_DETAILS = "LOGIN_DETAILS"
export const INITIATE_PING = "INITIATE_PING"
export const TEST = "UPDATE_PING1TEST1"

const initialState = {
  loggedIn: false,
  userInitalized: false,
  auth: {},
  accessToken: '',
  expiresIn: '',
  refreshToken: '',
  userName: '',
  roles: '',
  nic: '',
  expiresOn: '',
  issuedOn: '',
  logout,
  pingInitiated: false,
  authRefreshInitiated: false,
  tested: false,
  tokenRefInterval: undefined
  // ping
  // testaa
};

export const ACTION_HANDLERS = {
  [SAVE_LOGIN]: (state, action) => {
    let auth = action.auth || {}
    return Object.assign({}, state, {
      auth: auth,
      accessToken: auth.access_token,
      expiresIn: auth.expires_in,
      refreshToken: auth.refresh_token,
      userName: auth.userName,
      roles: auth.roles,
      nic: auth.Nic,
      expiresOn: auth['.issued'],
      issuedOn: auth['.expires'],
      loggedIn: action.loggedIn,
      userInitalized: action.userInitalized
    })
  },
  [TEST]: (state, action) => {
    return Object.assign({}, state, {
      tested: !state.tested
    })
  },
  [INITIATE_PING]: (state, action) => {
    if (!state.pingInitiated)
      return Object.assign({}, state, {
        pingInitiated: true
      })
  }
}

export function saveLogin(loginDetails) {
  // dispatch(browserHistory.push('/dashboard/mydashboards'))
  return (dispatch, getState) => {
    dispatch(getState().spinnerStore.BeginTask());
    authService.userLogin(loginDetails)
      .then((response) => {
        dispatch(getState().spinnerStore.EndTask());
        if (!response) {
          return;
        }
        if (response.status === 200) {
          //dispatch(getState().notificationStore.ClearNotifications());
          localStorage.setItem('auth', JSON.stringify(response.data));
          dispatch({
            type: SAVE_LOGIN,
            auth: response.data
          })
          console.log("REFRESH TOKEN TRIGGER SET FROM NEW LOGIN")
          authMan.triggerRefreshToken();
          dispatch({
            type: SAVE_LOGIN,
            auth: response.data,
            loggedIn: true,
            userInitalized: true
          });
          dispatch(browserHistory.push('/dashboard/mydashboards'));
        }
      })
      .catch((err) => {
        dispatch(getState().spinnerStore.EndTask());
        //if(response.data != null){
        if (err.response.status === 400) {
          dispatch(getState().notificationStore.ShowNotification({
            type: ResponseStatusEnum.Error,
            messages: [{
              displayMessage: err.response.data.error_description
            }]
          }));
        }
        // }
      })
  }
}

export function initializeUserFromCache(userData) {
  debugger
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_LOGIN,
      auth: userData,
      loggedIn: true,
      userInitalized: true
    })
  }
}

export function InitiatePing() {
  return (dispatch, getState) => {
    dispatch({
      type: INITIATE_PING
    });
  }
}

export function SetTokenRefreshTimeout() {
  return (dispatch, getState) => {
    let auth = getState().user.auth;

    let timeDiff = Date.parse(auth[".expires"]) - Date.parse(new Date().toGMTString());
    console.log(timeDiff, isNaN(timeDiff));

    if (auth.refresh_token && !isNaN(timeDiff)) {

      console.log("TOKEN REFRESH timeout SET FOR: " + timeDiff, auth[".expires"]);
      setTimeout(() => {
        let refToken = auth.refresh_token;
        console.log("TOKEN REFRESH STARTED", refToken)
        // authService.refreshToken(refToken);
      }, timeDiff - 1000);

    } else {
      console.log("NO REFRESH TOKEN FOUND")
    }
  }
}

export function logout() {
  return (dispatch, getState) => {
    authService.userLogout().then(res => {
      authMan.clearAuth();
      dispatch(
        {
          type: Constants.USER_LOGOUT
        }
      )
    });
  }
}

export default function LoginFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
