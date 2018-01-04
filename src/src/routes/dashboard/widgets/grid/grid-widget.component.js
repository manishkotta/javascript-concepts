import React from 'react';
import * as Color from '../../../../lib/color-conversion';
import GridRow from './grid-row.component';

import _ from 'lodash'

export default class GridWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...props };

    }
    // componentWillReceiveProps(nextProps) {
    //     var eachRowWidth = nextProps.width
    //     var eachRowHeight = nextProps.height

    //     if (this.state.comboSelectedStatisticItems && this.state.comboSelectedStatisticItems.length) {
    //         // eachRowWidth = nextProps.width / this.state.appliedSettings.comboSelectedStatisticItems.length;
    //         // eachRowHeight = nextProps.height /  ((this.state.appliedSettings && this.state.appliedSettings.filters && this.state.appliedSettings.filters.length > 0 )? this.state.appliedSettings.filters.length: 1);

    //         eachRowWidth = nextProps.width / (this.state.comboSelectedStatisticItems.length + 1);
    //         eachRowHeight = nextProps.height * 0.7 / ((this.state.appliedSettings && this.state.appliedSettings.dataMetrics && this.state.appliedSettings.dataMetrics.filters && this.state.appliedSettings.dataMetrics.filters.length > 0) ? this.state.appliedSettings.dataMetrics.filters.length : 1);

    //     }

    //     this.setState({ ...nextProps, eachRowHeight, eachRowWidth });
    // }



    render() {
        return (
            <table className='combo '>
                <tbody>
                    <tr className='height-7'>
                        {
                            _.map(this.state.matrix.rowHeaders, (rowHeader) => (
                                <th className='text-align-center gridBorder'>
                                    <div> {rowHeader.title} </div>
                                </th>
                            )
                            )
                        }
                    </tr>
                    {
                    	_.map(this.state.matrix.rows, (row,i) => (

                            <GridRow  row={row} />

                        )
                        )
                    }
                </tbody>
            </table>
        );
    }
}
