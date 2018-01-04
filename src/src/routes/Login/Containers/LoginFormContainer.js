import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import LoginForm from "../Components/LoginForm"
import * as Reducer from "../reducers/LoginFormReducer"
import {  browserHistory,  Router } from 'react-router'

const mapDispatchToProps = (dispatch) => {
  return {
    handlePost: (loginDetails) => {
      dispatch(Reducer.saveLogin(loginDetails))
    }
  }
}

const mapStateToProps = (state) => ({
  formData: state.simpleLogin,
  login: state.login
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
