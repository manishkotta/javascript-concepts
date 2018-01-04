import _ from 'lodash';

const UPDATE_WIDGET = "UPDATE_EDITOR_WIDGET";
const UPDATE_WIDGETS = "UPDATE_EDITOR_WIDGETS";
const CLEAR_EDITOR = "CLEAR_EDITOR";

export function ToggleEditorMenuAction(widget) {
    return (dispatch, getState) => {
        let _initialState = _.cloneDeep(initialState)
        dispatch({
            type: CLEAR_EDITOR,
            _initialState
        });

        let widgets = getState().newdashboard.widgets;
        _.map(widgets, (w) => w.showEditor = (!w.showEditor && w.id === widget.id));

        let currentWidget = _.cloneDeep(_.find(widgets, (w) => w.id === widget.id));

        //let widgets = getState().editor.widgets;

        if (!currentWidget) {
            // currentWidget = widget;
            currentWidget.showEditor = !currentWidget.showEditor;
            widgets.push(currentWidget);
        }

        dispatch({
            type: UPDATE_WIDGETS,
            widgets
        });

        dispatch({
            type: UPDATE_WIDGET,
            widget: currentWidget
        });
    }
}

export function CollapseAllEditorMenusAction() {
    return (dispatch, getState) => {
        let widgets = getState().editor.widgets;
        _.forEach(widgets, (widget) => widget.showEditor = false);

        dispatch({
            type: UPDATE_WIDGETS,
            widgets
        });

        let currentWidget = getState().editor.widget;
        currentWidget.showEditor = false;
        dispatch({
            type: UPDATE_WIDGET,
            widget: currentWidget
        });
    }
}

export function DeleteWidgetAction(widgetId) {
    return (dispatch, getState) => {
        let widgets = getState().editor.widgets;
        widgets = _.filter(widgets, (widget) => widget.id !== widgetId);
        dispatch({
            type: UPDATE_WIDGETS,
            widgets
        });
        if (getState().editor.widget.id === widgetId) {
            let widget = getState().editor.widget;
            widget.showEditor = false;
            //dispatch({
            //    type: UPDATE_WIDGET,
            //    widget
            //});
            dispatch({
                type: UPDATE_WIDGET,
                widget: {}
            });
        }
    }
}

export function ClearEditor() {
    let initialState = _.cloneDeep(initialState)
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_EDITOR,
            initialState
        });
    }
}

export function UpdateEditorWidget(widget) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_WIDGET,
            widget
        });
    }
}

export const ACTION_HANDLERS = {
    [UPDATE_WIDGET]: (state, action) => {
        return Object.assign({}, state, {
            widget: action.widget
        })
    },
    [UPDATE_WIDGETS]: (state, action) => {
        return Object.assign({}, state, {
            widgets: action.widgets
        })
    },
    [CLEAR_EDITOR]: (state, action) => {
        return Object.assign({}, state, action.initialState)
    },
}

const initialState = {
    widgets: [],
    widget: {},
    ToggleEditorMenuAction,
    CollapseAllEditorMenusAction,
    DeleteWidgetAction,
    ClearEditor
};

export default function EditorReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}