import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import NotificationReducer from '../components/notifications/notification.reducer';
import LocalizationReducer from '../localization/localization.reducer';
import AppReducer from '../app/app.reducer';
import SpinnerReducer from '../components/spinner/spinner.reducer';
import * as Constants from '../constants/constantValues';
import LoginFormReducer from '../routes/Login/Reducers/LoginFormReducer';

export const makeRootReducer = (asyncReducers) =>
  (state, action) => {
    return combineReducers({
      toastr: toastrReducer,
      notificationStore: NotificationReducer,
      localizationStore: LocalizationReducer,
      spinnerStore: SpinnerReducer,
      user: LoginFormReducer,
      app: AppReducer,
      ...asyncReducers
    })(action.type == Constants.USER_LOGOUT ? undefined : state, action);
  }

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer