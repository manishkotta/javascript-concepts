import React from 'react';
import _ from 'lodash';
import ReactDom from 'react-dom';
import  GridCell from './grid-cell.component';

export default class GridRow extends React.Component {
    constructor(props) {
        super(props);
        //this.state = props;
        this.state = {
            ...props
        }
         
    }

    // componentWillReceiveProps(nextProps) {


    //     _.map(nextProps.row, (cellData) => {
    //     if(cellData.IsHeader ){
    //         cellData.height = nextProps.eachRowHeight;
    //         cellData.width = nextProps.eachRowWidth;
    //     }
    //     else{
    //         cellData.WidgetData.height = nextProps.eachRowHeight;
    //         cellData.WidgetData.width = nextProps.eachRowWidth;
    //     }


    //     }); 

    //             this.setState({
    //                 ...nextProps                   
    //             });
    //         }

    render() {
        return (
             
                <tr >
                    {
                        _.map(this.state.row, (cell,i) => (
                             <GridCell  {...cell}  /> 
                         )
                        )


                    }
                </tr>
            )
        }
}
