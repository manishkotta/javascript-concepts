import React from 'react';
import { Tab, Tabs, Nav, NavItem, Row, Col } from 'react-bootstrap';
import ReactScrollbar from 'react-scrollbar-js';
import DatePicker from 'react-bootstrap-date-picker';
import Scrollbars from  'react-scrollbar';
import CheckboxTree from '../check-box-tree';
import '../check-box-tree/checkbox-tree.css';
import _ from 'lodash';

const CheckBoxList = require('react-checkbox-list')

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        {
            value: 'phobos',
            label: 'Phobos'
        },
        { 
            value: 'deimos',
            label: 'Deimos',
            children: [
                {
                    value: 'phobos1',
                    label: 'Phobos1'
                },
                {
                    value: 'deimos2',
                    label: 'Deimos2'
                }
            ]
        },
    ],
}];

const options = [{ value: "Today", label: 'Today' }, { value: "Yesterday", label: 'Yesterday' }, { value: "This week", label: 'This week' }, { value: "Custom", label: 'Custom' }];
const rangeOptions = [{ value: "1", label: "Between" }, { value: "2", label: "Outside" }, { value: "3", label: "Less Than" }, { value: "4", label: "Greater Than" }, { value: "5", label: "Equals To" }];
const comparisionOptions = [{ value: "1", label: "Beginning With" }, { value: "2", label: "Containing" }, { value: "3", label: "Ending With" }, { value: "4", label: "Equals To" }];
var acdData = [{ value: 'Queueless ACD Calls', label: 'Queueless ACD Calls' },{ value: ' ACD Calls', label: ' ACD Calls' }, { value: ' Calls', label: 'Calls', checked: true }];
var callFlags = [
    { value: '1', label: 'Divert On Busy' },
    { value: ' 2', label: ' Divert On No Answer' },
    { value: ' 3', label: 'Divert Preset' },
    { value: '4', label: 'Pickup' },
    { value: ' 5', label: ' Group Pickup' },
    { value: ' 6', label: 'Speed Dial' },
    { value: '7', label: 'Unanswered' },
    { value: ' 8', label: ' Engaged' },
    { value: ' 9', label: 'Operator Involved' },
    { value: ' 10', label: 'Conference' }
];
var acdAgentsData = [
    { value: '1', label: 'Andrew' },
    { value: ' 2', label: ' Admin' },
    { value: ' 3', label: 'Smit', checked: true },
    { value: '4', label: 'Leo' },
    { value: ' 5', label: ' James' },
    { value: ' 6', label: 'John' },
    { value: '7', label: 'Lima    ' },
    { value: ' 8', label: ' Lessa' },
    { value: ' 9', label: 'Mark', checked: true }
];
var callerID = [  { value: '1', label: 'Begining With' },{ value: ' 2', label: ' Containing' }, { value: ' 3', label: 'Ending With' }, { value: '4', label: 'Equal To' }];
var callTypes = [
    { value: '1', label: 'Unknown' },
    { value: ' 2', label: ' Internal' },
    { value: ' 3', label: 'Outgoing', checked: true },
    { value: '4', label: 'Incoming' },
    { value: ' 5', label: ' Tandem' },
    { value: ' 6', label: 'Feature' }
];
var campaigns = [
    { value: '1', label: 'CSS-Preview' },
    { value: ' 2', label: ' CSS-Progressive' },
    { value: ' 3', label: 'CSS Support Callback' },
    { value: '4', label: 'CRM 2015 - Predictive' },
    { value: ' 5', label: ' CRM2015 - Pre-Emptive Mode' },
    { value: ' 6', label: 'CyTrack Demo - Callback' }
];
var completionCodes = [
    { value: '1', label: '* - Cash Collections' },
    { value: ' 2', label: ' * - Farming' },
    { value: ' 3', label: ' * - Hunting' },
    { value: '4', label: ' * - Non Sales' },
    { value: ' 5', label: ' A$ - 10 Dollars' },
    { value: ' 6', label: 'A$ - 100 Dollars' },
    { value: '1', label: '* - Cash Collections' },
    { value: ' 2', label: ' * - Farming' },
    { value: ' 3', label: ' * - Hunting' },
    { value: '4', label: ' * - Non Sales' },
    { value: ' 5', label: ' A$ - 10 Dollars' },
    { value: ' 6', label: 'A$ - 100 Dollars' }
];
var data = [{ value: ' 1', label: ' Exclude Items' }];
var dataDeleted = [{ value: ' 1', label: ' Show Deleted' }];
var breakTypesData = [
    { value: '1', label: 'Available on O/S Mobile' },
    { value: ' 2', label: ' Be Right Back' },
    { value: ' 3', label: ' Buddy training' },
    { value: '4', label: ' Client Action' },
    { value: ' 5', label: ' Demonstration ' },
    { value: ' 6', label: 'Dev Work' },
    { value: '7', label: 'Coffee' }
]
var filters = [{ Name: "Date", eventKey: "Date" }, { Name: "Extension", eventKey: "Extension" }, { Name: "Number Dialed", eventKey: "Number Dialed" }, { Name: "Cost", eventKey: "Cost" },
    { Name: "Access Code", eventKey: "Access Code" }, { Name: "Account Code", eventKey: "Account Code" }, { Name: "ACD", eventKey: "ACD" }, { Name: "Agent", eventKey: "Agent" },
    { Name: "ACD Agents", eventKey: "ACD Agents" }, { Name: "Authorization Code", eventKey: "Authorization Code" }, { Name: "Answer Time", eventKey: "Answer Time" },
    { Name: "Call Flag", eventKey: "Call Flag" }, { Name: "Break Type", eventKey: "Break Type" }, { Name: "Caller ID", eventKey: "Caller ID" }, { Name: "Call Type", eventKey: "Call Type" },
    { Name: "Carrier, Tier and Rate", eventKey: "Carrier, Tier and Rate" }, { Name: "Campaign", eventKey: "Campaign" }, { Name: "Directory", eventKey: "Directory" },
    { Name: "Completion Code", eventKey: "Completion Code" }, { Name: "Email/SMS", eventKey: "Email/SMS" }, { Name: "Duration", eventKey: "Duration" }, { Name: "Queue", eventKey: "Queue" },
    { Name: "Private Number", eventKey: "Private Number" }, { Name: "Times Of The Day", eventKey: "Times Of The Day" }, { Name: "Site", eventKey: "Site" }, { Name: "Trunk Line", eventKey: "Trunk Line" },
    { Name: "Teams", eventKey: "Teams" }, { Name: "Trunk Group", eventKey: "Trunk Group" }];


export default class FiltersTab extends React.Component {
    constructor(props) {
        super(props);
        const {filtersTabData} = props;
        this.state = {
            filtersTabData: filtersTabData,
            selectedFilters: filters,
            selectedFilterItem: '',

        }

    }


    updateFiltersTab(e) {
        const searchText = this.refs['search'].value.toLowerCase();
        this.setState({
            selectedFilters: _.filter(filters, function (filterItem) {
                return filterItem.Name.toLowerCase().indexOf(searchText) > -1;
            })
        });
    }

    render() {
        return (
            <Tab.Container id="left-tabs" defaultActiveKey="first">

                <Row className="clearfix">

                    <Col sm={3}>
                        {/* <DropdownSelect  labelKey="Name" options={filters || []}  onChange={(e) => { console.log('onchange', e) } } placeholder="Select..."  />*/}
                            <input type='text' className="form-control serach" ref="search" placeholder=" &#xF002; Search" onChange={ (e) => this.updateFiltersTab() } />
                        <ReactScrollbar style={{ height: '500px' }} >
                            <Nav bsStyle="pills" stacked>

                                {this.state.selectedFilters.map((item) => {
                                    return <NavItem eventKey={item.eventKey}> {item.Name}</NavItem>
                                }) }
                            </Nav>
                        </ReactScrollbar>
                    </Col>

                    <Col sm={8}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="Date">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selected
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                options={options}
                                                value={this.state.filtersTabData.Date.Selected}
                                                placeholder="Select a  dsfa Date" />

                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                            Start date
                                        </div>

                                        <div className='col-md-6' >
                                            <DatePicker className="dateField" placeholder='01/01/2016' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            End date
                                        </div>
                                        <div className='col-md-6' >
                                            <DatePicker placeholder="01/01/2017" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3' style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" onClick={(c) => props.filtersDataAdd(c) } value="Add" />
                                        </div>

                                    </div>

                                </div>

                            </Tab.Pane>

                            <Tab.Pane eventKey="Extension">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selecting Extentions
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={rangeOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" min="0" placeholder='0' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            And
                                        </div>
                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" min="0" placeholder='0' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Number Dialed">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Numbers Dialled
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={comparisionOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" placeholder = '0'/>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Cost">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selecting costs
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={rangeOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" min="0" placeholder='0' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            And
                                        </div>
                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" min="0" placeholder='0' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Access Code">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Access codes
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={comparisionOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" placeholder = '0'/>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Account Code">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Account codes
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={comparisionOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control"  placeholder='0'/>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="ACD">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-8">
                                            Calls made at the following ACD's
                                        </div>
                                    </div>


                                    <div className='row filtersBorder'>
                                        <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                            <CheckBoxList defaultData={acdData} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4'  style={{ marginTop: '10px' }}>


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Agent">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-12" >
                                            <p>Calls made at the following agents.
                                                When either cradle to grave or specific agents are chosen, the calls will be split across multiple entries and this may have an effect on the total number of calls displayed.</p>
                                        </div>

                                    </div>
                                    <div className='row'>

                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Cradle to grave on" }, { value: "2", label: "specific agents" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-2'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="ACD Agents">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-8">
                                            Calls made at the following ACD agents
                                        </div>
                                    </div>

                                    <Scrollbars style={{ height: '200px' }} >
                                        <div className='row'>
                                            <div className=' col-md-6'  style={{ marginLeft: '10px', overflowX: 'auto' }}>

                                                <CheckBoxList defaultData={acdAgentsData} />
                                            </div>
                                        </div>
                                    </Scrollbars >
                                    <div className='row'>
                                        <div className=' col-md-3' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-3' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {dataDeleted} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginBottom: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Authorization Code">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Authorization codes
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={comparisionOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" placeholder = '0' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Answer Time">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selecting Answer Times
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={rangeOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder="00:00:00" />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            And
                                        </div>
                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder="00:00:00"  />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Call Flag">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Calls with call flags of
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={callFlags}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Break Type">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-6">
                                            Calls made at the following break types
                                        </div>
                                    </div>

                                    <Scrollbars style={{ height: '200px' }} >
                                        <div className='row'>
                                            <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                                <CheckBoxList defaultData={breakTypesData} />
                                            </div>
                                        </div>
                                    </Scrollbars >
                                    <div className='row'>
                                        <div className=' col-md-4' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {dataDeleted} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Caller ID">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Caller ID
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={callerID}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" placeholder='0' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Call Type">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."

                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Calls with call types of
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={callTypes}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Carrier, Tier and Rate">
                                <div className='row filtersBorder'>
                                    <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                        <CheckBoxList defaultData={acdAgentsData} />
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Campaign">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            Calls made at the following campaigns
                                        </div>
                                    </div>
                                    <Scrollbars style={{ height: '150px' }} >
                                        <div className='row'>
                                            <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                                <CheckBoxList defaultData={campaigns} />
                                            </div>
                                        </div>
                                    </Scrollbars >

                                    <div className='row'>
                                        <div className=' col-md-4' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {dataDeleted} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Directory">
                                <div className='row filtersBorder'>
                                    <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                        <CheckBoxList defaultData={acdAgentsData} />
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Completion Code">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-6">
                                            Calls made at the following Completion Codes
                                        </div>
                                    </div>

                                    <Scrollbars style={{ height: '200px' }} >
                                        <div className='row'>
                                            <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                                <CheckBoxList defaultData={completionCodes} />
                                            </div>
                                        </div>
                                    </Scrollbars >
                                    <div className='row'>
                                        <div className=' col-md-4' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {dataDeleted} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Email/SMS">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-1">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-1">

                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "SMS" }, { value: "2", label: "Email" }, { value: "3", label: "Print" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Duration">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selecting durations
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={rangeOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder='00:00:00' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            And
                                        </div>
                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder='00:00:00' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Queue">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-8">
                                            Calls made at the following queues
                                        </div>
                                    </div>

                                    <Scrollbars style={{ height: '200px' }} >
                                        <div className='row '>
                                            <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                                <CheckBoxList defaultData={completionCodes} />
                                            </div>
                                        </div>
                                    </Scrollbars >
                                    <div className='row'>
                                        <div className=' col-md-4' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {dataDeleted} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Private Number">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={[{ value: "1", label: "Include" }, { value: "2", label: "Exclude" }]}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Private Numbers
                                        </div>
                                        <div className="col-md-6">
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={callerID}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="number" className="dateField form-control" placeholder = '0' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Times Of The Day">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selecting Times Of Day
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={rangeOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder='00:00:00' />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            And
                                        </div>
                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder='00:00:00' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Site">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-8">
                                            Calls made at the following sites
                                        </div>
                                    </div>


                                    <div className='row filtersBorder'>
                                        <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                            <CheckBoxList defaultData={acdData} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-3' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-3' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-6'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-2'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Trunk Line">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            Selecting trunk lines
                                        </div>
                                        <div className="col-md-6" style={{ zIndex: '9999999' }}>
                                            <DropdownSelect
                                                name="form-field-name"
                                                value= 'Select...'
                                                options={rangeOptions}
                                                placeholder="Select..."
                                                />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-md-4 col-sm-2' >
                                        </div>

                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder="00:00:00" />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4' >
                                            And
                                        </div>
                                        <div className='col-md-6' >
                                            <input type="text" className="dateField form-control" placeholder="00:00:00" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-7 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Teams">
                                <div id='tabContentArea'>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            Calls made at the following teams
                                        </div>
                                    </div>
                                    <Scrollbars style={{ height: '150px' }} >
                                        <div className='row'>
                                            <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                                <CheckBoxList defaultData={campaigns} />
                                            </div>
                                        </div>
                                    </Scrollbars >
                                    <div className='row'>
                                        <div className=' col-md-4' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {dataDeleted} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Trunk Group">
                                <div id='tabContentArea'>

                                    <div className='row'>

                                        <div className="col-md-8">
                                            Calls made at the following trunk groups
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className=' col-md-6'  style={{ marginLeft: '50px' }}>

                                            <CheckBoxList defaultData={acdData} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4' >

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select All" />

                                        </div>
                                        <div className=' col-md-4' >


                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Select None" />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-4'  >

                                            <CheckBoxList defaultData= {data} />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className=' col-md-offset-4 col-md-3'  style={{ marginTop: '10px' }}>

                                            <input className=" btn btn-sm btn btn-primary btn-block" type="button" value="Add" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )

    }

}

