import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginForm = require('./containers/LoginFormContainer').default
      const reducer = require('./reducers/LoginFormReducer').default
      injectReducer(store, { key: 'login', reducer })
      cb(null, LoginForm)
    }, 'login')
  }
})
