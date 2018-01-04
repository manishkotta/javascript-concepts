import React from 'react';
// import '../../../styles/headerStyles.css';
import _ from 'lodash';
import CustomSelect from '../../../../../../components/custom-dropdown';
import ToggleSwitch from '../../../../../../components/toggle-switch';
import StatisticCategory from '../../../../../../lib/enums/statistic-category.enum';
import CheckBoxListGroup from '../../../../../../components/check-box-list-group';
import RadioButtonGroup from '../../../../../../components/radio-button-group';
import WidgetType from '../../../../../../lib/enums/widget-type.enum'
import ComboRealTimeSettings from '../combo-realtime-settings/combo-realtime-settings.component'
import ComboCustomSettings from '../combo-custom-settings/combo-custom-settings.component'
var comboEditItem = {};
export default class ComboSettings extends React.Component {
	constructor(props) {
		super(props);
		// if (!((props.dataMetrics && props.dataMetrics.statisticCategoryOptions && props.dataMetrics.statisticCategoryOptions.length) && (props.dataMetrics.groupOptions && props.dataMetrics.groupOptions.length))) {
		// 	props.getMetaData(props.widget.widgetType);
		// }
		// this.props.setSelectedStatisticCategory(props.widget.appliedSettings.dataMetrics.statisticCategory !== undefined ? props.widget.appliedSettings.dataMetrics.statisticCategory : StatisticCategory.RealTime, props.widget.widgetType, props.widget.id);
		this.state = {
			statisticCategory: props.widget.appliedSettings.dataMetrics.statisticCategory || StatisticCategory.RealTime,
			statisticCategoryOptions: props.dataMetrics.statisticCategoryOptions || [],
			widget: props.widget,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== undefined
			&& this.props.widget.appliedSettings.dataMetrics.statisticCategory !== undefined
			&& nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== this.props.widget.appliedSettings.dataMetrics.statisticCategory) {
			this.props.setSelectedStatisticCategory(nextProps.widget.appliedSettings.dataMetrics.statisticCategory, nextProps.widget.widgetType, this.props.widget.id);
		}
		else if (nextProps.dataMetrics.statisticCategory === this.props.dataMetrics.statisticCategory && nextProps.widget.id !== this.props.widget.id) {
			this.props.setSelectedStatisticCategory(nextProps.widget.appliedSettings.dataMetrics.statisticCategory !== undefined ? nextProps.widget.appliedSettings.dataMetrics.statisticCategory : StatisticCategory.RealTime, nextProps.widget.widgetType, this.props.widget.id);
			if (nextProps.widget.widgetType !== this.props.widget.widgetType) {
				this.props.updateWidgetSpecificStatisticCategories(nextProps.widget.widgetType);
			}
		}
		this.setState({
			statisticCategory: nextProps.dataMetrics.statisticCategory,
			statisticCategoryOptions: nextProps.dataMetrics.statisticCategoryOptions || [],
			widget: nextProps.widget,
		})
	}
	render() {
		return (
			<div className="col-md-12 edit-form" id='tabContentArea'>
				<div className="row">
					<div className="metrics-label col-md-4">
						<text>{this.props.l.t('StatisticsCOLON','Statistics:')} </text>
					</div>
					<div className="col-md-8 col-sm-8">
						<ToggleSwitch
							nodes={this.state.statisticCategoryOptions}
							checkedNode={this.state.statisticCategory}
							onChange={(e) => this.props.setSelectedStatisticCategory(e, this.state.widget.widgetType, this.state.widget.id)} />
					</div>

				</div>
				{
					(this.state.statisticCategory == StatisticCategory.RealTime) ? <ComboRealTimeSettings {...this.props} /> : <ComboCustomSettings {...this.props} />
					// <ComboRealTimeSettings {...this.props} />
				}
			</div>
		)
	}



}
