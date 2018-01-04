import React from 'react'
import {
  
  dispatch
} from 'react'
import { Field, reduxForm } from 'redux-form'
import LogoImg from 'public/images/Login_01.png'
const LoginForm = (props) => {
  const {  pristine, reset, submitting } = props
  return (
    
   <div className="Container" style={{maxWidth:'600px',margin:'60px auto'}}>
      <div>
       {props.login.showSuccessResponseMessage ? 
      <div className="alert alert-success fade in">
    <a href="#" className="close" data-dismiss="alert">&times;</a>
    <strong>Success!</strong> Your message has been sent successfully.
</div>:  null}
      </div>
    
    <form className="well form-horizontal" style={{backgroundColor:'skyblue'}}  onSubmit={()=>handleSubmit()}>
      <h1 >LOGIN</h1>
      
      <div className="form-group">
        <label className="control-label">User Name</label>
        
          <Field name="UserName"  className = "form-control"  component="input" type="text" placeholder="User Name"/>
       
      </div>
      <div className="form-group">
        <label className="control-label">Password</label>
        
          <Field name="Password"  className = "form-control"  component="input" type="text" placeholder="Password"/>
        
      </div>
     
      <div>
       
       <input type="button" className= "alert alert-success" onClick= {()=> props.handlePost()} value='submit' />
       
        <button type="button" className = "alert alert-danger" disabled={pristine || submitting} onClick={reset}>Cancel</button>
      </div>
    </form>
   
    </div> 
  )
}

export default LoginForm;