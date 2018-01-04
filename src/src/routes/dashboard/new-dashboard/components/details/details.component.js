import React from 'react';
import _ from 'lodash';
import CustomSelect from '../../../../../components/custom-dropdown';
import ToggleSwitch from '../../../../../components/toggle-switch';
import './styles.css';

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        if (!(props.categories && props.categories.length)) {
            this.props.updateCategories();
        }
        this.state = {
            ...props
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        })
    }

    render() {
        return (
            <div className='row details-bar'>
                <div className='details-block'>
                    <label className="label-inline"> Dashboard Name:  </label>
                    <input type='text' className='form-control' value={this.state.name} onChange={(e) => this.props.updateDashboardProperty("name", e.target.value)} />
                </div>
                <div className='details-block'>
                    <label className="label-inline"> Mark as default:  </label>
                    <ToggleSwitch
                        className="form-control"
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.state.isDefault}
                        onChange={(e) => this.props.updateDashboardProperty("isDefault", e)}
                    />
                </div>
                <div className='details-block'>
                    <label className="label-inline"> Mark as Global:  </label>
                    <ToggleSwitch
                        className="form-control"
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.state.isGlobal}
                        onChange={(e) => this.props.updateDashboardProperty("isGlobal", e)}
                    />
                </div>
                <div className='details-block'>
                    <label className="label-inline"> Category:  </label>
                    <CustomSelect
                        name="form-field-name"
                        options={this.state.categories}
                        value={this.state.category}
                        placeholder="Select Category"
                        onChange={(e) => this.props.updateDashboardProperty("category", e)}
                    />
                </div>
                {/*<div className='details-block'>
                    <label className="label-inline"> Add category:  </label>
                    <i className='fa fa-plus-circle'></i>
                </div>*/}
                <div className='details-block'>
                    <button type="button" className=" btn btn-sm btn btn-primary btn-block" onClick={() => this.state.id ? this.props.updateDashboard() : this.props.saveDashboard()}>
                     {this.state.id ? 'Update Dashboard' : 'Save Dashboard'}
                    </button>
                </div>
            </div>
        )
    }
}
