import { injectReducer } from '../../../store/reducers'
import requiresAuth from '../../../authentication/authenticated.component';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const previewDashboardForm = require('./containers/preview-dashboard.container').default
      const reducer = require('./reducers/preview-dashboard.reducer').default
      injectReducer(store, { key: 'previewDashboard', reducer })
      cb(null, requiresAuth(previewDashboardForm))
    }, 'previewDashboard')
  }
})
