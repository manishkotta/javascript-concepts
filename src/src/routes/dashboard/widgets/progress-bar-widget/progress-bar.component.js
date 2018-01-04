import React from 'react';
import _ from 'lodash';
var d3 = require('d3');
import ReactDom from 'react-dom';
const defaultColor = "rgba(128,128,128,0.15)";

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    render() {
        return (
            <div dir={this.props.l.dir} id={`progress-bar${this.props.id}`}  className="progress-bar-custom">
               <div id={`progress-bar-title${this.props.id}`} className="progress-bar-title">
                </div>
                <div id={`progress-bar-chart${this.props.id}`} className="progress-bar-chart">
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        if (!this.state.isComboWidget) {
             this.renderTitle();
        }
        this.renderChartBar();
    }

    componentDidMount() {
         if (!this.state.isComboWidget) {
             this.renderTitle();
        }
        this.renderChartBar();
    }
    renderTitle() {
        const el = ReactDom.findDOMNode(this).children[0];
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }

        let progressBarTitle = d3.select(`#progress-bar-title${this.props.id}`).insert("svg").attr("width", this.state.width).attr("height", _.floor(this.state.height * 0.1));

        let titleDyposition = _.floor(this.state.height * 0.075);

        let title = progressBarTitle.append("text")
            .attr("class", "gauge-label")
            .attr("text-anchor", "middle")
            .attr("dy", `${titleDyposition}`)
            .attr("dx", `${this.state.width / 2}`)
            .attr("style", `font-size:${this.state.titleStyles.fontSize}; font-family:${this.state.titleStyles.fontFamily};`)
            .attr("fill", `${this.state.titleStyles.color}`);
        
        title.text(`${this.state.title}`);
    }
    renderChartBar() {
        const el = ReactDom.findDOMNode(this).children[1];
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }

        let barChartHeight = this.state.isComboWidget ?  _.floor(this.state.height): _.floor(this.state.height * 0.9);
        let eachBarheight = this.state.isComboWidget ?  _.floor(this.state.height  * 0.81) : _.floor(this.state.height * 0.9  * 0.88);
         
        let data = [];
        for (let i = this.state.barCount; i >= 1; i--) {
            data.push({
                x: (1 - (i / this.state.barCount)) * this.state.width,
                y: ((i / this.state.barCount) - 0.1) * eachBarheight,
                w: this.state.width / this.state.barCount,
                h: eachBarheight - (((i / this.state.barCount) - 0.1) * eachBarheight),
                c: this.shouldBeEnabled(this.state.ratio, i) ? this.getColors(i)[1] : defaultColor
            })
        }

        let progressBarChart = d3.select(`#progress-bar-chart${this.props.id}`).insert("svg").attr("width", this.state.width).attr("height", barChartHeight);

        _.map(data, (d) =>
            progressBarChart.append("rect")
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("width", d.w)
                .attr("height", d.h)
                .attr("fill", d.c));

        let valueLabel = progressBarChart.append("text")
            .attr("class", "gauge-min-label")
            .attr("text-anchor", "middle")
            .attr("dy", `${this.state.height * 0.25}px`)
            .attr("dx", `${this.state.width * 0.25}px`)
            .attr("style", `font-family: ${this.state.valueStyles.fontFamily}; font-size:${this.state.valueStyles.fontSize}`)
            .attr("fill", this.state.valueStyles.color);

            valueLabel.text(`${this.state.label}`);

            this.renderFooter(progressBarChart);

    }

    renderFooter(progressBarChart) {
       let footerdyPosition = _.floor(( this.state.isComboWidget ? ((this.state.height * 0.81) ) : this.state.height * 0.88 * 0.9)  + this.state.rangeValueStyles.fontSize);
        let maxTextLength = this.state.max.toString().length;

        // let size = this.state.height > this.state.width ?
        //     this.state.width * 0.08 > 9 ? this.state.width * 0.08 : 9 :
        //     this.state.height * 0.08 > 9 ? this.state.height * 0.08 : 9;

        // let fatcor = maxTextLength < 6 ? 0.7 : maxTextLength < 12 ? 0.6 : 0.5;

        let maxTextDx = 
            this.state.width - (maxTextLength * this.state.rangeValueStyles.fontSize * 0.6);

        progressBarChart.append("text")
            .attr("class", "gauge-min-label")
            //.attr("text-anchor", "middle")
            .attr("dy", `${footerdyPosition}px`)
            .attr("dx", `0px`)
            .attr("style", `font-size:${this.state.rangeValueStyles.fontSize}px; font-family:${this.state.rangeValueStyles.fontFamily};`)
            .attr("fill", this.state.rangeValueStyles.color)
            .text(`${this.state.min}`);

        progressBarChart.append("text")
            .attr("class", "max-val")
            //.attr("text-anchor", "middle")
            .attr("dy", `${footerdyPosition}px`)
            .attr("dx", `${maxTextDx}px`)
            .attr("style", `font-size:${this.state.rangeValueStyles.fontSize}px; font-family:${this.state.rangeValueStyles.fontFamily};`)
            .attr("fill", this.state.rangeValueStyles.color)
            .text(`${this.state.max}`);

    }

    shouldBeEnabled(ratio, i) {
        return (1 - ratio) * 10 < i;
    }
    getColors(i) {
        let fillColor = this.state.interpolateColor(i / this.state.barCount);
        if (/^rgb\(/.test(fillColor)) {
            let color = [];
            _.map(fillColor.substring(4, fillColor.length - 1).split(','), (col) => color.push(parseInt(col)));
            return [`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`];
        }
    }
}
