/* eslint-disable prettier/prettier */
import {
  GET_PRODUCT,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
} from '../actions/type';

const initialState = {
  data: {},
  isLoading: true,
  error: null,
};

//có loadmore
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT: {
      return {...state, isLoading: true};
    }
    case GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action?.payload?.data,
      };
    }
    case GET_PRODUCT_FAIL: {
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
