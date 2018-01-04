import { injectReducer } from '../../../store/reducers'
import requiresAuth from '../../../authentication/authenticated.component';
import { browserHistory } from 'react-router';
import LoginForm from '../../Login/Components/LoginForm'
export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      console.log('aaa getComponent ')
      const newDashboardForm = require('./containers/new-dashboard.container').default

      const newDashboardReducer = require('./reducers/new-dashboard.reducer').default
      injectReducer(store, { key: 'newdashboard', reducer: newDashboardReducer })

      const settingsReducer = require('../../../components/Settings/settings.reducer').default
      injectReducer(store, { key: 'settings', reducer: settingsReducer })

      const editorReducer = require('../../../components/styles-editor/styles-editor.reducer').default
      injectReducer(store, { key: 'editor', reducer: editorReducer })

      const clockReducer = require('../../../components/settings/clock-settings/clock-settings.reducer').default
      injectReducer(store, { key: 'clock', reducer: clockReducer })

      const myDashboardReducer = require('../../dashboard/my-dashboards/reducers/my-dashboard.reducer').default
      injectReducer(store, { key: 'myDashboard', reducer: myDashboardReducer })

      const viewDashboardReducer = require('../../dashboard/view-dashboards/reducers/view-dashboard.reducer').default
      injectReducer(store, { key: 'viewDashboard', reducer: viewDashboardReducer })

      cb(null, requiresAuth(newDashboardForm))
    }, 'newdashboard')
  },
  onEnter: (nextState, replace) => {
    const dataMetricsReducer = require('./components/data-metrics/data-metrics.reducer').default
    injectReducer(store, { key: 'dataMetrics', reducer: dataMetricsReducer })
    // replace({ pathname : '/login' })
    console.log('aaaonEnter ', nextState)
    // replace(`/login`)
    //store.dispatch(store.getState().dataMetrics.LoadDataMetricsMetaData())
  },
})

