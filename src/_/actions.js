import {lf} from "../DSYNR/Utils/debug";
import {portalToggleVisibility} from "../DSYNR/Portal/_/actions";
import {getPortal} from "../DSYNR/Portal/_/utils";

export const ACTIONS = {
    SET: 'SET',
    update: 'update',
    exitCurrentScreen: 'exitCurrentScreen',
    updateScreenBody: 'updateScreenBody',
    loadScreen: 'loadScreen',
    changeScreen: 'changeScreen',
    clearAllNotifications: 'clearAllNotifications',

}

/**
 * @description Set a specific property of the app.
 * @param what Name of the property.
 * @param val Value of the property.
 * @returns {{payload: {val, what}, type: string}}
 */
export const set = (what, val) => {
    lf('set', what)
    return {
        type: ACTIONS.SET,
        payload: {
            what: what,
            val: val,
        }
    }
}

/**
 * @description Update a specific property of the app.
 * @param what Name of the property.
 * @param val Value of the property.
 * @returns {{payload: {val, what}, type: string}}
 */
export const update = (what, val) => {
    lf('update', val)
    return {
        type: ACTIONS.update,
        payload: {
            what: what,
            val: val,
        }
    }
}

export const addNewItem = (what) => {
    lf('addNewItem', what)
    return function (dispatch) {
        dispatch(portalToggleVisibility(getPortal(what)))
    }
}