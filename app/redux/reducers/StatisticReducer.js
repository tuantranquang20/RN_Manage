import reactotron from "reactotron-react-native";
import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_FAIL
} from "../actions/type";

const initialState = {
  data: [],
  isLoading: true,
  error: null
};

//có loadmore
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATISTICS: {
      return { ...state, isLoading: true };
    }
    case GET_STATISTICS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action?.payload?.data
      };
    }
    case GET_STATISTICS_FAIL: {
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
