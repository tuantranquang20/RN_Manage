/* eslint-disable prettier/prettier */
import {watchGetUser, watchGetHome, watchLogin, watchGetProduct} from './NetworkSaga';

export default function* rootSaga() {
  yield watchGetUser;
  yield watchGetHome;
  yield watchLogin;
  yield watchGetProduct;
}
