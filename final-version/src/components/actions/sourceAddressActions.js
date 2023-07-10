// sourceAddressActions.js
export const SET_SOURCE_ADDRESS = 'SET_SOURCE_ADDRESS';

const setSourceAddress = (address) => ({
    type: 'SET_SOURCE_ADDRESS',
    payload: address,
  });
  
  export default setSourceAddress;
  