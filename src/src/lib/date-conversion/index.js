const ConstantValues = require('../../constants/constantValues');
import DateType from '../enums/date-type.enum';

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
/**
 * To get the long date based on locale 
 */
export function getLongDate() {
    let dt = new Date();
    return ConstantValues.months[dt.getMonth()] + " " + dt.getDate() + " " + dt.getFullYear();
}
/**
 * To get date(mm/dd/yyyy) the based on locale
 */
export function getShortDate() {
    let dt = new Date();
    return dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
}
/**
 * To get date(dd/mm/yyyy) the based on locale
 */
export function getShortDateddmmyyyy() {
    let dt = new Date();
    return dt.getDate() + "/" + dt.getMonth() + 1 + "/" + dt.getFullYear();
}
/**
 * To get the Date Object based on timezone
 * @param {*} offsetIST 
 */
export function timezoneDate(offsetIST) {
    // if (offsetIST.tz) {
    let d = new Date();
    let utcdate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    return new Date(utcdate.getTime() - ((-offsetIST * 60) * 60000));
    // }
}


/**
 * To get the date based on timezone, it will return short or long date based paramater value
 * @param {*} offsetIST 
 * @param {*} displayDateFormat 
 */
export function returnDate(offsetIST, displayDateFormat) {
    let dt = this.timezoneDate(offsetIST);
    switch (displayDateFormat) {
        case DateType.long:
            return this.getLongDateWithTimezone(dt);
        case DateType.MMddyyyy:
            return dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getUTCFullYear();
        default:
            return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getUTCFullYear()

    }
}

/**
 * To get the date based on date, it will return short or long date based paramater value 
 * @param {*} dt 
 * @param {*} displayDateFormat 
 */
export function getDateBasedOnFormats(dt, displayDateFormat) {
    switch (displayDateFormat) {
        case "long":
            return this.getLongDateWithTimezone(dt);
        case "MMddyyyy":
            return dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getUTCFullYear();
        default:
            return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getUTCFullYear()

    }

}

/**
 *To get the long date time based  on time zone 
 * @param {*} dt 
 */
export function getLongDateWithTimezone(dt) {
    return ConstantValues.months[dt.getMonth()] + " " + dt.getDate() + " " + dt.getFullYear();
}

/**
 *To get the current day based  on time zone 
 * @param {*} dt 
 */
export function getDay(offsetIST) {
    let dt = this.timezoneDate(offsetIST);
    return dt.getDay();
}

/**
 *To get the list of days
 * @param {*} dt 
 */
export function getDays(){
    return days;
}

