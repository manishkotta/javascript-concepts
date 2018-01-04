import _ from 'lodash';
import * as dataMetricsAPI from '../../../../../api/data-metrics.service';
import StatisticCategory from '../../../../../lib/enums/statistic-category.enum';
import WidgetType from '../../../../../lib/enums/widget-type.enum'

export const UPDATE_DATAMETRICS = "UPDATE_DATAMETRICS"
export const UPDATE_DATAMETRICS_ITEMS = "UPDATE_DATAMETRICS_ITEMS"
export const UPDATE_DATAMETRICS_FUNCTIONS = "UPDATE_DATAMETRICS_FUNCTIONS"
export const UPDATE_SELECTED_GROUP = "UPDATE_SELECTED_GROUP"
export const UPDATE_SELECTED_ITEM = "UPDATE_SELECTED_ITEM"
export const UPDATE_SELECTED_FUNCTION = "UPDATE_SELECTED_FUNCTION"
export const UPDATE_SELECTED_DISPLAY_FORMAT = "UPDATE_SELECTED_DISPLAY_FORMAT"
export const UPDATE_DISPLAY_FORMATS = "UPDATE_DISPLAY_FORMATS"
export const SET_SELECTED_STATISTIC_CATEGORY = "SET_SELECTED_STATISTIC_CATEGORY"
export const SET_STATISTIC_CATEGORY = "SET_STATISTIC_CATEGORY"
export const UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES = "UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES"
export const UPDATE_DRILL_DOWN_METADATA = "UPDATE_DRILL_DOWN_METADATA"
export const UPDATE_DRILL_DOWN_OPTIONS = "UPDATE_DRILL_DOWN_OPTIONS"
export const UPDATE_DRILL_DOWN_MULTI_SELECT_STATUS = "UPDATE_DRILL_DOWN_MULTI_SELECT_STATUS"
export const SET_COMBO_STATISTIC_ITEMS = "SET_COMBO_STATISTIC_ITEMS"
export const UPDATE_COMBO_SELECTED_ROW = "UPDATE_COMBO_SELECTED_ROW"
export const UPDATE_APPLICABLE_WIDGETS = "UPDATE_APPLICABLE_WIDGETS"
export const SET_APPLICABLE_WIDGET = "SET_APPLICABLE_WIDGET"
export const UPDATE_WIDGET_DM = "UPDATE_WIDGET_DM"
export const UPDATE_COMBO_DRILL_DOWN_METADATA = "UPDATE_COMBO_DRILL_DOWN_METADATA"
export const UPDATE_CUSTOM_STASTISTICS_SP_DATA = "UPDATE_CUSTOM_STASTISTICS_SP_DATA"
export const UPDATE_APPLICABLE_WIDGET = "UPDATE_APPLICABLE_WIDGET"
export const UPDATE_COLUMNS = "UPDATE_COLUMNS"
export const SET_STATISTIC_ITEM = "SET_STATISTIC_ITEM"
export const SET_STATISTIC_Function = "SET_STATISTIC_Function"
export const SET_STATISTIC_DisplayFormat = "SET_STATISTIC_DisplayFormat"
export const SET_DM_ISDIRTY = "SET_DM_ISDIRTY"
export const SET_DM_ISLOADED = "SET_DM_ISLOADED"
export const CLEAR_SELECTED_DM = "CLEAR_SELECTED_DM"
export const UPDATE_DROP_DOWNS = "UPDATE_DROP_DOWNS"


export function setSelectedComboGroupValueAction(selectedGroup, widgetId, widgetType) {
  return (dispatch, getState) => {
    // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
    // widget.appliedSettings.group.isNew = _.isEqual(widget.appliedSettings.dataMetrics.group, selectedGroup) ? false : true;
    // widget.appliedSettings.dataMetrics.group = selectedGroup

    const widget = getState().settings.widget;
    if (!widget)
      return
    // since its carrying the reference of settings widget..it updates settings state
    widget.appliedSettings.group.isNew = _.isEqual(widget.appliedSettings.dataMetrics.group, selectedGroup) ? false : true;
    //widget.appliedSettings.dataMetrics.group = selectedGroup
    dispatch(setSelectedGroupValueAction(selectedGroup))
    // TODO check and change , currently it updates newdashboard widget and adds widget to dm
    dispatch({
      type: UPDATE_WIDGET_DM,
      widget
    });
  }
}
export function clearDropdownsAction() {
  return (dispatch, getState) => {
    dispatch(
      {
        type: UPDATE_DROP_DOWNS
      }
    )
  }
}
export function setSelectedGroupValueAction(selectedGroup) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SELECTED_GROUP,
      selectedGroup
    });
  }
}
export function setSelectedItemValueAction(selectedItem) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SELECTED_ITEM,
      selectedItem
    });
  }
}

export function setSelectedFunctionAction(selectedFunction) {
  return (dispatch, getState) => {

    dispatch({
      type: UPDATE_SELECTED_FUNCTION,
      selectedFunction
    });
  }
}

export function setSelectedDisplayFormatAction(selectedDisplayFormat) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SELECTED_DISPLAY_FORMAT,
      selectedDisplayFormat
    });
  }
}

export function getApplicableWidgetAction(selectedDisplayFormat) {
  return (dispatch, getState) => {
    let datametricMetadata = getState().dataMetrics.datametricMetadata;
    let selectedItem = getState().dataMetrics.selectedItem.id;
    let applicableWidgets = _.map(_.uniqBy(_.filter(datametricMetadata, x => x.StatisticItemId == selectedItem &&
      (x.WidgetType == WidgetType.Box ||
        x.WidgetType == WidgetType.Progress ||
        x.WidgetType == WidgetType.Speedo ||
        x.WidgetType == WidgetType.CircularProgress)
    ), u => {
      return u.WidgetType;
    }), (item) => {
      return {
        label: getWidgetByEnum(item.WidgetType),
        value: item.WidgetType
      };
    });

    dispatch({
      type: UPDATE_APPLICABLE_WIDGETS,
      applicableWidgets
    });
  }
}

export function getWidgetByEnum(widgetType) {
  switch (widgetType) {
    case WidgetType.Box:
      return "Box"
    case WidgetType.Progress:
      return "Progress"
    case WidgetType.Speedo:
      return "Speedo"
    case WidgetType.Text:
      return "Text"
    case WidgetType.CircularProgress:
      return "Circular Progress"
    default:
      return "None"

  }
}

export function setApplicableWidgetAction(selectedWidgetforStatisticItem, widgetId) {
  return (dispatch, getState) => {
    // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
    dispatch({
      type: SET_APPLICABLE_WIDGET,
      selectedWidgetforStatisticItem: selectedWidgetforStatisticItem
    });
  }
}

export function setStatisticsItems() {
  return (dispatch, getState) => {
    let currentWidget = getState().settings.widget;
    let selectedGroup = getState().dataMetrics.selectedGroup;
    let availableItems = _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata,
      metric => metric.StatisticGroupId === selectedGroup.id &&
        metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
        metric.WidgetType === currentWidget.widgetType && !metric.IsFilterId),
      item => {
        return {
          id: item.StatisticItemId,
          label: item.StatisticItem,
          value: item.Id
        }
      }), 'id')
    dispatch({
      type: UPDATE_DATAMETRICS_ITEMS,
      itemOptions: availableItems.length > 0 ? availableItems : []
    });
    //default value for statistic items
    if (!getState().dataMetrics.isLoaded)
      dispatch(setSatisticItem(currentWidget.appliedSettings.dataMetrics.item));
  }
}

export function setStatisticFunctions() {
  return (dispatch, getState) => {
    let currentWidget = getState().settings.widget;
    let selectedItem = getState().dataMetrics.selectedItem;
    let _funcOptions = _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata,
      metric =>
        metric.StatisticItemId === selectedItem.id &&
        metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
        metric.WidgetType === currentWidget.widgetType),
      item => {
        return {
          id: item.StatisticFunctionId,
          label: item.StatisticFunction,
          value: item.Id
        }
      }), 'id');
    dispatch({
      type: UPDATE_DATAMETRICS_FUNCTIONS,
      functionOptions: _funcOptions
    });
    //default value for statistic func
    if (!getState().dataMetrics.isLoaded)
      dispatch(setSatisticFunction(currentWidget.appliedSettings.dataMetrics.func));
  }
}
export function getDisplayFormatAction() {
  return (dispatch, getState) => {
    let selectedFunction = getState().dataMetrics.selectedFunction;
    let currentWidget = getState().settings.widget;
    dispatch({
      type: UPDATE_DISPLAY_FORMATS,
      displayFormatOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata, metric =>
        (metric.StatisticItemId === getState().dataMetrics.selectedItem.id &&
          metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
          metric.StatisticFunctionId === selectedFunction.id && metric.WidgetType === currentWidget.widgetType)
      ), item => {
        return {
          id: item.DisplayFormatId,
          label: item.DisplayFormat,
          value: item.Id
        }
      }), 'id')
    });
    //default value for display format
    if (!getState().dataMetrics.isLoaded)
      dispatch(setDisplayFormat(currentWidget.appliedSettings.dataMetrics.displayFormat));
  }
}

export function setSelectedStatisticCategoryAction(selectedStatisticCategory) {
  return (dispatch, getState) => {
    let widget = getState().settings.widget;
    // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === currentWidget.id);
    if (StatisticCategory.Custom == selectedStatisticCategory || StatisticCategory.CyReport == selectedStatisticCategory) {
      dataMetricsAPI.getDisplayformats(selectedStatisticCategory).then(function (response) {
        if (response.status === 200) {
          const displayFormatOptions = _.map(response.data, (item) => {
            return {
              value: item.DisplayFormatId,
              label: item.DisplayFormatName
            }
          })
          dispatch({
            type: UPDATE_DISPLAY_FORMATS,
            displayFormatOptions: displayFormatOptions
          })
        }
      });
    }
    const drillDownOptions = _.map(getState().dataMetrics.drillDownOptions, (obj) => {
      return {
        label: obj.label,
        value: obj.value,
        checked: widget.appliedSettings.dataMetrics.item && widget.appliedSettings.dataMetrics.item.id === getState().dataMetrics.drillDownMetaDataItemId && obj.checked
      };
    });
    const drillDownMetaDataGroupId = widget.appliedSettings.dataMetrics.group ? widget.appliedSettings.dataMetrics.group.id : undefined;
    const drillDownMetaDataItemId = widget.appliedSettings.dataMetrics.item ? widget.appliedSettings.dataMetrics.item.id : undefined;
    let selectedGroup, selectedItem, selectedFunction, selectedDisplayFormat;
    if (widget && widget.appliedSettings && widget.appliedSettings.dataMetrics && widget.appliedSettings.dataMetrics.statisticCategory === selectedStatisticCategory) {
      selectedGroup = widget.appliedSettings.dataMetrics.group ? widget.appliedSettings.dataMetrics.group : '';
      selectedItem = widget.appliedSettings.dataMetrics && widget.appliedSettings.dataMetrics.item ? widget.appliedSettings.dataMetrics.item : '';
      selectedFunction = widget.appliedSettings.dataMetrics && widget.appliedSettings.dataMetrics.func ? widget.appliedSettings.dataMetrics.func : '';
      selectedDisplayFormat = widget.appliedSettings.dataMetrics && widget.appliedSettings.dataMetrics.displayFormat ? widget.appliedSettings.dataMetrics.displayFormat : '';
    }
    if (StatisticCategory.RealTime == widget.appliedSettings.dataMetrics.statisticCategory && widget.appliedSettings.dataMetrics.query) {
      widget.appliedSettings.dataMetrics.query = "";
      widget.appliedSettings.dataMetrics.levels = [];
      getState().dataMetrics.columnOptoins = [];
    }
    dispatch({
      type: SET_SELECTED_STATISTIC_CATEGORY,
      selectedStatisticCategory,
      groupOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata, metric =>
        metric.StatisticCategory === selectedStatisticCategory &&
        metric.WidgetType === widget.widgetType), (obj) => {
          return {
            id: obj.StatisticGroupId,
            label: obj.StatisticGroup,
            value: obj.Id
          }
        }), 'id'),
      selectedGroup,
      selectedItem,
      selectedFunction,
      selectedDisplayFormat,
      drillDownOptions,
      drillDownMetaDataGroupId,
      drillDownMetaDataItemId


    });
  }
}

export function updateWidgetSpecificStatisticCategoriesAction(widgetType) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES,
      statisticCategoryOptions: _.map(_.filter(getState().dataMetrics.statisticCategories, x => x.WidgetType === widgetType), (obj) => {
        return {
          label: obj.StatisticCategoryName,
          value: obj.StatisticCategory
        };
      }),
    })
  }
}

export function getComboDrillDownMetaDataAction(selectedGroup, widgetId) {
  return (dispatch, getState) => {
    const selectedWidget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
    // if (!selectedWidget.appliedSettings.group.isNew && !selectedWidget.appliedSettings.group.isEdit) {
    //   dispatch({
    //     type: UPDATE_COMBO_DRILL_DOWN_METADATA,
    //     selectedWidget

    //   });
    // } else {
    dataMetricsAPI.getDrillDownMetaData(selectedGroup.id).then(function (response) {
      if (response.status === 200) {
        const widget = getState().settings.widget;
        const shouldcheck = widget.appliedSettings.dataMetrics.group ? _.isEqualWith(widget.appliedSettings.dataMetrics.group, getState().dataMetrics.selectedGroup,
          (f, s) => f.id == s.id && f.label == s.label
        ) : true;
        let drillDownOptions = _.map(_.uniqBy(response.data, 'Id'), (obj) => {
          // all these calculations because of the difference in drill down options saved in db vs appended obj to DM
          let o = _.find(widget.appliedSettings.dataMetrics.drillDownOptions, (_opt) => _opt == obj.Id || _opt.value == obj.Id)
          let _checked = o ? true : false;
          if (o && o.checked != undefined)
            _checked = o.checked
          return {
            label: obj.Name,
            value: obj.Id,
            checked: shouldcheck ? _checked : false
          };
        });

        selectedWidget.appliedSettings.group.isEdit = false;

        dispatch({
          type: UPDATE_COMBO_DRILL_DOWN_METADATA,
          drillDownOptions
        });
      }
    });
  }
}

export function getDrillDownMetaDataAction(selectedItem) {
  return (dispatch, getState) => {
    if (getState().dataMetrics && getState().dataMetrics.datametricMetadata) {
      let widget = getState().settings.widget;
      const selectedItemData = _.find(getState().dataMetrics.datametricMetadata, (metaData) => metaData.StatisticItemId === selectedItem.id);
      dataMetricsAPI.getDrillDownMetaData(selectedItemData.StatisticGroupId).then(function (response) {
        if (response.status === 200) {
          let _opts = _.map(_.uniqBy(response.data, 'Id'), (obj) => {
            // all these calculations because of the difference in drill down options saved in db vs appended obj to DM
            let o = _.find(widget.appliedSettings.dataMetrics.drillDownOptions, (_opt) => _opt == obj.Id || _opt.value == obj.Id)
            let _checked = o ? true : false;
            if (o && o.checked != undefined)
              _checked = o.checked
            return {
              label: obj.Name,
              value: obj.Id,
              checked: getState().dataMetrics.isLoaded ? false : _checked
            };
          });
          dispatch({
            type: UPDATE_DRILL_DOWN_METADATA,
            drillDownOptions: _opts,
            isDrillDownMultiSelect: selectedItemData.AllowMultiSelect,
            drillDownMetaDataGroupId: getState().dataMetrics.isLoaded ? selectedItemData.StatisticGroupId : widget.appliedSettings.dataMetrics.group ? widget.appliedSettings.dataMetrics.group.id : undefined,
            drillDownMetaDataItemId: getState().dataMetrics.isLoaded ? selectedItemData.StatisticItemId : widget.appliedSettings.dataMetrics.item ? widget.appliedSettings.dataMetrics.item.id : undefined
          });
        }
      });
    }
  }
}

export function updateDrillDownOptionsAction(options) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_DRILL_DOWN_OPTIONS,
      drillDownOptions: options
    })

  }
}

export function addComboStatisticItemsAction(selectedStatisticItem, widgetId) {
  return (dispatch, getState) => {
    // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
    // const widget = getState().settings.widget;
    const widget = _.cloneDeep(getState().settings.widget); // TODO updating settings reducer widget directly.. move it into a reducer action
    //getState().dataMetrics.comboSelectedStatisticItems.push(selectedStatisticItem);

    let comboSelectedStatisticItems = getState().dataMetrics.comboSelectedStatisticItems;
    comboSelectedStatisticItems.push(selectedStatisticItem);
    dispatch({
      type: SET_COMBO_STATISTIC_ITEMS,
      widget,
      comboSelectedStatisticItems: comboSelectedStatisticItems
    })

  }
}
export function addDefaultComboStatisticItemsAction(selectedGroup, widgetType, widgetId) {
  return (dispatch, getState) => {
    const widqwget = _.cloneDeep(getState().settings.widget);
    const widge1t = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);

    const widget = _.cloneDeep(getState().settings.widget); // TODO updating settings reducer widget directly.. move it into a reducer action
    var result = _.filter(widget.appliedSettings.dataMetrics.comboSelectedStatisticItems, item => item.isDefault == true);
    // if (result.length == 0 || widget.appliedSettings.group.isNew) {
    widget.appliedSettings.dataMetrics.comboSelectedStatisticItems = [];
    if (!getState().dataMetrics.datametricMetadata) {
      dispatch(getState().dataMetrics.getMetaDataAction(widgetType));
    }
    const group = _.find(getState().dataMetrics.datametricMetadata, (metric) =>
      metric.StatisticGroupId === selectedGroup.id &&
      metric.WidgetType === widgetType &&
      metric.IsDrillDownFilter);
    let displayFormat = {
      id: group.DisplayFormatId,
      label: group.DisplayFormat,
      value: group.Id
    };
    let statisticItem = {
      id: group.StatisticItemId,
      label: group.StatisticItem,
      value: group.Id
    };
    let statisticFunction = {
      id: group.StatisticFunctionId,
      label: group.StatisticFunction,
      value: group.Id
    };
    let applicableWidget = {
      label: getWidgetByEnum(WidgetType.Text),
      value: WidgetType.Text
    };

    let defaultStatisticItem = {
      id: 1, // defaulted to one, helps with reordering rows
      isDefault: true,
      item: statisticItem,
      func: statisticFunction,
      displayFormat: displayFormat,
      widget: applicableWidget,

    };

    widget.appliedSettings.dataMetrics.comboSelectedStatisticItems.push(defaultStatisticItem);
    // if (widget.appliedSettings.group.isEdit) {
    var metaData = getState().dataMetrics;
    mapComboItems(widget, metaData);
    // }
    // TODO remove this action, as it updates DM reducer rather updating settings reducer
    dispatch({
      type: SET_COMBO_STATISTIC_ITEMS,
      widget,
      comboSelectedStatisticItems: widget.appliedSettings.dataMetrics.comboSelectedStatisticItems
    });
  }
  // }
}

function mapComboItems(wdt, metaData) {
  let columns = _.filter(wdt.appliedSettings.dataMetrics.columns, column => column.cwt != 0);
  _.each(columns, (value, key) => {

    if (key > 0) {
      var itemOption = _.find(metaData.itemOptions, m => m.id == value.cisiid)
      if (itemOption) {
        var functionOption = _.find(_.uniqBy(_.map(_.filter(metaData.datametricMetadata,
          metric => metric.StatisticItemId === itemOption.id &&
            metric.StatisticCategory === metaData.statisticCategory &&
            metric.WidgetType === wdt.widgetType), item => {
              return {
                id: item.StatisticFunctionId,
                label: item.StatisticFunction,
                value: item.Id
              }
            }), 'id'), f => f.id = value.ciafid);

        var displayFormatOption = _.find(_.uniqBy(_.map(_.filter(metaData.datametricMetadata, metric =>
          (metric.StatisticItemId === itemOption.id &&
            metric.StatisticCategory === metaData.statisticCategory &&
            metric.StatisticFunctionId === functionOption.id &&
            metric.WidgetType === wdt.widgetType)
        ), item => {
          return {
            id: item.DisplayFormatId,
            label: item.DisplayFormat,
            value: item.Id
          }
        }), 'id'), d => d.id == value.cdf)

        var comboItem = {
          id: Date.now() + Math.floor(Math.random() * 10000),
          item: itemOption,
          func: functionOption,
          isDefault: false,
          displayFormat: displayFormatOption,
          widget: {
            label: getWidgetByEnum(value.cwt),
            value: value.cwt
          }
        }
        wdt.appliedSettings.dataMetrics.comboSelectedStatisticItems.push(comboItem)
      }
    }
  });
}

export function removeComboStatisticItemAction(statisticItem, widgetId) {
  return (dispatch, getState) => {
    // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);

    // const widget = getState().settings.widget;
    const widget = _.cloneDeep(getState().settings.widget); // TODO updating settings reducer widget directly.. move it into a reducer action
    let comboSelectedStatisticItems = getState().dataMetrics.comboSelectedStatisticItems;
    comboSelectedStatisticItems = _.filter(getState().dataMetrics.comboSelectedStatisticItems, function (_item) {
      return !_.isEqual(_item, statisticItem);
    });

    dispatch({
      type: SET_COMBO_STATISTIC_ITEMS,
      comboSelectedStatisticItems: comboSelectedStatisticItems
    })
  }
}

export function EditGridSelectedItemAction(selectedStatisticItem, widgetId) {
  return (dispatch, getState) => {
    const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);

    selectedStatisticItem.isEditing = true;
    widget.selectedStatisticItem = selectedStatisticItem;
    dispatch({
      type: UPDATE_COMBO_SELECTED_ROW,
      comboSelectedStatisticItem: widget.selectedStatisticItem
    });

    dispatch({
      type: UPDATE_SELECTED_ITEM,
      selectedItem: selectedStatisticItem.item
    });


    dispatch({
      type: UPDATE_SELECTED_FUNCTION,
      selectedFunction: selectedStatisticItem.func
    });

    dispatch({
      type: UPDATE_SELECTED_DISPLAY_FORMAT,
      selectedDisplayFormat: selectedStatisticItem.displayFormat
    });

    dispatch({
      type: UPDATE_APPLICABLE_WIDGET,
      selectedWidgetforStatisticItem: selectedStatisticItem.widget
    });
  }
}

export function SaveEditedComboStatisticItemAction(selectedStatisticItem, updatedStatisticItem, widgetId) {
  return (dispatch, getState) => {
    // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
    // const widget = getState().settings.widget;
    const widget = _.cloneDeep(getState().settings.widget); // TODO updating settings reducer widget directly.. move it into a reducer action

    let comboSelectedStatisticItems = getState().dataMetrics.comboSelectedStatisticItems;

    let statisticItemToBeupdated = _.find(comboSelectedStatisticItems, _item => _item.id == selectedStatisticItem.id);

    statisticItemToBeupdated = updatedStatisticItem;
    statisticItemToBeupdated.id = selectedStatisticItem.id;

    _.forEach(comboSelectedStatisticItems, function (value, index) {
      if (value.id == statisticItemToBeupdated.id) {
        comboSelectedStatisticItems[index] = statisticItemToBeupdated
      }
    });
    dispatch({
      type: SET_COMBO_STATISTIC_ITEMS,
      comboSelectedStatisticItems: comboSelectedStatisticItems
    })
  }
}
export function updatecomboSelectedStatisticItemsAction(comboSelectedStatisticItems) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_COMBO_STATISTIC_ITEMS,
      comboSelectedStatisticItems: comboSelectedStatisticItems
    })
  }
}
export function getStoreProcsAction() {

  return (dispatch, getState) => {
    dataMetricsAPI.getStoreProcs().then(function (response) {
      if (response.status === 200) {
        var storeProcData = response.data;

        var uniqStoreProcData = _.uniqBy(storeProcData, u => {
          return u.ProcedureName
        })
        const storeProcOptions = _.map(uniqStoreProcData, (item, key) => {

          return {
            label: item.ProcedureName,
            value: key + 1

          };
        })
        storeProcOptions.splice(0, 0, {
          value: 0,
          label: 'Select Custom Query'
        });
        dispatch({
          type: UPDATE_CUSTOM_STASTISTICS_SP_DATA,
          storeProcOptions,
          storeProcData
        })
      }
    })
  }
}

export function updateComboDrillDownOptionsAction(options, widgetId) {
  return (dispatch, getState) => {
    //const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
    //widget.appliedSettings.drillDownOptions = options;
    dispatch({
      type: UPDATE_DRILL_DOWN_OPTIONS,
      drillDownOptions: options
    })
  }
}
export function loadColumnsAction(query, widgetId, isFromEvent) {
  return (dispatch, getState) => {
    dataMetricsAPI.loadColumns(query).then(function (response) {
      if (response.status === 200) {
        const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
        widget.appliedSettings.dataMetrics.query = query;

        let columnOptoins = _.map(response.data, (item) => {
          return {
            label: item.ColumnName,
            value: item.Id,
            type: item.DataTypeName
          }
        });
        widget.appliedSettings.dataMetrics.columnOptions = columnOptoins;
        if (isFromEvent) {
          widget.appliedSettings.dataMetrics.levels = [];
          widget.matrix = [];
        }
        dispatch({
          type: UPDATE_COLUMNS,
          columnOptoins
        })
        dispatch({
          type: UPDATE_WIDGET_DM,
          widget
        })
      }
    })
  }
}

export function LoadDataMetricsMetaData(dashboardId) {
  return (dispatch, getState) => {
    let statisticCategories = getState().dataMetrics.statisticCategories;
    let datametricsMetaData = getState().dataMetrics.datametricMetadata;
    if (statisticCategories && statisticCategories.length != 0 && datametricsMetaData) {
      if (dashboardId && dashboardId != "undefined")
        dispatch(getState().newdashboard.getUserDashboardByIdAction(dashboardId))
      return
    }
    // Load StatisticCategories for all and then filter per widgetType and update DM store
    dispatch(getState().spinnerStore.BeginTask());

    dataMetricsAPI.getStatisticCategories().then(function (response) {
      dispatch(getState().spinnerStore.EndTask());

      if (response.status === 200) {
        statisticCategories = response.data;

        dispatch(getState().spinnerStore.BeginTask());
        dataMetricsAPI.getStatisticGroups().then(function (response) {
          dispatch(getState().spinnerStore.EndTask());
          if (response.status === 200) {
            datametricsMetaData = _.map(response.data, (obj) => {
              return DataMetricsMetadataMapper(obj);
            });

            if (!datametricsMetaData)
              return;

            // Dispatching basic data for DM - categories and groups
            dispatch(DispatchOnlyDM(statisticCategories, datametricsMetaData));
            if (dashboardId && dashboardId != "undefined")
              dispatch(getState().newdashboard.getUserDashboardByIdAction(dashboardId))
          }
        });
      }
    });
  }
}

//TODO : rename to initialize dm metadata
export function getMetaDataAction(widgetType) {
  return (dispatch, getState) => {
    let currentWidget = getState().settings.widget;
    let statisticCategories = getState().dataMetrics.statisticCategories;
    let datametricsMetaData = getState().dataMetrics.datametricMetadata;
    //If Categories and DM are already in store, filter them appropriately and update the state
    if (statisticCategories && statisticCategories.length != 0 && datametricsMetaData) {
      dispatch(setStatisticCategory(currentWidget.appliedSettings.dataMetrics.statisticCategory ? currentWidget.appliedSettings.dataMetrics.statisticCategory : StatisticCategory.RealTime))
      dispatch(DispatchDMForWidgetType(statisticCategories, widgetType, datametricsMetaData, getState));
      if (currentWidget.appliedSettings.dataMetrics.group)
        dispatch(setSelectedGroupValueAction(currentWidget.appliedSettings.dataMetrics.group))

      return
    }

    dispatch(getState().spinnerStore.BeginTask());
    // Load StatisticCategories for all and then filter per widgetType and update DM store
    dataMetricsAPI.getStatisticCategories().then(function (response) {
      dispatch(getState().spinnerStore.EndTask());
      if (response.status === 200) {
        statisticCategories = response.data;
        //TODO: set default category from here
        dispatch(setStatisticCategory(currentWidget.appliedSettings && currentWidget.appliedSettings.dataMetrics.statisticCategory ? currentWidget.appliedSettings.dataMetrics.statisticCategory : StatisticCategory.RealTime))

        dispatch(getState().spinnerStore.BeginTask());
        // Load datametricsMetaData for all categories and then filter per category and widgetType and update DM store
        dataMetricsAPI.getStatisticGroups().then(function (response) {
          dispatch(getState().spinnerStore.EndTask());
          if (response.status === 200) {
            datametricsMetaData = _.map(response.data, (obj) => {
              return DataMetricsMetadataMapper(obj);
            });

            if (!datametricsMetaData && datametricsMetaData.length == 0)
              return;

            // Dispatching basic data for DM - categories and groups
            dispatch(DispatchDMForWidgetType(statisticCategories, currentWidget.widgetType, datametricsMetaData, getState));
            // set default group 
            if (currentWidget.appliedSettings && currentWidget.appliedSettings.dataMetrics.group)
              dispatch(setSelectedGroupValueAction(currentWidget.appliedSettings.dataMetrics.group))

          }
        });
      }
    });
  }
}

export function setStatisticCategory(selectedStatisticCategory) {
  return {
    type: SET_STATISTIC_CATEGORY,
    selectedStatisticCategory
  }
}

export function setSatisticItem(selectedItem) {
  return {
    type: SET_STATISTIC_ITEM,
    selectedItem
  }
}
export function setSatisticFunction(selectedFunction) {
  return {
    type: SET_STATISTIC_Function,
    selectedFunction
  }
}
export function setDisplayFormat(selectedDisplayFormat) {
  return {
    type: SET_STATISTIC_DisplayFormat,
    selectedDisplayFormat
  }
}
function DispatchOnlyDM(statisticCategories, datametricsMetaData) {
  return {
    type: UPDATE_DATAMETRICS,
    statisticCategories,
    statisticCategoryOptions: [],
    datametricsMetaData,
    groupOptions: [],
  };
}
function DispatchDMForWidgetType(statisticCategories, widgetType, datametricsMetaData, getState) {
  let _categories = _.map(_.filter(statisticCategories, x => x.WidgetType === widgetType), (obj) => {
    return {
      label: obj.StatisticCategoryName,
      value: obj.StatisticCategory
    };
  });

  let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetaData, metric => (metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
    metric.WidgetType === widgetType)), (obj) => {
      return {
        id: obj.StatisticGroupId,
        label: obj.StatisticGroup,
        value: obj.Id
      };
    }), 'id');
  return {
    type: UPDATE_DATAMETRICS,
    statisticCategories,
    statisticCategoryOptions: _categories,
    datametricsMetaData,
    groupOptions: _grpOptions,
  };
}

function DataMetricsMetadataMapper(obj) {
  return {
    StatisticGroupId: obj.StatisticGroupId,
    StatisticGroup: obj.StatisticGroup,
    StatisticItemId: obj.StatisticItemId,
    StatisticItem: obj.StatisticItem,
    StatisticFunctionId: obj.StatisticFunctionId,
    StatisticFunction: obj.StatisticFunction,
    DisplayFormatId: obj.DisplayFormatId,
    DisplayFormat: obj.DisplayFormat,
    StatisticCategory: obj.StatisticCategory,
    WidgetType: obj.WidgetType,
    AllowMultiSelect: obj.AllowMultiSelect,
    IsDrillDownFilter: obj.IsDrillDownFilter,
    IsFilterId: obj.IsFilterId,
    Id: obj.Id
  };
}

export function setDMDirty(isDirty) {
  return {
    type: 'SET_DM_ISDIRTY',
    isDirty: isDirty
  }
}

export function setDMisLoaded(isLoaded) {
  return {
    type: 'SET_DM_ISLOADED',
    isLoaded: isLoaded
  }
}

export function clearSelectedDM() {
  let d = _.cloneDeep(initialState)
  return {
    type: 'CLEAR_SELECTED_DM',
    d
  }

}

export const ACTION_HANDLERS = {
  [UPDATE_DATAMETRICS]: (state, action) => {
    return Object.assign({}, state, {
      statisticCategories: action.statisticCategories,
      statisticCategoryOptions: action.statisticCategoryOptions,
      datametricMetadata: action.datametricsMetaData,
      groupOptions: action.groupOptions
    })
  },

  [UPDATE_DATAMETRICS_ITEMS]: (state, action) => {
    return Object.assign({}, state, {
      itemOptions: action.itemOptions,
      selectedItem: {},
      selectedFunction: {},
      selectedDisplayFormat: {},
      selectedWidgetforStatisticItem: {},
      functionOptions: [],
      displayFormatOptions: [],
      applicableWidgets: []
    })
  },
  [UPDATE_CUSTOM_STASTISTICS_SP_DATA]: (state, action) => {
    return Object.assign({}, state, {
      storeProcOptions: action.storeProcOptions,
      storeProcData: action.storeProcData,

    })
  },
  [UPDATE_DATAMETRICS_FUNCTIONS]: (state, action) => {
    return Object.assign({}, state, {
      selectedFunction: action.functionOptions.length > 0 ? action.functionOptions[0] : {},
      functionOptions: action.functionOptions
    })
  },

  [UPDATE_DISPLAY_FORMATS]: (state, action) => {
    return Object.assign({}, state, {
      selectedDisplayFormat: action.displayFormatOptions.length > 0 ? action.displayFormatOptions[0] : {},
      displayFormatOptions: action.displayFormatOptions
    })
  },

  [UPDATE_SELECTED_GROUP]: (state, action) => {
    return Object.assign({}, state, {
      selectedGroup: action.selectedGroup,
      selectedItem: {},
      selectedFunction: {},
      selectedDisplayFormat: {},
      selectedWidgetforStatisticItem: {},
      functionOptions: [],
      displayFormatOptions: [],
    })
  },

  [UPDATE_SELECTED_ITEM]: (state, action) => {
    return Object.assign({}, state, {
      selectedItem: action.selectedItem,
      selectedFunction: {},
      selectedDisplayFormat: {},
      selectedWidgetforStatisticItem: {},
      displayFormatOptions: []
    })
  },
  [UPDATE_DROP_DOWNS]: (state, action) => {
    return Object.assign({}, state, {
      selectedItem: {},
      selectedFunction: {},
      selectedDisplayFormat: {},
      selectedWidgetforStatisticItem: {},
      displayFormatOptions: [],
      functionOptions: [],
      applicableWidgets: []

    })
  },

  [UPDATE_SELECTED_FUNCTION]: (state, action) => {
    return Object.assign({}, state, {
      selectedFunction: action.selectedFunction,
      selectedDisplayFormat: '',
    })
  },

  [UPDATE_SELECTED_DISPLAY_FORMAT]: (state, action) => {
    return Object.assign({}, state, {
      selectedDisplayFormat: action.selectedDisplayFormat,
    })
  },
  [UPDATE_APPLICABLE_WIDGET]: (state, action) => {
    return Object.assign({}, state, {
      selectedWidgetforStatisticItem: action.selectedWidgetforStatisticItem
    })
  },
  [UPDATE_APPLICABLE_WIDGETS]: (state, action) => {
    return Object.assign({}, state, {
      applicableWidgets: action.applicableWidgets,
    })
  },

  [SET_SELECTED_STATISTIC_CATEGORY]: (state, action) => {
    return Object.assign({}, state, {
      statisticCategory: action.selectedStatisticCategory,
      groupOptions: action.groupOptions,
      selectedGroup: action.selectedGroup,
      selectedItem: action.selectedItem,
      selectedFunction: action.selectedFunction,
      selectedDisplayFormat: action.selectedDisplayFormat,
      itemOptions: [],
      functionOptions: [],
      displayFormatOptions: [],
      drillDownOptions: action.drillDownOptions,
      drillDownMetaDataGroupId: action.drillDownMetaDataGroupId,
      drillDownMetaDataItemId: action.drillDownMetaDataItemId,
      isDirty: state.isDirty,
      isLoaded: state.isLoaded
    })
  },
  [SET_STATISTIC_CATEGORY]: (state, action) => {
    return Object.assign({}, state, {
      statisticCategory: action.selectedStatisticCategory,
    })
  },
  [SET_STATISTIC_ITEM]: (state, action) => {
    return Object.assign({}, state, {
      selectedItem: action.selectedItem,
    })
  },
  [SET_STATISTIC_Function]: (state, action) => {
    return Object.assign({}, state, {
      selectedFunction: action.selectedFunction,
    })
  },
  [SET_STATISTIC_DisplayFormat]: (state, action) => {
    return Object.assign({}, state, {
      selectedDisplayFormat: action.selectedDisplayFormat,
    })
  },
  [UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES]: (state, action) => {
    return Object.assign({}, state, {
      statisticCategoryOptions: action.statisticCategoryOptions,
    })
  },
  [UPDATE_DRILL_DOWN_METADATA]: (state, action) => {
    return Object.assign({}, state, {
      drillDownOptions: action.drillDownOptions,
      isDrillDownMultiSelect: action.isDrillDownMultiSelect,
      drillDownMetaDataGroupId: action.drillDownMetaDataGroupId,
      drillDownMetaDataItemId: action.drillDownMetaDataItemId
    })
  },

  [UPDATE_DRILL_DOWN_OPTIONS]: (state, action) => {
    return Object.assign({}, state, {
      drillDownOptions: action.drillDownOptions
    })
  },

  [UPDATE_COMBO_SELECTED_ROW]: (state, action) => {
    return Object.assign({}, state, {
      comboSelectedStatisticItem: action.comboSelectedStatisticItem

    })
  },

  [SET_COMBO_STATISTIC_ITEMS]: (state, action) => {
    return Object.assign({}, state, {
      widget: action.widget,
      comboSelectedStatisticItems: action.comboSelectedStatisticItems
    })
  },

  [SET_APPLICABLE_WIDGET]: (state, action) => {
    return Object.assign({}, state, {
      selectedWidgetforStatisticItem: action.selectedWidgetforStatisticItem
    })
  },

  [UPDATE_WIDGET_DM]: (state, action) => {
    return Object.assign({}, state, {
      widget: action.widget,
      selectedItem: {},
      selectedFunction: {},
      selectedDisplayFormat: {},
      selectedWidgetforStatisticItem: {}
    })
  },
  [UPDATE_COMBO_DRILL_DOWN_METADATA]: (state, action) => {
    return Object.assign({}, state, {
      drillDownOptions: action.drillDownOptions
    })
  },
  [SET_DM_ISDIRTY]: (state, action) => {
    if (state.isDirty === action.isDirty)
      return state;

    return Object.assign({}, state, {
      isDirty: action.isDirty
    })
  },
  [SET_DM_ISLOADED]: (state, action) => {
    if (state.isLoaded === action.isLoaded)
      return state;

    return Object.assign({}, state, {
      isLoaded: action.isLoaded
    })
  },
  [CLEAR_SELECTED_DM]: (state, action) => {
    return Object.assign({}, state, action.d)
  },

  [UPDATE_COLUMNS]: (state, action) => {
    return Object.assign({}, state, {
      columnOptoins: action.columnOptoins
    })
  }

  // [UPDATE_DRILL_DOWN_MULTI_SELECT_STATUS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     isDrillDownMultiSelect: action.isDrillDownMultiSelect
  //   })
  // }
}

const initialState = {
  groupOptions: [],
  itemOptions: [],
  functionOptions: [],
  storeProcOptions: [],
  selectedGroup: {},
  selectedItem: {},
  selectedFunction: {},
  selectedDisplayFormat: {},
  storeProcData: null,
  selectedWidgetforStatisticItem: '',
  displayFormatOptions: [],
  statisticCategory: StatisticCategory.RealTime,
  statisticCategories: [],
  isDirty: false,
  isLoaded: false,
  getMetaDataAction,
  clearSelectedDM,
  columnOptoins: [],
  comboSelectedStatisticItems: [],
  LoadDataMetricsMetaData,
  loadColumnsAction
}

export default function DataMetricsReducer(state = _.cloneDeep(initialState), action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
