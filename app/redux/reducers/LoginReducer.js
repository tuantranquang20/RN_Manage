/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-community/async-storage";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/type";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
  token: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, isLoading: true };
    }
    case LOGIN_SUCCESS: {
      (async () => {
        // console.log(, "user Đang nhap");
        try {
          await AsyncStorage.setItem(
            "USER_APP",
            JSON.stringify(action.payload?.data?.user)
          );
        } catch (error) {
          console.log(error);
        }
      })();
      return {
        ...state,
        isLoading: true,
        error: null,
        data: action.payload?.data,
        token: action.payload?.token
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        error: true,
        isLoading: false
      };
    }
    default:
      return state;
  }
}
