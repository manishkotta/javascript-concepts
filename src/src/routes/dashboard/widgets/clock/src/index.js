import React from 'react';

class HourText extends React.Component {
  render() {
    return (
      <g fontFamily={this.props.fontFamily} fontSize={this.props.fontSize} fill={this.props.fontColor}>
        <text x="66" y="20">1</text>
        <text x="79" y="33">2</text>
        <text x="86" y="53">3</text>
        <text x="79" y="73">4</text>
        <text x="66" y="86">5</text>
        <text x="47" y="90">6</text>
        <text x="28" y="86">7</text>
        <text x="15" y="73">8</text>
        <text x="8" y="53">9</text>
        <text x="13" y="33">10</text>
        <text x="26" y="20">11</text>
        <text x="47" y="16">12</text>
      </g>
    );
  }
}

HourText.propTypes = {
  fontColor: React.PropTypes.string.isRequired,
  fontFamily: React.PropTypes.string.isRequired,
  fontSize: React.PropTypes.string.isRequired
}

var HourText_defaultProps = {
  fontColor: "black",
  fontFamily: "Verdana",
  fontSize: "4"
}

HourText.defaultProps = HourText_defaultProps;

var AnalogClock_propTypes = {
  style: React.PropTypes.object.isRequired,
  timestamp: React.PropTypes.number.isRequired
};

var AnalogClock_defaultStyles = {
  clockBgColor: 'white',
  clockEdgeColor: 'black',
  secondHandColor: 'red',
  minutesHandColor: 'blue',
  hoursHandColor: 'green',
  fontColor: HourText_defaultProps.fontColor,
  fontFamily: HourText_defaultProps.fontFamily,
  fontSize: HourText_defaultProps.fontSize,
  animationStyle: {
    transition: "all 0.1s ease-in-out"
  }
};

class AnalogClock extends React.Component {

  rotateCss(deg) { return "rotate(" + deg + " 50 50)"; }

  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
    this.rotateCss = this.rotateCss.bind(this);
    this.getTransformFor = this.getTransformFor.bind(this);
  }

  getTransformFor(timeslot) {

    var d = new Date(this.props.timestamp);
    var rotation = seconds * Math.PI / 30;
    var minutes = d.getMinutes();
    var hours = d.getHours() % 12;
    var seconds = 50;//d.getSeconds();

    var hourPos = hours * 10;
    hourPos += (minutes * 10) / 60;

    hourPos = hourPos * Math.PI / 60;

    switch (timeslot) {
      case "hours":



        return this.rotateCss( 30 * d.getHours() );
      case "minutes":
        return this.rotateCss(6 * d.getMinutes());
      case "seconds":
        // return this.rotateCss(6 * d.getSeconds());
        return this.rotateCss(6 * 50);
      default:
        throw new TypeError("unknown timeslot: " + timeslot);
    }
  }

  render() {

    // var secondNiddle = svg.append("line")
    //       .attr("id", "secondNiddle")
    //       .attr("x1", cx)
    //       .attr("y1", cy)
    //       .attr("x2", cx)
    //       .attr("y2", (cy - lineLength))
    //       .attr("lineLength", lineLength)
    //       .attr("x2Saved", cx)
    //       .attr("y2Saved", (cy))
    //       .attr("stroke-width", 2)
    //       .attr("stroke", "brown")
    //       ;


    return (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill={this.getStyle("clockBgColor") } stroke={this.getStyle("clockEdgeColor") } />
        <HourText fontColor={this.getStyle("fontColor") } fontFamily={this.getStyle("fontFamily") } fontSize={this.getStyle("fontSize") } />
        <g>

          <line id="hour" x1="50" y1="50"  x2="50" y2="5" strokeWidth="0.5"
            transform={this.getTransformFor("hours") }
            stroke={this.getStyle("hoursHandColor") }
            />

          <line id="min" x1="50" y1="50"  x2="50" y2="5" strokeWidth="0.5"
            transform={this.getTransformFor("minutes") }
            stroke={this.getStyle("minutesHandColor") }
            />

          <line x1="50" y1="50" x2="50" y2="5" strokeWidth="0.5"
            stroke={this.getStyle("secondHandColor") }
            transform={this.getTransformFor("seconds") }

            />

          {/*<circle cx="50" cy="50" r="2"  strokeWidth="1"  fill={this.getStyle("clockBgColor")} stroke="#FEBE12" ></circle>*/}


        </g>
      </svg>
    );
  }

  getStyle(key) {
    return this.props.style[key];
  }

}

AnalogClock.propTypes = AnalogClock_propTypes;
AnalogClock.defaultProps = {
  style: AnalogClock_defaultStyles
};

export { AnalogClock };