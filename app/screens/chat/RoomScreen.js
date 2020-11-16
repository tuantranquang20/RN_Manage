import R from "@app/assets/R";
import ScreenComponent from "@app/components/ScreenComponent";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Fire from "../../constants/FirebaseConfig";
const RoomScreen = () => {
  useEffect(() => {
    Fire.shared.on(2, async data => {
      data.list_chat.map((el, index)=>{
          console.log(index);
      })
    });
  }, []);
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

export default RoomScreen;

const styles = StyleSheet.create({});
