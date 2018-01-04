import { connect } from 'react-redux'

import NewDashboard from '../components/new-dashboard.component'
import * as Reducer from '../reducers/new-dashboard.reducer';
import * as LocMan from '../../../../localization/localization.manager';
import { PageEnums } from '../../../../localization/collection';

const mapDispatchToProps = (dispatch) => {
  return {
    SaveDashboard: (name, isNameFromStore) => {
      dispatch(Reducer.SaveDashboardAction(name, isNameFromStore))
    },
    UpdateDashboard: (name, isNameFromStore) => {
      dispatch(Reducer.UpdateDashboardAction(name, isNameFromStore))
    },
    topTabsClick: (e) => {
      dispatch(Reducer.topTabsClickEvent(e))
    },
    filtersDataAdd: (e) => {
      dispatch(Reducer.filtersDataAddEvent(e))
    },
    ChangeTitle: () => {
      dispatch(Reducer.ChangeTitleAction())
    },

    ToggleEditorMenu: (widget) => {
      dispatch(Reducer.ToggleEditorMenuAction(widget))
    },

    ToggleSettingsMenu: (widget) => {
      dispatch(Reducer.ToggleSettingsMenuAction(widget))
    },

    UpdateWidgetStyles: (widget) => {
      dispatch(Reducer.UpdateWidgetStylesAction(widget))
    },

    AddFilter: (appliedFilter, widgetId) => {
      dispatch(Reducer.AddFilterAction(appliedFilter, widgetId))
    },

    AddThreshold: (levels, widgetId) => {
      dispatch(Reducer.AddThresholdAction(levels, widgetId))
    },

    SaveMetrics: (dataMetrics, widgetId) => {
      dispatch(Reducer.SaveMetricsAction(dataMetrics, widgetId))
    },
    SaveComboCustomMetrics: (dataMetrics, widgetId) => {
      dispatch(Reducer.SaveComboCustomMetricsAction(dataMetrics, widgetId))
    },

    SaveComboMetrics: (statisticCategory, selectedGroup, comboSelectedStatisticItems, drillDownOptions, widgetId) => {
      dispatch(Reducer.SaveComboMetricsAction(statisticCategory, selectedGroup, comboSelectedStatisticItems, drillDownOptions, widgetId))
    },

    UpdateFilter: (editedFilter, widgetId, filterId) => {
      dispatch(Reducer.UpdateFilterAction(editedFilter, widgetId, filterId))
    },
    DeleteFilter: (widgetId, filterId) => {
      dispatch(Reducer.DeleteFilterAction(widgetId, filterId))
    },

    DeleteWidget: (widgetId) => {
      dispatch(Reducer.DeleteWidgetAction(widgetId))
    },

    AddWidget: (widget) => {
      dispatch(Reducer.AddWidgetAction(widget))
    },

    PreviewWidget: (widget) => {
      dispatch(Reducer.PreviewAction(widget));
    },

    UpdateDashboardProperty: (key, value) => {
      dispatch(Reducer.UpdateDashboardPropertyAction(key, value));
    },

    UpdateCategories: () => {
      dispatch(Reducer.UpdateCategoriesAction());
    },
    GetUserDashboardById: (dashboardId) => {
      dispatch(Reducer.getUserDashboardByIdAction(dashboardId))
    },
    LoadTranslation: () => {
      dispatch(Reducer.LoadTranslation())
    },
    EditConfirmation: (config) => {
      dispatch(Reducer.EditConfirmation(config))
    },
    ResetDashboard: () => {
      dispatch(Reducer.ResetDashboard())
    },
    CollapseAllSettingsMenus: () => {
      dispatch(Reducer.CollapseAllSettingsMenus())
    },
    CollapseAllEditorMenus: () => {
      dispatch(Reducer.CollapseAllEditorMenus())
    },
    UpdateViewFlag: (isFromEdit) => {
      dispatch(Reducer.UpdateViewFlagAction(isFromEdit))
    },
    DeleteDashboardInHeader: (dashboardId) => {
      dispatch(Reducer.DeleteDashboardInHeader(dashboardId))
    },
    DeleteConfirmation: (config) => {
      dispatch(Reducer.DeleteConfirmation(config))
    },
    // BindDashboard: (dashboardId) => {
    //   dispatch(Reducer.BindDashboardAction(dashboardId))
    // }

    HandleModalPopup: (showModalPopup) => {
      dispatch(Reducer.HandleModalPopup(showModalPopup))
    },
    LoadDM: (dashboardId) => {
      dispatch(Reducer.LoadDM(dashboardId))
    },
    UpdateAction: (action) => {
      dispatch(Reducer.UpdateAction(action))
    },
    PreviewActionPicture: (dashboardId, widgetid) => {
      dispatch(Reducer.PreviewActionPicture(dashboardId, widgetid))
    },
    HandleSaveAsPopUp: (showSaveAsModalPopup) => {
      dispatch(Reducer.HandleSaveAsPopUpAction(showSaveAsModalPopup))
    },
    SaveAsDashboard: (name, isNameFromStore) => {
      dispatch(Reducer.SaveAsDashboardAction(name, isNameFromStore))
    },
    UpdateWidgetSize: (width, height, widgetId) => {
      dispatch(Reducer.UpdateWidgetSizeAction(width, height, widgetId))
    },
    UpdateWidgetPosition: (x, y, widgetId) => {
      dispatch(Reducer.UpdateWidgetPositionAction(x, y, widgetId))
    },
    UpdateWidgetZIndex: (e, event, widget) => {
      dispatch(Reducer.UpdateWidgetZIndexAction(widget))
    },
    loadColumnsForTab: (query, widgetId) => {
      dispatch(Reducer.loadColumnsForTabAction(query, widgetId))
    },
    TestThreshold: (threshold, widgetId) => {
      dispatch(Reducer.TestThreshold(threshold, widgetId))
    },
    appendL: (data) => {
      dispatch(Reducer.AppendL(data))
    }
  }
}


const mapStateToProps = (state) => {
  return {
    newDashboard: state.newdashboard,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.NEW_DASHBOARD)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDashboard)


