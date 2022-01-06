import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, compose, createStore} from 'redux'
import loggerMiddleware from './middleware/logger'
// import {routerMiddleware} from 'connected-react-router'
import createRootReducer from "./reducers";
import {createBrowserHistory} from "history";
import {AppInitialState} from "./state";

/**
 * @description Setup the initial store settings using reducers, initial state, enhancers, etc.
 * @param preloadedState
 * @returns {Store}
 * @see https://redux-toolkit.js.org/api/configureStore configureStore
 * @see createStore
 */
export default function configureStore(preloadedState = AppInitialState) {

	const middlewares = [thunkMiddleware, loggerMiddleware]
	const middlewareEnhancer = applyMiddleware(...middlewares)

	const enhancers = [middlewareEnhancer]

	const composedEnhancers = compose(...enhancers)

	return createStore(
		createRootReducer(),
		preloadedState,
		composedEnhancers,
	)
}

export const HISTORY = createBrowserHistory()

/**
 * @description Store comprises initial state of the application, all the reducers (consolidated into a single rootReducer) and other optional enhancements. Without the store, it is not possible to use a redux app.
 * The only way to update properties (state) in an app is to update the store which is accessible by the whole app.
 * This is done by dispatching actions which are then processed by their corresponding reducers.
 * @type {Store}
 * @summary The global state of the application.
 */
export const STORE = configureStore()