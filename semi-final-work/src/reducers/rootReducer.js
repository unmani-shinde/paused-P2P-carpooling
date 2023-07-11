// rootReducer.js
import { combineReducers } from 'redux';
import allarrayReducer from '../reducers/allarrayReducer';


const rootReducer = combineReducers({
  allarray: allarrayReducer,
});

export default rootReducer;
