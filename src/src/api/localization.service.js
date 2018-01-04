import Constants from "../constants/apiUrl";
import * as service from "./service";

export function getLocaleData(culture) {
    return service.axiosGet(Constants.LOCALE_BASE + '/' + culture);
}

export function GenerateNormalizedStringsFile(col) {
    return service.axiosPost(Constants.LOCALE_GENERATE, col);
}

export function GenerateNormalizedStrings(col) {
    return service.axiosPost(Constants.LOCALE_NORMALIZE, col);
}