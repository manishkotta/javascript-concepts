import Constants from "../constants/apiUrl"

import {
  axiosGet
} from "./service"

export function getStatisticGroups() {
  return axiosGet(
    Constants.DATA_METRICS
  )
}

export function getStatisticCategories() {
  return axiosGet(
    Constants.STATISTIC_CATEGORY_METADATA
  )
}

export function getDrillDownMetaData(statisticGroupId) {
  return axiosGet(
    Constants.DATA_METRICS_DRILL_DOWN_METADATA,
    `statisticGroupId=${statisticGroupId}`
  )
}
export function getStoreProcs() {
  return axiosGet(
    Constants.CUSTOM_STATISTICS_STOREPROC
  )
}
/**
 * To load the SQL query results metada.
 * @param {*} query 
 */
export function loadColumns(query) {
  query = btoa(query); //IE 10 and above
  return axiosGet(
    Constants.LOAD_COLUMNS, `query=${query}`
  )
}
/**
 * To load the displayformats based on the statisticcategoryId.
 * @param {*} statisticsCategoryId 
 */
export function getDisplayformats(statisticsCategoryId) {
  return axiosGet(
    Constants.DISPLAY_FORMATS, `statisticCategoryId=${statisticsCategoryId}`
  )
}
  // export function getStatisticItems(id) {
  //   return axiosGet(
  //     Constants.DATA_METRICS_ITEMS+'/'+id
  //   )
  // }
  // export function getStatisticFunctions(id) {
  //   return axiosGet(
  //     Constants.DATA_METRICS_FUNCTIONS+'/'+id
  //   )
  // }

