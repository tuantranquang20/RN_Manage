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
    img: R.images.ic_history,
    title: "Lịch sử đơn hàng",
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
                  "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/69519945_195041818158187_6125746850231222272_o.jpg?_nc_cat=100&ccb=2&_nc_sid=174925&_nc_ohc=YYQMM4NVihUAX_AeYhv&_nc_ht=scontent-sin6-1.xx&oh=f48c9e4560326e5a2dda289eede61f83&oe=5FDF749A"
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
