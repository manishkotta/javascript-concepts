import { connect } from 'react-redux';
import ClockSettings from "./clock-settings.component";
import * as Reducer from './clock-settings.reducer';
import * as LocMan from '../../../localization/localization.manager';
import { PageEnums } from '../../../localization/collection';

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedHoursFormat: (selectedHoursFormat) => {
            if (selectedHoursFormat && selectedHoursFormat.value) {
                dispatch(Reducer.setSelectedHoursFormatAction(selectedHoursFormat));
            }
        },
        setSelectedTimeFormat: (selectedTimeFormat) => {
            if (selectedTimeFormat && selectedTimeFormat.value) {
                dispatch(Reducer.setSelectedTimeFormatAction(selectedTimeFormat));
            }
        },
        setSelectedDateFormat: (selectedDateFormat) => {
            if (selectedDateFormat && selectedDateFormat.value) {
                dispatch(Reducer.setSelectedDateFormatAction(selectedDateFormat));
            }
        },
        setSelectedTimeZone: (selectedTimeZoneItem) => {
            if (selectedTimeZoneItem) {
                dispatch(Reducer.setSelectedTimeZoneAction(selectedTimeZoneItem));
            }
        },
        setTimeZonelabel: (tzoneText) => {
            dispatch(Reducer.setTimeZonelabelAction(tzoneText));
        },
        updateWidgetSettings: (prop) => {
            if (prop) {
                dispatch(Reducer.updateWidgetAction(prop.clock, prop.widget.id))
            }
        },
        updateClock: (isAnalog) => {
            dispatch(Reducer.updateClocklAction(isAnalog))
        },
        updateDisplayDate: (displayDate) => {
            dispatch(Reducer.updateDisplayDateAction(displayDate))
        },
        updateDisplayDays: (displayDays) => {
            dispatch(Reducer.updateDisplayDaysAction(displayDays))
        },
        initializeClocksettings: (data) => {
            dispatch(Reducer.initializeClocksettings(data))
        }
    }
}
const mapStateToProps = (state) => ({
    clock: state.clock,
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.WIDGET_SETTINGS)
})
export default connect(mapStateToProps, mapDispatchToProps)(ClockSettings)  