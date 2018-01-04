import React from 'react';
import '../styles.css';
import * as  DateZone from '../../../../lib/date-conversion';

export default class DigitalClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            currentDay: DateZone.getDay(this.props.selectedTimeZoneItem.tz),
            days: DateZone.getDays()
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps,
            currentDay: DateZone.getDay(nextProps.selectedTimeZoneItem.tz)
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.loadInterval = setInterval(() => {
                const
                    takeTwelve = (n, h) => n > 12 ? n - h : n,
                    addZero = n => n < 10 ? "0" + n : n;
                let dateTime, h, m, s, t, amPm;
                var k = this.props.selectedHoursFormat == 1 ? 0 : 12;
                dateTime = DateZone.timezoneDate(this.props.selectedTimeZoneItem.tz);
                // console.log(d, 'digital',this.props.selectedTimeZoneItem.tz)
                h = addZero(takeTwelve(dateTime.getHours(), k));
                m = addZero(dateTime.getMinutes());
                s = addZero(dateTime.getSeconds());
                t = this.state.selectedTimeFormat == 1 ? `${h}:${m}:${s}` : `${h}:${m}`;

                amPm = dateTime.getHours() >= 12 ? "PM" : "AM";
                this.loadInterval && this.setState({
                    time: { h, m, s },
                    amPm: this.props.selectedHoursFormat == 1 ? "" : amPm,
                });
            }, 1000);
        }, 1000 - DateZone.timezoneDate(this.props.selectedTimeZoneItem.tz).getUTCMilliseconds())
    }

    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval);
    }

    render() {
        return (
            < div className="container-fluid text-center" style={{ height: '100%' }} >
                <div className="row" style={{ height: '100%', backgroundColor: this.props.widgetBody.ClockOuterbackgroundColor }}>
                    <div className="col-xs-12 padding-none" style={{ height: '100%' }}>
                        <div className="clock" style={{ height: '100%' }}>
                            <div id="clockTitle" style={{ fontSize: this.props.TimezoneStyles.fontSize, color: this.props.TimezoneStyles.color }} className="clock-title">
                                <p>{this.props.title}</p>
                            </div>
                            <div className="inside" style={{ backgroundColor: this.props.widgetBody.ClockbackgroundColor }}>
                                <div className="content">
                                    {
                                        this.props.displayDays ? <p className='days' style={{ fontSize: this.props.DaysStyles.fontSize }}>
                                            {
                                                _.map(this.state.days, (day, i) => {
                                                    return <span key={i} style={{ color: i == this.state.currentDay ? this.props.CurrentDayColor : this.props.DaysStyles.color }}>{day}</span>
                                                })
                                            }
                                        </p> : null
                                    }
                                    {
                                        this.state.time ? <p className='time' style={{ fontSize: this.state.TimeStyles.fontSize, color: this.state.TimeStyles.color }}>
                                            <span id='hours'>{this.state.time.h}</span>
                                            <span className="separator">:</span>
                                            <span id='min'>{this.state.time.m}</span>
                                            {
                                                this.state.selectedTimeFormat == 1 ? <span>
                                                    <span className="separator">:</span>
                                                    <span id='sec'>{this.state.time.s}</span>
                                                </span> : ""
                                            }
                                            <span id='period'>{this.state.amPm}</span>
                                        </p> : null
                                    }
                                    {
                                        this.state.displayDate ?
                                            <p className='date' style={{ fontSize: this.props.DateStyles.fontSize, color: this.props.DateStyles.color }} >
                                                <span id='cal'>
                                                    <i className="fa fa-calendar fa-lg"></i>
                                                </span>
                                                {this.state.digitalDate}
                                            </p> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
