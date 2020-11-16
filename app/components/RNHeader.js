import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import NavigationUtil from "../navigation/NavigationUtil";
import * as theme from "../constants/Theme";
import R from "@app/assets/R";
import { IconBack } from "../assets/svg/svg";

const RNHeader = props => {
  const {
    color,
    back,
    titleHeader,
    rightButton,
    rightPress,
    leftButton,
    leftPress,
    ...rest
  } = props;
  return (
    <Header
      statusBarProps={{
        barStyle: "light-content",
        translucent: true,
        backgroundColor: "transparent"
      }}
      placement="left"
      containerStyle={{
        backgroundColor: theme.colors.headerColor,
        borderBottomColor: theme.colors.active,
        zIndex: 3
      }}
      leftComponent={
        <View>
          {back ? (
            <TouchableOpacity
              style={styles.leftComp}
              onPress={() => {
                leftPress ? leftPress() : NavigationUtil.goBack();
              }}
            >
              <IconBack />
            </TouchableOpacity>
          ) : (
            leftButton && (
              <TouchableOpacity style={styles.leftComp} onPress={leftPress}>
                {leftButton}
              </TouchableOpacity>
            )
          )}
        </View>
      }
      centerComponent={
        <Text
          style={[
            {
              fontSize: 18
            },
            { color: color ? color : "white" }
          ]}
        >
          {titleHeader}
        </Text>
      }
      rightComponent={
        rightButton && (
          <View>
            {rightButton && <View style={styles.rightComp}>{rightButton}</View>}
          </View>
        )
      }
      // statusBarProps={{
      //   translucent: true,
      //   backgroundColor: "transparent"
      // }}
    />
  );
};

export default RNHeader;

const styles = StyleSheet.create({
  leftComp: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  rightComp: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  }
});
