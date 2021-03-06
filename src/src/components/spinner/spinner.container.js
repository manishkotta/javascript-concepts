import { connect } from 'react-redux';

import SpinnerComponent from "./spinner.component";
import * as Reducer from './spinner.reducer';

const mapDispatchToProps = (dispatch) => {
  return {
    StartPendingTask: () => {
      dispatch(Reducer.BeginTask())
    },
    StopPendingTask: () => {
      dispatch(Reducer.EndTask())
    },
    StopAllPendingTasks: () => {
      dispatch(Reducer.EndAll())
    }
  }
}

const mapStateToProps = (state) => {
return {
    spinner: state.spinnerStore,
    // l : LocMan.getTranslationDataForPage(state.localizationStore.data,state.localizationStore.isRtl, LocMan.PageKeysCol.NOTIFICATIONS)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpinnerComponent)
