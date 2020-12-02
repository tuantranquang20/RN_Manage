import R from "@app/assets/R";
import ScreenComponent from "@app/components/ScreenComponent";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Fire from "../../constants/FirebaseConfig";
import { roomChatRequest } from "@app/redux/actions/index";
import { scale } from "react-native-size-matters";
import { colors } from "@app/constants/Theme";
import fonts from "@app/assets/fontsAsset";
import NavigationUtil from "@app/navigation/NavigationUtil";
import { SCREEN_ROUTER } from "@app/constants/Constant";
const RoomScreen = () => {
  const dispatch = useDispatch();
  const listRoomState = useSelector(state => state.roomChatReducer);
  const userCurrent = useSelector(state => state.userReducer);
  const [listRoom, setListRoom] = useState([]);
  useEffect(() => {
    Fire.shared.on(2, async data => {
      console.log(data, "fire");
      let listUser = [];
      data.list_chat.map((el, index) => {
        listUser.push(index);
      });
      setListRoom(listUser);
    });
  }, []);
  useEffect(() => {
    dispatch(roomChatRequest(listRoom));
  }, [listRoom]);
  const reloadRoom = () => {
    dispatch(roomChatRequest(listRoom));
  };
  const renderBody = () => {
    return (
      <>
        {listRoomState?.data?.map((el, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.flexRow}
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER.CHAT, {
                params: el,
                userCurrent: userCurrent?.data
              });
            }}
          >
            <View style={styles.vAvt}>
              <Image
                style={styles.avt}
                source={{
                  uri: el?.photo
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.txtName}>{el?.name}</Text>
              <Text style={styles.txtUpdate}>Chỉnh sửa thông tin</Text>
            </View>
          </TouchableOpacity>
        ))}
      </>
    );
  };
  return (
    <ScreenComponent
      titleHeader={R.strings.room_chat}
      isLoading={listRoomState.isLoading}
      isError={listRoomState.console}
      reload={reloadRoom}
      renderView={
        <>
          {renderBody()}
          {/* {renderModal()} */}
        </>
      }
    />
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(5),
    marginTop: scale(5),
    borderRadius: 8,
    minHeight: scale(60)
  },
  avt: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(35)
  },
  vAvt: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(35),
    backgroundColor: colors.primary
  },
  flexRow: {
    flexDirection: "row",
    // margin: scale(8)
    marginHorizontal: scale(12),
    marginTop: scale(15)
  },
  info: {
    marginLeft: scale(25),
    marginTop: scale(5)
  },
  txtName: {
    fontSize: scale(15),
    fontFamily: fonts.roboto_medium
  },
  txtUpdate: {
    color: colors.gray,
    marginTop: scale(5)
  }
});
