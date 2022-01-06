import {combineReducers} from "redux"
import DsynrApp from "./DsynrApp"
import DsynrPortals from "../../DSYNR/Portal/_/reducers";
import DsynrForms from "../../DSYNR/Form/_/reducers";

/**
 * @description The createRootReducer function combines multiple reducers into one single reducer known as the root reducer.
 * This reducer is then used throughout the application. All the corresponding stores for each and every reducer are automatically combined into a single app state.
 * @returns {} Single reducer (root-reducer) for the whole app.
 * @summary Consolidate multiple reducers into a single reducer.
 * @see https://redux.js.org/usage/structuring-reducers/using-combinereducers Using combineReducers
 */
const createRootReducer = () => combineReducers({
	app: DsynrApp,
	forms: DsynrForms,
	portals: DsynrPortals,
	//... add other reducers here
})
export default createRootReducer