import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactDom from 'react-dom';
import '../styles.css';
import * as Color from '../../../../lib/color-conversion';
var d3 = require('d3');
const segments = [
    "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
    "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
    "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
    "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
    "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7",
    "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
    "#65a620", "#2484c1", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
    "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
    "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
    "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
];

export default class BarChartWidget extends React.Component {
    constructor(props) {
        super(props);

        const { widgetBody, titleStyles, xAxisStyles, barStyles, yAxisStyles } = _.cloneDeep(props);

        widgetBody.backgroundColor = Color.ToString(props.appliedBackgroundColor);
        widgetBody.color = Color.ToString(widgetBody.color);

        barStyles.backgroundColor = Color.ToString(barStyles.backgroundColor);
        barStyles.color = Color.ToString(barStyles.color);

        titleStyles.color = Color.ToString(titleStyles.color);
        xAxisStyles.color = Color.ToString(xAxisStyles.color);
        yAxisStyles.color = Color.ToString(yAxisStyles.color);

        this.state = {
            data: this.props.data,
            title: this.props.title,
            min: this.props.min,
            max: this.props.max,
            enableMin: this.props.enableMin,
            enableMax: this.props.enableMax,
            enableBarLines: this.props.enableBarLines,
            titleStyles,
            widgetBody,
            barStyles,
            xAxisStyles,
            yAxisStyles,
            width: this.props.width,
            height: this.props.height,
            useSelectedBarColor: this.props.useSelectedBarColor
        }
    }

    componentWillReceiveProps(nextProps) {
        const { widgetBody, titleStyles, xAxisStyles, barStyles, yAxisStyles } = _.cloneDeep(nextProps);

        widgetBody.backgroundColor = Color.ToString(nextProps.appliedBackgroundColor);
        widgetBody.color = Color.ToString(widgetBody.color);

        barStyles.backgroundColor = Color.ToString(barStyles.backgroundColor);
        barStyles.color = Color.ToString(barStyles.color);

        titleStyles.color = Color.ToString(titleStyles.color);
        xAxisStyles.color = Color.ToString(xAxisStyles.color);
        yAxisStyles.color = Color.ToString(yAxisStyles.color);

        this.setState({
            data: nextProps.data,
            title: nextProps.title,
            min: nextProps.min,
            max: nextProps.max,
            enableMin: nextProps.enableMin,
            enableMax: nextProps.enableMax,
            enableBarLines: nextProps.enableBarLines,
            titleStyles,
            widgetBody,
            barStyles,
            xAxisStyles,
            yAxisStyles,
            width: nextProps.width || this.state.width,
            height: nextProps.height || this.state.height,
            useSelectedBarColor: nextProps.useSelectedBarColor
        });
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.state.title !== newState.title
            || this.state.width !== newState.width
            || this.state.height !== newState.height
            || this.state.min !== newState.min
            || this.state.max !== newState.max
            || this.state.enableMin !== newState.enableMin
            || this.state.enableMax !== newState.enableMax
            || this.state.enableBarLines !== newState.enableBarLines
            || this.state.useSelectedBarColor !== newState.useSelectedBarColor
            || !_.isEqual(this.state.data, newState.data)
            || !_.isEqual(this.state.titleStyles, newState.titleStyles)
            || !_.isEqual(this.state.widgetBody, newState.widgetBody)
            || !_.isEqual(this.state.xAxisStyles, newState.xAxisStyles)
            || !_.isEqual(this.state.yAxisStyles, newState.yAxisStyles)
            || !_.isEqual(this.state.barStyles, newState.barStyles)
        );
    }

    componentDidUpdate() {
        this.clearAndRenderBar();
    }


    componentDidMount() {
        this.clearAndRenderBar();
    }

    clearAndRenderBar()
    {
        const el = ReactDom.findDOMNode(this).firstChild;
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }
        var chart = this.renderBarChart();
    }


    renderBarChart() {
        var data = _.map(this.state.data, (d) => {
            return {
                label: d.label,
                data: _.sum(d.data)
            }
        });
        var labels = _.map(data, (d) => {
            return d.label
        });

        let maxValue = _.maxBy(data, function(o) { return o.data; });

        let maxValueLength = maxValue ? (maxValue.data ? ((maxValue.data+'').length > 2 ? (maxValue.data+'').length : 2.5) : 2.5) : 2.5;

        let leftMargin = this.state.yAxisStyles.fontSize * maxValueLength; 
        var margin =  {top: this.state.height * 0.1 > 60 ? this.state.height * 0.1 : 60, right: 10, bottom: 50, left: leftMargin} //{ top: this.state.height * 0.1 > 60 ? this.state.height * 0.1 : 60, right: 10, bottom: 50, left: 50 };

        var width = this.state.width - margin.right - margin.left;
        var height = this.state.height - margin.top - margin.bottom;

        const node = ReactDom.findDOMNode(this);

        var svg = d3.select(node.firstChild).append('svg')
            .attr('width', this.state.width)
            .attr('height', this.state.height)
            .style('background-color', this.state.widgetBody.backgroundColor)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        svg.append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("fill", this.state.titleStyles.color)
           .attr('dy', `${-(23)/this.state.titleStyles.fontSize}em`)
            .attr('dx', `${(this.state.width * 0.5) - margin.left}px`)
            .style('font-size', this.state.titleStyles.fontSize)
            .style('font-family', this.state.titleStyles.fontFamily)
            .text(this.state.title);

        var labelScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .25)
            .domain(labels);

        var bandwidth = labelScale.rangeBand();

        var dataScale = d3.scale.linear()
            .range([height, 0])
            .domain([this.state.enableMin ? this.state.min : 0
                , this.state.enableMax ? this.state.max : d3.max(data, function (d) { return d.data; })
            ]);

        var xAxis = d3.svg.axis()
            .scale(labelScale)
            .orient("bottom");

        var yAxis = this.state.enableBarLines ?
            d3.svg.axis()
                .scale(dataScale)
                .orient("left")
                .innerTickSize(-width)
                .tickPadding(10) :
            d3.svg.axis()
                .scale(dataScale)
                .orient("left")
                .innerTickSize(5)
                .tickPadding(10);

        var xAxisEle = svg.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${height})`)
            .attr('fill', this.state.xAxisStyles.color)
            .style('font-size', this.state.xAxisStyles.fontSize)
            .style('font-family', this.state.xAxisStyles.fontFamily)
            .call(xAxis);

        const maxLabelLength = _.reduce(xAxisEle.selectAll('.tick text')[0], (maxLen, x) => {
            return maxLen > x.getComputedTextLength() ? maxLen : x.getComputedTextLength();
        }, 0);

        const xLabelsAngle = this.getAngle(maxLabelLength, bandwidth);

        if (xLabelsAngle > 0) {
            const xTrans = (xLabelsAngle / 90) * bandwidth * 0.75;
            const yTrans = (xLabelsAngle / 90) * maxLabelLength * 0.67;
            xAxisEle.selectAll('.tick text')
                .attr('transform', `translate(-${xTrans}, ${yTrans})rotate(-${xLabelsAngle})`)
        }


        svg.append('g')
            .classed('y axis', true)
            .attr('fill', this.state.yAxisStyles.color)
            .style('font-size', this.state.yAxisStyles.fontSize)
            .style('font-family', this.state.yAxisStyles.fontFamily)
            .call(yAxis);
        var barHolder = svg.append('g')
            .classed('bar-holder', true);

        barHolder.selectAll('rect.bar')
            .data(data)
            .enter()
            .append("text")
            .attr('fill', (d, i) => {
                return this.state.barStyles.color;
            })
            .style('font-size', this.state.barStyles.fontSize)
            .style('font-family', this.state.barStyles.fontFamily)
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => {
                return labelScale(d.label) + (bandwidth / 2);
            })
            .attr("y", (d, i) => {
                return dataScale(d.data) - 2;
            })
            .text((d, i) => {
                return d.data;
            });

        barHolder.selectAll('rect.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => {
                return labelScale(d.label);
            })
            .attr('width', (d, i) => {
                return bandwidth;
            })
            .attr('y', (d, i) => {
                return dataScale(d.data) - 1;
            })
            .attr('height', (d, i) => {
                return height - dataScale(d.data);
            })
            .attr('fill', (d, i) => {
                return this.state.barStyles && this.state.useSelectedBarColor ? this.state.barStyles.backgroundColor : segments[i % segments.length];
            });

    }

    getAngle(labelWidth, bandwidth) {
        if (labelWidth <= bandwidth) {
            return 0;
        }
        const r = (labelWidth / bandwidth) >= 2 ? 1 : (labelWidth / bandwidth) % 1;
        return Math.asin(r) * (180 / Math.PI);
    }

    render() {
        return (
            <div className = "widget-content">
                <div id={`${this.props.id}`} />
            </div>
        );
    }
}

BarChartWidget.PropTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    titleStyles: PropTypes.object,
    widgetBody: PropTypes.object,
}
