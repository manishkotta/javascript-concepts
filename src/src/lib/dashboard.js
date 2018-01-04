import WidgetType from '../lib/enums/widget-type.enum';
import * as ConstantValues from '../constants/constantValues';
import ScrollTypeEnum from '../lib/enums/scroll-type-enum';
import _ from 'lodash';

export function getSelectedGroup(group, metrics) {
  var selectedGroup = _.find(metrics, {
    'StatisticGroupId': group.rsgid
  });
  if (selectedGroup) {
    return {
      id: selectedGroup.StatisticGroupId,
      label: selectedGroup.StatisticGroup,
      value: selectedGroup.Id
    }
  } else {
    return {
      id: group.rsgid,
      label: 'metrics unavailable'
    }
  }

}
export function getSelectedItem(item, metrics) {
  var selectedItem = _.find(metrics, {
    'StatisticItemId': item.rsiid
  });
  if (selectedItem) {
    return {
      id: selectedItem.StatisticItemId,
      label: selectedItem.StatisticItem,
      value: selectedItem.Id
    }
  } else {
    return {
      id: item.rsiid,
      label: 'metrics unavailable'
    }
  }


}
export function getSelectedFunction(func, metrics) {
  var selectedFunc = _.find(metrics, {
    'StatisticFunctionId': func.rsfid
  });
  if (selectedFunc) {
    return {
      id: selectedFunc.StatisticFunctionId,
      label: selectedFunc.StatisticFunction,
      value: selectedFunc.Id
    }
  } else {
    return {
      id: func.rsfid,
      label: 'metrics unavailable'
    }

  }

}
export function getDisplayFormat(displayFormat, metrics) {
  var selectedDisplayFormat = _.find(metrics, {
    'DisplayFormatId': displayFormat
  });
  if (selectedDisplayFormat) {
    return {
      id: selectedDisplayFormat.DisplayFormatId,
      label: selectedDisplayFormat.DisplayFormat,
      value: selectedDisplayFormat.Id
    }
  } else {
    return {
      id: displayFormat,
      label: 'metrics unavailable'
    }
  }

}
export function getTitle(widgetType, title) {
  switch (widgetType) {
    case WidgetType.Box:
      return 'Box ' + title;
    case WidgetType.Progress:
      return 'Progress ' + title;
    case WidgetType.Speedo:
      return 'Speedo ' + title;
    case WidgetType.Pie:
      return 'Pie ' + title;
    case WidgetType.Bar:
      return 'Bar ' + title;
    case WidgetType.Grid:
      return 'Grid ' + title;
    case WidgetType.Combo:
      return 'Combo ' + title;
    case WidgetType.Clock:
      return 'Clock ' + title;
    case WidgetType.Text:
      return 'Text ' + title;
    case WidgetType.MessageScroll:
      return 'MessageScroll ' + title;
    case WidgetType.Picture:
      return 'Picture ' + title;
    case WidgetType.CircularProgress:
      return 'Circular Progress ' + title;
  }

}
export function getSelectedTimeZone(timeZoneItem) {
  //    let parseTimeZone = parseFloat(timeZoneItem) ;
  let selectedTimeZoneItem = _.find(ConstantValues.timezoneList, {
    'value': timeZoneItem
  });

  return selectedTimeZoneItem;
}

export function getScrollType(scrollType) {

  switch (scrollType) {
    case ScrollTypeEnum.None:
      return {
        value: ScrollTypeEnum.None,
        label: 'No Scroll'
      };
    case ScrollTypeEnum.RightToLeft:
      return {
        value: ScrollTypeEnum.RightToLeft,
        label: 'Right-Left'
      };
    case ScrollTypeEnum.LeftToRight:
      return {
        value: ScrollTypeEnum.LeftToRight,
        label: 'Left-Right'
      };
    case ScrollTypeEnum.BottomToTop:
      return {
        value: ScrollTypeEnum.BottomToTop,
        label: 'Bottom-Top'
      };
    case ScrollTypeEnum.TopToBottom:
      return {
        value: ScrollTypeEnum.TopToBottom,
        label: 'Top-Bottom'
      }
  }


}

/**
 * To return the notification message based on response type.
 * @param {*} messages 
 * @param {*} responseType 
 */
export function returnMessages(messages, responseType) {
  return _.map(_.filter(messages, msg => msg.ResponseType == responseType), (message) => {
    return {
      displayMessage: message.Message
    }
  });
}
function mapThresholds(thresholds) {
  let givenThresholds = _.map(thresholds, (eachThreshold, index) => {
    let id = Date.now();
    return {
      id: id + index,
      level: index + 1,
      levelValue: eachThreshold.thv,
      color: eachThreshold.thc, // TODO: Pass Color appropriately
      // SoundFilePath: eachThreshold.soundFile, // TODO: Pass sound file appropriately
      isContinuous: eachThreshold.thst ? true : false, // TODO: Create an enum or have a boolean value for isContinuos
      emailTo: eachThreshold.thea,
      emailSubject: eachThreshold.thes,
      smsTo: eachThreshold.thmn
    }
  })
  return givenThresholds
}

export function dashboard(dashboard, dataMetricsMetadata, isEdit) {
  return {
    Id: dashboard.di,
    name: dashboard.dn,
    isGlobal: dashboard.dig,
    isDefault: dashboard.didf,
    category: dashboard.dci,
    widgets: _.map(dashboard.dws, (widget) => {
      switch (widget.wt) {

        case WidgetType.Clock:

          return {
            x: widget.wxp,
            y: widget.wyp,
            width: widget.width,
            height: widget.height,
            z: widget.zIndex,
            id: widget.wid,
            widgetType: widget.wt,
            value: 0,
            displayValue: 0,
            title: widget.wtl,
            selectedTimeZoneItem: getSelectedTimeZone(widget.cs.tid),
            widgetBody: {
              ClockbackgroundColor: widget.css.cbs.cbb,
              ClockOuterbackgroundColor: widget.css.cbs.cobb,
              clockRoundingColor: widget.css.cbs.cbr,

            },
            numberStyles: {
              color: widget.css.cns.cc,
              fontSize: widget.css.cns.cf

            },
            TimezoneStyles: {
              color: widget.css.cts.cc,
              fontSize: widget.css.cts.cf

            },

            hands: {
              hourhandcolor: widget.css.hhs.ch,
              minutehandcolor: widget.css.mhs.ch,
              secondhandcolor: widget.css.shs.ch
            },
            TimeStyles: {

              color: widget.css.ctt.cc ? widget.css.ctt.cc : {
                r: 0, g: 0, b: 0, a: 1
              },
              fontSize: widget.css.ctt.cf == 0 ? "11" : widget.css.ctt.cf

            },
            DateStyles: {
              color: widget.css.cdt.cc ? widget.css.cdt.cc : { r: 0, g: 0, b: 0, a: 1 },
              fontSize: widget.css.cdt.cf == 0 ? "11" : widget.css.cdt.cf
            },
            CurrentDayColor: widget.css.cdc ? widget.css.cdc : { r: 0, g: 0, b: 0, a: 1 },
            DaysStyles: {
              color: widget.css.cdy ? widget.css.cdy.cc ? widget.css.cdy.cc : { r: 0, g: 0, b: 0, a: 1 } : { r: 0, g: 0, b: 0, a: 1 },
              fontSize: widget.css.cdy ? widget.css.cdy.cf == 0 ? "11" : widget.css.cdy.cf : 11
            },
            displayDate: !widget.cs.ia ? widget.cs.dida : false,
            displayDays: !widget.cs.ia ? widget.cs.didy : false,
            selectedDateFormat: !widget.cs.ia ? widget.cs.isl : 0,
            selectedTimeFormat: !widget.cs.ia ? widget.cs.istd : 0,
            selectedHoursFormat: !widget.cs.ia ? widget.cs.istfh : 0,
            isAnalog: widget.cs.ia,
            cs: widget.cs,
            timezoneid: widget.cs.tid,
            tzoneText: widget.cs.tl
          }
        default:
          return {
            x: widget.wxp,
            y: widget.wyp,
            width: widget.width,
            height: widget.height,
            z: widget.zIndex,
            id: widget.wid,
            widgetType: widget.wt,
            min: widget.wmin,
            max: widget.wmax,
            refreshInterval: widget.wri,
            value: 0,
            displayValue: 0,
            title: widget.wtl,
            showMaxValueOnWidget: widget.wsmv,
            appliedBackgroundColor: widget.wb ? widget.wb.sbc : {},
            valueStyles: widget.wvs ? {
              color: widget.wvs.sc,
              fontFamily: widget.wvs.sff,
              fontSize: widget.wvs.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '36'
              },
            titleStyles: widget.wts ? {
              color: widget.wts.sc,
              fontFamily: widget.wts.sff,
              fontSize: widget.wts.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '12'
              },
            rangeValueStyles: widget.wrs ? {
              color: widget.wrs.sc,
              fontFamily: widget.wrs.sff,
              fontSize: widget.wrs.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '12'
              },
            widgetBody: widget.wb ? {
              backgroundColor: widget.wb.sbc,
              color: widget.wb.sc,
              fontFamily: widget.wb.sff,
              fontSize: widget.wb.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },


            segmentColors: widget.wsgc,
            barStyles: widget.wbs ? {
              backgroundColor: widget.wbs.sbc,
              color: widget.wbs.sc,
              fontFamily: widget.wbs.sff,
              fontSize: widget.wbs.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },

            xAxisStyles: widget.wsxs ? {
              backgroundColor: widget.wsxs.sbc,
              color: widget.wsxs.sc,
              fontFamily: widget.wsxs.sff,
              fontSize: widget.wsxs.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },
            yAxisStyles: widget.wsys ? {
              backgroundColor: widget.wsys.sbc,
              color: widget.wsys.sc,
              fontFamily: widget.wsys.sff,
              fontSize: widget.wsys.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },
            enableMin: widget.wenmn,
            enableMax: widget.wenmx,
            enableBarLines: widget.wenbl,
            useSelectedBarColor: widget.wusbc,
            showYAxis: widget.wsy,
            scrollType: getScrollType(widget.twrst),
            scrollSpeed: widget.twrd,
            matrix: widget.wt == WidgetType.Combo ? convertToMatrix(widget.wmx, widget.ws.srt.rc, widget.ws.srt.rf, widget.wid) : '',
            PictureSelected: widget.wt == WidgetType.Picture ? widget.wpsl : '',
            appliedSettings: mapAppliedSettings(widget, isEdit, dataMetricsMetadata)

          }
      }
    })
  }
}
/**
 * To map the threshold for the custom combo
 * @param {*} colummCheck 
 * @param {*} cell 
 */
export function MapComboCustomThreshold(colummCheck, cell) {
  //TODO: Need to handle threshold based on selected display format
  if (ConstantValues.NumericTypes.indexOf(colummCheck.dataType) != -1) {

    let thresholds = _.map(colummCheck.appliedSettings.thresholds, (threshold) => {
      return {
        levelValue: parseInt(threshold.levelValue),
        color: threshold.color,
        isContinuous: threshold.isContinuous,
        emailTo: threshold.emailTo,
        emailSubject: threshold.emailSubject,
      }
    });
    let thresholdItem = _.orderBy(thresholds, ['levelValue'], ['desc'])[0];
    return thresholdItem.levelValue <= parseInt(cell.displayValue) ? thresholdItem.color : cell.widgetBody.backgroundColor;
  }
  else {
    let thresholdItem = _.find(colummCheck.appliedSettings.thresholds, threshold => threshold.levelValue == cell.displayValue);
    return thresholdItem ? thresholdItem.color : cell.widgetBody.backgroundColor
  }
}

function mapAppliedSettings(widget, isEdit, dataMetricsMetadata) {
  {
    return {
      dataMetrics: widget.ws && widget.ws.srt ? {
        statisticCategory: widget.ws.stom,
        displayFormat: widget.ws.srt.rsdfid ? getDisplayFormat(widget.ws.srt.rsdfid, dataMetricsMetadata) : '',
        group: widget.ws.srt.rsgid ? getSelectedGroup(widget.ws.srt, dataMetricsMetadata) : '',
        item: widget.ws.srt.rsiid ? getSelectedItem(widget.ws.srt, dataMetricsMetadata) : '',
        func: widget.ws.srt.rsfid ? getSelectedFunction(widget.ws.srt, dataMetricsMetadata) : '',
        drillDownOptions: widget.ws.srt.rf,
        columns: widget.ws.srt.rc,
        comboSelectedStatisticItems: _.map(widget.ws.srt.rc, eachDataMetrics => {
          return {
            id: Date.now(),
            item: {
              id: eachDataMetrics.cisiid
            },
            func: {
              id: eachDataMetrics.ciafid
            },
            displayFormat: {
              id: eachDataMetrics.cdf
            },
            widget: {
              value: eachDataMetrics.cwt
            }
          }
        }),
        query: widget.ws.sc.qry,
        levels: widget.ws.sc.isc ? addLevels(widget.wmx[0]) : []
      } :
        {},
      group: {
        isNew: false,
        isEdit: isEdit,
        isConfigured: widget.ws && widget.ws.sc && widget.ws.sc.isc
      },
      thresholds: mapThresholds(widget.wth)

    }
  }
}

function convertToMatrix(resultMatrix, columns, filters, comboId) {
  let i = 0,
    j = 0;
  let comboMatrixs = [];
  for (i = 0; i < resultMatrix.length; i++) {
    let comboRow = [];
    for (j = 0; j < resultMatrix[i].length; j++) {
      var comboInnerWidget = {};
      let eachWidget = resultMatrix[i][j];
      if (eachWidget.wt == WidgetType.CircularProgress) {
        eachWidget.appliedSettings = {};
        eachWidget.appliedSettings.dataMetrics = {};
        eachWidget.appliedSettings.dataMetrics.displayFormat = {};
        eachWidget.appliedSettings.dataMetrics.displayFormat.id = columns[j].cdf;
      }


      comboInnerWidget = {
        id: eachWidget.wid,
        comboId: comboId,
        widgetType: eachWidget.wt,
        max: eachWidget.wmax,
        min: eachWidget.wmin,
        title: eachWidget.wtl,
        wri: -1,
        displayValue: '0',
        value: '0',
        segmentColors: eachWidget.wsgc,
        isComboWidget: true,
        scrollType: ScrollTypeEnum.None,
        widgetBody: StylesMapper(eachWidget.wb),
        valueStyles: StylesMapper(eachWidget.wvs),
        titleStyles: StylesMapper(eachWidget.wts),
        rangeValueStyles: StylesMapper(eachWidget.wrs),
        appliedBackgroundColor: StylesMapper(eachWidget.wb).backgroundColor,
        showMaxValueOnWidget: eachWidget.wsmv,
        appliedSettings: mapAppliedSettings(eachWidget),
        dataType: eachWidget.dty,
        dateFormat: eachWidget.df,
        showZeroValues: eachWidget.sz,
        displayFormatId: eachWidget.dpid,
        dateFormatId: eachWidget.dtid,
        column: eachWidget.fc,
        showSettings: false,
        showEditor: false
      };

      if ((filters && filters.length > 0) || (columns && columns.length > 0)) {
        if (i === 0) {
          comboInnerWidget.settings = {
            item: columns[j] && columns[j].cisiid,
            cWidgetType: eachWidget.wt
          }
        }
        else if (j === 0) {
          comboInnerWidget.settings = {
            filter: filters[i - 1]
          }
        }
        else {
          comboInnerWidget.settings = {
            item: columns[j] && columns[j].cisiid,
            func: columns[j] && columns[j].ciafid,
            displayFormat: columns[j] && columns[j].cdf,
            filter: filters[i - 1]
          }
        }

      }
      comboRow.push(comboInnerWidget);
    }
    comboMatrixs.push(comboRow);
  }
  return comboMatrixs;
}

function StylesMapper(styles) {
  return styles ? {
    backgroundColor: styles.sbc,
    color: styles.sc,
    fontFamily: styles.sff,
    fontSize: styles.sfs
  } : {};
}
/**
 * To add the levels for combo custom statistics
 * @param {*} levelsMatrix 
 */
function addLevels(levelsMatrix) {
  return _.map(levelsMatrix, (level, index) => {
    return {
      id: level.wid,
      level: index + 1,
      levelValue: null,
      expanded: true,
      column: {
        value: level.wid,
        label: level.fc,
        type: level.dty
      },
      showZeroValues: level.dtid,
      displayFormat: level.dpid,
      dateFormat: level.dtid,
      displayName: level.wtl == level.fc ? level.fc : level.wtl

    }
  });
}



