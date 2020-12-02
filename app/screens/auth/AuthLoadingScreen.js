import React, { Component } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import NavigationUtil from "../../navigation/NavigationUtil";
import AsyncStorage from "@react-native-community/async-storage";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import { colors } from "@app/constants/Theme";
import { SCREEN_ROUTER } from "@constant";

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    // load something and check login
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN");
        if (token) {
          NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
        } else {
          NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
        }
      } catch (error) {
        console.log(error, "err");
      }
    }, 1000);
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View>
          <SkypeIndicator color={colors.active} />
        </View>
      </SafeAreaView>
    );
  }
}
