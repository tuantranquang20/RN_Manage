/* eslint-disable prettier/prettier */
import {
  watchGetUser,
  watchGetHome,
  watchLogin,
  watchGetProduct,
  watchGetRoomChat,
  watchStatistic,
  watchMovies
} from "./NetworkSaga";

export default function* rootSaga() {
  yield watchGetUser;
  yield watchGetHome;
  yield watchLogin;
  yield watchGetProduct;
  yield watchGetRoomChat;
  yield watchStatistic;
  yield watchMovies;
}
