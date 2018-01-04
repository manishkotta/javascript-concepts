import React from 'react';
import _ from 'lodash';
import { Tab, Tabs, Nav, NavItem, Row, Col } from 'react-bootstrap';
//import ReactScrollbar from 'react-scrollbar-js';
import FilterTab from './filter-tab.component';
import AppliedFilters from '../../../../../components/Tabs/applied.filters';
import { Scrollbars } from 'react-custom-scrollbars';



export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        const firstFilter = _.first(props.filters.boxFilters);
        firstFilter.IsActive = true;
        this.state = {
            filterToShow: firstFilter,
            filters: props.filters.boxFilters,
            IsEditMode: false,
            filterIdToEdit: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        let filterToShow = _.find(nextProps.filters.boxFilters, (filter)=>filter.Key === this.state.filterToShow.Key);
        _.map(nextProps.filters.boxFilters, (f) => f.IsActive = (f.Key === filterToShow.Key));
        this.setState({
            filters: nextProps.filters.boxFilters,
            filterToShow
        });
    }

    render() {
        return (
            <div>
                <div id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        {this.renderFilterNavBar()}
                        <Col sm={9} md={9} >
                            <Row className="clearfix">
                                {this.renderFilterTab()}

                            </Row>
                            <div className="col-md-12" style={{ borderTopStyle: 'outset', borderTopColor: '#cccccc', marginTop: '20px' }}>
                                <Row className="clearfix"  >
                                    <AppliedFilters
                                        filters={this.props.widget.appliedSettings.filters}
                                        renderEdit={this.renderEdit.bind(this)}
                                        deleteFilter={this.deleteFilter.bind(this)}
                                    />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }

    renderFilterNavBar() {
        return (
            <Col sm={3} md={3}>
                <input type='text' className="form-control serach" ref="search" placeholder=" &#xF002; Search" onChange={(e) => this.updateFiltersNavbar()} />
                <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={800} >
                    <ul className="filter-menu">
                        {
                            this.state.filters.map(
                                (filter) =>
                                    <li className={this.IsActive(filter.IsActive)} key={filter.Key} onClick={this.reRenderFilterTab.bind(this, filter, false)} >
                                        {filter.Type}
                                    </li>
                            )
                        }
                    </ul>
                </Scrollbars>
            </Col>
        );
    }

    IsActive(isActive) {
        return isActive ? "filter-menu-item active" : "filter-menu-item";
    }

    renderFilterTab() {
        return (
            this.state.filterToShow.IsActive &&
            <FilterTab {...this.state.filterToShow}
                filterId={this.state.filterIdToEdit}
                isEditMode={this.state.IsEditMode}
                widgetId={this.props.widget.id}
                addFilter={this.props.AddFilter.bind(this)}
                updateFilter={this.props.UpdateFilter.bind(this)}
                resetEdit={this.resetEdit.bind(this)}
                GetACDAgents={this.props.GetACDAgents.bind(this)}
                GetAgents={this.props.GetAgents.bind(this)}
                GetBreakTypes={this.props.GetBreakTypes.bind(this)}
                GetDirectories={this.props.GetDirectories.bind(this)}
                GetCampaigns={this.props.GetCampaigns.bind(this)}
                GetCompletionCodes={this.props.GetCompletionCodes.bind(this)}
                GetSites={this.props.GetSites.bind(this)}
                GetTrunkGroups={this.props.GetTrunkGroups.bind(this)}
                GetTeams={this.props.GetTeams.bind(this)}
                GetQueues={this.props.GetQueues.bind(this)}
                GetEmailSMS={this.props.GetEmailSMS.bind(this)}
                GetCallTypes={this.props.GetCallTypes.bind(this)} />

        );
    }

    renderEdit(appliedFilter) {
        const filter = _.cloneDeep(_.find(this.state.filters, (filter) => filter.Key === appliedFilter.key));
        filter.Controls = _.cloneDeep(appliedFilter.data);
        filter.IsActive = true;
        this.setState({
            filterIdToEdit: appliedFilter.id
        });
        this.reRenderFilterTab(filter, true);
    }

    resetEdit(filterType) {
        this.setState({
            IsEditMode: false,
            filterToShow: _.find(this.state.filters, (filter) => filter.Type === filterType)
        });
    }

    reRenderFilterTab(filter, isEditMode) {
        _.map(this.state.filters, (f) => f.IsActive = (f.Key === filter.Key));
        this.setState({
            IsEditMode: isEditMode,
            filterToShow: filter,
            filters: _.cloneDeep(this.state.filters)
        })
    }

    updateFiltersNavbar() {
        const searchText = this.refs['search'].value.toLowerCase();
        this.setState({
            filters: _.filter(this.props.filters.boxFilters, function (filterItem) {
                return filterItem.Type.toLowerCase().indexOf(searchText) > -1;
            })
        });
    }

    deleteFilter(id) {
        this.props.DeleteFilter(this.props.widget.id, id);
    }
}
