// Action Types
export const SET_DESTINATION_ADDRESS = 'SET_DESTINATION_ADDRESS';

// Action Creator
export const setDestinationAddress = (address) => {
  return {
    type: SET_DESTINATION_ADDRESS,
    payload: address,
  };
};

export default setDestinationAddress;