import Constants from "../constants/apiUrl";
import * as service from "./service";

export function getSliderDashboards(userId) {
    return service.axiosGet(
        Constants.SLIDER_DASHBOARD, userId
    )
}

export function getWidgetData(dashboardId, widgetId) {
    return service.axiosGet(
        `${Constants.WIDGET_DATA}/${dashboardId}/${widgetId}`
    )
}
export function viewWidgetData(dashboardId, widgetId) {
    return service.axiosGet(
        `${Constants.WIDGET_VIEW_DATA}/${dashboardId}/${widgetId}`
    )
}


export function getDashboardCategories() {
    return service.axiosGet(
        `${Constants.DASHBOARD_CATEGORIES}`
    )
}

export function getDashboardsByCategory(categoryId, myDashboards, globals, pageNumber, pageSize, sortColumn, sortingOrder) {
    return service.axiosGet(
        `${Constants.GET_DASHBOARDS_BY_CATEGORY}/${categoryId}/${myDashboards}/${globals}/${pageNumber}/${pageSize}/${sortColumn}/${sortingOrder}`
    )
}
export function getDashboardById(dashboardId, toEdit) {
    return service.axiosGet(
        `${Constants.GET_DASHBOARD_BY_ID}/${dashboardId}/${toEdit}`
    )
}
export function getDefaultRefreshInterval() {
    return service.axiosGet(
        `${Constants.DEFAULT_REFRESHINTERVAL}`
    )
}
export function saveDashboard(dashboard) {
    return service.axiosPost(
        Constants.SVAE_DASHBOARD, dashboard
    )
}

export function deleteDashboard(dashboardId ) {
    return service.axiosPost(
        `${Constants.DELETE_DASHBOARD}/${dashboardId}`
        
    )
}

export function pictureSave(pictureData) {
    return  service.axiosPost(Constants.PICTURE_SAVE, pictureData)
}

export function updateDashboard(dashboard) {
    return service.axiosPost(
        Constants.UPDATE_DASHBOARD, dashboard
    )
}
export function testThreshold(threshold) {
    return service.axiosPost(
        Constants.TEST_THRESHOLD, threshold
    )
}