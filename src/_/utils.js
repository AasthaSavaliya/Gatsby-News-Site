import {lf} from "../DSYNR/Utils/debug";
import React from "react";
import {APIS, AppFormDefaults, AppOptions} from "./options";
import {updateObj} from "../DSYNR/Utils/obj";
import {getState} from "../DSYNR/Utils/react";
import {STORE} from "./store";
import {portalToggleVisibility} from "../DSYNR/Portal/_/actions";
import {getPortal} from "../DSYNR/Portal/_/utils";
import {DsynrFormOptions} from "../DSYNR/Form/_/options";
import {ControlActions, formControlToggleVisibility} from "../DSYNR/Form/_/control/actions";
import {getFormControl} from "../DSYNR/Form/_/utils";
import {Button} from "react-bootstrap";

export const unformatToken = (dsynrFormattedTokens) => {
	lf('unformatToken', dsynrFormattedTokens)
	let dsynrAppCMSToken = ''

	const DSYNR_SALT = 'dsynr';
	const DSYNR_SALT_A = 'a';

	let dsynrFormattedTokensLength = 0
	dsynrFormattedTokens.map((dftSlice, i) => {
		if (
			dftSlice.charAt(dftSlice.length - 1) === DSYNR_SALT.charAt(i) ||
			dftSlice.charAt(dftSlice.length - 1) === DSYNR_SALT_A.charAt(0)
		) {
			dftSlice = dftSlice.substr(2, dftSlice.length - 3)
			dsynrAppCMSToken += dftSlice
			dsynrFormattedTokensLength++
		}
	})
	if (dsynrFormattedTokensLength !== DSYNR_SALT.length + DSYNR_SALT_A.length) {
		return false
	}
	return dsynrAppCMSToken
}

export const getAppFormControlDefaults = ({...customProps}) => {
	return {
		...DsynrFormOptions.Form.Control.Props,
		...AppFormDefaults.ControlProps,
		...customProps
	}
}

export const updateApp = (app, propName, propVal) => {
	return updateObj(app, {[propName]: propVal})
}

const getAppProp = (propName, dataset) => {
	let appPropDataset = getState('app', propName)
	return dataset ? appPropDataset[dataset] : appPropDataset
}

export const updateAppProp = (propName, datasetName, data, overwrite = false) => {
	let appPropData = getAppProp(propName)
	//@todo is this working safely? MOSTLY YES, ENSURE AND OPTIMISE
	let appPropDataSet = appPropData[datasetName]
	switch (typeof data) {
		case "object":
			// lf('updateAppProp.......@appPropDataSet OBJ', propName, appPropData, appPropDataSet, data)
			appPropDataSet = overwrite ? data : updateObj(appPropDataSet, data)
			break
		default:
			appPropDataSet = data
		// lf('updateAppProp.......@appPropDataSet STRING', appPropDataSet, data, typeof appPropDataSet)
	}
	return updateObj(appPropData, {[datasetName]: appPropDataSet})
	// return updateObj(appPropData, {[datasetName]: appPropDataSet})
	// lf('updateAppProp....@', propName, datasetName, data, appPropDataSet)
	// lf('appPropDataSet....@', appPropDataSet, typeof appPropDataSet, appPropData, typeof appPropData)
}

export const updateAppDataProp = (propName, propVal, overwrite = false) => {
	return updateAppProp('data', propName, propVal, overwrite)
}

export const updateAppOptionProp = (propName, propVal, overwrite = false) => {
	return updateAppProp('options', propName, propVal, overwrite)
}

/**
 * @use updateAppData for simplicity
 * @param propName
 * @param propVal
 * @param overwrite
 * @returns {*}
 */
export const updateAppNowProp = (propName, propVal, overwrite = false) => {
	return updateAppProp('now', propName, propVal, overwrite)
}

export const getAppNow = datum => {
	return getAppProp('now', datum)
}

export const getAppData = (dataset) => {
	return getAppProp('data', dataset)
}

export const getAppAccount = (propName) => {
	return getAppData('account')[propName]
}

export const getAppOptions = dataset => {
	return getAppProp('options', dataset)
}

export const getAppPref = propName => {
	return getAppData('pref')[propName]
}

export const updateAccountAPIs = domain => {
	for (const slug in APIS) {
		APIS[slug] = 'https://' + domain + '/api/dsynr/' + slug
	}
	lf('APIS..........', APIS)
}

export const getClientLoginURL = () => {
	let url = getAppData('account').domain
	url = url ? ('account.' + url) :
		process.env.NODE_ENV === 'development' ?
			process.env.REACT_APP_DEV_ACC : process.env.REACT_APP_PROD_ACC
	return 'https://' + url
}

export const getGenderSpecificTitles = (genderKey, cid, fid) => {
	let titlesOptions = {}
	if (genderKey == 0) {//@todo remove dependency on hardCoded 0 and match it to defaultGender?
		STORE.dispatch(formControlToggleVisibility(getFormControl(fid, cid), false))
	} else {
		STORE.dispatch(formControlToggleVisibility(getFormControl(fid, cid)))
		let gender = AppOptions.options.genders[genderKey]
		// lf('genderKey...........@genderKey', gender, genderKey)
		if (gender.titles) { //@todo update onChange
			for (const title in gender.titles) {
				// lf('title...........@title', title)
				titlesOptions[title] = gender.titles[title]
			}
			lf('title...........@titlesOptions', titlesOptions)
			// STORE.dispatch(ControlActions.updateControlProp(getFormControl(fid, cid), 'updatedOptions', titlesOptions))
		}
	}
	// lf('@getGenderSpecificTitles................', genderKey, cid, fid, titlesOptions)
	return titlesOptions
}

export const dispatchSample = () => { //@todo is this being used?
	STORE.dispatch(portalToggleVisibility(getPortal('user')))
}

export const annihilateTheUniverse = () => {
	alert('Like seriously?')
	alert('You just destroyed the universe...')
	alert('SEE YOU IN THE AFTER WORLD.....')
	document.getElementById('app').remove()
	document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://images.pexels.com/photos/4022098/pexels-photo-4022098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')"
	document.getElementsByTagName('body')[0].style.backgroundSize = "cover"
}

export const whoAteYourTomatoes = () => {
	alert('You had to click eh?')
	document.getElementsByTagName('body')[0].innerHTML = '<a href="https://www.facebook.com/groups/videosgifs1/permalink/1312071175929745/">STOP already! (or the slug will eat away your tomato.)</a>'
}

export const bzzz = () => {
	alert("You didn't really expect this was a full-fledged application, did you now?!")
	alert("Anyway, keep clicking randomly, who knows where you end up ;)")
	alert("YOU HAVE BEEN WARNED.")
	alert("the only thing you can do now is, click that OK button, DUH!")
	alert("AND then, nothing will happen.")
	setTimeout(() => {
		alert("TOLD YA! Nothing will happen :/")
		setTimeout(() => {
			alert("But seriously, did you expect anything?")

		}, 3000)
	}, 10000)
}

export const youAreDoomed = () => {
	alert("Awww, how thoughtful :)")
	window.location.href = 'https://www.instagram.com/mystiqa_'
}


export function get_rand_decimal(min, max, decimalDigits) {
	if (decimalDigits === void 0) {
		decimalDigits = 2;
	}
	return (Math.random() * (min - max) + max).toFixed(decimalDigits);
}

export function get_rand_number(min, max) {
	if (min === void 0) {
		min = 0;
	}
	if (max === void 0) {
		max = 255;
	}
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function get_rand_opacity(min, max) {
	if (min === void 0) {
		min = 0.1;
	}
	if (max === void 0) {
		max = 1;
	}
	return get_rand_decimal(min, max);
}

export function get_rand_colour_rgb() {
	return 'rgb(' + get_rand_number() + ',' + get_rand_number() + ',' + get_rand_number() + ')';
}

export function get_rand_colour_rgba(minOpacity, maxOpacity) {
	if (minOpacity === void 0) {
		minOpacity = 0.1;
	}
	if (maxOpacity === void 0) {
		maxOpacity = 1;
	}
	return get_rand_colour_rgb().replace('rgb(', 'rgba(').replace(')', ',' + get_rand_decimal(minOpacity, maxOpacity) + ')');
}

export function get_rand_colour_hex() {
	return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
}