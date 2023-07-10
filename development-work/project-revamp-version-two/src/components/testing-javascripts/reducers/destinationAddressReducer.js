import { SET_DESTINATION_ADDRESS } from '../actions/setDestinationActions';

const initialState ='';

const destinationAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DESTINATION_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

export default destinationAddressReducer;
