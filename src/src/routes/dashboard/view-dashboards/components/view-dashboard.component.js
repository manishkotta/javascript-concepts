import React from 'react';
import Dashboard from '../../../dashboard/dashboard-component';
import { browserHistory, Router } from 'react-router';

let layout = [
  { i: 'a', x: 0, y: 0, w: 2, h: 2 }
];
export default class ViewDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      ...props
    }
  }
  componentWillMount() {
    // if(this.state.id && this.state.id != "undefined")
    this.props.ResetDashboard();
    this.props.GetUserDashboardById(this.state.id, this.state.viewDashboard.dashboard.isFromEdit);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  goBack() {
    if (this.state.id && this.state.id != "undefined") {
      this.props.ResetDashboard();
    }
    return browserHistory.goBack()
    //this.props.ResetDashboard();
    // browserHistory.push(`/dashboard/new`);
  }
  render() {
    return (
      <div>
        <div onClick={() => this.goBack()} id="corner-triangle" className="pointer">
          <div className="corner-triangle-text text-capitalize">
            <a target="_blank">
              <i className="fa fa-angle-down fa-rotate-45" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        {/* <button className="back-btn" onClick={()=> this.goBack()}><i className="fa fa-angle-down fa-rotate-45" aria-hidden="true"></i></button> */}
        {
          
          this.state.viewDashboard.dashboard &&
          <div key={`dashboard-${this.state.viewDashboard.dashboard.Id}`}>
            <Dashboard key={this.state.viewDashboard.dashboard.Id} l={this.props.l} {...this.props.viewDashboard.dashboard} static={true} enableRefresh={true} pullData={(dashboardId, widgetId, isFromEdit) => this.state.PullData(dashboardId, widgetId, this.state.viewDashboard.dashboard.isFromEdit)} />
          </div>
        }
      </div>
    )
  }
}
