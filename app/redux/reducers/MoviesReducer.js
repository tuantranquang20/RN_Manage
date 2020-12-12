/* eslint-disable prettier/prettier */
import {
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAIL
} from "../actions/type";

const initialState = {
  data: [],
  isLoading: true,
  error: null
};

//có loadmore
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES: {
      return { ...state, isLoading: true };
    }
    case GET_MOVIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action?.payload?.data
      };
    }
    case GET_MOVIES_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    default:
      return state;
  }
}
