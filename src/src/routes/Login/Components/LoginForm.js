import React from 'react'
import { dispatch } from 'react'
import { Field, reduxForm } from 'redux-form'
import LogoImg from 'public/images/Login_01.png'
import { browserHistory, Router } from 'react-router'
import * as authMan from "../../../authentication/auth-manager";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		if (authMan.isAuthenticated()) {
			browserHistory.push('/dashboard/mydashboards')
		}
	}

	// componentWillReceiveProps(nextProps){
	// 	//TODO : handle login fail req
	// 		// debugger;
	// 		// browserHistory.push('/dashboard/mydashboards');
	// }
	
	componentDidMount() {
		this.refs.userName.value = 'Administrator'
	}

	_login() {
		this.props.handlePost(
			{
				userName: this.refs.userName.value,
				password: this.refs.password.value,
			}
		);
	}


	render() {
		return (
			<div className="container" style={{ marginTop: '100px' }}>
				<div className="row">
					<div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 hidden-xs">
						<img src={LogoImg} alt="CyDashboard" title="CyDashboard" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
						<div className="panel panel-default boxShadow">
							<div className="panel-heading">
								<h3 className="panel-title">CCA Sign In</h3>
							</div>
							<div className="panel-body">

								<div className="form-group">
									<input className="form-control" ref="userName" placeholder="Username" name="username" type="text" />
								</div>
								<div className="form-group">
									<input className="form-control" placeholder="Password" ref="password" name="password" type="password" />
								</div>
								<div className="form-group  col-md-offset-8  col-md-4 noPaddingRightLeft">
									<input className="btn btn-lg btn btn-primary btn-block" type="button" onClick={() => this._login()} value="Login" />
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginForm;
