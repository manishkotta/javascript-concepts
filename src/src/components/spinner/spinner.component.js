import React from 'react'
import _ from 'lodash';
import './custom-spinner.css'

export default class Dashboard extends React.Component {

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    render() {
        return (
            <div>
                {(this.props.spinner.pendingTasks > 0) &&
                    <div id="preloadSpinner"  >
                        <div id="spinnerGlobal"></div>
                        <span className="spinnerGlobalText">Loading Data</span>
                    </div>
                }
            </div>
        )
    }
}

