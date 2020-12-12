/* eslint-disable prettier/prettier */
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_HOME,
  GET_HOME_FAIL,
  GET_HOME_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  RESET,
  USER_FB,
  USER_GG,
  GET_ROOM_CHAT,
  GET_ROOM_CHAT_SUCCESS,
  GET_ROOM_CHAT_FAIL,
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_FAIL,
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAIL
} from "./type";

export const resetAction = payload => ({
  type: RESET,
  payload
});
export const setUserFB = payload => ({
  type: USER_FB,
  payload
});

export const setUserGG = () => ({
  type: USER_GG
});
export const getUserInfoAction = () => ({
  type: GET_USER
});
export const getUserInfoActionSuccess = () => ({
  type: GET_USER_SUCCESS,
  payload: {}
});
export const getUserInfoActionFailed = () => ({
  type: GET_USER_FAIL,
  payload: {}
});

//actions home
export const getHomeRequest = () => ({
  type: GET_HOME,
  payload: {}
});
export const getHomeRequestSuccess = () => ({
  type: GET_HOME_SUCCESS,
  payload: {}
});
export const getHomeRequestFail = () => ({
  type: GET_HOME_FAIL,
  payload: {}
});

//action login
export const loginRequest = payload => {
  return {
    type: LOGIN,
    payload
  };
};
export const loginRequestSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};
export const loginRequestFail = payload => ({
  type: LOGIN_FAIL,
  payload
});

//actions product
export const productRequest = payload => {
  return {
    type: GET_PRODUCT,
    payload
  };
};
export const productRequestSuccess = () => ({
  type: GET_PRODUCT_SUCCESS,
  payload: {}
});
export const productRequestFail = () => ({
  type: GET_PRODUCT_FAIL,
  payload: {}
});

//actions Notification

//actions RoomChat
export const roomChatRequest = payload => {
  return {
    type: GET_ROOM_CHAT,
    payload
  };
};
export const roomChatSuccess = () => ({
  type: GET_ROOM_CHAT_SUCCESS,
  payload: {}
});
export const roomChatFail = () => ({
  type: GET_ROOM_CHAT_FAIL,
  payload: {}
});

//actions Statistic
export const statisticRequest = payload => {
  return {
    type: GET_STATISTICS,
    payload
  };
};
export const statisticSuccess = () => ({
  type: GET_STATISTICS_SUCCESS,
  payload: {}
});
export const statisticFail = () => ({
  type: GET_STATISTICS_FAIL,
  payload: {}
});

//action Movies

export const moviesRequest = payload => {
  return {
    type: GET_MOVIES,
    payload
  };
};
export const moviesSuccess = () => ({
  type: GET_MOVIES_SUCCESS,
  payload: {}
});
export const moviesFail = () => ({
  type: GET_MOVIES_FAIL,
  payload: {}
});
