import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getUserInfoAction } from "@app/redux/actions/index";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoAction());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity onPress={() => {}}>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
