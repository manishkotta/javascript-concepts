import React from 'react';
// import '../../../styles/headerStyles.css';
import _ from 'lodash';
import ToggleSwitch from '../../../../../../components/toggle-switch';
import StatisticCategory from '../../../../../../lib/enums/statistic-category.enum';
import CheckBoxListGroup from '../../../../../../components/check-box-list-group';
import RadioButtonGroup from '../../../../../../components/radio-button-group';
import WidgetType from '../../../../../../lib/enums/widget-type.enum'
import ComboCustomColumns from './column-config'
import DataMetrics from './data-metrics'


export default class ComboCustomSettings extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			levels: props.widget.appliedSettings.dataMetrics.levels || [],
			...props
		}
	}
	componentWillMount() {
		this.props.setSelectedStatisticCategory(StatisticCategory.Custom);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps,
			levels: nextProps.widget.appliedSettings.dataMetrics.levels || []
		})
	}

	updateLevel(levels) {
		this.setState({
			levels
		})
	}

	saveDataMetrics() {
		this.props.SaveComboCustomMetrics(
			{
				id: Date.now(),
				statisticCategory: _.cloneDeep(this.props.dataMetrics.statisticCategory),
				query: _.cloneDeep(this.props.widget.appliedSettings.dataMetrics.query),
				levels: _.cloneDeep(this.state.levels),
				columnOptions: _.clone(this.props.dataMetrics.columnOptoins)
			},
			this.props.widget.id
		);
	}
	render() {

		return (
			<div>
				<div className="row">
					<DataMetrics {...this.props} />
				</div>
				<div className="row">
					<ComboCustomColumns updateLevel={this.updateLevel.bind(this)}  {...this.state} />
				</div>
				<div className="row">
					<div className=" col-md-offset-10  col-md-4 col-sm-offset-6 col-sm-6">
						<button type="button" disabled={!this.state.levels.length > 0} className=" btn btn-primary" onClick={this.saveDataMetrics.bind(this)} >{this.props.l.t('Apply','Apply')}</button>
					</div>
				</div>
			</div>
		)
	}


}
