// destinationAddressActions.js
export const SET_DESTINATION_ADDRESS = 'SET_DESTINATION_ADDRESS';

const setDestinationAddress = (address) => ({
    type: 'SET_DESTINATION_ADDRESS',
    payload: address,
  });
  
  export default setDestinationAddress;
  