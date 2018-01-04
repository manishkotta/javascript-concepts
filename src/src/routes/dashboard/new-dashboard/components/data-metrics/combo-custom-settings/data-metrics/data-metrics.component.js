"use srtict"
import React from 'react';
import _ from 'lodash';
import CustomSelect from '../../../../../../../components/custom-dropdown';
import * as Color from '../../../../../../../lib/color-conversion';

export default class DataMetrics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: props.widget.appliedSettings.dataMetrics.levels || [],
            query: props.widget.appliedSettings.dataMetrics.query || '',
        }

    }
    componentWillMount() {
        if (this.props.widget.appliedSettings.group.isEdit || this.props.widget.appliedSettings.dataMetrics.query) {
            this.loadColumns(false);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                query: nextProps.widget.appliedSettings.dataMetrics.query || ''
            }
        )
    }

    updateQuery(query) {
        this.setState({
            query: query
        })

    }
    loadColumns(isFromEvent) {
        this.props.loadColumns(this.state.query, this.props.widget.id, isFromEvent);
    }
    handleClick(id) {
        const level = _.find(this.state.levels, (level) => level.id === id);
        level.expanded = !level.expanded;
        this.setState({ levels: this.state.levels });
    }
    ToggleMetrics() {
        this.setState({ metricsExpanded: !this.state.metricsExpanded });

    }

    render() {
        return (
            <div id='tabContentArea' className='margin20'>
                <div className="accordion">
                    <div className="accordion-header" onClick={() => this.ToggleMetrics()}>
                        <span className="pull-left rtl-pull-left">{this.props.l.t('Custom_Query', 'Custom Query')}</span>
                        {
                            this.state.metricsExpanded
                                ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                                : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                        }
                    </div>
                    {this.state.metricsExpanded &&
                        <div >
                            <div className="row acordian-margin">
                                <div className="col-md-12 ">
                                    <textarea value={this.state.query} className="form-control " placeholder={this.props.l.t('Type_your_custom_query', 'Type your custom query')} rows="5" onChange={(e) => this.updateQuery(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div className="row margin20">

                                <div className="pull-right">

                                    <button type="button" className=" btn  btn-primary" style={{ display: 'none' }} >   <i className="fa fa-bolt"> </i>&nbsp;{this.props.l.t('Validate_Query', 'Validate Query')}</button>
                                    <button type="button" disabled={this.state.query == ''} className=" btn  btn-primary" onClick={() => this.loadColumns(true)} > <i className="fa fa-arrow-right"> </i>&nbsp; {this.props.l.t('Next', 'Next')}</button>

                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        )
    }


}
