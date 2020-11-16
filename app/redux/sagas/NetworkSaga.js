/* eslint-disable prettier/prettier */
import {put, takeEvery, call} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_HOME,
  GET_HOME_SUCCESS,
  GET_HOME_FAIL,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS
} from '../actions/type';

import * as API from '../../constants/Api';

export function* getUserInforSaga(payload) {
  try {
    const response = yield call(API.requestLogin, payload);
    yield put({type: GET_USER_SUCCESS, payload: response});
  } catch (err) {
    yield put({type: GET_USER_FAIL, payload: err});
  }
}
export function* getDataHomeSaga(payload) {
  try {
    const response = yield call(API.requestHomeData, payload);
    yield put({type: GET_HOME_SUCCESS, payload: response});
  } catch (err) {
    yield put({type: GET_HOME_FAIL, payload: err});
  }
}
export function* loginSaga(payload) {
  try {
    const response = yield call(API.requestLogin, payload.payload);
    yield put({type: LOGIN_SUCCESS, payload: response});
  } catch (err) {
    console.log(err);
    yield put({type: LOGIN_FAIL, payload: err});
  }
}
export function* getProductSaga(payload) {
  try {
    const response = yield call(API.requestProduct, payload);
    yield put({type: GET_PRODUCT_SUCCESS, payload: response});
  } catch (err) {
    console.log(err);
    yield put({type: GET_PRODUCT_FAIL, payload: err});
  }
}
export const watchGetUser = takeEvery(GET_USER, getUserInforSaga);
export const watchGetHome = takeEvery(GET_HOME, getDataHomeSaga);
export const watchLogin = takeEvery(LOGIN, loginSaga);
export const watchGetProduct = takeEvery(GET_PRODUCT, getProductSaga);
