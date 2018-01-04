import _ from 'lodash';
import * as dashboardService from '../../../api/dashboard.service';
import WidgetType from '../../../lib/enums/widget-type.enum';
import PictureStretchEnum from '../../../lib/enums/picture-stretch-enum';
import ScrollTypeEnum from '../../../lib/enums/scroll-type-enum';
import * as dashboardUtils from '../../../lib/dashboard';
import * as WidgetData from '../../../lib/widget-data';
import * as  DateZone from '../../../lib/date-conversion';
import * as Constants from '../../../constants/constantValues';

export const USER_SLIDER_DASHBOARDS = "USER_SLIDER_DASHBOARDS"
export const UPDATE_WIDGET = "UPDATE_WIDGET"

export function getUserDashboardsAction(widgetType) {
    //TODO Need to get user ID based on login user id 

    let userId = 1;
    return (dispatch, getState) => {
        dashboardService.getSliderDashboards(userId).then(function (response) {

            if (response.status === 200) {
                let dashboards = _.map(response.data, (dashboard) => {
                    return dashboardUtils.dashboard(dashboard)
                });

                dispatch({
                    type: USER_SLIDER_DASHBOARDS,
                    dashboards
                });

            }
        });
    }
}

export function pullDashboardDataAction(dashboardId, widgetId) {
    return (dispatch, getState) => {
        let { widgets } = _.find(getState().sliderDashboard.dashboards, (dashboard) => dashboard.Id === dashboardId);
        let widget = _.find(widgets, (widget) => widget.id === widgetId);

        switch (widget.widgetType) {
            case WidgetType.Clock:
                dispatch({
                    type: UPDATE_WIDGET,
                    widget
                })
                break;

            default:

                dashboardService.getWidgetData(dashboardId, widgetId).then((response) => {
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
                                    widget.pictureStretch = response.data.wps == 1 ?
                                        { value: PictureStretchEnum.None, label: 'None' } :
                                        { value: PictureStretchEnum.Fill, label: 'Fill' };
                                break;
                            case WidgetType.Text:
                                let scrollType = { value: ScrollTypeEnum.None, label: 'No Scroll' };
                                switch (response.data.twrst) {
                                    case ScrollTypeEnum.LeftToRight:
                                        scrollType = { value: ScrollTypeEnum.LeftToRight, label: 'Left-Right' };
                                        break;
                                    case ScrollTypeEnum.RightToLeft:
                                        scrollType = { value: ScrollTypeEnum.RightToLeft, label: 'Right-Left' };
                                        break;
                                    case ScrollTypeEnum.TopToBottom:
                                        scrollType = { value: ScrollTypeEnum.TopToBottom, label: 'Top-Bottom' };
                                        break;
                                    case ScrollTypeEnum.BottomToTop:
                                        scrollType = { value: ScrollTypeEnum.BottomToTop, label: 'Bottom-Top' };
                                        break;
                                    default:
                                        scrollType = { value: ScrollTypeEnum.None, label: 'No Scroll' };

                                }


                                widget.displayValue = response.data.wrdv,
                                    widget.scrollSpeed = response.data.twrd,
                                    widget.scrollType = scrollType
                                break;
                            case WidgetType.Combo:
                                let i = 0, j = 0;
                                for (i = 0; i < response.data.wrgd.length; i++) {
                                    for (j = 0; j < response.data.wrgd[i].length; j++) {
                                        if (widget.appliedSettings.dataMetrics.statisticCategory == StatisticCategory.Custom) {
                                            let colummCheck = widget.matrix[0][j];
                                            if (Constants.DateTypes.indexOf(colummCheck.dataType) == 1 && colummCheck.dateFormat) {
                                                response.data.wrgd[i][j].gddv = DateZone.getDateBasedOnFormats(new Date(response.data.wrgd[i][j].gddv), widget.matrix[0][j].dateFormat);
                                            }
                                            else if (Constants.NumericTypes.indexOf(colummCheck.dataType) != -1 && colummCheck.showZeroValues) {
                                                response.data.wrgd[i][j].gddv =  response.data.wrgd[i][j].gddv ?  response.data.wrgd[i][j].gddv: "0"
                                            }
                                        }
                                        widget.matrix[i + 1][j].displayValue = response.data.wrgd[i][j].gddv;
                                        widget.matrix[i + 1][j].value = response.data.wrgd[i][j].gdv;
                                        const { widgetBody } = widget.matrix[i + 1][j] || {};
                                        if (widgetBody) {
                                            widgetBody.backgroundColor = response.data.wrgd[i][j].wrth && response.data.wrgd[i][j].wrth.thc ? response.data.wrgd[i][j].wrth.thc : widget.matrix[i + 1][j].widgetBody.backgroundColor;
                                        }
                                    }
                                }

                                break;
                        }
                        const { widgetBody } = widget || {};
                        widgetBody.backgroundColor = response.data.wrth && response.data.wrth.thc ? response.data.wrth.thc : widget.appliedBackgroundColor;


                        dispatch({
                            type: UPDATE_WIDGET,
                            widget
                        })
                    }
                });


                break;
        }
    }
}

export function refreshDashboardAction(dashboardId) {
    setInterval(
        pullDashboardDataAction(dashboardId),
        refreshInterval
    )
}

export const ACTION_HANDLERS = {
    [USER_SLIDER_DASHBOARDS]: (state, action) => {
        return Object.assign({}, state, {
            dashboards: action.dashboards
        })
    },
    [UPDATE_WIDGET]: (state, action) => {
        return Object.assign({}, state, {
            widget: action.widget
        })
    }
}

export default function SliderDashboardReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}

const initialState = {
    dashboards: []
};
