"use strict";
import React from 'react';

class CustomPopUp extends React.Component{
    render(){
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.onProceed}>okay</button>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        )
    }
}
export default CustomPopUp
