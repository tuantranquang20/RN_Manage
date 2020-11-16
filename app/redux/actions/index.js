/* eslint-disable prettier/prettier */
import {
  GET_USER,
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
} from './type';

export const resetAction = (payload) => ({
  type: RESET,
  payload,
});
export const setUserFB = (payload) => ({
  type: USER_FB,
  payload,
});

export const setUserGG = () => ({
  type: USER_GG,
});
export const getUserInfoAction = () => ({
  type: GET_USER,
  payload: {},
});

//actions home
export const getHomeRequest = () => ({
  type: GET_HOME,
  payload: {},
});
export const getHomeRequestSuccess = () => ({
  type: GET_HOME_SUCCESS,
  payload: {},
});
export const getHomeRequestFail = () => ({
  type: GET_HOME_FAIL,
  payload: {},
});

//action login
export const loginRequest = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};
export const loginRequestSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
export const loginRequestFail = (payload) => ({
  type: LOGIN_FAIL,
  payload,
});

//actions product
export const productRequest = (payload) => {
  return {
    type: GET_PRODUCT,
    payload,
  };
};
export const productRequestSuccess = () => ({
  type: GET_PRODUCT_SUCCESS,
  payload: {},
});
export const productRequestFail = () => ({
  type: GET_PRODUCT_FAIL,
  payload: {},
});

//actions Notification
