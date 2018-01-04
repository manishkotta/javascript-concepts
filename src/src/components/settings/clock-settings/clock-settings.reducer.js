import * as ConstantValues from '../../../constants/constantValues';

export const UPDATE_SELECTED_HOURS_FORMAT = "UPDATE_SELECTED_HOURS_FORMAT";
export const UPDATE_SELECTED_TIME_FORMAT = "UPDATE_SELECTED_TIME_FORMAT";
export const UPDATE_SELECTED_DATE_FORMAT = "UPDATE_SELECTED_DATE_FORMAT";
export const UPDATE_SELECTED_TIME_ZONE = "UPDATE_SELECTED_TIME_ZONE";
export const UPDATE_WIDGET_SET = "UPDATE_WIDGET_SET";
export const UPDATE_TIMEZONE_LABEL = "UPDATE_TIMEZONE_LABEL";
export const UPDATE_CLOCK = "UPDATE_CLOCK";
export const RESET_CLOCK = "RESET_CLOCK";
export const UPDATE_DISPLAY_DATE = "UPDATE_DISPLAY_DATE";
export const UPDATE_DISPLAY_DAYS = "UPDATE_DISPLAY_DAYS";
export const INITIALIZE_CLOCK_SETTINGS = "INITIALIZE_CLOCK_SETTINGS";

export function setSelectedHoursFormatAction(selectedHoursFormat) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SELECTED_HOURS_FORMAT,
      selectedHoursFormat
    })
  }
}
export function setSelectedTimeFormatAction(selectedTimeFormat) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SELECTED_TIME_FORMAT,
      selectedTimeFormat
    })
  }
}
export function setSelectedDateFormatAction(selectedDateFormat) {
  return (dispatch, getState) => {
    dispatch(
      {
        type: UPDATE_SELECTED_DATE_FORMAT,
        selectedDateFormat
      }
    )
  }
}
export function setSelectedTimeZoneAction(selectedTimeZoneItem) {
  return (dispatch, getState) => {

    dispatch({
      type: UPDATE_SELECTED_TIME_ZONE,
      selectedTimeZoneItem
    })

    // dispatch({
    //   type: UPDATE_TIMEZONE_LABEL,
    //   tzoneText: selectedTimeZoneItem.label
    // })
  }
}
export function updateWidgetAction(clockSettings, widgetId) {
  return (dispatch, getState) => {
    dispatch(getState().newdashboard.RefreshClockWidgetAction(clockSettings, widgetId));

  }
}
export function setTimeZonelabelAction(tzoneText) {
  return (dispatch, getState) => {

    dispatch({
      type: UPDATE_TIMEZONE_LABEL,
      tzoneText
    })
  }
}
export function updateClocklAction(isAnalog) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CLOCK,
      isAnalog
    })
  }
}
export function DeleteWidgetAction() {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_CLOCK
    })
  }
}
export function updateDisplayDateAction(displayDate) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_DISPLAY_DATE,
      displayDate

    })
  }
}
export function updateDisplayDaysAction(displayDays) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_DISPLAY_DAYS,
      displayDays
    })
  }
}

export function initializeClocksettings(data) {
  var hoursFormat = _.find(ConstantValues.hoursFormat, (i) => i.value == data.selectedHoursFormat)
  var timeFormat = _.find(ConstantValues.timeFormat, (i) => i.value == data.selectedTimeFormat)
  var dateFormat = _.find(ConstantValues.dateFormats, (i) => i.value == data.selectedDateFormat)
  return (dispatch, getState) => {
    dispatch({
      type: INITIALIZE_CLOCK_SETTINGS,
      payload: {
        selectedTimeZoneItem: data.selectedTimeZoneItem,
        isAnalog: data.isAnalog,
        displayDate: data.displayDate,
        displayDays: data.displayDays,
        selectedHoursFormat: hoursFormat ? hoursFormat : _.first(ConstantValues.hoursFormat),
        selectedTimeFormat: timeFormat ? timeFormat : _.first(ConstantValues.timeFormat),
        selectedDateFormat: dateFormat ? dateFormat : _.first(ConstantValues.dateFormats),
        tzoneText: data.tzoneText
      }
    })
  }
}

export const ACTION_HANDLERS = {
  [UPDATE_SELECTED_HOURS_FORMAT]: (state, action) => {
    return Object.assign({}, state, {
      selectedHoursFormat: action.selectedHoursFormat
    })
  },
  [UPDATE_SELECTED_TIME_FORMAT]: (state, action) => {
    return Object.assign({}, state, {
      selectedTimeFormat: action.selectedTimeFormat
    })
  },
  [UPDATE_SELECTED_DATE_FORMAT]: (state, action) => {
    return Object.assign({}, state, {
      selectedDateFormat: action.selectedDateFormat
    })
  },
  [UPDATE_SELECTED_TIME_ZONE]: (state, action) => {
    return Object.assign({}, state, {
      selectedTimeZoneItem: action.selectedTimeZoneItem
    })
  },
  [UPDATE_WIDGET_SET]: (state, action) => {
    return Object.assign({}, state, {
      widget: action.widget
    })
  },
  [UPDATE_TIMEZONE_LABEL]: (state, action) => {
    return Object.assign({}, state, {
      tzoneText: action.tzoneText
    })
  },
  [UPDATE_CLOCK]: (state, action) => {
    return Object.assign({}, state, {
      isAnalog: action.isAnalog,
      // selectedHoursFormat: {},
      // selectedTimeFormat: {},
      // selectedDateFormat: {},
      displayDate: action.isAnalog ? false : true
    })
  },
  [RESET_CLOCK]: (state, action) => {
    return Object.assign({}, state, {
      selectedHoursFormat: {},
      selectedTimeFormat: {},
      selectedDateFormat: {},
      selectedTimeZoneItem: {},
      tzoneText: "",
      isAnalog: true,
      displayDate: false,
      displayDays: false
    })
  },
  [UPDATE_DISPLAY_DATE]: (state, action) => {
    return Object.assign({}, state, {
      displayDate: action.displayDate
    })
  },
  [UPDATE_DISPLAY_DAYS]: (state, action) => {
    return Object.assign({}, state, {
      displayDays: action.displayDays
    })
  },
  [INITIALIZE_CLOCK_SETTINGS]: (state, action) => {
    return Object.assign({}, state, action.payload)
  }
}

const initialState = {
  selectedHoursFormat: _.first(ConstantValues.hoursFormat),
  selectedTimeFormat: _.first(ConstantValues.timeFormat),
  selectedDateFormat: _.first(ConstantValues.dateFormats),
  selectedTimeZoneItem: {},
  tzoneText: "",
  isAnalog: true,
  displayDate: true,
  displayDays: true,
  DeleteWidgetAction,
  initializeClocksettings
}

export default function ClockSettingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

