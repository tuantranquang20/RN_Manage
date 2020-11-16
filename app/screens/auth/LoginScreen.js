/* eslint-disable prettier/prettier */
import R from "@app/assets/R";
import { ForgotPass, IconGG } from "@app/assets/svg/svg";
import Button from "@app/components/Button";
import Card from "@app/components/Card";
import ScreenComponent from "@app/components/ScreenComponent";
import VInput from "@app/components/VInput";
import { colors } from "@app/constants/Theme";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { loginRequest, setUserFB } from "@app/redux/actions/index";
import reactotron from "reactotron-react-native";
import NavigationUtil from "@app/navigation/NavigationUtil";
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SCREEN_ROUTER } from "@app/constants/Constant";

function LoginScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loginReducer);

  const [state, setState] = useState({
    phone: "0367173691",
    password: "tuan12345",
    loading: false
  });

  useEffect(() => {
    (async () => {
      try {
        if (!(Object.keys(user.data).length === 0)) {
          await AsyncStorage.setItem("TOKEN", user.token);
          setState({ ...state, loading: false });
          NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
        }
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    })();
  }, [user]);
  useEffect(() => {}, [state]);
  const ggLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const getToken = await GoogleSignin.getTokens();

      await requestLogin({
        value: getToken.accessToken.toString(),
        type: LOGIN_TYPE.gg_type
      });
      // await AsyncStorage.setItem('token', getToken.accessToken.toString());
      // NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const infoRequest = new GraphRequest(
    "/me",
    {
      parameters: {
        fields: {
          string: "picture.type(large)"
        }
      }
    },
    (error, result) => {
      if (error) {
        console.log("Error fetching data: " + JSON.stringify(error));
      } else {
        const resultString = JSON.stringify(result, null, 2);
        try {
          (async () => {
            await AsyncStorage.setItem("USER_FB", resultString);
          })();
        } catch (error) {
          console.warn(error);
        }
        // setState({
        //   ...state,
        //   pictureURL: result?.picture?.data?.url,
        //   pictureURLByID: `https://graph.facebook.com/${result?.id}/picture`,
        // });
        // dispatch(
        //   setUserFB({
        //     pictureURL: result?.picture?.data?.url,
        //     pictureURLByID: `https://graph.facebook.com/${result?.id}/picture`,
        //     userID: result?.id,
        //   }),
        // );
      }
    }
  );

  const fbLogin = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(async data => {
            await AsyncStorage.setItem("TOKEN", data.accessToken.toString());
            await new GraphRequestManager().addRequest(infoRequest).start();
            NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
          });
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };
  const handleLogin = async () => {
    dispatch(loginRequest(state)); //action
    setState({ ...state, loading: true });
  };
  const renderLogin = () => {
    return (
      <Card style={styles.card}>
        <Text style={styles.txtLogin}>ĐĂNG NHẬP</Text>
        <VInput
          value={state.phone}
          inputStyle={styles.input}
          placeholder={"Số điện thoại"}
          onChangeText={el => setState({ ...state, phone: el })}
        />
        <VInput
          value={state.password}
          inputStyle={styles.input}
          placeholder={"Mật khẩu"}
          secureTextEntry={true}
          onChangeText={el => setState({ ...state, password: el })}
        />
        <Button
          containerStyle={styles.btnLogin}
          onPress={handleLogin}
          title={"Đăng nhập"}
        />
      </Card>
    );
  };
  const renderSignUp = () => {
    return (
      <TouchableOpacity style={styles.vSignup}>
        <Text style={styles.txtSign}>Chưa có tài khoản? </Text>
        <Text style={styles.txtSignup}>Đăng ký</Text>
      </TouchableOpacity>
    );
  };
  const renderSignInGGAndFb = () => {
    return (
      <View style={styles.flexRow}>
        <TouchableOpacity onPress={() => fbLogin()}>
          <Image source={R.images.ic_fb} style={styles.icFB} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ggLogin()}>
          <IconGG />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScreenComponent
      bottomSheet={true}
      isLoading={state.loading}
      renderView={
        <View style={styles.container}>
          <KeyboardAwareScrollView contentContainerStyle={styles.center}>
            {renderLogin()}
          </KeyboardAwareScrollView>
        </View>
      }
    />
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  center: {
    flexGrow: 1,
    justifyContent: "center"
  },
  card: {
    marginHorizontal: scale(5),
    borderRadius: 10,
    minHeight: scale(345)
  },
  input: {
    backgroundColor: colors.primary,
    color: colors.black,
    borderRadius: scale(5),
    padding: scale(5),
    marginVertical: scale(15)
  },
  txtLogin: {
    textAlign: "center",
    marginVertical: scale(35),
    fontSize: scale(15),
    fontWeight: "500",
    color: colors.blue
  },
  forgotPass: {
    alignSelf: "flex-end",
    marginBottom: verticalScale(20),
    marginTop: verticalScale(5)
  },
  vSignup: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: verticalScale(20)
  },
  txtSign: {
    fontWeight: "500",
    color: colors.gray
  },
  txtSignup: {
    fontWeight: "500",
    color: colors.tomato
  },
  flexRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: verticalScale(20)
  },
  icFB: {
    width: 84,
    height: 84
  },
  btnLogin: {
    marginTop: scale(30)
  }
});
