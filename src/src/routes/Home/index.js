import { injectReducer } from '../../store/reducers'
import requiresAuth from '../../authentication/authenticated.component';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/slider.container').default
      const sliderReducer = require('./Reducers/slider.reducer').default
      injectReducer(store, { key: 'sliderDashboard', reducer:sliderReducer })
      cb(null, requiresAuth(Home))
    }, 'sliderDashboard')
  }
})

