/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import HomeReducer from './HomeReducer';
import LoginReducer from './LoginReducer';
import ProductReducer from './ProductReducer';
import UserFBReducer from './UserFBReducer';
import {RESET} from '../actions/type';

appReducer = combineReducers({
  userReducer: UserReducer,
  homeReducer: HomeReducer,
  loginReducer: LoginReducer,
  productReducer : ProductReducer,
  userFBReducer : UserFBReducer
});

const initialState = appReducer({}, {});

export default rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = initialState;
  }

  return appReducer(state, action);
};
