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
        <text x="44" y="16">12</text>
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
  fontSize: "10"
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

    switch(timeslot) {
      case "hours":
        return this.rotateCss( 30 * d.getHours() );
        break;
      case "minutes":
        return this.rotateCss(6 * d.getMinutes() );
      case "seconds":
        return this.rotateCss(6 * d.getSeconds() );
      default:
        throw new TypeError("unknown timeslot: " + timeslot);
    }
  }

  render() {

      return (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill={this.getStyle("clockBgColor")} stroke={this.getStyle("clockEdgeColor")}/>
          <HourText fontColor={this.getStyle("fontColor")} fontFamily={this.getStyle("fontFamily")} fontSize={this.getStyle("fontSize")} />
          <g>
            <rect id="hour" x="48.5" y="22.5" width="5" height="30" rx="1.5" ry="1.55" transform={this.getTransformFor("hours")} />
            <rect id="min" x="48" y="12.5" width="3" height="40" rx="1" ry="1" transform={this.getTransformFor("minutes")}/>
            <line x1="50" y1="50" x2="50" y2="5"
              stroke={this.getStyle("secondHandColor")}
              transform={this.getTransformFor("seconds")}
              style={this.getStyle("animationStyle")}
            />
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
