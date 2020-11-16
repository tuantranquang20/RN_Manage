import R from "@app/assets/R";
import ScreenComponent from "@app/components/ScreenComponent";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatScreen = () => {
  return (
    <ScreenComponent
      titleHeader={R.strings.chat}
      renderView={
        <>
          {/* {renderBody()} */}
          {/* {renderModal()} */}
        </>
      }
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
