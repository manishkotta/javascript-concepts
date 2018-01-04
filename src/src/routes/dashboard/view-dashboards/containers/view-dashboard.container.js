import { connect } from 'react-redux'
import * as Reducer from '../reducers/view-dashboard.reducer';
import * as LocMan from '../../../../localization/localization.manager';
import { PageEnums } from '../../../../localization/collection';

import ViewDashboard from '../components/view-dashboard.component'

const mapDispatchToProps = (dispatch) => {
  return {
    GetUserDashboardById: (dashboardId, isFromEdit) => {
      dispatch(Reducer.getUserDashboardByIdAction(dashboardId, isFromEdit))
    },
    PullData: (dashboardId, widgetId, isFromEdit) => {
      dispatch(Reducer.pullDashboardDataAction(dashboardId, widgetId, isFromEdit));
    },
    ResetDashboard: () => {
      dispatch(Reducer.ResetDashboard());
    }
  }

}

const mapStateToProps = (state) => {
  return {
    viewDashboard: state.viewDashboard,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.VIEW_DASHBOARD)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDashboard)
