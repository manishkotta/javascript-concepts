import { connect } from 'react-redux';

import AppComponent from './app.component';
import * as LocalizationReducer from '../localization/localization.reducer';
import * as LocMan from '../localization/localization.manager';
import {PageEnums} from '../localization/collection';

const mapDispatchToProps = (dispatch) => {
  return {
    GetLocalizationData: (culture) => {
      dispatch(LocalizationReducer.GetLocalizationData(culture));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    app: state,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.NEW_DASHBOARD)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)