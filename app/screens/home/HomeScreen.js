import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { getUserInfoAction } from "@app/redux/actions/index";
import ScreenComponent from "@app/components/ScreenComponent";
import R from "@app/assets/R";
import Card from "@app/components/Card";
import { scale } from "react-native-size-matters";
import { colors } from "@app/constants/Theme";
import fonts from "@app/assets/fontsAsset";
import ChartCustom from "@app/components/ChartCustom";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoAction());
  }, []);
  const renderBody = () => {
    return (
      <>
        <View style={styles.fItem}>
          <Card style={styles.cardItem}>
            <Text style={styles.txtItem}>Số lượng đơn hàng</Text>
            <Text style={styles.txtItem}>375</Text>
          </Card>
          <Card style={[styles.cardItem, { backgroundColor: colors.drankRed }]}>
            <Text style={styles.txtItem}>Doanh thu tháng</Text>
            <Text style={styles.txtItem}>39.563.000</Text>
          </Card>
        </View>
        <Card style={styles.pItem}>
          <Text style={styles.txtItem}>Số lượng đơn hàng</Text>
          <Text style={styles.txtItem}>375</Text>
        </Card>
        <Card style={styles.uItem}>
          <Text style={styles.txtItem}>Số lượng người dùng</Text>
          <Text style={styles.txtItem}>1.435</Text>
        </Card>
      </>
    );
  };
  const renderPieChart = () => {
    return (
      <>
        <Text style={styles.txtStatistic}>
          Thống kê số phim và sản phẩm tháng 12
        </Text>
        <ChartCustom />
      </>
    );
  };
  return (
    <ScreenComponent
      titleHeader={R.strings.home}
      // isLoading={listRoomState.isLoading}
      // isError={listRoomState.console}
      // reload={reloadRoom}
      renderView={
        <>
          {renderBody()}
          {/* {renderModal()} */}
          {renderPieChart()}
        </>
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardItem: {
    height: scale(80),
    backgroundColor: colors.drankGreen,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  txtItem: {
    fontFamily: fonts.roboto_regular,
    fontSize: 16,
    color: colors.white
  },
  fItem: {
    flexDirection: "row",
    marginTop: scale(35),
    justifyContent: "space-between",
    marginHorizontal: scale(20)
  },
  pItem: {
    height: scale(80),
    backgroundColor: colors.drankBlue,
    borderRadius: 8,
    marginVertical: scale(30),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(20)
  },
  uItem: {
    height: scale(80),
    backgroundColor: colors.drankPurple,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  txtStatistic: {
    alignSelf: "center",
    marginTop: scale(45),
    marginBottom: scale(10),
    fontSize: 16,
    fontFamily: R.fonts.roboto_medium
  }
});
