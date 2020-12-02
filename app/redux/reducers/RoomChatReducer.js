/* eslint-disable prettier/prettier */
import reactotron from 'reactotron-react-native';
import {
    GET_ROOM_CHAT,
    GET_ROOM_CHAT_SUCCESS,
    GET_ROOM_CHAT_FAIL
  } from '../actions/type';
  
  const initialState = {
    data: [],
    isLoading: true,
    error: null,
  };
  
  //có loadmore
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_ROOM_CHAT: {
        return {...state, isLoading: true};
      }
      case GET_ROOM_CHAT_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          error: null,
          data: action?.payload?.data,
        };
      }
      case GET_ROOM_CHAT_FAIL: {
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
  