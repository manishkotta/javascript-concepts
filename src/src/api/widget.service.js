import Constants from "../constants/apiUrl";

import * as service from "./service";


export function getWidgetPreviewData(widgetData, dashboardId) {
    var url = Constants.WIDGET_PREVIEW;
    if (dashboardId && dashboardId != "undefined")
        url = url + '/' + dashboardId;
    else
        url = url + '/-1';

    return service.axiosPost(
        url, widgetData
    )
}
