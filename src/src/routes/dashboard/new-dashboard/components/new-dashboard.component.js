import React from 'react'
import SettingsContainer from '../../../../Components/Settings';
import EditorContainer from '../../../../Components/styles-editor';
import WidgetsBar from './widgets-bar.component.js';
//import editBackground from 'public/Images/cytrack_logo.png'
var PropTypes = require('prop-types');
import _ from 'lodash';
import Dashboard from '../../dashboard-component';
import Details from './details';

export default class NewDashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			widgets: props.newDashboard.widgets,
			showIcons: true,
			isExpanded: true,
			id: props.params.id
		};
	}
	componentWillMount() {
		this.props.LoadDM(this.state.id)

	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			widgets: nextProps.newDashboard.widgets,
			showIcons: true
		});
		if (_.isEqual(nextProps.newDashboard.l, {}) && !_.isEqual(nextProps.l, {}))
			this.props.appendL(nextProps.l)
	}
	toggleWidgetMenu(isExpanded) {
		this.setState({ isExpanded: isExpanded });
	}
	render() {
		return (
			<div className='background' >
				<div>
					{!this.state.isExpanded &&
						<div onClick={this.toggleWidgetMenu.bind(this, true)} id="corner-triangle-right" className="pointer">
							<div className="corner-triangle-text-right text-capitalize">
								<a target="_blank">
									<i className="fa fa-angle-double-up fa-rotate-45" aria-hidden="true"></i>
								</a>
							</div>
						</div>

					}
					{this.state.isExpanded && <WidgetsBar toggleWidgetMenu={this.toggleWidgetMenu.bind(this)} {...this.props} />}
				</div>
				<div className="row">
					<div className="col-md-12  col-sm-12  col-xs-12">
						<Dashboard
							{...this.state} l={this.props.l}
							ToggleEditorMenu={(w) => this.props.ToggleEditorMenu(w)}
							ToggleSettingsMenu={(w) => this.props.ToggleSettingsMenu(w)}
							DeleteWidget={(w) => this.props.DeleteWidget(w)}
							PreviewActionPicture={(d, w) => this.props.PreviewActionPicture(d, w)}
							UpdateWidgetSize={this.props.UpdateWidgetSize}
							UpdateWidgetPosition={this.props.UpdateWidgetPosition}
							UpdateWidgetZIndex={this.props.UpdateWidgetZIndex}
						/>
						<SettingsContainer {...this.props} />
						<EditorContainer {...this.props} title="Theme First Editor" />
					</div>
				</div>
			</div>
		)
	}
}

NewDashboard.contextTypes = {
	t: PropTypes.func
};

