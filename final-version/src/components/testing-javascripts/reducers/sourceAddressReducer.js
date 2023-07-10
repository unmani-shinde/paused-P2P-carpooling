import { SET_SOURCE_ADDRESS } from '../actions/setSourceActions';

const initialState = '';

const sourceAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOURCE_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

export default sourceAddressReducer;
