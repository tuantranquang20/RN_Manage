import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { requestLogin } from "@app/constants/Api";

const HomeScreen = () => {
  const handle = async () => {
    try {
      const a = await requestLogin({
        phone: "0367173691",
        password: "tuan12345"
      });
      console.log(a, "???");
    } catch (error) {
      console.log(error, "??k?");
      return error;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity onPress={handle}>
        <Text>Tuan dep trai vl :))</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
