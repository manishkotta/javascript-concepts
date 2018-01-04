
import React, { PropTypes } from 'react';

export default class T extends React.Component{
     
    constructor(props){
        super(props);
    }

    render() {
		return (
            <span>{this.context.t(this.props.resKey)}</span>
        )
    }
}

T.contextTypes = {
    t: PropTypes.func
};