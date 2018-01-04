'use strict';
var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
	displayName: 'CheckBoxList',

	propTypes: {
		defaultData: React.PropTypes.array,
		onChange: React.PropTypes.func
	},

	getInitialState: function () {
		return {
			data: this.props.defaultData || []
		};
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({ data: nextProps.defaultData });
	},

	handleItemChange: function (e) {
		_.map(this.state.data, (item) => {
			if (item.value === e.value) {
				item.checked = !e.checked;
			}
		})

		this.setState({ data: this.state.data });
		this.props.onChange(e);
	},

	render: function () {
		var options;

		options = _.map(this.state.data, (item, index) => {
			return (
				React.createElement("div", { key: 'chk-' + index, className: "check-box", onClick: () => this.handleItemChange(item) },
					React.createElement("input", {
						type: "checkbox",
						value: item.value,
						checked: item.checked ? true : false
					}),
					React.createElement("label", null, null
						, " ", item.label
					)
				)
			);
		});

		return (
			React.createElement("div", null,
				options
			)
		);
	}
});
