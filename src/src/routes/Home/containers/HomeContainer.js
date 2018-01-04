import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Home from '../components/Home'
import {ClickHereReducer} from '../Reducers/home.reducer'

 const mapDispatchToProps  = (dispatch) => {
  return {
   clickHere: () => {
		dispatch(ClickHereReducer())
	}
  
  }
  
}

const mapStateToProps = (state) => ({
  home:state.home
 })

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
   form: 'Home'  // a unique identifier for this form
 })(Home))
