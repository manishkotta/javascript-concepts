import { connect } from 'react-redux';

import StylesEditor from "./styles-editor.component";
import * as LocMan from '../../localization/localization.manager';
import { PageEnums } from '../../localization/collection';
import * as Reducer from './styles-editor.reducer';

const mapDispatchToProps = (dispatch) => {
    return {
        ToggleEditorMenu: (widget) => {
            dispatch(Reducer.ToggleEditorMenuAction(widget))
        },
        CollapseAllEditorMenus: () => {
            dispatch(Reducer.CollapseAllEditorMenusAction())
        },
        UpdateEditorWidget: (widget) => {
            dispatch(Reducer.UpdateEditorWidget(widget))
        }
    }
}


const mapStateToProps = (state) => ({
    editor: state.editor,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.WIDGET_STYLES)
})

export default connect(mapStateToProps, mapDispatchToProps)(StylesEditor)  