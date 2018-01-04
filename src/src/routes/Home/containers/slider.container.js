import { connect } from 'react-redux'


import * as Reducer from '../Reducers/slider.reducer';
import SliderDashboard from '../components/slider-dashboard.component'


const mapDispatchToProps = (dispatch) => {
  return {
    GetUserDashboards: () => {
      dispatch(Reducer.getUserDashboardsAction())
    },
    PullData: (dashboardId, widgetId) => {
      dispatch(Reducer.pullDashboardDataAction(dashboardId, widgetId));      
    }
  }
}


const mapStateToProps = (state) => ({
  sliderDashboard: state.sliderDashboard
})

export default connect(mapStateToProps, mapDispatchToProps)(SliderDashboard)


