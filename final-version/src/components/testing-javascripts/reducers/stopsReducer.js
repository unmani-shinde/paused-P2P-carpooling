import { SET_STOPS } from "../actions/setStopsActions";

const initialState = '';

const stopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STOPS:
      return action.payload;
    default:
      return state;
  }
};

export default stopsReducer;
