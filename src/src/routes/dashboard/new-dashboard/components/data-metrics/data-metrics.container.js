import {
  connect
} from 'react-redux'

import DataMetrics from './data-metrics.component'
import * as Reducer from './data-metrics.reducer';

const mapDispatchToProps = (dispatch) => {
  return {
    getMetaData: (widgetType) => {
      dispatch(Reducer.getMetaDataAction(widgetType));
    },
    getItemsData: (selectedGroup, widgetType) => {
      if (selectedGroup) {
        dispatch(Reducer.setSelectedGroupValueAction(selectedGroup));
        dispatch(Reducer.setStatisticsItems(selectedGroup, widgetType));
      }
    },
    setGroupAndGetItems: (selectedGroup) => {
      dispatch(Reducer.setSelectedGroupValueAction(selectedGroup));
      dispatch(Reducer.setStatisticsItems());
    },
    getFunctionsData: (selectedItem, widgetType, widgetId) => {
      dispatch(Reducer.setSelectedItemValueAction(selectedItem));
      dispatch(Reducer.setStatisticFunctions(selectedItem, widgetType));
      dispatch(Reducer.getDrillDownMetaDataAction(selectedItem, widgetId));
    },
    setItemAndGetFunctions: (selectedItem) => {
      dispatch(Reducer.setSatisticItem(selectedItem));
      dispatch(Reducer.setStatisticFunctions());
    },
    getApplicableWidget: (selectedDisplayFormat) => {

      if (selectedDisplayFormat) {
        dispatch(Reducer.setSelectedDisplayFormatAction(selectedDisplayFormat));
        dispatch(Reducer.getApplicableWidgetAction(selectedDisplayFormat));
      }
    },

    setApplicableWidget: (selectedWidgetforStatisticItem, widgetId) => {
      if (selectedWidgetforStatisticItem) {
        dispatch(Reducer.setApplicableWidgetAction(selectedWidgetforStatisticItem, widgetId));
      }

    },
    getSelectedDisplayFormat: (selectedFunction, widgetType) => {
      if (selectedFunction) {
        dispatch(Reducer.setSelectedFunctionAction(selectedFunction));
        dispatch(Reducer.getDisplayFormatAction(selectedFunction, widgetType));
      }
    },
    setFunctionAndGetDisplayFormat: (selectedFunction) => {
      dispatch(Reducer.setSelectedFunctionAction(selectedFunction));
      dispatch(Reducer.getDisplayFormatAction());
    },
    setSelectedDisplayFormat: (selectedDisplayFormat) => {
      if (selectedDisplayFormat) {
        dispatch(Reducer.setSelectedDisplayFormatAction(selectedDisplayFormat));
      }
    },
    setSelectedStatisticCategory: (selectedStatisticCategory, widgetType, widgetId) => {
      dispatch(Reducer.setSelectedStatisticCategoryAction(selectedStatisticCategory, widgetType, widgetId));
    },
    updateWidgetSpecificStatisticCategories: (widgetType) => {
      dispatch(Reducer.updateWidgetSpecificStatisticCategoriesAction(widgetType));
    },
    getDrillDownMetaData: (selectedItem) => {
      if (selectedItem) {
        dispatch(Reducer.getDrillDownMetaDataAction(selectedItem));
      }
    },
    getComboDrillDownMetaData: (selectedGroup, widgetId) => {
      if (selectedGroup) {
        dispatch(Reducer.getComboDrillDownMetaDataAction(selectedGroup, widgetId));
      }
    },
    addComboStatisticItems: (selectedStatisticItem, widgetId) => {
      if (selectedStatisticItem) {
        dispatch(Reducer.addComboStatisticItemsAction(selectedStatisticItem, widgetId));
      }
    },
    removeComboStatisticItems: (selectedStatisticItem, widgetId) => {
      if (selectedStatisticItem) {
        dispatch(Reducer.removeComboStatisticItemAction(selectedStatisticItem, widgetId));
      }
    },
    EditGridSelectedItem: (selectedStatisticItem, widgetId) => {
      if (selectedStatisticItem) {
        dispatch(Reducer.EditGridSelectedItemAction(selectedStatisticItem, widgetId));
      }
    },
    SaveEditedComboStatisticItem: (selectedStatisticItem, updatedStatisticItem, widgetId) => {
      if (selectedStatisticItem && updatedStatisticItem) {
        dispatch(Reducer.SaveEditedComboStatisticItemAction(selectedStatisticItem, updatedStatisticItem, widgetId));
      }
    },
    updateDrillDownOptions: (options) => {
      if (options) {
        dispatch(Reducer.updateDrillDownOptionsAction(options));
      }
    },
    updateComboDrillDownOptions: (options, widgetId) => {
      if (options) {
        dispatch(Reducer.updateComboDrillDownOptionsAction(options, widgetId));
      }
    },
    getGridItemsData: (selectedGroup, widgetType, widgetId) => {
      if (selectedGroup && selectedGroup.id) {
        dispatch(Reducer.setSelectedComboGroupValueAction(selectedGroup, widgetId, widgetType));
        dispatch(Reducer.setStatisticsItems(selectedGroup, widgetType));
        dispatch(Reducer.getComboDrillDownMetaDataAction(selectedGroup, widgetId));
        dispatch(Reducer.addDefaultComboStatisticItemsAction(selectedGroup, widgetType, widgetId));
      }
    },
    getStoreProcs: () => {
      dispatch(Reducer.getStoreProcsAction());
    },
    SetDataMetricsDirty: (isDirty) => {
      dispatch(Reducer.setDMDirty(isDirty))
    },
    SetDataMetricsLoaded: (isLoaded) => {
      dispatch(Reducer.setDMisLoaded(isLoaded))
    },
    loadColumns: (query, widgetId, isFromEvent) => {
      dispatch(Reducer.loadColumnsAction(query, widgetId, isFromEvent));
    },
    clearDropdowns: () => {
      dispatch(Reducer.clearDropdownsAction());
    },
    updatecomboSelectedStatisticItems: (comboSelectedStatisticItems) => {
      dispatch(Reducer.updatecomboSelectedStatisticItemsAction(comboSelectedStatisticItems))
    }
  }
}


const mapStateToProps = (state) => ({
  dataMetrics: state.dataMetrics
})

export default connect(mapStateToProps, mapDispatchToProps)(DataMetrics)
