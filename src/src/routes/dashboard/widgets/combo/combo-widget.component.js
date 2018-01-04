import React from 'react';
import ComboRow from './combo-row.component';

import _ from 'lodash'

export default class ComboWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.bindData(props);

    }
    componentWillReceiveProps(nextProps) {

        this.setState(this.bindData(nextProps));
    }

    bindData(inputProps) {
        let heightToConsider = inputProps.IsEditing ? inputProps.height - 25 : inputProps.height;
        let headerHeight = _.floor(heightToConsider * 0.08);

        let remainingHeight = heightToConsider - headerHeight;

        let eachRowWidth = inputProps.width;

        let matrixLength = (!!inputProps.matrix ? inputProps.matrix.length == 1 ? 1 : inputProps.matrix.length - 1 : 1);// need to re-check the logic

        let eachRowHeight = _.floor(remainingHeight / matrixLength);

        eachRowWidth /= !!inputProps.matrix[0] ? inputProps.matrix[0].length : 1;

        let adjustedHeaderHeight = heightToConsider - (matrixLength * eachRowHeight);
        // Once doing division and applying _.floor function, 
        // there is a chance that small fraction might be missing. So we are adjusting headerheight again using heightToConsider - (matrixLength * eachRowHeight); 

        return { ...inputProps, eachRowHeight, eachRowWidth, adjustedHeaderHeight };
    }

    render() {
        return (
            <table className='combo'>
                <tbody>
                    {
                        _.map(this.state.matrix,
                            (row, i) => (
                                <ComboRow key={i} row={row} isHeader={i == 0} {...this.state} />
                            )
                        )
                    }
                </tbody>
            </table>
        );
    }
}
