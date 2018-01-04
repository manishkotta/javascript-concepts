import React from 'react';


//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;
import ScrollbarWrapper from 'react-scrollbar';
import ReactScrollbar from 'react-scrollbar-js';
import { Tab, Tabs, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import DropdownSelect from '../DropdownSelect/dropdown-select'

import { DateField, Calendar } from 'react-date-picker';
//import Multiselect from 'react-widgets/lib/Multiselect';
import { Field, reduxForm } from 'redux-form';
var Multiselect = require('react-bootstrap-multiselect');
var Select = require('react-select');
import 'react-select/dist/react-select.css';
import FiltersTab from './Tabs.Filters'

const ItemOptions = [{ value: "Call Duration", label: 'Call Duration' }, { value: "Queue Time", label: 'Queue Time' }, { value: "Answer Time", label: 'Answer Time' }, { value: "Hold Time", label: 'Hold Time' }];
const FunctionOptions = [{ value: "Sum", label: 'Sum' }, { value: "Average", label: 'Average' }, { value: "Maximum", label: 'Maximum' }, { value: "Minimum", label: 'Minimum' }];



var DateTimeField = require('react-bootstrap-datetimepicker');
let items = [{ id: '123', text: 'this is an item' }];

const TabsLayoutBottom = (props) => { 
    return(

 <Tabs defaultActiveKey={props.newDashboard.currentTab} id="bottom" onSelect={(e)=>props.topTabsClick(e)}>
                <Tab eventKey="first" title="Filters">
                    <ReactScrollbar style={{ height: '130px' }}>
                        <div id='tabContentArea' style={{ marginLeft: '50px' }}>
                            <div className='row' >
                                <div className="col-md-3" >
                                    Date
                                     </div>
                                <div className="col-md-3" >
                                    Last Year
                                     </div>
                                <div className="col-md-2">
                                    <a href="#">Edit</a>
                                </div>
                                <div className="col-md-1">
                                    <a href="#">Delete</a>
                                </div>

                            </div>
                            <div className='row' >

                                <div className='col-md-3' >
                                    Extension
                                    </div>
                                <div className='col-md-3' >
                                    222,333
                                    </div>
                                <div className="col-md-2">
                                    <a href="#">Edit</a>
                                </div>
                                <div className="col-md-1">
                                    <a href="#">Delete</a>
                                </div>
                            </div>
                            <div className='row' >
                                <div className='col-md-3'  >
                                    Cost
                                    </div>
                                <div className='col-md-3'  >
                                    Equal To
                                    </div>
                                <div className="col-md-2">
                                    <a href="#">Edit</a>
                                </div>
                                <div className="col-md-1">
                                    <a href="#">Delete</a>
                                </div>
                            </div>


                        </div>
                    </ReactScrollbar>
                    <div className='row' >
                        <div className=' col-md-offset-7 col-md-4'>

                            <input className=" btn btn-primary btn-block" type="button" value="Finalize Settings" />
                        </div>

                    </div>
                </Tab>
                <Tab eventKey="second" title="Data Metrics">
                    <ReactScrollbar style={{ height: '130px' }}>
                        <div id='tabContentArea' style={{ marginLeft: '50px' }}>
                            <div className='row' >
                                <div className="col-md-3" >
                                    X-Axis
                                     </div>
                                <div className="col-md-3" >
                                    XXXX
                                     </div>
                                <div className="col-md-2">
                                    <a href="#">Edit</a>
                                </div>
                                <div className="col-md-1">
                                    <a href="#">Delete</a>
                                </div>

                            </div>
                            <div className='row' >

                                <div className='col-md-3' >
                                    Y-Axis
                                    </div>
                                <div className='col-md-3' >
                                    YYYY
                                    </div>
                                <div className="col-md-2">
                                    <a href="#">Edit</a>
                                </div>
                                <div className="col-md-1">
                                    <a href="#">Delete</a>
                                </div>
                            </div>
                        </div>
                    </ReactScrollbar>
                    <div className='row' >
                        <div className=' col-md-offset-7 col-md-4  col-sm-offset-6 col-sm-4'  >

                            <input className=" btn btn-primary btn-block" type="button" value="Finalize Settings" />
                        </div>

                    </div>
                </Tab>
                <Tab eventKey="third" title="Schedules">Tab 3 content</Tab>
            </Tabs>
    )
};
export default TabsLayoutBottom;