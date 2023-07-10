import { APPEND_ALLARRAY } from '../components/actions/allarrayActions';

const allarrayReducer = (state = [], action) => {
  switch (action.type) {
    case APPEND_ALLARRAY:
      action.payload.forEach((element) => {
        state.push(element);
      });
      return state;
    default:
      return state;
  }
};

export default allarrayReducer;
