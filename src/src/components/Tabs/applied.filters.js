import React from 'react';
import _ from 'lodash';
//import ReactScrollbar from 'react-scrollbar-js';
import { Scrollbars } from 'react-custom-scrollbars';

export default class AppliedFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            ...nextProps
        })
    }

    render() {
        return (
            <div className="applied-filters">

                <div className="row"  >
                    <div className="col-md-3" >
                        <strong>Applied filters</strong>   </div>
                    <div className="col-md-offset-5 col-md-3" >

                        <input type="button" className=" btn btn-sm btn btn-primary btn-block" value="Apply settings" />
                    </div>
                </div>
                
                    {_.map(this.state.filters, filter =>
                        this.renderFilter(filter)
                    ) }
               
            </div>
        );
    }
    renderFilter(filter) {
        if (filter) {
            return (
                <div key={filter.type.toLowerCase()+ "-" + filter.id} className='applied-filter-item row' >                    
                    <div className="col-md-8" >
                        {filter.desc}
                    </div>
                    <div className="col-md-1">
                        <i className="fa fa-edit applied-filter-icon" onClick={this.editFilter.bind(this, filter.id)}></i>
                    </div>
                    <div className="col-md-1">
                        <i className="fa fa-trash-o applied-filter-icon" onClick={this.deleteFilter.bind(this, filter.id)}></i>
                    </div>
                </div>
            )
        }
    }

    editFilter(id) {
        const filterToEdit = _.find(this.state.filters, (filter) => filter.id === id);
        this.props.renderEdit(filterToEdit);
    }

    deleteFilter(id){
        this.props.deleteFilter(id);
    }
}