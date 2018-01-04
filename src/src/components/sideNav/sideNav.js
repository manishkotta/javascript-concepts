import React from 'react';
import {SideMenu} from 'react-sidemenu';
import { browserHistory } from 'react-router'

import './sideNav.css'



export default class SideNav extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const items = [
            {
                label: 'Home', value: '/Home', icon: 'fa fa-home',
                children: []
            },
            {
                label: 'Dashboard', value: '/dashboard/mydashboards', icon: 'fa fa-dashboard',
                children: [
                    //{label: 'Home', value: 'item1.1', icon: 'fa-snapchat'},
                    { label: 'My Dashboard', value: '/dashboard/mydashboards' },
                    { label: 'New Dashboard', value: '/dashboard/new' },
                ]
            },
           /* Removed menu items temporarily, will implement in phase 2
             {
                 label: 'Filters', value: 'item2', icon: 'fa fa-filter',
                 children: [
                     { label: 'My Filters', value: 'item2.1' },
                     { label: 'New Filters', value: 'item2.2' }]
             },
             {
                 label: 'Datasources', value: 'item3', icon: 'fa fa-database',
                 children: [
                     { label: 'My Datasources', value: 'item3.1' },
                     { label: 'New Datasources', value: 'item3.2' }
                 ]
             },
             {
                 label: 'Schedules', value: 'item4', icon: 'fa fa-clock-o',
                 children: [
                     { label: 'My Schedules', value: 'item4.1' },
                     { label: 'New Schedules', value: 'item4.2' }
                 ]
             },*/
        ]

        return (
            <SideMenu items={items} collapse={false}  
                onMenuItemClick={(value) => this.navigate(value) } />
        )
    }
    navigate(value) {
        browserHistory.push(value)
    }

}

	//ReactDOM.render(, document.getElementById('example-2'));
