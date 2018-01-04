import React from 'react';
import { browserHistory, Router } from 'react-router';
import newReducer from '../../new-dashboard/reducers/new-dashboard.reducer';
export const PREVIEW_DASHBOARD = "PREVIEW_DASHBOARD";
export const UPDATE_WIDGET = "UPDATE_WIDGET";

const initialState = {
  dashboard: {}
};

export const ACTION_HANDLERS = {

  [PREVIEW_DASHBOARD]: (state, action) => {
    return Object.assign({}, state, {
      dashboard: action.dashboardData
    })
  }
}

export function getUserDashboardByIdAction(dashboardId) {
  return (dispatch, getState) => {
      dispatch({
        type: PREVIEW_DASHBOARD,
        dashboardData: getState().newdashboard
      })
    }
}


export function ResetDashboard(){
  return (dispatch, getState) => {
    dispatch({
      type: PREVIEW_DASHBOARD,
      dashboardData: {}
    });
  }
}

export default function PreviewDashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
