import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import tableJl1805 from '../components/Helpers/TableJL1805/redux/reducer';
import app from './app/reducer';
import header from './header/reducer';
import notifications from './notifications/reducer';
import tableJl1805 from './tableJL1805/reducer';

export default createStore(combineReducers({
	app,
	header,
	notifications,
	tableJl1805
}), applyMiddleware(thunk));
