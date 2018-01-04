//This file is not used 
import React from 'react';
import { Modal, ModalManager, Effect } from '../react-dynamic-modal';


class CustomModal extends React.Component {

	render() {
		const { text, onRequestClose, updateName, OnCancel } = this.props;
		return (

			<Modal
				onRequestClose={onRequestClose}
				effect={Effect.ScaleUp}
			>

				<div className="panel panel-default">
					<div className="panel-heading"> <strong className="">Save Dashboard</strong>

					</div>
					<div className="panel-body">
						<div className="form-horizontal" >
							<div className="form-group">
								<label className="col-md-offset-2 col-sm-offset-2 col-md-2 col-sm-3 control-label">Name</label>
								<div className="col-md-4 col-sm-9">
									<input type="text" className="form-control" id="dashboardName" placeholder="Dashboard name"
										onChange={(e) => this.props.UpdateDashboardProperty("name", e.target.value)}
										value={this.props.newDashboard.name}
									/>
								</div>
							</div>

							<div className="form-group last">
								<div className="col-sm-offset-5 col-sm-7">
									<button type="button" className="btn btn-primary btn-sm"
										onClick={() => { this.props.newDashboard.name.length > 0 ? this.props.SaveClick(true) : null }}
										disabled={this.props.newDashboard.name.length > 0 ? false : true}>
										Save Dashboard
										</button>
									<button type="button" className="btn btn-default btn-sm"
										onClick={OnCancel}>Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>

		);
	}

}

export default CustomModal