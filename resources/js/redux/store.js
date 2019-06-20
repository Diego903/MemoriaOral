import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import tableJl1805 from '../components/Helpers/TableJL1805/redux/reducer';
import app from './app/reducer';
import header from './header/reducer';
import notifications from './notifications/reducer';

export default createStore(combineReducers({
	app,
	header,
	notifications
}), applyMiddleware(thunk));
