import { combineReducers } from 'redux';
import sourceAddressReducer from './sourceAddressReducer';
import destinationAddressReducer from './destinationAddressReducer';
import stopsReducer from './stopsReducer';
import allarrayReducer from './allarrayReducer';
const mainMapReducer = combineReducers({
  sourceAddress: sourceAddressReducer,
  destinationAddress: destinationAddressReducer,
  stops: stopsReducer,
  allarray: allarrayReducer,

});

export default mainMapReducer;
