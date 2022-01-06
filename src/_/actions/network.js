import {lf} from "../../DSYNR/Utils/debug";
import {updateAppData, updateAppNow, updateAppStatus} from "./app";
import {fetchAPI} from "./api";
import {STORE} from "../store";
import {APIS} from "../options";
import {getAppAccount, getAppNow} from "../utils";

/**
 * @description Fetches the latest updates from the CMS by calling APIS.sup and then updates the app using updateAppData
 * @see APIS.sup
 */
export const getServerUpdates = () => {
    lf('getServerUpdates...')
    // pauseBackgroundServerUpdates()

    STORE.dispatch(updateAppStatus('Checking for updates...'))
    if (!getAppNow('isUpdating')) {
        STORE.dispatch(updateAppNow('isUpdating', true))
        STORE.dispatch(fetchAPI(
            APIS.sup,
            getAppAccount('token'),
            data => {
                lf('.....updates fetched', data.data)

                const d = data.data
                Object.keys(d).map(propName => {
                    lf('.....updates fetched-->>>>>', propName, d[propName])
                    STORE.dispatch(updateAppData(propName, d[propName], true))
                })

                STORE.dispatch(updateAppNow('isUpdating', false))
                STORE.dispatch(updateAppStatus('App is up-to-date!'))
            }, err => {
                STORE.dispatch(updateAppStatus('Failed to update.'))
            }))
    }
}
/**
 * @description Pauses the realtime updates by clearing the value of interval set in startBackgroundServerUpdates
 * @see startBackgroundServerUpdates
 */
export const pauseBackgroundServerUpdates = () => {
    const realtimeUpdatesInterval = getAppNow('realtimeUpdatesInterval')
    if (realtimeUpdatesInterval) {
        lf('pauseBackgroundServerUpdates', realtimeUpdatesInterval)
        clearInterval(realtimeUpdatesInterval)
        STORE.dispatch(
            updateAppNow(
                'realtimeUpdatesInterval', false
            )
        )
    }
}
/**
 * @description Sets an interval to execute getServerUpdates
 * @see getServerUpdates
 * @param realtimeUpdatesFrequency The frequency of the interval in minutes
 */
export const startBackgroundServerUpdates = (realtimeUpdatesFrequency) => {
    const realtimeUpdatesInterval = getAppNow('realtimeUpdatesInterval')
    lf('startBackgroundServerUpdates', realtimeUpdatesInterval)
    STORE.dispatch(
        updateAppNow(
            'realtimeUpdatesInterval',
            setInterval(getServerUpdates, realtimeUpdatesFrequency)
        )
    )
}
/**
 * @description Starts realtime updates if isRealtimeUpdatesEnabled && !isRealtimeUpdatesActive.
 * @hint Notice the chart, nothing to stress if you cant understand, just have a feel of things and take it easy!
 * @see startBackgroundServerUpdates
 * @param realtimeUpdatesFrequency
 */
export const enableBackgroundServerUpdates = (realtimeUpdatesFrequency) => {
    if (realtimeUpdatesFrequency > 0
        && getAppNow('isRealtimeUpdatesEnabled')
        && !getAppNow('isRealtimeUpdatesActive')) {
        lf('enableBackgroundServerUpdates')
        STORE.dispatch(updateAppNow('isRealtimeUpdatesActive', true))
        startBackgroundServerUpdates(realtimeUpdatesFrequency)
    }
}

/**
 * @description Updates the state of internet connection depending on the connection object.
 * @param connection
 * @returns {(function(*): void)|*}
 */
export const updateNetworkStatus = (connection) => {
    lf('updateNetworkStatus', connection)
    return function (dispatch) {
        if (connection !== undefined && connection.rtt === 0) {
            dispatch(updateAppNow('isOnline', false))
            dispatch(updateAppStatus('You are offline'))
            // dispatch(update('network', {isOnline: false}))
        } else {
            dispatch(updateAppNow('isOnline', true))
            dispatch(updateAppStatus('You are now online'))
            // dispatch(update('network', {isOnline: true}))
        }
        dispatch(updateAppNow('netConnection', connection))
        // update('network', {connection: connection})
    }
}
/**
 * @description Shows or hides the network connection information
 * @param {boolean} show Whether to show or hide the information
 * @returns {(function(*): void)|*}
 */
export const toggleNetworkInfo = (show = true) => {
    return function (dispatch) {
        dispatch(updateAppNow('isConnectionInfoVisible', show))
        // dispatch(update('network', {isInfoVisible: show}))
    }
}