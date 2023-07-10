// Action Types
export const SET_SOURCE_ADDRESS = 'SET_SOURCE_ADDRESS';

// Action Creator
export const setSourceAddress = (address) => {
  return {
    type: SET_SOURCE_ADDRESS,
    payload: address,
  };
};

export default setSourceAddress;
