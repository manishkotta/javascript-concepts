import { connect } from 'react-redux'
import * as Reducer from '../reducers/preview-dashboard.reducer';
import * as LocMan from '../../../../localization/localization.manager';
import { PageEnums } from '../../../../localization/collection';

import PreviewDashboard from '../components/preview-dashboard.component'

const mapDispatchToProps = (dispatch) => {
  return {
    GetUserDashboardById: (dashboardId) => {
      dispatch(Reducer.getUserDashboardByIdAction(dashboardId))
    },
    ResetDashboard: () => {
      dispatch(Reducer.ResetDashboard());
    }
  }

}

const mapStateToProps = (state) => {
  return {
    previewDashboard: state.previewDashboard,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.PREVIEW_DASHBOARD)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDashboard)
