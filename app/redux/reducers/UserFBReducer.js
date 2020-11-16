/* eslint-disable prettier/prettier */
import {USER_FB} from '../actions/type';

const initialState = {
  userID: null,
  pictureURL: null,
  pictureURLByID: null,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_FB: {
      return {
        ...state,
        userID: action?.payload?.userID,
        pictureURL: action?.payload?.pictureURL,
        pictureURLByID: action?.payload?.pictureURLByID,
      };
    }
    default:
      return state;
  }
}
