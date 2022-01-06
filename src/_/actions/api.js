import {lf} from "../../DSYNR/Utils/debug";
import {networkRequest} from "../../DSYNR/Utils/network";
import {reAuthenticate, updateAppData, updateAppNow, updateAppStatus} from "./app";
import {getAppData, updateAccountAPIs} from "../utils";
import {update} from "../actions";
import {APIS, AppOptions} from "../options";
import {STORE} from "../store";
import {postData} from "../../DSYNR/Form/_/form/actions";

export const fetchAPI = (URI, token, onSubmitSuccess = null, onSubmitError = null) => {
	lf('fetchAPI@', URI, token)
	return async function (dispatch) {
		//@todo dispatch('somthing like show loader...')
		let response = await networkRequest(URI, false, token)

		lf('fetchAPI+++++++++++++++@', URI, response)

		if (response.type === 'cors') {
			//Fetch succeeded, validate response
			if (response.status === 200) {
				onSubmitSuccess(response)
			} else {
				//403 other?
				lf(403)
				onSubmitError()
				dispatch(reAuthenticate())
			}
		} else {
			//Fetch failed, network issue
			// dispatch(networkFailure(formID, response))
			lf('network issue')
			onSubmitError()
		}
	}
}

/**
 * Add datasets like users to app.data
 * @param data
 * @returns {(function(*): void)|*}
 */
export const apiFetched_records = data => {
	lf('apiFetched_records', data)
	const recordType = `${data.recordType}s`
	delete data.recordType
	lf(data, recordType, '...........data')
	return function (dispatch) {
		// dispatch(set([recordType], data))
		dispatch(updateAppData(recordType, data))
	}
}
export const apiFetched_options = data => {
	lf('apiFetched_options', data)
	return function (dispatch) {
		for (const cptName in data) {
			const cptData = data[cptName]

			if (cptName === 'user') {
				//update the static default generic AppOptions.options.userRoles with business specific roles
				AppOptions.options.userRoles = {...cptData.role, ...AppOptions.options.userRoles}
			} else {
				dispatch(update('options', {[cptName]: cptData}))
			}
		}
	}
}
export const apiFetched_ini = data => {
	lf('apiFetched_ini', data)
	return function (dispatch) {
		for (const kname in data) {

			// lf(kname, data[kname], '..............................')
			dispatch(updateAppData([kname], data[kname]))
			if (kname === 'pref') {
				queueMicrotask(() => {
					//home screens may uses user.fname but data.user comes after data.pref, que to run at end
					dispatch(updateAppNow('currentScreen', data[kname]['defaultScreen']))
				})
			}
		}
		// dispatch(changeScreen('dashboard'))
	}
}
/**
 * @description Updates the URLs of APIs based on whether the user is logged in.
 * Login has been bypassed for you, so dont worry bout the sign-in process.
 * @param domain
 * @returns {(function(*): void)|*}
 */
export const setAccApis = (domain) => {

	return function (dispatch) {
        dispatch(updateAppData('account', {isLogged: true}))
		updateAccountAPIs(domain)
		dispatch(updateAppStatus(<>Loading app data for <pre className='text-info'>{domain}</pre></>))
	}
}

/**
 * @description Ping the CMS to check if the email provided is already present.
 * @param email The email to check for.
 * @returns {Promise<boolean>} Returns true if email exists, otherwise false.
 */
export const userExists = async email => {
	let response = await STORE.dispatch(postData(
		APIS.ue, {e: email},
		getAppData('account').token
	))
	return response.data
}