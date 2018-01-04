import _ from 'lodash';
import WidgetType from '../../lib/enums/widget-type.enum';
const UPDATE_WIDGET_S = "UPDATE_WIDGET_S";
const UPDATE_WIDGETS_S = "UPDATE_WIDGETS_S";
const UPDATE_WIDGET_ISDIRTY_S = "UPDATE_WIDGET_ISDIRTY_S";

export function ToggleSettingsMenuAction(widget) {
  return (dispatch, getState) => {
    let widgets = getState().newdashboard.widgets;
    // check if its same widget and clean datametrics 
    dispatch(getState().dataMetrics.clearSelectedDM())

    let currentWidget = null;
    _.forEach(widgets, (w) => {
      currentWidget = w.id === widget.id ? w : currentWidget;
      w.showSettings = (!w.showSettings && w.id === widget.id);
      if (w.widgetType === WidgetType.Combo) {
        _.forEach(w.matrix, (row) => {
          _.forEach(row, (wid) => {
            wid.showSettings = (!wid.showSettings && wid.id === widget.id)
            currentWidget = wid.id === widget.id ? wid : currentWidget;
          });
        });
      }
    });

    dispatch({
      type: UPDATE_WIDGETS_S,
      widgets
    });

    dispatch({
      type: UPDATE_WIDGET_S,
      widget: currentWidget
    });
    dispatch(getState().newdashboard.topTabsClickEvent("first"));
    if (currentWidget.widgetType != WidgetType.Clock) {
      dispatch(getState().dataMetrics.getMetaDataAction(currentWidget.widgetType))
    }else{
      dispatch(getState().clock.initializeClocksettings(currentWidget))
    }
  }
}

export function CollapseAllSettingsMenusAction() {
  return (dispatch, getState) => {
    let widgets = getState().newdashboard.widgets;

    _.forEach(widgets, (w) => {
      w.showSettings = false;
      if (w.widgetType === WidgetType.Combo) {
        _.forEach(w.matrix, (row) => {
          _.forEach(row, (wid) => {
            wid.showSettings = false;
          });
        });
      }
    });


    dispatch({
      type: UPDATE_WIDGETS_S,
      widgets
    });
  }
}

export function DeleteWidgetAction(widgetId) {
  return (dispatch, getState) => {
    let widgets = getState().settings.widgets;
    widgets = _.filter(widgets, (widget) => widget.id !== widgetId);
    dispatch({
      type: UPDATE_WIDGETS_S,
      widgets
    });
    if (getState().settings.widget.id === widgetId) {
      let widget = getState().settings.widget;
      widget.showSettings = false;
      //dispatch({
      //    type: UPDATE_WIDGET,
      //    widget
      //});
      dispatch({
        type: UPDATE_WIDGET_S,
        widget: {}
      });
    }
  }
}

export function AddWidgetToSettingsCollectionAction(widget) {
  return (dispatch, getState) => {
    let widgets = getState().settings.widgets;
    let currentWidget = _.find(widgets, (w) => w.id === widget.id);
    if (currentWidget) {
      console.log("already added to settings col")
      return;
    }
    widgets.push(widget);

    dispatch({
      type: UPDATE_WIDGETS_S,
      widgets
    });
  }
}

export function AddWidgetsToSettingsCollectionAction(_widgets) {
  return (dispatch, getState) => {
    let widgets = _widgets;
    dispatch({
      type: UPDATE_WIDGETS_S,
      widgets
    });
  }
}

export function SetWidgetDataMetricsDirty(isDirty) {
  return (dispatch, getState) => {
    let currentWidget = getState().settings.widget;
    if (currentWidget) {
      currentWidget.isDMDirty = isDirty;
      return dispatch({
        type: UPDATE_WIDGET_ISDIRTY_S,
        currentWidget: currentWidget
      });;
    }
  }
}

export function UpdateMetricsOfWidget(dataMetrics) {
  // return (dispatch, getState) => {
  //   debugger
  //   const widget = getState().settings.widget;
  //   widget.appliedSettings.dataMetrics = dataMetrics;
  //   return {
  //     type: UPDATE_WIDGET_S,
  //     widget
  //   }
  // }
}

export const ACTION_HANDLERS = {
  [UPDATE_WIDGET_S]: (state, action) => {
    return Object.assign({}, state, {
      widget: action.widget
    })
  },
  [UPDATE_WIDGETS_S]: (state, action) => {
    return Object.assign({}, state, {
      widgets: action.widgets
    })
  },
  [UPDATE_WIDGET_ISDIRTY_S]: (state, action) => {
    // will end up in infinite loop, if we use object.assign..which creates new reference and hence new props
    return Object.assign({}, state, {
      widget: action.currentWidget
    })
  }
}

const initialState = {
  widgets: [],
  widget: {},
  ToggleSettingsMenuAction,
  CollapseAllSettingsMenusAction,
  DeleteWidgetAction,
  AddWidgetToSettingsCollectionAction,
  AddWidgetsToSettingsCollectionAction,
  SetWidgetDataMetricsDirty,
  UpdateMetricsOfWidget
};

export default function SettingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
