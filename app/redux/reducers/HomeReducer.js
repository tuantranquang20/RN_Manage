import {GET_HOME, GET_HOME_SUCCESS, GET_HOME_FAIL} from '../actions/type';

const initialState = {
  data: {},
  isLoading: true,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOME: {
      return {...state, isLoading: true};
    }
    case GET_HOME_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    }
    case GET_HOME_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
