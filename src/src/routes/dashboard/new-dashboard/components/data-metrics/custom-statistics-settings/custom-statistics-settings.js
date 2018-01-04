import React from 'react';
import _ from 'lodash';
import CustomSelect from '../../../../../../components/custom-dropdown';
import StatisticCategory from '../../../../../../lib/enums/statistic-category.enum';
import WidgetType from '../../../../../../lib/enums/widget-type.enum';
export default class CustomStatisticsSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storeProcOptions: props.dataMetrics.storeProcOptions,
            filterStoreProcs: props.widget.appliedSettings.dataMetrics.filterStoreProcs || [],
            query: props.widget.appliedSettings.dataMetrics.query || '',
            selectedStoreProc: props.widget.appliedSettings.dataMetrics.selectedStoreProc || '',
            storeProcData: props.dataMetrics.storeProcData

        };

    }
    componentWillMount() {
        this.props.getStoreProcs();
    }
    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                selectedStoreProc: nextProps.widget.appliedSettings.dataMetrics.selectedStoreProc || '',
                filterStoreProcs: nextProps.widget.appliedSettings.dataMetrics.filterStoreProcs || [],
                query: nextProps.widget.appliedSettings.dataMetrics.query || '',
                storeProcData: nextProps.dataMetrics.storeProcData
            }
        )
    }

    //To generate the query.
    generateQuery() {
        this.setState({
            query: "{SP}" + (this.state.selectedStoreProc ? this.state.selectedStoreProc.label + " " + this.getParamas() : "")
        })
    }
    // To get the parma meters as a string.
    getParamas() {
        var myParams = "";
        var filterStoreProcs = this.state.filterStoreProcs
        _.forEach(filterStoreProcs, function (value, index) {
            var comma = index == filterStoreProcs.length - 1 ? "" : ",";// To remove the comma at last of the string
            if (_.includes(value.DataType, 'CHAR')) {
                myParams = myParams + "'" + value.DefaultValue + "'" + comma;
            }
            else {
                myParams = myParams + value.DefaultValue + comma;
            }
        });

        return myParams;
    }
    // To update paramas which are entered in text box.
    updateParamValue(value, index) {
        let filterStoreProcs = this.state.filterStoreProcs;
        filterStoreProcs[index].DefaultValue = value;
        this.setState({
            filterStoreProcs
        })
    }
    saveQuery() {
        this.props.SaveMetrics(

            {
                statisticCategory: this.props.dataMetrics.statisticCategory,
                selectedStoreProc: _.cloneDeep(this.state.selectedStoreProc),
                query: _.cloneDeep(this.state.query),
                filterStoreProcs: _.cloneDeep(this.state.filterStoreProcs)
            },

            this.props.widget.id
        )



    }
    // To set filter data and store drop down.
    setSelectedStoreProc(selectedStoreProc) {
        var filterData = _.filter(_.cloneDeep(this.state.storeProcData), x => x.ProcedureName == selectedStoreProc.label);
        var filterStoreProcs = _.isEqual(selectedStoreProc, this.state.selectedStoreProc) ? (this.state.filterStoreProcs && this.state.filterStoreProcs.length > 0 ? this.state.filterStoreProcs : filterData) : filterData;
        this.setState({
            selectedStoreProc: selectedStoreProc,
            filterStoreProcs: filterStoreProcs
        })
    }

    // To update the query
    updateQuery(query) {
        this.setState({
            query: query
        })
    }
    render() {
        return (
            <div id="customStatistics">
                <div className="row">
                    <div className="metrics-label col-md-4">
                        <text>Stored Procedure: </text>
                    </div>
                    <div className="col-md-5 col-sm-7">
                        <CustomSelect name="field-group-options" value={this.state.selectedStoreProc} placeholder='Select...' options={this.props.dataMetrics.storeProcOptions} onChange={(e) => this.setSelectedStoreProc(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box no-margin">
                            <div className="box-header">
                                <h3 className="box-title">Query Generator</h3>
                            </div>
                            <div className="box-body">
                                {
                                    (this.state.selectedStoreProc && this.state.selectedStoreProc.value > 0) &&
                                    < div >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    <table id="example1" className="table table-bordered table-striped no-margin">
                                                        <thead>
                                                            <tr>
                                                                <th>Param Name</th>
                                                                <th>Param Type</th>
                                                                <th>Param Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                _.map(this.state.filterStoreProcs, (item, i) => (
                                                                    (<tr key={i}>
                                                                        <td>{item.ParameterName}</td>
                                                                        <td>{item.DataType}</td>
                                                                        <td><input type="text" value={item.DefaultValue} onChange={(e) => this.updateParamValue(e.target.value, i)} /></td>
                                                                    </tr>)
                                                                ))
                                                            }


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row generate-query">
                                            <div className="col-md-offset-6">
                                                <button type="button" className="btn btn-primary" onClick={this.generateQuery.bind(this)} >Generate Query</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row generate-query">
                                    <div className="col-md-12">
                                        <textarea className="form-control" value={this.state.query} placeholder="Or Type your custom query" rows="5" onChange={(e) => this.updateQuery(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className=" col-md-offset-5  col-md-4 col-sm-offset-2 col-sm-6">
                        <button type="button" className=" btn btn-md btn-primary btn-block" onClick={this.saveQuery.bind(this)} >Save Query</button>
                    </div>
                </div>
            </div>
        )
    }


}

