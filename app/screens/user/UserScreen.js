import R from "@app/assets/R";
import Card from "@app/components/Card";
import FormUser from "@app/components/FormUser";
import ScreenComponent from "@app/components/ScreenComponent";
import { colors } from "@app/constants/Theme";
import NavigationUtil from "@app/navigation/NavigationUtil";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { scale } from "react-native-size-matters";
import { SCREEN_ROUTER } from "@constant";
import { resetAction } from "@app/redux/actions";
import { requestGetUserInfo } from "@app/constants/Api";

const action = [
  {
    img: R.images.ic_profile,
    title: "Thông tin tài khoản",
    screen: ""
  },
  {
    img: R.images.ic_update,
    title: "Cập nhật tài khoản",
    screen: ""
  },
  {
    img: R.images.ic_role,
    title: "Điều khoản sử dụng",
    screen: ""
  },
  {
    img: R.images.ic_qr,
    title: "QR thanh toán",
    screen: ""
  },
  {
    img: R.images.ic_history,
    title: "Lịch sử giao dịch",
    screen: ""
  }
];

const UserScreen = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userID: null,
    picture: null,
    name: null
  });
  //lấy user info
  //   useEffect(() => {
  //     try {
  //       (async () => {
  //         const resultReq = await requestGetUserInfo();
  //         setUser({
  //           userID: resultReq?.data?.userID,
  //           avatar: resultReq?.data?.photo,
  //           name: resultReq?.data?.name
  //         });
  //       })();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  const renderAvt = () => {
    return (
      <Card style={styles.headerAvt}>
        <View style={styles.flexRow}>
          <View style={styles.vAvt}>
            <Image
              style={styles.avt}
              source={{
                uri:
                  "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1116824365428401&height=200&width=200&ext=1605705026&hash=AeTpMWJ_ac-RkhQEO1Q"
              }}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.txtName}>Tuấn trần</Text>
            <TouchableOpacity onPress={() => console.log("update user")}>
              <Text style={styles.txtUpdate}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };
  const handleLogOut = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc muốn đăng xuất ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("TOKEN");
            dispatch(resetAction());
            NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
          }
        }
      ],
      { cancelable: false }
    );
  };
  const renderBodyAction = () => {
    return (
      <Card style={styles.bodyAction}>
        {action.map((el, index) => (
          <FormUser
            key={index.toString()}
            onPress={() => NavigationUtil.navigate(el.screen)}
            imagePath={el.img}
            title={el.title}
          />
        ))}
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.logOut}>Đăng xuất</Text>
        </TouchableOpacity>
      </Card>
    );
  };
  return (
    <ScreenComponent
      titleHeader={"Tài khoản"}
      bounces={false}
      bgColor={colors.white}
      renderView={
        <View>
          {renderAvt()}
          {renderBodyAction()}
        </View>
      }
    />
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  headerAvt: {
    marginTop: scale(5),
    minHeight: scale(75),
    justifyContent: "center"
  },
  bodyAction: {
    marginTop: scale(5),
    justifyContent: "center",
    paddingBottom: scale(5)
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
    flexDirection: "row"
  },
  info: {
    marginLeft: scale(25),
    marginTop: scale(5)
  },
  txtName: {
    fontWeight: "500",
    fontSize: scale(17)
  },
  txtUpdate: {
    color: colors.gray,
    marginTop: scale(5)
  },
  logOut: {
    marginVertical: scale(15),
    color: colors.tomato,
    fontWeight: "500",
    fontSize: scale(15)
  }
});
