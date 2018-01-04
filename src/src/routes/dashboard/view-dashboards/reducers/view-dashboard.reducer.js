import React from 'react'
import { browserHistory, Router } from 'react-router'
import * as dashboardService from '../../../../api/dashboard.service';
import WidgetType from '../../../../lib/enums/widget-type.enum';
import * as dashboardUtils from '../../../../lib/dashboard';
import ScrollTypeEnum from '../../../../lib/enums/scroll-type-enum';
import PictureStretchEnum from '../../../../lib/enums/picture-stretch-enum';
import newReducer from '../../new-dashboard/reducers/new-dashboard.reducer';
import StatisticCategory from '../../../../lib/enums/statistic-category.enum';
import * as widgetService from '../../../../api/widget.service';
import * as WidgetData from '../../../../lib/widget-data';
import * as  DateZone from '../../../../lib/date-conversion';
import * as Constants from '../../../../constants/constantValues';
export const VIEW_DASHBOARD = "VIEW_DASHBOARD"
export const UPDATE_WIDGET = "UPDATE_WIDGET"

const initialState = {
  dashboard: {},
  UpdateViewFlagAction
};

export const ACTION_HANDLERS = {

  [VIEW_DASHBOARD]: (state, action) => {
    return Object.assign({}, state, {
      dashboard: action.dashboardData
    })
  },
  [UPDATE_WIDGET]: (state, action) => {
    let widget = _.find(state.dashboard.widgets, (w) => w.id === action.widget.id);
    if (widget)
      widget = action.widget;
    return Object.assign({}, state, state)

  }
}

export function getUserDashboardByIdAction(dashboardId, isFromEdit) {

  return (dispatch, getState) => {
    if (!isFromEdit && dashboardId && dashboardId != "undefined") {
      dispatch(getState().spinnerStore.BeginTask());
      dashboardService.getDashboardById(dashboardId, false).then((response) => {
        if (response.status === 200) {
          let dashboard = response.data;

          let dashboardData = dashboardUtils.dashboard(dashboard);
          dispatch(getState().spinnerStore.EndTask());
          dispatch({
            type: VIEW_DASHBOARD,
            dashboardData
          });
        }
      }).catch((err) => {
        dispatch(getState().spinnerStore.EndTask());
      });
    } else {
      let dashboard = getState().newdashboard;
      dashboard.isFromEdit = isFromEdit;
      dispatch({
        type: VIEW_DASHBOARD,
        dashboardData: dashboard
      })
    }
  }
}
export function UpdateViewFlagAction(isFromEdit) {
  return (dispatch, getState) => {
    dispatch({
      type: VIEW_DASHBOARD,
      dashboardData: { isFromEdit: isFromEdit }
    });
  }
}
export function pullDashboardDataAction(dashboardId, widgetId, isFromEdit) {
  return (dispatch, getState) => {
    let widgets = [];
    if (!isFromEdit && dashboardId && dashboardId != "undefined")
      widgets = getState().viewDashboard.dashboard.widgets; // _.find(getState().sliderDashboard.dashboards, (dashboard) => dashboard.Id === dashboardId);
    else
      widgets = getState().newdashboard.widgets;
    let widget = _.find(widgets, (widget) => widget.id === widgetId);
    if (!widget)
      return;
    switch (widget.widgetType) {
      case WidgetType.Clock:
        dispatch({
          type: UPDATE_WIDGET,
          widget
        })
        break;
      default:
        if (!isFromEdit && dashboardId && dashboardId != "undefined") {
          dashboardService.viewWidgetData(dashboardId, widgetId).then((response) => {
            if (response.status === 200) {
              switch (response.data.wrt) {
                case WidgetType.Box:
                case WidgetType.Progress:
                case WidgetType.Speedo:
                case WidgetType.CircularProgress:
                  widget.displayValue = response.data.wrdv;
                  widget.value = response.data.wrv;
                  break;
                case WidgetType.Pie:
                case WidgetType.Bar:
                  widget.data = _.map(response.data.wrcc, (d) => {
                    return {
                      label: d.l,
                      data: d.d
                    };
                  });
                  break;
                case WidgetType.Picture:
                  widget.picturePath = response.data.pblob,
                    widget.pictureStretch = response.data.wps == 1 ? {
                      value: PictureStretchEnum.None,
                      label: 'None'
                    } : {
                        value: PictureStretchEnum.Fill,
                        label: 'Fill'
                      };
                  break;
                case WidgetType.Text:
                  let scrollType = {
                    value: ScrollTypeEnum.None,
                    label: 'No Scroll'
                  };
                  switch (response.data.twrst) {
                    case ScrollTypeEnum.LeftToRight:
                      scrollType = {
                        value: ScrollTypeEnum.LeftToRight,
                        label: 'Left-Right'
                      };
                      break;
                    case ScrollTypeEnum.RightToLeft:
                      scrollType = {
                        value: ScrollTypeEnum.RightToLeft,
                        label: 'Right-Left'
                      };
                      break;
                    case ScrollTypeEnum.TopToBottom:
                      scrollType = {
                        value: ScrollTypeEnum.TopToBottom,
                        label: 'Top-Bottom'
                      };
                      break;
                    case ScrollTypeEnum.BottomToTop:
                      scrollType = {
                        value: ScrollTypeEnum.BottomToTop,
                        label: 'Bottom-Top'
                      };
                      break;
                    default:
                      scrollType = {
                        value: ScrollTypeEnum.None,
                        label: 'No Scroll'
                      };

                  }


                  widget.displayValue = response.data.wrdv,
                    widget.scrollSpeed = response.data.twrd,
                    widget.scrollType = scrollType
                  break;
                case WidgetType.Combo:
                  comboResultMapping(widget, response);
                  break;
              }
              const {
                widgetBody
              } = widget || {};
              if (widgetBody) {
                widget.appliedBackgroundColor = response.data.wrth && response.data.wrth.thc ? response.data.wrth.thc : widgetBody.backgroundColor;
              }
              dispatch({
                type: UPDATE_WIDGET,
                widget
              })
            }
          });
        }
        else {
          switch (widget.widgetType) {
            case WidgetType.Text:
            case WidgetType.Picture:
              dispatch({
                type: UPDATE_WIDGET,
                widget
              })
              break;
            default:
              dispatch(PreviewAction(widget, true, dashboardId))
              break;
          }
        }
        break;
    }
  }
}
/**
 * To map the matrix and grid result.
 * @param {*} widget 
 * @param {*} response 
 */
function comboResultMapping(widget, response) {
  if (widget.appliedSettings.dataMetrics.statisticCategory == StatisticCategory.RealTime) {
    let i = 0,
      j = 0;
    for (i = 0; i < response.data.wrgd.length; i++) {
      for (j = 0; j < response.data.wrgd[i].length; j++) {
        if (widget.matrix[i + 1][j].widgetType == WidgetType.Text) {
          widget.matrix[i + 1][j].title = response.data.wrgd[i][j].gdv;
        }
        else {
          widget.matrix[i + 1][j].displayValue = response.data.wrgd[i][j].gddv;
          widget.matrix[i + 1][j].value = response.data.wrgd[i][j].gdv;
          widget.matrix[i + 1][j].appliedBackgroundColor = response.data.wrgd[i][j].gdth && response.data.wrgd[i][j].gdth.thc ? response.data.wrgd[i][j].gdth.thc : widget.matrix[i + 1][j].widgetBody.backgroundColor;
        }
        const {
                  widgetBody
              } = widget.matrix[i + 1][j] || {};
        if (widgetBody) {
          widgetBody.backgroundColor = response.data.wrgd[i][j].gdth && response.data.wrgd[i][j].gdth.thc ? response.data.wrgd[i][j].gdth.thc : widget.appliedSettings.group.isEdit ? widget.matrix[i + 1][j].widgetBody.backgroundColor : widget.matrix[i + 1][j].appliedBackgroundColor;
        }

      }
    }

  } else {
    widget.matrix = [widget.matrix[0]];
    for (var i = 0; i < response.data.wrgd.length; i++) {
      var cellList = [];
      for (var j = 0; j < response.data.wrgd[i].length; j++) {
        var cell = WidgetData.GetWidget(WidgetType.Box, true, 0);
        var colummCheck = widget.matrix[0][j];
        if (Constants.DateTypes.indexOf(colummCheck.dataType) == 1 && colummCheck.dateFormat) {
          response.data.wrgd[i][j].gddv = DateZone.getDateBasedOnFormats(new Date(response.data.wrgd[i][j].gddv), widget.matrix[0][j].dateFormat);
        } else if (Constants.NumericTypes.indexOf(colummCheck.dataType) != -1 && colummCheck.showZeroValues) {
          response.data.wrgd[i][j].gddv = response.data.wrgd[i][j].gddv ? response.data.wrgd[i][j].gddv : "0"
        }
        cell.displayValue = response.data.wrgd[i][j].gddv;
        cell.value = response.data.wrgd[i][j].gdv;
        cell.isComboWidget = true;
        cell.comboId = widget.id;
        if (colummCheck.appliedSettings.thresholds.length > 0) {
          cell.appliedBackgroundColor = cell.widgetBody.backgroundColor = dashboardUtils.MapComboCustomThreshold(colummCheck, cell);
        }
        cellList.push(cell);
      }
      widget.matrix.push(cellList);
    }
  }
}
export function ResetDashboard() {
  return (dispatch, getState) => {
    dispatch({
      type: VIEW_DASHBOARD,
      dashboardData: {}
    });
  }
}

export function PreviewAction(inputWidget, isLive, dashboardId) {
  return (dispatch, getState) => {
    const thresholds = _.map(inputWidget.appliedSettings.thresholds, threshold => {
      return {
        thv: threshold.levelValue,
        thea: threshold.emailTo,
        thes: threshold.emailSubject,
        thmn: threshold.smsTo,
        thc: threshold.color, // TODO: Pass Color appropriately
        // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
        thst: threshold.isContinuous ? 1 : 0 // TODO: Create an enum or have a boolean value for isContinuos
      };
    });
    let columns = [];
    let comboMatrix = [];

    if (inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics) {
      if (inputWidget.widgetType == WidgetType.Combo) {
        columns = _.map(inputWidget.appliedSettings.dataMetrics.comboSelectedStatisticItems, eachDataMetrics => {

          return {
            cisiid: eachDataMetrics && eachDataMetrics.item && eachDataMetrics.item.id,
            ciafid: eachDataMetrics && eachDataMetrics.func && eachDataMetrics.func.id,
            cirob: 0,
            ciia: 0,
            cdf: eachDataMetrics && eachDataMetrics.displayFormat && eachDataMetrics.displayFormat.id,
            cwt: eachDataMetrics && eachDataMetrics.widget && eachDataMetrics.widget.value
          };
        });
        const group = _.find(getState().dataMetrics.datametricMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group &&
          metric.StatisticGroupId === inputWidget.appliedSettings.dataMetrics.group.id &&
          metric.WidgetType === inputWidget.widgetType &&
          metric.IsFilterId);
        let column = {
          cisiid: group && group.StatisticItemId ? group.StatisticItemId : 0,
          ciafid: group && group.StatisticFunctionId ? group.StatisticFunctionId : 0,
          cirob: 0,
          ciia: 0
        };
        columns.splice(0, 0, column);
        columns = _.uniqBy(columns, c => c.cisiid);
        comboMatrix = GetComboMatrix(inputWidget);

      } else {
        if (inputWidget.widgetType === WidgetType.Pie || inputWidget.widgetType === WidgetType.Bar) {
          const group = _.find(getState().dataMetrics.datametricMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group
            && metric.StatisticGroupId === inputWidget.appliedSettings.dataMetrics.group.id
            && metric.WidgetType === inputWidget.widgetType
            && metric.IsDrillDownFilter);
          columns.push({
            cisiid: group && group.StatisticItemId ? group.StatisticItemId : 0,
            ciafid: group && group.StatisticFunctionId ? group.StatisticFunctionId : 0,
            cirob: 0,
            ciia: 0
          });
        }

        columns.push({
          cisiid: inputWidget.appliedSettings.dataMetrics.item && inputWidget.appliedSettings.dataMetrics.item.id,
          ciafid: inputWidget.appliedSettings.dataMetrics.func && inputWidget.appliedSettings.dataMetrics.func.id,
          cirob: 0,
          ciia: 0
        });
      }
    }
    let drillDownData = [];
    if (inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics) {
      // TODO: we have to send the  only value array to skip the below logic.
      if (inputWidget.appliedSettings.dataMetrics.drillDownOptions && inputWidget.appliedSettings.dataMetrics.drillDownOptions.length > 0 && Object.keys(inputWidget.appliedSettings.dataMetrics.drillDownOptions[0]).length > 1) {
        drillDownData = _.map(_.filter(inputWidget.appliedSettings.dataMetrics.drillDownOptions, option => option.checked),
          (op) => op.value
        );
      }
      else {
        drillDownData = inputWidget.appliedSettings.dataMetrics.drillDownOptions;
      }

    }
    const widgetData = {
      wid: inputWidget.id,
      wt: inputWidget.widgetType,
      ws: {
        // TODO: Need to move it to different function and return appropriate typeofmetric.
        stom: inputWidget && inputWidget.appliedSettings.dataMetrics && inputWidget.appliedSettings.dataMetrics.statisticCategory,
        srt: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics ? {
          rsgid: inputWidget.appliedSettings.dataMetrics.group ? inputWidget.appliedSettings.dataMetrics.group.id : null,
          rsiid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : null,
          rsfid: inputWidget.appliedSettings.dataMetrics.func ? inputWidget.appliedSettings.dataMetrics.func.id : null,
          rsdfid: inputWidget.appliedSettings.dataMetrics.displayFormat ? inputWidget.appliedSettings.dataMetrics.displayFormat.id : null,
          rc: columns,
          rf: drillDownData
        } : {},
        scr: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategory.CyReport == inputWidget.appliedSettings.dataMetrics.statisticCategory ? { rid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : 0 } : {},
        sc: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategory.Custom == inputWidget.appliedSettings.dataMetrics.statisticCategory ? { qry: inputWidget.appliedSettings.dataMetrics.query } : {},
      },
      wth: thresholds,
      wmx: comboMatrix,
      isLive: isLive,
      wtl: inputWidget.title
    }
    widgetService.getWidgetPreviewData(widgetData, dashboardId).then(function (response) {
      if (response.status === 200) {
        const widget = _.find(getState().newdashboard.widgets, (widget) => widget.id == response.data.wrid);
        // TODO: change the logic according to the data
        if (widget) {
          switch (response.data.wrt) {
            case WidgetType.Box:
            case WidgetType.Progress:
            case WidgetType.Speedo:
            case WidgetType.CircularProgress:
              widget.displayValue = response.data.wrdv;
              widget.value = response.data.wrv;
              break;

            case WidgetType.Pie:
            case WidgetType.Bar:
              widget.data = _.map(response.data.wrcc, (d) => {
                return {
                  label: d.l,
                  data: d.d
                };
              });
              break;
            case WidgetType.Combo:
              comboResultMapping(widget, response);
              break;
          }

          const { widgetBody } = widget || {};
          if (widgetBody) {
            widget.appliedBackgroundColor = response.data.wrth && response.data.wrth.thc ? response.data.wrth.thc : widgetBody.backgroundColor;
          }
          dispatch({
            type: UPDATE_WIDGET,
            widget
          });

        }

      }
    });
  }
}

function GetComboMatrix(inputWidget) {
  let i = 0, j = 0;
  let comboMatrixs = [];
  for (i = 0; i < inputWidget.matrix.length; i++) {
    let comboRow = [];
    for (j = 0; j < inputWidget.matrix[i].length; j++) {
      var comboInnerWidget = {};
      let eachWidget = inputWidget.matrix[i][j];
      comboInnerWidget = {
        wid: eachWidget.id,
        wt: eachWidget.widgetType,
        wmax: eachWidget.max,
        wmin: eachWidget.min,
        wtl: eachWidget.title,
        wri: -1,
        wsgc: eachWidget.widgetType === WidgetType.Speedo ? eachWidget.segmentColors : [],
        wth: MapThresholds(eachWidget),
        wb: StylesMapper(eachWidget.widgetBody),
        wvs: StylesMapper(eachWidget.valueStyles),
        wts: StylesMapper(eachWidget.titleStyles),
        wrs: StylesMapper(eachWidget.rangeValueStyles),
        wsmv: eachWidget.showMaxValueOnWidget,
        fc: eachWidget.column ? eachWidget.column : ""

      };
      comboRow.push(comboInnerWidget);
    }
    comboMatrixs.push(comboRow);
  }
  return comboMatrixs;
}
function MapThresholds(inputWidget) {

  if (inputWidget.appliedSettings && inputWidget.appliedSettings.thresholds) {
    let thresholds = _.map(inputWidget.appliedSettings.thresholds, threshold => {
      return {
        thv: threshold.levelValue,
        thc: threshold.color, // TODO: Pass Color appropriately
        // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
        thst: threshold.isContinuous ? 1 : 0,  // TODO: Create an enum or have a boolean value for isContinuos
        thea: threshold.emailTo,
        thes: threshold.emailSubject,
      };
    });
    return thresholds;
  }
}

function StylesMapper(styels) {
  return styels ? {
    sbc: styels.backgroundColor,
    sc: styels.color,
    sff: styels.fontFamily,
    sfs: styels.fontSize
  } : {};
}

export default function ViewDashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
