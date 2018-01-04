import React from 'react';
import _ from 'lodash';
import ComboCell from './combo-cell.component';

export default class ComboRow extends React.Component {
    constructor(props) {
        super(props);
        
        _.map(props.row, (cellData) => {
            if(props.isHeader ){
                cellData.height = props.adjustedHeaderHeight;
                cellData.width = props.eachRowWidth;
            }
            else{
                cellData.height = props.eachRowHeight;
                cellData.width = props.eachRowWidth;
            }
           })
        
        this.state = {
            ...props
        }

    }

    componentWillReceiveProps(nextProps) {

        _.map(nextProps.row, (cellData) => {
            if(nextProps.isHeader ){
                cellData.height = nextProps.adjustedHeaderHeight;
                cellData.width = nextProps.eachRowWidth;
            }
            else{
                cellData.height = nextProps.eachRowHeight;
                cellData.width = nextProps.eachRowWidth;
            }
    
    
            }); 

        this.setState({
            ...nextProps
        });
    }

    render() {
        return (
            <tr className="combo-row">
                {
                    _.map(this.state.row,
                        (cell, i) => (
                            <ComboCell key={i} cell={cell} {...this.state} />
                        )
                    )
                }
            </tr>
        )
    }
}