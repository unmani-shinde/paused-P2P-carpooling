// actions.js

export const SET_SOURCE_LOCATION = "SET_SOURCE_LOCATION";
export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION";

export const setSourceLocation = (location) => ({
  type: SET_SOURCE_LOCATION,
  payload: location,
});

export const setDestinationLocation = (location) => ({
  type: SET_DESTINATION_LOCATION,
  payload: location,
});
