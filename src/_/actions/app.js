import {lf} from "../../DSYNR/Utils/debug";
import {getAppData, getClientLoginURL, unformatToken, updateAppDataProp, updateAppNowProp} from "../utils";
import {clearCookies, getCookie} from "../../DSYNR/Utils/storage";
import {update} from "../actions";
import {APIS} from "../options";
import {fetchAPI, apiFetched_ini, setAccApis, apiFetched_options, apiFetched_records} from "./api";

require('dotenv').config()


export const signOut = () => {
    lf('signOut')
    return function (dispatch) {
        clearCookies()
        dispatch(send2Login())
    }
}

export const send2Login = () => {
    lf('send2Login')
    window.location.href = getClientLoginURL()
}

export const updateAppStatus = status => {
    return function (dispatch) {
        dispatch(updateAppNow('currentStatus', status))
    }
}
export const updateAppData = (propName, propVal, overwrite=false) => {
    return function (dispatch) {
        dispatch(update('data', updateAppDataProp(propName, propVal, overwrite)))
    }
}
export const updateAppNow = (propName, propVal) => {
    lf('updateAppNow....@', propName, propVal)
    return function (dispatch) {
        dispatch(update('now', updateAppNowProp(propName, propVal)))
    }
}
export const reAuthenticate = (from) => {
    lf('reAuthenticate', from)
    return function (dispatch) {
        // dispatch(signOut())
    }
}
export const setDomain = () => {
    lf('setDomain')
    return function (dispatch) {
        const domain = getCookie('dom')
        if (!domain) {
            dispatch(updateAppStatus('Domain validation failed'))
            dispatch(reAuthenticate('setDomain'))
            return false
        }
        dispatch(updateAppData('account', {domain: domain}))
        return domain
    }
}

/**
 * @description Populate app fetches user data from the CMS using APIs and then populates the app (aka hydration).
 * @param token
 * @returns {(function(*): void)|*}
 */
export const populateApp = (token) => {
    lf('populateApp', token)
    return function (dispatch) {

        const onSubmitError = () => {
            lf('onSubmitError.........................')
            dispatch(updateAppStatus('onSubmitError...'))
            // send2Login()
        }

        dispatch(updateAppNow('isInitialised', true))

        // dispatch(updateAppStatus('Loading core data...'))
        dispatch(fetchAPI(APIS.ini, token, (response) => {
            // alert(1)

            dispatch(apiFetched_ini(response.data))
            // alert(2)

            lf('Loading datasets...')
            // dispatch(updateAppStatus('Loading datasets...'))
            dispatch(fetchAPI(APIS.opt, token, (response) => {
                dispatch(apiFetched_options(response.data))

                // dispatch(updateAppStatus('Loading user data...'))
                dispatch(fetchAPI(APIS.users, token, (response) => {


                    dispatch(updateAppNow('isDataLoaded', true))
                    dispatch(updateAppStatus('App Data Loaded. Ready for you!'))

                    let data = response.data
                    data.recordType = 'user'
                    dispatch(apiFetched_records(data))
                }, onSubmitError))
            }, onSubmitError))
        }, onSubmitError))
    }
}