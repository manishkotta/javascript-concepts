import React from 'react'
import {
    push,
    replace
} from 'react-router-redux'
import {
    browserHistory,
    Router
} from 'react-router'
import _ from 'lodash';
import * as widgetService from '../../../../api/widget.service';
import * as dashboardService from '../../../../api/dashboard.service';
import WidgetType from '../../../../lib/enums/widget-type.enum';
import * as Color from '../../../../lib//color-conversion';
import DefaultImage from 'public/Images/NoImage.jpg';
import ScrollTypeEnum from '../../../../lib/enums/scroll-type-enum';
import * as dashboardUtils from '../../../../lib/dashboard';
import StatisticCategory from '../../../../lib/enums/statistic-category.enum';
import * as LocMan from '../../../../localization/localization.manager';
import * as dataMetricsAPI from '../../../../api/data-metrics.service';
import * as WidgetData from '../../../../lib/widget-data';

import * as Constants from '../../../../constants/constantValues';
import ResponseStatusEnum from '../../../../lib/enums/response-status-enum';

export const SAVE_DASHBOARD = "SAVE_DASHBOARD";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const TOGGLE_SETTINGS_MENU = "TOGGLE_SETTINGS_MENU";
export const LOAD_SETTINGS_MENU = "LOAD_SETTINGS_MENU";
export const TOGGLE_EDITOR_MENU = "TOGGLE_EDITOR_MENU";
export const UPDATE_WIDGET_STYLE = "UPDATE_WIDGET_STYLE";
export const UPDATE_WIDGET_FOOTER = "UPDATE_WIDGET_FOOTER";
export const TOP_TAB_CHANGE_EVENT = "TOP_TAB_CHANGE_EVENT";
export const FILTER_ADD_EVENT = "FILTER_ADD_EVENT";
export const UPDATE_WIDGET = "UPDATE_WIDGET";
export const ADD_FILTER = "ADD_FILTER";
export const ADD_THRESHOLD = "ADD_THRESHOLD";
export const SAVE_METRICS = "SAVE_METRICS";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const DELETE_FILTER = "DELETE_FILTER";
export const ADD_WIDGET = "ADD_WIDGET";
export const PREVIEW_WIDGET = "PREVIEW_WIDGET";
export const DELETE_WIDGET = "DELETE_WIDGET";

export const UPDATE_PROPERTY = "UPDATE_PROPERTY";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const PICTURE_SAVE = "PICTURE_SAVE";
export const SAVE_COMBO_METRICS = "SAVE_COMBO_METRICS";
export const UPDATE_DASHBOARD = "UPDATE_DASHBOARD"
export const LOAD_TRANSLATION = "LOAD_TRANSLATION"
export const MODAL_POPUP = "MODAL_POPUP"
export const UPDATE_ACTION = "UPDATE_ACTION"
export const APPEND_L = "APPEND_L"

export const SAVE_COMBO_CUSTOM_METRICS = "SAVE_COMBO_CUSTOM_METRICS"
import * as DateZone from '../../../../lib/date-conversion';
import PictureStretchEnum from '../../../../lib/enums/picture-stretch-enum';
export const SAVE_AS_MODAL_POPUP = "SAVE_AS_MODAL_POPUP"

/**
 * This method is used to map dashboard data and is being used in multiple places.
 * @param {*} dashboard 
 * @param {*} getState 
 * @param {*} isUpdate 
 */
function MapDashboard(dashboard, getState, isUpdate, name, isNameFromStore) {
    const dataMetricsMetadata = getState.dataMetrics.datametricMetadata;
    return {
        di: isUpdate ? dashboard.Id : Date.now(),
        dn: isNameFromStore ? _.trim(dashboard.name) : _.trim(name),
        dc: undefined,
        // dci: dashboard.category.value, //Commented as no category selection
        dig: dashboard.isGlobal,
        did: dashboard.isDeleted,
        didf: dashboard.isDefault,
        doi: 1,
        dsd: 0,
        dws: _.map(getState.newdashboard.widgets, (widget) => {
            return WidgetMapper(widget, dataMetricsMetadata);
        })

    }
}

/**
 * This method is used to save picture to database.
 * @param {*} widget 
 * @param {*} key 
 * @param {*} len 
 * @param {*} dashboardId 
 * @param {*} dispatch 
 * @param {*} getState 
 */
function DashboardPictureSave(widget, key, len, dashboardId, dispatch, getState) {
    let blobData = [];
    let mediaStorageInput = {};
    mediaStorageInput.did = dashboardId;
    let reader = new FileReader();
    let file = widget.file;
    let UniqueId = widget.UniqueId;

    reader.readAsDataURL(file);
    reader.onload = (upload) => {
        let value = upload.target.result;
        blobData.push({
            pbd: value,
            mspid: UniqueId
        });
        if (key == len - 1) {
            dispatch(getState().spinnerStore.BeginTask());
            mediaStorageInput.pblobs = blobData;
            dashboardService.pictureSave(mediaStorageInput).then(function (response) {
                dispatch(getState().spinnerStore.EndTask());

            }).catch((err) => {
                dispatch(getState().spinnerStore.EndTask());
            });
        }
    }
}
export function SaveDashboardAction(name, isNameFromStore = true) {
    return (dispatch, getState) => {
        //Testing generic notification component
        let messagesConfig = {};
        const dashboard = getState().newdashboard;
        if (isNameFromStore) {
            name = _.trim(dashboard.name);
        }
        else {
            name = _.trim(name);
        }

        messagesConfig.messages = []; //{displayMessage: "hriii"}  
        if (!name) {
            dispatch(getState().spinnerStore.EndTask());
            return dispatch({
                type: MODAL_POPUP,

                showModalPopup: true
            });
        }
        if (dashboard && dashboard.widgets) {
            let imageWidgets = _.filter(dashboard.widgets, function (widget, i) {
                if (widget.widgetType == WidgetType.Picture) {
                    let mspid = "MSP" + i;
                    widget.UniqueId = mspid;
                    return true;
                }
            });
            const dashboardData = MapDashboard(dashboard, getState(), false, name, isNameFromStore)
            dispatch(getState().spinnerStore.BeginTask());

            dashboardService.saveDashboard(dashboardData).then((response) => {
                //TODO: Need to add enums to display success and error messages.eg:response.data[0].Success.
                if (response.data.Status == true) {
                    let savedDashboardId = response.data.Messages[0].Info1;
                    let mediaStorageInput = {};
                    mediaStorageInput.did = savedDashboardId;
                    mediaStorageInput.oid = 1;
                    let blobData = [];
                    let images = _.filter(getState().newdashboard.widgets, function (widget, i) {
                        return (widget.widgetType == WidgetType.Picture);
                    });
                    let len = images.length;
                    if (len <= 0) {
                        var successMessage = _.map(response.data.Messages, (r) => {
                            return {
                                ResponseType: r.ResponseType,
                                Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
                            }
                        })
                        dispatch(getState().notificationStore.ShowNotification({
                            type: ResponseStatusEnum.Success,
                            messages: dashboardUtils.returnMessages(successMessage, ResponseStatusEnum.Success)
                        }));

                    }

                    _.map(images, (widget, key) => {

                        if (widget.file) {
                            DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState);
                        }

                    })
                    let dashboard = getState().newdashboard;
                    dashboard.Id = savedDashboardId;
                    dashboard.name = name;
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        dashboardData: dashboard
                    });
                    dispatch(getState().spinnerStore.EndTask());
                    NavigateToRequiredPage(getState().newdashboard.fromAction, savedDashboardId, dispatch);

                } else {
                    if (response.data.Messages[0].MessageCode == 'DE') {
                        //dispatch(getState().notificationStore.ShowNotification({type:,messages:[{displayMessage: "hriii"}]}));
                        let existingDashboardId = response.data.Messages[0].Info1
                        //let enteredDashboardName = getState().newdashboard.name
                        //dispatch(getState().notificationStore.ShowNotification({type:,messages:[{displayMessage: "hriii"}]}));
                        const configs = {
                            type: ResponseStatusEnum.Confirmation,
                            messages: [`A dashboard with name '${name}' already exists. Do you want to overwrite?`],
                            func: {
                                onOk: () => {
                                    let dashboard = getState().newdashboard;
                                    dashboard.Id = existingDashboardId;
                                    dashboard.name = name;
                                    dispatch({
                                        type: UPDATE_DASHBOARD,
                                        dashboardData: dashboard
                                    });
                                    dispatch(UpdateDashboardAction())
                                },
                                onCancel: () => { dispatch(HandleModalPopup(true)) },

                            }
                        }
                        dispatch(getState().spinnerStore.EndAllTasks());
                        return dispatch(getState().notificationStore.ShowNotification(configs));
                    }
                    else {
                        dispatch(getState().spinnerStore.EndAllTasks());
                        return dispatch(getState().notificationStore.ShowNotification({
                            type: ResponseStatusEnum.Error,
                            messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Error)
                        }));
                    }
                }
            }).catch((err) => {
                dispatch(getState().spinnerStore.EndTask());
            });
        }
    }
}
export function SaveAsDashboardAction(name, isNameFromStore = true) {
    return (dispatch, getState) => {
        dispatch(getState().spinnerStore.BeginTask());

        const dashboard = getState().newdashboard;
        if (isNameFromStore) {
            name = _.trim(dashboard.name);
        }
        else {
            name = _.trim(name);
        }
        if (dashboard && dashboard.widgets) {
            let imageWidgets = _.filter(dashboard.widgets, function (widget, i) {
                if (widget.widgetType == WidgetType.Picture) {
                    let mspid = "MSP" + i;
                    widget.UniqueId = mspid;
                    return true;
                }
            });
            const dashboardData = MapDashboard(dashboard, getState(), false, name, isNameFromStore)
            dashboardService.saveDashboard(dashboardData).then((response) => {
                //TODO: Need to add enums to display success and error messages.eg:response.data[0].Success.

                if (response.data.Status == true) {
                    let savedDashboardId = response.data.Messages[0].Info1;
                    let mediaStorageInput = {};
                    mediaStorageInput.did = savedDashboardId;
                    mediaStorageInput.oid = 1;
                    let blobData = [];
                    let images = _.filter(getState().newdashboard.widgets, function (widget, i) {
                        return (widget.widgetType == WidgetType.Picture);
                    });
                    let len = images.length;

                    if (len <= 0) {
                        dispatch(getState().notificationStore.ShowNotification({
                            type: ResponseStatusEnum.Success,
                            messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Success)
                        }));

                    }

                    _.map(images, (widget, key) => {

                        if (widget.file) {
                            DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState);
                        }

                    })
                    let dashboard = getState().newdashboard;
                    dashboard.Id = savedDashboardId;
                    dashboard.name = name
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        dashboardData: dashboard
                    });
                    dispatch(getState().spinnerStore.EndTask());
                    NavigateToRequiredPage(getState().newdashboard.fromAction, savedDashboardId, dispatch);

                } else {

                    if (response.data.Messages[0].MessageCode == 'DE') {

                        //dispatch(getState().notificationStore.ShowNotification({type:,messages:[{displayMessage: "hriii"}]}));
                        let existingDashboardId = response.data.Messages[0].Info1
                        //let enteredDashboardName = getState().newdashboard.name
                        //dispatch(getState().notificationStore.ShowNotification({type:,messages:[{displayMessage: "hriii"}]}));
                        const configs = {
                            type: ResponseStatusEnum.Confirmation,
                            messages: [`A dashboard with name '${name}' already exists. Do you want to overwrite?`],
                            func: {
                                onOk: () => {
                                    let dashboard = getState().newdashboard;
                                    dashboard.Id = existingDashboardId;
                                    dashboard.name = name;
                                    dispatch({
                                        type: UPDATE_DASHBOARD,
                                        dashboardData: dashboard
                                    });
                                    dispatch(UpdateDashboardAction(name, isNameFromStore))
                                },
                                onCancel: () => { dispatch(HandleSaveAsPopUpAction(true)) },

                            }
                        }
                        dispatch(getState().spinnerStore.EndAllTasks());
                        return dispatch(getState().notificationStore.ShowNotification(configs));
                    }
                    else {
                        dispatch(getState().spinnerStore.EndAllTasks());
                        return dispatch(getState().notificationStore.ShowNotification({
                            type: ResponseStatusEnum.Error,
                            messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Error)
                        }));
                    }
                }
            }).catch((err) => {
                dispatch(getState().spinnerStore.EndTask());
            });
        }
    }
}

export function HandleSaveAsPopUpAction(showSaveAsPopUp) {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_AS_MODAL_POPUP,
            showSaveAsModalPopup: showSaveAsPopUp
        });
    }
}



export function UpdateDashboardAction(name, isNameFromStore = true) {
    return (dispatch, getState) => {
        const dashboard = getState().newdashboard;
        let messagesConfig = {};
        messagesConfig.messages = []; //{displayMessage: "hriii"}   
        if (isNameFromStore) {
            name = _.trim(dashboard.name);
        }
        else {
            name = _.trim(name);
        }
        if (!name) {

            dispatch(getState().spinnerStore.EndTask());
            return dispatch({
                type: MODAL_POPUP,
                showModalPopup: true
            });

        }
        //const dataMetricsMetadata = getState().dataMetrics.datametricMetadata;
        if (dashboard && dashboard.widgets) {
            let imageWidgets = _.filter(dashboard.widgets, function (widget, i) {
                if (widget.widgetType == WidgetType.Picture) {
                    let mspid = "MSP" + i;
                    widget.UniqueId = mspid;
                    return true;
                }
            });
            const dashboardData = MapDashboard(dashboard, getState(), true, name, isNameFromStore)
            dashboardService.updateDashboard(dashboardData).then((response) => {
                //TODO: Need to add enums to display success and error messages.eg:response.data[0].Success.
                if (response.data.Status == true) {
                    let savedDashboardId = response.data.Messages[0].Info1;
                    dispatch(getState().notificationStore.ShowNotification({
                        type: ResponseStatusEnum.Success,
                        messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Success)

                    }));

                    let dashboardState = getState().newdashboard;
                    dashboardState.name = name;
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        dashboardData: dashboardState
                    });

                    let mediaStorageInput = {};
                    mediaStorageInput.did = savedDashboardId;
                    mediaStorageInput.oid = 1;
                    let blobData = [];
                    let images = _.filter(dashboard.widgets, function (widget, i) {
                        return (widget.widgetType == WidgetType.Picture);
                    });
                    let len = images.length;
                    _.map(images, (widget, key) => {
                        if (widget.file) {
                            DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState);

                        }
                        else {
                            dispatch(getState().spinnerStore.BeginTask());
                            blobData.push({
                                pbd: widget.picturePath,
                                mspid: widget.UniqueId
                            });
                            mediaStorageInput.pblobs = blobData;
                            dashboardService.pictureSave(mediaStorageInput).then(function (response) {
                                dispatch(getState().spinnerStore.EndTask());
                            }).catch((err) => {
                                dispatch(getState().spinnerStore.EndTask());
                            });
                        }
                    });
                    NavigateToRequiredPage(getState().newdashboard.fromAction, savedDashboardId, dispatch);

                    dispatch({
                        type: SAVE_DASHBOARD,
                        payload: null
                    });
                } else {
                    dispatch(getState().notificationStore.ShowNotification({
                        type: ResponseStatusEnum.Error,
                        messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Error)

                    }));
                }
            })
        }
    }
}

function NavigateToRequiredPage(action, savedDashboardId, dispatch) {
    if (action == 'Save_and_exit') {
        dispatch({
            type: UPDATE_ACTION,
            fromAction: null
        });
        dispatch({
            type: UPDATE_DASHBOARD,
            dashboardData: _.cloneDeep(initialState)
        });
        browserHistory.push(`/dashboard/mydashboards`);
    }
    else {
        browserHistory.push(`/dashboard/edit/${savedDashboardId}`);
    }
}

export function topTabsClickEvent(event) {
    return (dispatch, getState) => {
        dispatch({
            type: TOP_TAB_CHANGE_EVENT,
            payload: event
        });
    }
}
export function filtersDataAddEvent(event) {
    return (dispatch, getState) => {
        dispatch({
            type: FILTER_ADD_EVENT,
            payload: event
        });
    }
}


export function ChangeTitleAction() {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_TITLE,
            payload: null
        });
    }

}

export function ToggleSettingsMenuAction(widget) {
    return (dispatch, getState) => {
        dispatch(getState().editor.CollapseAllEditorMenusAction())
        dispatch(getState().settings.ToggleSettingsMenuAction(widget))
    }
}


export function ToggleEditorMenuAction(widget) {
    return (dispatch, getState) => {
        dispatch(getState().settings.CollapseAllSettingsMenusAction())
        dispatch(getState().editor.ToggleEditorMenuAction(widget))
    }
}

export function UpdateWidgetStylesAction(widget) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_WIDGET,
            widget
        });
    }
}
export function AddFilterAction(appliedFilter, widgetId) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_FILTER,
            appliedFilter,
            widgetId
        });
    }
}

export function AddThresholdAction(levels, widgetId) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_THRESHOLD,
            levels,
            widgetId
        });
    }
}

export function SaveMetricsAction(dataMetrics, widgetId) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.ClearNotifications());
        if (dataMetrics && dataMetrics.statisticCategory == StatisticCategory.Custom && (dataMetrics.selectedStoreProc == '' || dataMetrics.selectedStoreProc.value == 0)) {
            if (dataMetrics.query) {
                var query = "select";
                if (!(dataMetrics.query.trim().substr(0, query.length).toUpperCase() == query.toUpperCase())) {
                    let messagesConfig = {};
                    messagesConfig.messages = [];
                    messagesConfig.type = 1;
                    messagesConfig.messages.push({
                        displayMessage: "Only SELECT statements are allowed"
                    });
                    dataMetrics.query = '';
                    dispatch(getState().notificationStore.ShowNotification(messagesConfig));
                }
            }
            else {
                let messagesConfig = {};
                messagesConfig.messages = [];
                messagesConfig.type = 1;
                messagesConfig.messages.push({
                    displayMessage: "Please enter a custom query"
                });
                dataMetrics.query = '';
                dispatch(getState().notificationStore.ShowNotification(messagesConfig));
            }
        }
        dispatch({
            type: SAVE_METRICS,
            dataMetrics,
            widgetId
        });
        //dispatch(getState().settings.UpdateMetricsOfWidget(dataMetrics))
    }
}
export function SaveComboCustomMetricsAction(dataMetrics, widgetId) {
    return (dispatch, getState) => {
        let matrix = [];
        let headers = [];
        let statisticCategory = dataMetrics.statisticCategory;
        let levels = dataMetrics.levels;
        const combo = _.find(getState().newdashboard.widgets, (w) => w.id === widgetId);
        const existedMatrix = combo ? combo.matrix : [];
        if (levels.length > 0) {
            _.map(levels, (level) => {
                let ecHeader = _.find(existedMatrix[0], mat => mat.id == level.column.value);
                if (ecHeader) {
                    headers.push(ecHeader);
                }
                else {
                    let cHeader = WidgetData.GetWidget(WidgetType.Text, true, 0);
                    cHeader.title = level.displayName ? level.displayName : level.column.label;
                    cHeader.isComboWidget = true;
                    cHeader.comboId = widgetId;
                    cHeader.column = level.column.label;
                    cHeader.id = level.column.value;
                    cHeader.dataType = level.column.type;
                    cHeader.dateFormat = level.dateFormat && level.dateFormat.type;
                    cHeader.showZeroValues = level.showZeroValues;
                    cHeader.displayFormatId = level.displayFormat && level.displayFormat.value;
                    cHeader.dateFormatId = level.dateFormat && level.dateFormat.value;
                    headers.push(cHeader);
                }
            });
        } else {
            _.map(dataMetrics.columnOptions, (option) => {
                let cHeader = WidgetData.GetWidget(WidgetType.Text, true, 0);
                cHeader.title = option.label;
                cHeader.isComboWidget = true;
                cHeader.comboId = widgetId;
                cHeader.column = option.label;
                cHeader.id = option.value;
                headers.push(cHeader);

            });
        }
        matrix[0] = _.orderBy(headers, item => item.id);
        dispatch({
            type: SAVE_COMBO_CUSTOM_METRICS,
            statisticCategory,
            levels,
            widgetId,
            matrix
        });
    }
}
export function SaveComboMetricsAction(statisticCategory, selectedGroup, comboSelectedStatisticItems, drillDownOptions, comboId) {
    return (dispatch, getState) => {
        const combo = _.find(getState().newdashboard.widgets, (w) => w.id === comboId);
        const existedMatrix = combo ? combo.matrix : null;
        let filters = _.filter(drillDownOptions, (eachOption) => eachOption.checked);
        let matrix = []
        let headers = [];
        let rowHeaders = [];
        let columns = _.map(comboSelectedStatisticItems, eachDataMetrics => {
            return {
                cisiid: eachDataMetrics && eachDataMetrics.item && eachDataMetrics.item.id,
                ciafid: eachDataMetrics && eachDataMetrics.func && eachDataMetrics.func.id,
                cirob: 0,
                ciia: 0,
                cdf: eachDataMetrics && eachDataMetrics.displayFormat && eachDataMetrics.displayFormat.id,
                cwt: eachDataMetrics && eachDataMetrics.widget && eachDataMetrics.widget.value
            };
        });
        _.map(comboSelectedStatisticItems, (s) => {
            let cHeader = WidgetData.GetWidget(WidgetType.Text, true, 0);
            cHeader.title = s.item && s.item.label;
            cHeader.isComboWidget = true;
            cHeader.comboId = comboId;
            cHeader.settings = {
                item: s.item && s.item.id,
                cWidgetType: s.widget && s.widget.value
            };
            headers.push(cHeader);
        });
        _.map(filters, (f) => {
            let rHeader = WidgetData.GetWidget(WidgetType.Text, true, 0);
            rHeader.title = f.label;
            rHeader.isComboWidget = true;
            rHeader.comboId = comboId;
            rHeader.settings = {
                filter: f.value
            };
            rowHeaders.push(rHeader);
        });
        matrix[0] = headers;
        var matrixIndex = 1;
        for (var outerIndex = 0; outerIndex < filters.length; outerIndex++) {
            let row = [];
            row[0] = rowHeaders[outerIndex];
            for (var innerIndex = 1; innerIndex < comboSelectedStatisticItems.length; innerIndex++) {

                row[innerIndex] = WidgetData.GetWidget(comboSelectedStatisticItems[innerIndex].widget.value, true, 0);

                row[innerIndex].settings = {
                    item: comboSelectedStatisticItems[innerIndex].item && comboSelectedStatisticItems[innerIndex].item.id,
                    func: comboSelectedStatisticItems[innerIndex].func && comboSelectedStatisticItems[innerIndex].func.id,
                    displayFormat: comboSelectedStatisticItems[innerIndex].displayFormat && comboSelectedStatisticItems[innerIndex].displayFormat.id,
                    filter: filters[outerIndex].value
                }

                if (row[innerIndex].widgetType == WidgetType.CircularProgress) {
                    if (!row[innerIndex].appliedSettings) {
                        row[innerIndex].appliedSettings = {};
                    }
                    if (!row[innerIndex].appliedSettings.dataMetrics) {
                        row[innerIndex].appliedSettings.dataMetrics = {};
                    }
                    row[innerIndex].appliedSettings.dataMetrics.displayFormat = {};
                    row[innerIndex].appliedSettings.dataMetrics.displayFormat.id = {};
                    row[innerIndex].appliedSettings.dataMetrics.displayFormat.id = comboSelectedStatisticItems[innerIndex].displayFormat.id;
                }
                row[innerIndex].isComboWidget = true;
                row[innerIndex].comboId = comboId;
            }
            matrix[matrixIndex++] = row;
        }

        matrix = existedMatrix !== null && existedMatrix.length ?
            WidgetData.MapPropertiesForExistedMatrixWidget(matrix, existedMatrix) :
            matrix;

        dispatch({
            type: SAVE_COMBO_METRICS,
            statisticCategory,
            selectedGroup,
            comboSelectedStatisticItems,
            drillDownOptions,
            comboId,
            filters,
            matrix,
            columns
        });
        //dispatch(getState().settings.CollapseAllSettingsMenusAction());
    }
}


export function UpdateFilterAction(editedFilter, widgetId, filterId) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_FILTER,
            editedFilter,
            widgetId,
            filterId
        });
    }
}

export function DeleteFilterAction(widgetId, filterId) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_FILTER,
            widgetId,
            filterId
        });
    }
}

export function DeleteWidgetAction(widgetId) {
    return (dispatch, getState) => {
        dispatch(getState().editor.DeleteWidgetAction(widgetId));
        dispatch(getState().settings.DeleteWidgetAction(widgetId));
        dispatch(getState().clock.DeleteWidgetAction(widgetId));
        dispatch({
            type: DELETE_WIDGET,
            widgetId
        });
    }
}

export function AddWidgetAction(widgetType) {

    return (dispatch, getState) => {
        let widgetsCount = getState().newdashboard.widgets.length;
        let widget = WidgetData.GetWidget(widgetType, false, widgetsCount + 1);
        if (!getState().newdashboard.refreshInterval) {
            dashboardService.getDefaultRefreshInterval().then((response) => {
                widget.refreshInterval = response.data;
                dispatch({
                    type: UPDATE_PROPERTY,
                    key: "refreshInterval",
                    value: response.data
                })
                dispatch({
                    type: ADD_WIDGET,
                    widget
                });
            })
        }
        else {
            widget.refreshInterval = getState().newdashboard.refreshInterval;
            dispatch({
                type: ADD_WIDGET,
                widget
            });
        }


        dispatch(getState().settings.AddWidgetToSettingsCollectionAction(widget))
    }
}

export function PreviewAction(inputWidget) {
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
                if (inputWidget.appliedSettings.dataMetrics.statisticCategory == StatisticCategory.RealTime) {
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
                }
                comboMatrix = GetComboMatrix(inputWidget);
            } else {

                if (inputWidget.widgetType === WidgetType.Pie || inputWidget.widgetType === WidgetType.Bar) {
                    const group = _.find(getState().dataMetrics.datametricMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group &&
                        metric.StatisticGroupId === inputWidget.appliedSettings.dataMetrics.group.id &&
                        metric.WidgetType === inputWidget.widgetType &&
                        metric.IsDrillDownFilter);
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
                scr: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategory.CyReport == inputWidget.appliedSettings.dataMetrics.statisticCategory ? {
                    rid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : 0
                } : {},
                sc: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategory.Custom == inputWidget.appliedSettings.dataMetrics.statisticCategory ? {
                    qry: inputWidget.appliedSettings.dataMetrics.query,
                    isc: inputWidget.widgetType == WidgetType.Combo && inputWidget.appliedSettings.dataMetrics.levels.length > 0
                } : {},
            },
            wth: thresholds,
            wmx: comboMatrix
        }
        // const widgetData = WidgetMapper(inputWidget);

        widgetService.getWidgetPreviewData(widgetData).then(function (response) {
            if (response.status === 200) {
                const widget = _.find(getState().newdashboard.widgets, (widget) => widget.id == response.data.wrid);
                // TODO: change the logic according to the data
                if (widget != null) {

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

                            break;
                    }

                    const {
                        widgetBody
                    } = widget || {};
                    if (widgetBody) {
                        widget.appliedBackgroundColor = response.data.wrth && response.data.wrth.thc ? response.data.wrth.thc : widgetBody.backgroundColor;
                    }

                }
                dispatch({
                    type: PREVIEW_WIDGET,
                    widget
                });
            }
        });
    }
}





export function UpdateDashboardPropertyAction(key, value) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_PROPERTY,
            key,
            value
        })
    }
}

export function UpdateCategoriesAction() {
    return (dispatch, getState) => {
        dashboardService.getDashboardCategories( /*userId*/ 1).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: _.uniqBy(_.map(response.data, (d) => {
                        return {
                            value: d.ci,
                            label: d.cn
                        }
                    }), "value")
                });
            }
        })
    }
}

export function RefreshClockWidgetAction(clocksettings, widgetId) {
    return (dispatch, getState) => {
        const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
        var seleItem = clocksettings.selectedTimeZoneItem;
        widget.selectedTimeZoneItem = seleItem;
        widget.title = clocksettings.tzoneText == "" ? seleItem.label : clocksettings.tzoneText;
        widget.timezoneid = seleItem.value;
        widget.timezoneLabel = seleItem.label;
        widget.isAnalog = clocksettings.isAnalog;
        widget.tzoneText = clocksettings.tzoneText;
        if (!widget.isAnalog) {
            widget.selectedHoursFormat = clocksettings.selectedHoursFormat.value;
            widget.selectedTimeFormat = clocksettings.selectedTimeFormat.value;
            widget.selectedDateFormat = clocksettings.selectedDateFormat.value;
            widget.displayDate = clocksettings.displayDate;
            widget.displayDays = clocksettings.displayDays;
        }
        dispatch({
            type: UPDATE_WIDGET,
            widget
        });
    }
}

export function BindDashboardAction(dashboardData) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_DASHBOARD,
            dashboardData
        });
    }
}

// export function LoadTranslation() {
//   return (dispatch, getState) => {
//     dispatch({
//       type: LOAD_TRANSLATION,
//       l: LocMan.getTranslationDataForPage(getState().localizationStore, pageen.NEW_DASHBOARD)
//     })
//   }
// }
//private methods

function StylesMapper(styels) {
    return styels ? {
        sbc: styels.backgroundColor,
        sc: styels.color,
        sff: styels.fontFamily,
        sfs: styels.fontSize
    } : {};
}

function GetComboMatrix(inputWidget) {
    let i = 0,
        j = 0;
    let comboMatrixs = [];
    for (i = 0; i < inputWidget.matrix.length; i++) {
        let comboRow = [];
        for (j = 0; j < inputWidget.matrix[i].length; j++) {
            var comboInnerWidget = {};
            let eachWidget = inputWidget.matrix[i][j];
            comboInnerWidget = {
                wid: eachWidget.id,
                cid: eachWidget.comboId,
                icw: eachWidget.isComboWidget,
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
                fc: eachWidget.column ? eachWidget.column : "",
                dty: eachWidget.widgetType == WidgetType.Text && eachWidget.dataType ? eachWidget.dataType : null,
                df: eachWidget.widgetType == WidgetType.Text && eachWidget.dateFormat ? eachWidget.dateFormat : null,
                sz: eachWidget.widgetType == WidgetType.Text && eachWidget.showZeroValues ? eachWidget.showZeroValues : false,
                dpid: eachWidget.displayFormatId,
                dtid: eachWidget.dateFormatId,
            };
            comboRow.push(comboInnerWidget);
        }
        comboMatrixs.push(comboRow);
    }
    return comboMatrixs;
}

function WidgetMapper(inputWidget, dataMetricsMetadata) {
    let thresholds = [];
    let drillDownData = {};
    let comboMatrix = [];
    if (inputWidget.appliedSettings) {
        thresholds = _.map(inputWidget.appliedSettings.thresholds, threshold => {
            return {
                thv: threshold.levelValue,
                thc: threshold.color, // TODO: Pass Color appropriately
                // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
                thst: threshold.isContinuous ? 1 : 0, // TODO: Create an enum or have a boolean value for isContinuos
                thea: threshold.emailTo,
                thes: threshold.emailSubject,
                thmn: threshold.smsTo
            };
        });
    }
    let columns = [];
    let clckSettings = WidgetType.Clock == inputWidget.widgetType ? {
        ia: inputWidget.isAnalog,
        tid: inputWidget.timezoneid,
        tl: inputWidget.tzoneText,
        istfh: !inputWidget.isAnalog ? inputWidget.selectedHoursFormat : 0,
        istd: !inputWidget.isAnalog ? inputWidget.selectedTimeFormat : 0,
        dida: !inputWidget.isAnalog ? inputWidget.displayDate : false,
        didy: !inputWidget.isAnalog ? inputWidget.displayDays : false,
        isl: !inputWidget.isAnalog ? inputWidget.selectedDateFormat : 0,

    } : {};
    let clckStyles = WidgetType.Clock == inputWidget.widgetType ? {
        cbs: {
            cbb: inputWidget.widgetBody.ClockbackgroundColor,
            cobb: inputWidget.widgetBody.ClockOuterbackgroundColor,
            cbr: inputWidget.widgetBody.clockRoundingColor
        },
        cns: {
            cc: inputWidget.numberStyles.color,
            cf: inputWidget.numberStyles.fontSize
        },
        cts: {
            cc: inputWidget.TimezoneStyles.color,
            cf: inputWidget.TimezoneStyles.fontSize
        },
        hhs: {
            ch: inputWidget.hands.hourhandcolor
        },
        mhs: {
            ch: inputWidget.hands.minutehandcolor
        },
        shs: {
            ch: inputWidget.hands.secondhandcolor
        },

        cdt: !inputWidget.isAnalog ? {
            cc: inputWidget.DateStyles.color,
            cf: inputWidget.DateStyles.fontSize
        } : {},
        cdy: !inputWidget.isAnalog ? {
            cc: inputWidget.DaysStyles.color,
            cf: inputWidget.DaysStyles.fontSize
        } : {},
        cdc: inputWidget.CurrentDayColor,
        ctt: !inputWidget.isAnalog ? {
            cc: inputWidget.TimeStyles.color,
            cf: inputWidget.TimeStyles.fontSize
        } : {},

    } : {}
    //Since it is box, we have added only one column. this should be updated to support multiple values as well.
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
            const group = _.find(dataMetricsMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group &&
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
            comboMatrix = GetComboMatrix(inputWidget);

        } else {

            if (inputWidget.widgetType === WidgetType.Pie || inputWidget.widgetType === WidgetType.Bar) {
                const group = _.find(dataMetricsMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group &&
                    metric.StatisticGroupId === inputWidget.appliedSettings.dataMetrics.group.id &&
                    metric.WidgetType === inputWidget.widgetType &&
                    metric.IsDrillDownFilter);
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
        drillDownData = _.map(
            _.filter(inputWidget.appliedSettings.dataMetrics.drillDownOptions, (option) => option.checked === undefined || option.checked),
            (option) => option.value || option
        );

    }


    return {
        wxp: inputWidget.x,
        wyp: inputWidget.y,
        width: inputWidget.width,
        height: inputWidget.height,
        zIndex: inputWidget.z,

        wid: inputWidget.id,
        wt: inputWidget.widgetType,
        wmax: inputWidget.max,
        wmin: inputWidget.min,
        wtl: inputWidget.title,
        wri: inputWidget.refreshInterval || -1,
        wsgc: inputWidget.widgetType === WidgetType.Speedo ? inputWidget.segmentColors : [],
        wth: thresholds,
        wb: StylesMapper(inputWidget.widgetBody),
        wvs: StylesMapper(inputWidget.valueStyles),
        wts: StylesMapper(inputWidget.titleStyles),
        wrs: StylesMapper(inputWidget.rangeValueStyles),
        ws: {
            // TODO: Need to move it to different function and return appropriate typeofmetric.
            stom: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && inputWidget.appliedSettings.dataMetrics.statisticCategory,
            srt: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics ? {
                rsgid: inputWidget.appliedSettings.dataMetrics.group ? inputWidget.appliedSettings.dataMetrics.group.id : null,
                rsiid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : null,
                rsfid: inputWidget.appliedSettings.dataMetrics.func ? inputWidget.appliedSettings.dataMetrics.func.id : null,
                rsdfid: inputWidget.appliedSettings.dataMetrics.displayFormat ? inputWidget.appliedSettings.dataMetrics.displayFormat.id : null,
                rc: columns,
                rf: drillDownData

            } : {},
            scr: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategory.CyReport == inputWidget.appliedSettings.dataMetrics.statisticCategory ? {
                rid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : 0
            } : {},
            sc: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategory.Custom == inputWidget.appliedSettings.dataMetrics.statisticCategory ? {
                qry: inputWidget.appliedSettings.dataMetrics.query,
                isc: inputWidget.widgetType == WidgetType.Combo && inputWidget.appliedSettings.dataMetrics.levels.length > 0
            } : {},
        },
        cs: clckSettings,
        css: clckStyles,
        wenmn: inputWidget.enableMin,
        wenmx: inputWidget.enableMax,
        wenbl: inputWidget.enableBarLines,
        wusbc: inputWidget.useSelectedBarColor,
        wsy: inputWidget.showYAxis,
        wbs: StylesMapper(inputWidget.barStyles),
        wsxs: StylesMapper(inputWidget.xAxisStyles),
        wsys: StylesMapper(inputWidget.yAxisStyles),
        twrd: inputWidget.scrollSpeed,
        twrst: inputWidget.scrollType && inputWidget.scrollType.value,
        wsmv: inputWidget.showMaxValueOnWidget,
        wps: (inputWidget.widgetType == WidgetType.Picture) ? inputWidget.pictureStretch.value : undefined, //Property is specific to Picture Widget
        wpsl: (inputWidget.widgetType == WidgetType.Picture) ? inputWidget.PictureSelected : undefined, //Property is specific to Picture Widget
        mspid: inputWidget.UniqueId,
        wmx: comboMatrix

    }
}

function MapThresholds(inputWidget) {

    if (inputWidget.appliedSettings && inputWidget.appliedSettings.thresholds) {
        let thresholds = _.map(inputWidget.appliedSettings.thresholds, threshold => {
            return {
                thv: threshold.levelValue,
                thc: threshold.color, // TODO: Pass Color appropriately
                // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
                thst: threshold.isContinuous ? 1 : 0, // TODO: Create an enum or have a boolean value for isContinuos
                thea: threshold.emailTo,
                thes: threshold.emailSubject,
            };
        });
        return thresholds;
    }
}

export function getUserDashboardByIdAction(dashboardId) {
    return (dispatch, getState) => {
        dispatch(getState().spinnerStore.BeginTask());
        dashboardService.getDashboardById(dashboardId, true).then((response) => {
            dispatch(getState().spinnerStore.EndTask());
            if (response.status === 200) {
                let dashboard = response.data;

                let datametricMetadata = getState().dataMetrics.datametricMetadata;
                if (!datametricMetadata)
                    dispatch(getState().dataMetrics.LoadDataMetricsMetaData());

                datametricMetadata = getState().dataMetrics.datametricMetadata;

                let dashboardData = getState().newdashboard.widgets.length > 0 ? getState().newdashboard : dashboardUtils.dashboard(dashboard, datametricMetadata, true);
                dispatch(getState().settings.AddWidgetsToSettingsCollectionAction(dashboardData.widgets))
                dispatch(getState().newdashboard.BindDashboardAction(dashboardData));
            }
        }).catch(err => {
            dispatch(getState().spinnerStore.EndTask());
        })
    }
}

export function PreviewActionPicture(dashboardId, widgetid) {
    return (dispatch, getState) => {
        dashboardService.viewWidgetData(dashboardId, widgetid).then((response) => {
            if (response.status === 200) {
                const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetid);
                widget.picturePath = response.data.pblob,
                    widget.pictureStretch = response.data.wps == 1 ? { value: PictureStretchEnum.ActualSize, label: 'Actual Size' } : { value: PictureStretchEnum.Fill, label: 'Fill' };
                dispatch({
                    type: UPDATE_WIDGET,
                    widget
                });
            }
        });
    }
}

export function EditConfirmation(config) {
    return (dispatch, getState) => {
        return dispatch(getState().notificationStore.ShowNotification(config));
    }
}

export function HandleModalPopup(showModalPopup) {
    return (dispatch, getState) => {
        dispatch({
            type: MODAL_POPUP,
            showModalPopup: showModalPopup
        });
    }
}

export function UpdateAction(action) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_ACTION,
            fromAction: action
        });
    }
}
/**
 * This method makes a call to API and shows a success message if notifications sent succesfully, error message if notifications fails.
 * @param {*} threshold 
 * @param {*} widgetId 
 */
export function TestThreshold(threshold, widgetId) {

    return (dispatch, getState) => {

        dispatch(getState().spinnerStore.BeginTask());
        dispatch(getState().notificationStore.ClearNotifications());
        let widget = _.find(getState().newdashboard.widgets, (widget) => widget.id === widgetId);
        let mappedThreshold = {
            thv: threshold.levelValue,
            thc: threshold.color, // TODO: Pass Color appropriately
            // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
            thst: threshold.isContinuous ? 1 : 0, // TODO: Create an enum or have a boolean value for isContinuos
            thea: threshold.emailTo,
            thes: threshold.emailSubject,
            thmn: threshold.smsTo
        };
        let inputThreshold = {
            ti: mappedThreshold,
            tiwt: widget.title,
            tidn: getState().newdashboard.name
        }

        dashboardService.testThreshold(inputThreshold).then((response) => {
            dispatch(getState().spinnerStore.EndTask());

            var successMessage = _.map(response.data.Messages, (r) => {
                return {
                    ResponseType: r.ResponseType,
                    Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
                }
            })
            dispatch(getState().notificationStore.ShowNotification({
                type: ResponseStatusEnum.Success,
                messages: dashboardUtils.returnMessages(successMessage, ResponseStatusEnum.Success)
            }));

            var errorMessage = _.map(response.data.Messages, (r) => {
                return {
                    ResponseType: r.ResponseType,
                    Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
                }
            })

            let errorResponse = {
                type: ResponseStatusEnum.Error,
                persistMessages: true,
                messages: dashboardUtils.returnMessages(errorMessage, ResponseStatusEnum.Error)
            };

            dispatch(getState().notificationStore.ShowNotification(errorResponse));

            //   if (response.data.Status === true) {

            //   }
            //   else {


            //     }

        }).catch((err) => {
            let errorResponse = {
                type: ResponseStatusEnum.Error,
                persistMessages: false,
                messages: [{ displayMessage: getState().newdashboard.l.t("Some_error_occuredPERIOD", "Some error occured.") }]
            };

            dispatch(getState().notificationStore.ShowNotification(errorResponse));
            dispatch(getState().spinnerStore.EndTask());
        })

    }
}


export function UpdateWidgetSizeAction(width, height, widgetId) {
    return (dispatch, getState) => {
        let selectedWidget = _.find(getState().newdashboard.widgets, (w) => w.id === widgetId);
        selectedWidget.width = width
        selectedWidget.height = height
        dispatch({
            type: UPDATE_WIDGET,
            widget: selectedWidget
        });
    }
}
export function UpdateWidgetPositionAction(x, y, widgetId) {
    return (dispatch, getState) => {
        let selectedWidget = _.find(getState().newdashboard.widgets, (w) => w.id === widgetId);
        selectedWidget.x = x;
        selectedWidget.y = y;
        dispatch({
            type: UPDATE_WIDGET,
            widget: selectedWidget
        });
    }
}

export function UpdateWidgetZIndexAction(widget) {
    return (dispatch, getState) => {
        let allWidgets = getState().newdashboard.widgets

        let otherWidgets = _.filter(allWidgets, (w) => w.z > widget.z);
        let z = 0;

        _.forEach(otherWidgets, function (w) {
            w.z = w.z - 1
        });

        let widgetCount = allWidgets.length
        let selectedWidget = _.find(allWidgets, (w) => w.id === widget.id);
        selectedWidget.z = widgetCount

        dispatch({
            type: UPDATE_PROPERTY,
            key: 'widgets',
            value: allWidgets
        })
    }
}

export function ResetDashboard() {
    //better way to initialize state
    return (dispatch, getState) => {
        dispatch(getState().newdashboard.BindDashboardAction(_.cloneDeep(initialState)));
    }
}

export function DeleteDashboardInHeader(dashboardId) {
    return (dispatch, getState) => {
        dispatch(getState().myDashboard.DeleteDashboard(dashboardId));
    }
}

export function CollapseAllSettingsMenus() {
    return (dispatch, getState) => {
        dispatch(getState().settings.CollapseAllSettingsMenusAction());
    }
}

export function CollapseAllEditorMenus() {
    return (dispatch, getState) => {
        dispatch(getState().editor.CollapseAllEditorMenusAction());
    }
}

export function UpdateViewFlagAction(isFromEdit) {
    return (dispatch, getState) => {
        dispatch(getState().viewDashboard.UpdateViewFlagAction(isFromEdit));
    }
}

export function DeleteConfirmation(config) {
    return (dispatch, getState) => {
        return dispatch(getState().notificationStore.ShowNotification(config));
    }
}

export function LoadDM(dashboardId) {
    return (dispatch, getState) => {
        return dispatch(getState().dataMetrics.LoadDataMetricsMetaData(dashboardId))
    }
}

export function loadColumnsForTabAction(query, widgetId) {
    return (dispatch, getState) => {
        return dispatch(getState().dataMetrics.loadColumnsAction(query, widgetId))
    }
}

export function AppendL(data) {
    return (dispatch, getState) => {
        return dispatch({
            type: APPEND_L,
            value: data
        })
    }
}


export const ACTION_HANDLERS = {
    [SAVE_DASHBOARD]: (state, action) => {
        return Object.assign({}, state, {})
    },
    //Need to handle messages here
    [PICTURE_SAVE]: (state, action) => {
        return Object.assign({}, state, {})
    },
    [TOP_TAB_CHANGE_EVENT]: (state, action) => {
        return Object.assign({}, state, {
            currentTab: action.payload
        })
    },
    [FILTER_ADD_EVENT]: (state, action) => {
        console.log('FILTER_ADD_EVENT', state);
        return Object.assign({}, state, {})
    },
    [CHANGE_TITLE]: (state, action) => {
        return Object.assign({}, state, {})
    },
    [PREVIEW_WIDGET]: (state, action) => {
        return Object.assign({}, state, {
            widget: action.widget,
        })
    },
    [UPDATE_WIDGET]: (state, action) => {
        let widgets = _.map(state.widgets, (widget) => {
            if (widget.id === action.widget.id) {
                widget = action.widget;
            }
            return widget
        });
        return Object.assign({}, state, { widgets });
    },
    [ADD_FILTER]: (state, action) => {
        _.map(state.widgets, (widget) => {
            if (widget.id === action.widgetId) {
                widget.appliedSettings.filters.push(
                    action.appliedFilter
                );
            }
        });
        return Object.assign({}, state);
    },
    [ADD_THRESHOLD]: (state, action) => {

        const widgetLevel1 = _.find(state.widgets, (widget) => widget.id === action.widgetId);
        let isThresholdAssigned = false;
        if (!widgetLevel1) {

            for (let eachWidget of state.widgets) {
                if (isThresholdAssigned) {
                    break;
                }
                for (let comboRow of eachWidget.matrix) {

                    const widget2 = _.find(comboRow, (comboRowwidget) => comboRowwidget.id === action.widgetId);
                    if (widget2) {
                        widget2.appliedSettings.thresholds = action.levels;
                        isThresholdAssigned = true;
                        break;
                    }
                };

            };


        } else {
            isThresholdAssigned = true;
            widgetLevel1.appliedSettings.thresholds = action.levels;
        }


        return Object.assign({}, state);
    },
    [SAVE_METRICS]: (state, action) => {
        const widget = _.find(state.widgets, (widget) => widget.id === action.widgetId);
        widget.appliedSettings.dataMetrics = action.dataMetrics;
        return Object.assign({}, state);
    },
    [SAVE_COMBO_METRICS]: (state, action) => {
        const widget = _.find(state.widgets, (widget) => widget.id === action.comboId);
        widget.appliedSettings.dataMetrics.statisticCategory = action.statisticCategory;
        widget.appliedSettings.dataMetrics.comboSelectedStatisticItems = action.comboSelectedStatisticItems;
        widget.appliedSettings.dataMetrics.columns = action.columns;
        widget.appliedSettings.drillDownOptions = action.drillDownOptions;
        widget.appliedSettings.filters = action.filters;
        widget.appliedSettings.dataMetrics.drillDownOptions = action.filters;
        widget.appliedSettings.selectedGroup = action.selectedGroup;
        widget.appliedSettings.dataMetrics.group = action.selectedGroup;
        widget.matrix = action.matrix;
        return Object.assign({}, state);
    },
    [SAVE_COMBO_CUSTOM_METRICS]: (state, action) => {
        const widget = _.find(state.widgets, (widget) => widget.id === action.widgetId);
        widget.appliedSettings.dataMetrics.statisticCategory = action.statisticCategory;
        widget.appliedSettings.group.isEdit = false;
        widget.appliedSettings.dataMetrics.levels = action.levels;
        widget.matrix = action.matrix;
        return Object.assign({}, state);
    },
    [UPDATE_FILTER]: (state, action) => {
        const widget = _.find(state.widgets, (widget) => widget.id === action.widgetId);
        const filter = _.find(widget.appliedSettings.filters, (filter) => filter.id === action.filterId);

        filter.desc = action.editedFilter.desc;
        filter.data = action.editedFilter.data;

        return Object.assign({}, state);
    },
    [DELETE_FILTER]: (state, action) => {
        const widget = _.find(state.widgets, (widget) => widget.id === action.widgetId);
        widget.appliedSettings.filters = _.filter(widget.appliedSettings.filters, (filter) => filter.id !== action.filterId);
        return Object.assign({}, state);
    },
    [DELETE_WIDGET]: (state, action) => {
        state.widgets = _.filter(state.widgets, (widget) => widget.id !== action.widgetId);
        return Object.assign({}, state);
    },
    [ADD_WIDGET]: (state, action) => {
        if (!_.find(state.widgets, (w) => w.id == action.widget.id))
            state.widgets.push(action.widget);
        return Object.assign({}, state);
    },
    [UPDATE_PROPERTY]: (state, action) => {
        return Object.assign({}, state, {
            [action.key]: action.value
        });
    },
    [UPDATE_CATEGORIES]: (state, action) => {
        return Object.assign({}, state, {
            categories: action.categories
        });
    },
    [UPDATE_DASHBOARD]: (state, action) => {
        // state = _.merge(state,action.dashboardData);
        return Object.assign({}, state, {
            Id: action.dashboardData.Id,
            name: action.dashboardData.name,
            isGlobal: action.dashboardData.isGlobal,
            isDefault: action.dashboardData.isDefault,
            category: action.dashboardData.category,
            widgets: action.dashboardData.widgets
        });
    },
    [LOAD_TRANSLATION]: (state, action) => {
        return Object.assign({}, state, {
            l: action.l
        });
    },
    [MODAL_POPUP]: (state, action) => {
        return Object.assign({}, state, {
            showModalPopup: action.showModalPopup
        });
    },
    [UPDATE_ACTION]: (state, action) => {
        return Object.assign({}, state, {
            fromAction: action.fromAction
        });
    },
    [SAVE_AS_MODAL_POPUP]: (state, action) => {
        return Object.assign({}, state, {
            showSaveAsModalPopup: action.showSaveAsModalPopup
        });
    },
    [APPEND_L]: (state, action) => {
        return Object.assign({}, state, { l: action.value })
    }
}

const initialState = {
    currentTab: 'first',
    filtersTabData: {
        Date: {
            Selected: '',
            StartDate: '',
            EndDate: ''
        }
    },
    loadSettingsForWidget: {},
    widgets: [],
    isGlobal: false,
    isDefault: false,
    name: "",
    categories: [],
    category: null,
    RefreshClockWidgetAction,
    BindDashboardAction,
    getUserDashboardByIdAction,
    topTabsClickEvent,
    ResetDashboard,
    l: {}
};

export default function NewDashboardReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
