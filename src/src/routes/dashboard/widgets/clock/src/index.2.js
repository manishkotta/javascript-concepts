import React from 'react';
import ReactDom from 'react-dom';
var elementResizeEvent = require('element-resize-event');
var d3 = require('d3');

class AnalogClock extends React.Component {


    constructor(props) {
        super(props); 
    }

    ReDrawNiddle(gTopGroupId, niddle, angle) {
        var svg = d3.select("#" + gTopGroupId);
        var line = svg.select('#' + niddle);
        var offsetX,offsetY;
        var savedX2 = parseFloat(line.attr("x2Saved"));
        var savedY2 = parseFloat(line.attr("y2Saved"));
        var lineLength = parseFloat(line.attr("lineLength"));

        offsetX = savedX2 - (lineLength * Math.cos(angle + Math.PI / 2));
        offsetY = savedY2 - (lineLength * Math.sin(angle + Math.PI / 2));

        line
            .transition()
            .duration(100)
            .attr("x2", offsetX)
            .attr("y2", offsetY);
    }

    // as second niddle moves, it hightlights dot
    HighLightDot(second) {
        var svg = d3.select("#" + gTopGroupId);
        var dot = svg.select('#' + "second_pos_" + second);
        var oldr = dot.attr("saver");
        var newr = parseInt(oldr) + 4;
        dot.attr("r", newr)
            .transition()
            .duration(100)
            .attr("r", oldr)
            ;
    }

    // create dial by putting dots and number 12, 3, 6 and 9
    DrawDots(granularity, radius,cx, cy, gTopGroupId) {
        for (var a = 0; a < 60; ++a) {
            var t = a * Math.PI / granularity;
            var lineLength = radius - 10;
            var offsetX = cx - (lineLength * Math.cos(t + Math.PI / 2));
            var offsetY = cy - (lineLength * Math.sin(t + Math.PI / 2));
            var svg = d3.select("#" + gTopGroupId);
            svg.append("circle")
                .attr("id", "second_pos_" + a)
                .attr("cx", offsetX)
                .attr("cy", offsetY)
                .attr("r", function () {
                    if (a % 5 == 0)
                        return 2;
                    else return 1;
                })
                .attr("saver", function () {
                    if (a % 5 == 0)
                        return 2;
                    else return 1;
                })
                .attr('fill', 'black');


            var fontsize = 30; // '30px';
            if (a == 0) {
                svg.append("text")
                    .attr("x", offsetX)
                    .attr("y", offsetY + fontsize + 5)
                    .attr("font-size", fontsize + 'px')
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text("12");
            }

        //  if (a == 1) {
        //         svg.append("text")
        //             .attr("x", offsetX + fontsize + 5)
        //             .attr("y", offsetY + fontsize + 5)
        //             .attr("font-size", fontsize + 'px')
        //             .attr("text-anchor", "middle")
        //             .attr("fill", "black")
        //             .text("1");
        //     }

            else if (a == 15) {
                svg.append("text")
                    .attr("x", offsetX - fontsize / 2)
                    .attr("y", offsetY + fontsize / 2)
                    .attr("font-size", fontsize + 'px')
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text("3");
            }
            else if (a == 30) {
                svg.append("text")
                    .attr("x", offsetX)
                    .attr("y", offsetY - 5)
                    .attr("font-size", fontsize + 'px')
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text("6");
            }
            else if (a == 45) {
                svg.append("text")
                    .attr("x", offsetX + fontsize / 2)
                    .attr("y", offsetY + fontsize / 2)
                    .attr("font-size", fontsize + 'px')
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text("9");
            }
        }
    }

    InitializeSvg(containerId) {
         var cx; // center x of clock
        var cy; // center y of clock
        var gContainerId;
        var gCanvasId;
        var gTopGroupId, lineLength, seconds, hours, minutes;
        var radius; // radius of clock
        var intervalId = null;
        var granularity = 30;

        const node = ReactDom.findDOMNode(this);

        elementResizeEvent(node, () => {
            const width = node.offsetWidth;
            const height = node.offsetHeight;
            if (this.state.width !== width || this.state.height !== height) {
                this.setState({
                    height,
                    width
                });
            }
        });

        const width = node.offsetWidth;
        const height = node.offsetHeight;
        if (this.state.width !== width || this.state.height !== height) {
            setTimeout(() => {
                this.setState({
                    height,
                    width
                })
            }, 0);
        }

        // var height = 500;//document.getElementById(containerId).clientHeight;
        // var width = 500; //document.getElementById(containerId).clientWidth;
        gContainerId = containerId;
        gCanvasId = containerId + '_canvas';
        gTopGroupId = containerId + '_topGroup';
        var svg = d3.select("#" + containerId).append("svg")
            .attr("id", gCanvasId)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", gTopGroupId)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            ;
  
    lineLength = (height / 2) - 170;
        cx = width / 2;
        cy = height / 2;
  
  radius = (height / 2) - 90;
        var circle = svg.append("circle")
            .attr("id", "outerCircle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", radius)
            .attr("stroke-width", 1)
            .attr('stroke', "blue")
            .attr('fill', 'yellow')
            ;


      
        var secondNiddle = svg.append("line")
            .attr("id", "secondNiddle")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx)
            .attr("y2", (cy - lineLength))
            .attr("lineLength", lineLength)
            .attr("x2Saved", cx)
            .attr("y2Saved", (cy))
            .attr("stroke-width", 2)
            .attr("stroke", "brown")
            ;

        lineLength = (height / 2) - 110;
        var minuteNiddle = svg.append("line")
            .attr("id", "minuteNiddle")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx)
            .attr("y2", (cy - lineLength))
            .attr("lineLength", lineLength)
            .attr("x2Saved", cx)
            .attr("y2Saved", (cy))
            .attr("stroke-width", 2)
            .attr("stroke", "red")
            ;

        lineLength = (height / 2) - 150;
        var hourNiddle = svg.append("line")
            .attr("id", "hourNiddle")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx)
            .attr("y2", (cy - lineLength))
            .attr("lineLength", lineLength)
            .attr("x2Saved", cx)
            .attr("y2Saved", (cy))
            .attr("stroke-width", 2)
            .attr("stroke", "green")
            ;

        var circle = svg.append("circle")
            .attr("id", "centerBall")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", 5)
            .attr("fill", "black")
            ;

      
        //get current time only once . later use timer to move the clock
        var d = new Date();
        seconds = d.getSeconds();
        minutes = d.getMinutes();
        hours = d.getHours() % 12;

        this.ReDrawNiddle(gTopGroupId, 'secondNiddle', seconds * Math.PI / granularity);
        this.ReDrawNiddle(gTopGroupId, 'minuteNiddle', minutes * Math.PI / granularity);

        var hourPos = hours * 10;
        hourPos += (minutes * 10) / 60;

        this.ReDrawNiddle(gTopGroupId, 'hourNiddle', hourPos * Math.PI / 60);
        this.DrawDots(granularity, radius, cx, cy, gTopGroupId);
        return svg;
    }

  componentDidMount() {
        this.InitializeSvg('myCanvas');
    }

    render() {

        return (
            <div  id="myCanvas" ref="myCanvas"  ></div>
        );
    }

    getStyle(key) {
        return this.props.style[key];
    }

}



export { AnalogClock };