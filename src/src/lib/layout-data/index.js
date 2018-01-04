import WidgetType from '../enums/widget-type.enum';

/**
 * 
 * @param {*} widgetType 
 * @param {*} index 
 * @param {*} maxYLayout 
 */
export function GetDefaultLayout(widgetType, widgetId, maxYLayout) {
    let x_pos = 0, y_pos = maxYLayout ? maxYLayout.y : 0;
    let layoutIndex = `${widgetId}`;
    switch (widgetType) {
        case WidgetType.Box:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 1,
                h: 3
            }
            break;
        case WidgetType.Progress:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 2,
                h: 6
            }
            break;
        case WidgetType.Speedo:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 2,
                h: 5
            }
            break;
        case WidgetType.Pie:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 2,
                h: 8
            }
            break;
        case WidgetType.Bar:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 3,
                h: 8
            }
            break;
        case WidgetType.Combo:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 3,
                h: 6
            }
            break;
        case WidgetType.Text:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 1,
                h: 2
            }
            break;
        case WidgetType.Picture:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 1,
                h: 3
            }
            break;
        case WidgetType.Clock:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 2,
                h: 6
            }
            break;
        case WidgetType.CircularProgress:
            return {
                i: layoutIndex,
                x: x_pos,
                y: y_pos,
                w: 2,
                h: 8
            }
            break;

    }

}