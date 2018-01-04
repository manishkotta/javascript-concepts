import React from 'react'
import Dashboard from '../../dashboard/dashboard-component';
import _ from 'lodash';

export default class SliderDashboard extends React.Component {
	constructor(props) {
		super(props);
		const { sliderDashboard } = props;
		this.state = {
			sliderDashboard
		}
	}

	componentWillReceiveProps(nextProps) {
		//this.props.GetUserDashboards();
		const { sliderDashboard } = nextProps;
		this.setState({
			sliderDashboard
		});
	}
	componentWillMount(props) {
		this.props.GetUserDashboards();
	}
	render() {
		return (
			<div className="row">
				{
					this.state && this.state.sliderDashboard && this.state.sliderDashboard.dashboards &&
					<div className="slider">
						{
							_.map(this.state.sliderDashboard.dashboards, (dashboard) =>
								<div key={`dashboard-${dashboard.Id}`}>
									<Dashboard 
										key={dashboard.Id} {...dashboard} 
										enableRefresh={true} 
										pullData={(dashboardId, widgetId) => this.props.PullData(dashboardId, widgetId)} />
								</div>
							)
						}
					</div>
				}
			</div>
		)
	}

}
