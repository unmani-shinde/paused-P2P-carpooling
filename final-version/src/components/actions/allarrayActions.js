// allarrayActions.js

// allarrayActions.js

export const APPEND_ALLARRAY = 'APPEND_ALLARRAY';

export const appendAllarray = (rideData) => {
  return {
    type: APPEND_ALLARRAY,
    payload: rideData,
  };
};


export default appendAllarray;
