import React from 'react';
import Dashboard from '../../../dashboard/dashboard-component';
import { browserHistory, Router } from 'react-router';

let layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 }
];
export default class PreviewDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      ...props
    }
  }
  componentWillMount() {
    this.props.ResetDashboard();
    this.props.GetUserDashboardById(this.state.id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps
    });
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  navigateBack(){
    if(this.state.id && this.state.id != "undefined"){
     this.props.ResetDashboard();
    }
    return browserHistory.goBack();
  }
  render() {
    return (
        <div>
          <div onClick={()=> this.navigateBack()} id="corner-triangle" className="pointer">
	          <div className="corner-triangle-text text-capitalize">
              <a target="_blank">
                <i className="fa fa-angle-down fa-rotate-45" aria-hidden="true"></i>
              </a>
            </div>
          </div>
            { this.state.previewDashboard.dashboard &&
                <div key={`dashboard-${this.state.previewDashboard.dashboard.Id}`}>
                    <Dashboard key={this.state.previewDashboard.dashboard.Id} l={this.props.l} {...this.props.previewDashboard.dashboard} static={true} enableRefresh={true}  />
                </div>
            }
        </div>
    )
  }
}
