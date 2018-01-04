import { injectReducer } from '../../../store/reducers'
import requiresAuth from '../../../authentication/authenticated.component';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const viewDashboardForm = require('./containers/view-dashboard.container').default
      const reducer = require('./reducers/view-dashboard.reducer').default
      injectReducer(store, { key: 'viewDashboard', reducer })
      store.dispatch(store.getState().notificationStore.ClearNotifications())
      cb(null, requiresAuth(viewDashboardForm))
    }, 'viewDashboard')
  }
})
