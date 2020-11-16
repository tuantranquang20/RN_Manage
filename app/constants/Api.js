/* eslint-disable prettier/prettier */
import axios from "axios";
import { Alert } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import I18n from "../i18n/i18n";
import AsyncStorage from "@react-native-community/async-storage";
import reactotron from "reactotron-react-native";
function createAxios() {
  // AsyncStorage.setItem("token", '773DE1FE9732F26F7552BC921CBE347E')
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://localhost:3030/";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = {
    "Content-Type": "application/json"
  };

  axiosInstant.interceptors.request.use(
    async config => {
      config.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
        "TOKEN"
      )}`;
      // config.headers.token = await AsyncStorage.getItem('TOKEN');
      return config;
    },
    error => {
      // console.log("Lỗi", error);
      reactotron.log(error, "???");
      Promise.reject(error);
    }
  );

  axiosInstant.interceptors.response.use(response => {
    if (response.data && response.data.code == 403) {
      setTimeout(() => {
        Alert.alert("Thông báo", I18n.t("relogin"));
      }, 100);

      AsyncStorage.setItem("TOKEN", "", () => {
        NavigationUtil.navigate("Auth");
      });
    } else if (response.data && response.data.status != 1) {
      setTimeout(() => {
        Alert.alert("Thông báo", response.data.message);
      }, 100);
    }
    return response;
  });
  return axiosInstant;
}

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    if (res.data.status != 1) {
      return Promise.reject(new Error("Co loi xay ra"));
    }
    return Promise.resolve(res.data);
  });
}

export const requestLogin = payload => {
  return handleResult(
    getAxios.post("users/login", {
      phone: "0367173691",
      password: "tuan12345"
    })
  );
};
export const requestGetUserInfo = payload => {
  return handleResult(getAxios.get("users"));
};

export const requestHomeData = () => {
  return handleResult(getAxios.get("home"));
};
export const requestProduct = payload => {
  // const pr = price[gte];
  return handleResult(
    getAxios.get("product", {
      params: {
        page: 1,
        limit: 10
        // sort: `${(price, rating, discount)}`,
        // [pr]: 3000,
      }
    })
  );
};
export const requestGetRoomChat = payload => {
  // const pr = price[gte];
  return handleResult(
    getAxios.post("chat", {
      userID: [1, 3, 5]
    })
  );
};

export const requestGetLocation = payload => {
  const { userLatitude, userLongitude, placeId } = payload;
  return handleResult(
    getAxios.get(
      `json?origin=${userLatitude},${userLongitude}&destination=place_id:${placeId}&key=AIzaSyBx4jdXqTV6sX6IiFx1lC50l_0b_32Neys`
    )
  );
};
