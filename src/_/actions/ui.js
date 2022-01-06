import {lf} from "../../DSYNR/Utils/debug";
import {ACTIONS} from "../actions";
import {updateAppNow} from "./app";

export const showNotificationPanel = () => {
    lf('showNotificationPanel')
    return function (dispatch) {
        dispatch(updateAppNow('isNotificationsVisible', true))
        dispatch(blurMainScreen())
    }
}
export const hideNotificationPanel = () => {
    lf('hideNotificationPanel')
    return function (dispatch) {
        dispatch(updateAppNow('isNotificationsVisible', false))
        dispatch(focusMainScreen())
    }
}
export const hideMenuPanel = () => {
    lf('hideMenuPanel')
    return function (dispatch) {
        dispatch(updateAppNow('isDashboardVisible', false))
        dispatch(focusMainScreen())
    }
}
export const showMenuPanel = () => {
    lf('showMenuPanel')
    return function (dispatch) {
        dispatch(updateAppNow('isDashboardVisible', true))
        dispatch(blurMainScreen())
    }
}
//@todo bug with count clearance?
export const clearAllNotifications = () => {
    lf('clearAllNotifications')
    return {
        type: ACTIONS.clearAllNotifications,
    }
}
export const changeScreen = (screenName) => {
    lf('changeScreen', screenName)
    return function (dispatch) {
        dispatch(exitCurrentScreen(screenName))
        dispatch(loadScreen(screenName))
    }
}
export const loadScreen = (screenName) => {
    lf('loadScreen', screenName)
    return {
        type: ACTIONS.loadScreen,
        payload: {
            screenName: screenName
        }
    }
}
export const exitCurrentScreen = () => {
    lf('exitCurrentScreen')
    return {
        type: ACTIONS.exitCurrentScreen,
    }
}
export const updateScreenBody = (screenName, body) => {
    lf('updateScreenBody')
    return {
        type: ACTIONS.updateScreenBody,
        payload: {
            screenName: screenName,
            body: body
        }
    }
}
export const focusMainScreen = () => {
    lf('focusMainScreen')
    return function (dispatch) {
        dispatch(updateAppNow('isMainScreenFocused', true))
    }
}
export const blurMainScreen = () => {
    return function (dispatch) {
        dispatch(updateAppNow('isMainScreenFocused', false))
    }
}