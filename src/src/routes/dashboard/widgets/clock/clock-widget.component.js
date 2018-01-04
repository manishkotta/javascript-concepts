import React from 'react';
import ReactDom from 'react-dom';
import '../styles.css';
import * as Color from '../../../../lib/color-conversion';
import _ from 'lodash';

import { AnalogClock } from './analog-clock.component';
import DigitalClock from './digital-clock.component';
import * as  DateZone from '../../../../lib/date-conversion';

class ClockWidget extends React.Component {

    constructor(props) {
        super(props);
        const { widgetBody, numberStyles, TimezoneStyles, hands, DateStyles, DaysStyles, TimeStyles } = _.cloneDeep(props);
        widgetBody.ClockbackgroundColor = Color.ToString(widgetBody.ClockbackgroundColor);
        widgetBody.ClockOuterbackgroundColor = Color.ToString(widgetBody.ClockOuterbackgroundColor);
        widgetBody.clockRoundingColor = Color.ToString(widgetBody.clockRoundingColor);
        hands.secondhandcolor = Color.ToString(hands.secondhandcolor);
        hands.minutehandcolor = Color.ToString(hands.minutehandcolor);
        hands.hourhandcolor = Color.ToString(hands.hourhandcolor);

        numberStyles.color = Color.ToString(numberStyles.color);
        numberStyles.fontSize = numberStyles.fontSize;
        hands.hourhandcolor = hands.hourhandcolor;
        TimezoneStyles.color = Color.ToString(TimezoneStyles.color);
        TimezoneStyles.fontSize = `${TimezoneStyles.fontSize}px`;

        if (!this.props.isAnalog) {
            DateStyles.color = Color.ToString(DateStyles.color);
            TimeStyles.color = Color.ToString(TimeStyles.color);
            DaysStyles.color = Color.ToString(DaysStyles.color);
            DateStyles.fontSize = `${DateStyles.fontSize}px`;
            TimeStyles.fontSize = `${TimeStyles.fontSize}px`;
            DaysStyles.fontSize = `${DaysStyles.fontSize}px`;
        }

        this.state = {
            id: this.props.id,
            height: this.props.height,
            width: this.props.width,
            title: this.props.title,
            currentTime: DateZone.timezoneDate(props.selectedTimeZoneItem.tz),
            timezoneid: props.selectedTimeZoneItem.value,
            numberStyles,
            TimezoneStyles,
            widgetBody,
            hands,
            isAnalog: this.props.isAnalog,
            displayDate: this.props.displayDate,
            displayDays: this.props.displayDays,
            selectedDateFormat: this.props.selectedDateFormat,
            selectedTimeFormat: this.props.selectedTimeFormat,
            selectedHoursFormat: this.props.selectedHoursFormat,
            digitalDate: DateZone.returnDate(props.selectedTimeZoneItem.tz, props.selectedDateFormat),
            DateStyles,
            DaysStyles,
            CurrentDayColor: Color.ToString(this.props.CurrentDayColor),
            TimeStyles,
            selectedTimeZoneItem: props.selectedTimeZoneItem
        }
    }

    componentWillReceiveProps(nextProps) {
        const { widgetBody, numberStyles, TimezoneStyles, hands, DateStyles, DaysStyles, TimeStyles } = _.cloneDeep(nextProps);

        widgetBody.ClockbackgroundColor = Color.ToString(widgetBody.ClockbackgroundColor);
        widgetBody.ClockOuterbackgroundColor = Color.ToString(widgetBody.ClockOuterbackgroundColor);
        widgetBody.clockRoundingColor = Color.ToString(widgetBody.clockRoundingColor);
        hands.secondhandcolor = Color.ToString(hands.secondhandcolor);
        hands.minutehandcolor = Color.ToString(hands.minutehandcolor);
        hands.hourhandcolor = Color.ToString(hands.hourhandcolor);

        numberStyles.color = Color.ToString(numberStyles.color);
        numberStyles.fontSize = numberStyles.fontSize;
        hands.hourhandcolor = hands.hourhandcolor;
        TimezoneStyles.color = Color.ToString(TimezoneStyles.color);
        TimezoneStyles.fontSize = `${TimezoneStyles.fontSize}px`;

        if (!nextProps.isAnalog) {
            DateStyles.color = Color.ToString(DateStyles.color);
            TimeStyles.color = Color.ToString(TimeStyles.color);
            DaysStyles.color = Color.ToString(DaysStyles.color);
            DateStyles.fontSize = `${DateStyles.fontSize}px`;
            TimeStyles.fontSize = `${TimeStyles.fontSize}px`;
            DaysStyles.fontSize = `${DaysStyles.fontSize}px`;
        }

        this.setState({
            id: nextProps.id,
            height: nextProps.height,
            width: nextProps.width,
            title: nextProps.title,
            currentTime: DateZone.timezoneDate(nextProps.selectedTimeZoneItem.tz),
            timezoneid: nextProps.selectedTimeZoneItem.value,
            numberStyles,
            TimezoneStyles,
            widgetBody,
            hands,
            isAnalog: nextProps.isAnalog,
            displayDate: nextProps.displayDate,
            displayDays: nextProps.displayDays,
            selectedDateFormat: nextProps.selectedDateFormat,
            selectedTimeFormat: nextProps.selectedTimeFormat,
            selectedHoursFormat: nextProps.selectedHoursFormat,
            digitalDate: DateZone.returnDate(nextProps.selectedTimeZoneItem.tz, nextProps.selectedDateFormat),
            DateStyles,
            DaysStyles,
            CurrentDayColor: Color.ToString(nextProps.CurrentDayColor),
            TimeStyles,
            selectedTimeZoneItem: nextProps.selectedTimeZoneItem
        });

    }

    render() {
        return (
            <div id={`${this.state.id}`} className="widget-content" style={this.state.widgetBody}>
                {
                    (this.state.isAnalog) ? <AnalogClock {...this.state} /> : <DigitalClock {...this.state} />
                }
            </div>
        );
    }
}

ClockWidget.defaultProps = {
    // width: 0,
    // height: 0,
    value: 1,
    colors: ["#FF0000", "rgb(255, 232, 0)", "#00FF00"],
    label: `${1 * 100}`,
    max: 100,
}

export default ClockWidget;