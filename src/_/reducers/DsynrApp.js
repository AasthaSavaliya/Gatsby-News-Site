import {lf} from "../../DSYNR/Utils/debug";
import {updateObj} from "../../DSYNR/Utils/obj";
import {ACTIONS} from "../actions";
import {AppInitialState} from "../state";

/**
 * @description The DsynrApp reducer will process and update the app state (with the new values) passed to it via the dispatched action.
 * @param state The app state to use for this reducer. Providing initial state is optional, as the action dispatcher is anyway going to provide the latest state for the reducer to work on.
 * Providing any other state (for example formState) to this reducer will not affect anything as there is no switch-case defined, resulting in default return of the state as is.
 * If no switch-case is defined, the action will have no effect on the reducer and the default state would be returned.
 * @param action The action object that was dispatched using one of the app actions.
 * @returns {{}|*} A copy of the updated app state after being processed by the reducer.
 * @constructor
 * @summary A reducer decides what needs to be done for a certain action and updates the state provided to it based on the new values (if a switch-case is defined) supplied through the action. This state is then set as the global state of the application, replacing the previous state. That's how updates in redux work.
 */
export default function DsynrApp(state = AppInitialState, action) {
    lf('DsynrApp', state, action)

    switch (action.type) {
        //works only for first level values
        case ACTIONS.SET:
            return updateObj(state, {[action.payload.what]: action.payload.val})

        case ACTIONS.update:
            let pw = action.payload.what
            let pv = action.payload.val
            let w = state[pw]
            for (const k in pv) {
                w = updateObj(w, {...w, [k]: pv[k]})
            }
            return updateObj(state, {...state, [pw]: w})

        case ACTIONS.clearAllNotifications:
            return updateObj(state, {...state, notifications: []})

        default:
            return state
    }
}