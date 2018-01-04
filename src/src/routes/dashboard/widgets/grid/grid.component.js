import React from 'react';
import * as Color from '../../../../lib/color-conversion';
import GridWidget from './grid-widget.component';
import WidgetType from '../../../../lib/enums/widget-type.enum';
import ReactDom from 'react-dom';
var elementResizeEvent = require('element-resize-event');
import ScrollTypeEnum from '../../../../lib/enums/scroll-type-enum';
import _ from 'lodash';
import ReactDataGrid from 'react-data-grid';

export default class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...props };

    }
    componentWillReceiveProps(nextProps) {

        // var matrixValues = {
        //     rowHeaders: [{ title: "ACD Groups" }, { title: "Agent" }, { title: "Agent In" }]
        // }

        let rowHeadersDisplay = [{ title: "Name" }, { title: "age" }, { title: "new title" }, { title: "new title2" }];
        let gridRows = [[{data: 'abc1'},{data: 'abc2'},{data: 'abc3'},{data: 'abc4'}]
        ,[{data: 'abc11'},{data: 'abc12'},{data: 'abc13'},{data: 'abc14'}]];


        var matrix = {
            rowHeaders: rowHeadersDisplay,
            rows: gridRows
        }

        this.setState({ ...nextProps, matrix });
    }



    render() {
        return (
            <div className="gridBorder">

                <GridWidget {...this.state}></GridWidget>
            </div>
        );
    }
}


 
