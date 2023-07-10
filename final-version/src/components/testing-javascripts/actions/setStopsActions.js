// Action Types
export const SET_STOPS = 'SET_STOPS';

// Action Creator
export const setStops = (address) => {
  return {
    type: SET_STOPS,
    payload: address,
  };
};

export default setStops;
