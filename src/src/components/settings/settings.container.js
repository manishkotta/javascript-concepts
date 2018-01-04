import { connect } from 'react-redux';
import Settings from "./settings.component";
import * as LocMan from '../../localization/localization.manager';
import {PageEnums} from '../../localization/collection';

import * as Reducer from './settings.reducer';

const mapDispatchToProps = (dispatch) => {
    return {
        ToggleSettingsMenu: (widget) => {
            dispatch(Reducer.ToggleSettingsMenuAction(widget))
        },
        CollapseAllSettingsMenus: () => {
            dispatch(Reducer.CollapseAllSettingsMenusAction())
        }
    }
}


const mapStateToProps = (state) => ({
    settings: state.settings,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.DATA_METRICS)  
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)  