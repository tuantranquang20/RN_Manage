import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import HomeScreen from "@app/screens/home/HomeScreen";
import UserScreen from "../screens/user/UserScreen";
import RoomScreen from "../screens/chat/RoomScreen";
import WorkScreen from "../screens/work/WorkScreen";
import AddMoviesScreen from "../screens/work/movies/AddMoviesScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import ChartScreen from "../screens/chart/ChartScreen";
import { SCREEN_ROUTER } from "@constant";
import R from "@R";
import * as theme from "@theme";
import { scale } from "react-native-size-matters";

import { Image, Text, Platform } from "react-native";
const TabBarComponent = props => <BottomTabBar {...props} />;

const Auth = createStackNavigator(
  {
    [SCREEN_ROUTER.LOGIN]: LoginScreen,
    [SCREEN_ROUTER.REGISTER]: RegisterScreen,
    [SCREEN_ROUTER.FORGOT_PASS]: ForgotPasswordScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const tabbarIcons = {
  [SCREEN_ROUTER.USER]: R.images.ic_user_color,
  [SCREEN_ROUTER.WORK]: R.images.ic_briefcase,
  [SCREEN_ROUTER.ROOM_CHAT]: R.images.ic_chat,
  [SCREEN_ROUTER.CHAR_PIE]: R.images.ic_pie_chart
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const iconSource = tabbarIcons[routeName] || R.images.home;
  const iconSize = focused ? 25 : 22;
  return (
    <Image
      source={iconSource}
      fadeDuration={0}
      style={{ width: iconSize, height: iconSize }}
    />
  );
};

const BottomTab = createBottomTabNavigator(
  {
    [SCREEN_ROUTER.WORK]: {
      screen: WorkScreen,
      title: R.strings.work,
      navigationOptions: {
        tabBarLabel: R.strings.work
      }
    },
    [SCREEN_ROUTER.CHAR_PIE]: {
      screen: ChartScreen,
      title: R.strings.chart_pie,
      navigationOptions: {
        tabBarLabel: R.strings.chart_pie
      }
    },
    [SCREEN_ROUTER.HOME]: {
      screen: HomeScreen,
      title: R.strings.home,
      navigationOptions: {
        tabBarLabel: () => {
          return (
            <>
              <Image
                source={R.images.icon_home}
                style={[
                  Platform.OS == "android" ? { marginLeft: scale(2) } : {},
                  theme.dimension.width > 365
                    ? {
                        width: scale(65),
                        height: scale(65)
                      }
                    : {
                        width: scale(50),
                        height: scale(50)
                      }
                ]}
              />
              <Text
                style={
                  Platform.OS == "android"
                    ? { marginLeft: scale(8) }
                    : { marginLeft: scale(5) }
                }
              >
                {R.strings.home}
              </Text>
            </>
          );
        }
      }
    },

    [SCREEN_ROUTER.ROOM_CHAT]: {
      screen: RoomScreen,
      title: R.strings.chat,
      navigationOptions: {
        tabBarLabel: R.strings.chat
      }
    },
    [SCREEN_ROUTER.USER]: {
      screen: UserScreen,
      title: R.strings.user,
      navigationOptions: {
        tabBarLabel: R.strings.user
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeBackgroundColor: theme.colors.bottombarBg,
      inactiveBackgroundColor: theme.colors.bottombarBg,
      inactiveTintColor: theme.colors.inactive,
      activeTintColor: theme.colors.active
    },
    tabBarComponent: props => {
      return (
        <TabBarComponent
          {...props}
          onTabPress={props.onTabPress}
          style={{
            borderTopColor: theme.colors.borderTopColor,
            backgroundColor: theme.colors.primary,
            height: 58
          }}
        />
      );
    },
    initialRouteName: "Home"
  }
);

const Main = createStackNavigator(
  {
    [SCREEN_ROUTER.BOTTOM_BAR]: BottomTab,
    [SCREEN_ROUTER.USER]: UserScreen,
    [SCREEN_ROUTER.ADD_MOVIES]: AddMoviesScreen,
    [SCREEN_ROUTER.CHAT]: ChatScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      [SCREEN_ROUTER.AUTH_LOADING]: AuthLoadingScreen,
      [SCREEN_ROUTER.AUTH]: Auth,
      [SCREEN_ROUTER.MAIN]: Main
    },
    {
      initialRouteName: SCREEN_ROUTER.AUTH_LOADING
    }
  )
);
