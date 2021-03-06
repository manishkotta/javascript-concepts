import React from 'react'
import _ from 'lodash';
import ResponseStatusEnum from '../../lib/enums/response-status-enum'

const SHOW_NOTIFICATIONS = "SHOW_NOTIFICATIONS";
const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";


export function ShowNotification(messagesConfiguration) {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_NOTIFICATIONS,
      messagesConfiguration: messagesConfiguration,
      isRtl: getState().localizationStore.isRtl
    });
  }
}

export function ClearNotifications() {
  return {
    type: CLEAR_NOTIFICATIONS
  };
}

export const ACTION_HANDLERS = {
  [SHOW_NOTIFICATIONS]: (state, action) => {
    return Object.assign({}, state, {
      messages: action.messagesConfiguration.messages,
      persistMessages: action.messagesConfiguration.persistMessages,
      type: action.messagesConfiguration.type,
      func: action.messagesConfiguration.func,
      isRtl: action.isRtl
    })
  },
  [CLEAR_NOTIFICATIONS]: (state, action) => {
    return Object.assign({}, state, {
      type: ResponseStatusEnum.Error,
      messages: [],
      persistMessages:false,
      func: null
    })
  }
}


const initialState = {
  type: ResponseStatusEnum.Error, //'error',
  ShowNotification,
  ClearNotifications,
  persistMessages:false, // persistMessages property is used to persist any previous messages if needed. If we need not persist any previous messages, we can pass false. 
  messages: [],
  isRtl: false
};

export default function NotificationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
