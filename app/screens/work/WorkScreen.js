import fonts from "@app/assets/fontsAsset";
import R from "@app/assets/R";
import Card from "@app/components/Card";
import ModalDialog from "@app/components/ModalDialog";
import ScreenComponent from "@app/components/ScreenComponent";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import { colors } from "@app/constants/Theme";
import NavigationUtil from "@app/navigation/NavigationUtil";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

const WorkScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [movies, setMovies] = useState(null);

  const handleMovie = () => {
    setIsVisible(true);
    setMovies(true);
  };
  const handleProduct = () => {
    setIsVisible(true);
    setMovies(false);
  };
  const renderBody = () => {
    return (
      <View style={styles.vBody}>
        <TouchableOpacity onPress={() => handleMovie()}>
          <Card style={[styles.card, { backgroundColor: colors.purple3 }]}>
            <Image
              source={require("@app/assets/img/cinema.png")}
              style={styles.imgEmail}
            />
            <Text style={styles.txtCard}>Phim mới</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleProduct()}>
          <Card style={[styles.card, { backgroundColor: colors.purple2 }]}>
            <Image
              source={require("@app/assets/img/coffee.png")}
              style={styles.imgEmail}
            />
            <Text style={styles.txtCard}>Sản phẩm</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={[styles.card, { backgroundColor: colors.purple1 }]}>
            <Image
              source={require("@app/assets/img/ic_email.png")}
              style={styles.imgEmail}
            />
            <Text style={styles.txtCard}>Thông báo</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  const closeModal = () => {
    setIsVisible(!isVisible);
  };
  const handleNavigate = screen => {
    setIsVisible(!isVisible);
    NavigationUtil.navigate(screen);
  };
  const renderViewMovies = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleNavigate(SCREEN_ROUTER.ADD_MOVIES)}
        >
          <Text style={styles.txtModal}>Thêm phim mới</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => handleNavigate(SCREEN_ROUTER.MOVIES_CURRENT)}
        >
          <Text style={styles.txtModal}>Xem các phim hiện có</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderViewProduct = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleNavigate(SCREEN_ROUTER.ADD_PRODUCTS)}
        >
          <Text style={styles.txtModal}>Thêm sản phẩm mới</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => {
            handleNavigate(SCREEN_ROUTER.PRODUCTS_CURRENT);
          }}
        >
          <Text style={styles.txtModal}>Xem các sản phẩm hiện có</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderModal = () => {
    return (
      <ModalDialog
        isVisible={isVisible}
        backdrop
        onClose={closeModal}
        contentContainerStyle={styles.modalDialog}
        contentView={movies ? renderViewMovies() : renderViewProduct()}
      />
    );
  };
  return (
    <ScreenComponent
      titleHeader={R.strings.work}
      renderView={
        <>
          {renderBody()}
          {renderModal()}
        </>
      }
    />
  );
};

export default WorkScreen;

const styles = StyleSheet.create({
  vBody: {
    marginBottom: scale(10)
  },
  card: {
    // backgroundColor: colors.blueOpacity,
    width: width - 20,
    alignSelf: "center",
    height: scale(180),
    borderRadius: 8,
    marginTop: scale(15),
    flexDirection: "row",
    alignItems: "center"
  },
  imgEmail: {
    width: scale(120),
    height: scale(120)
    // transform: [{ rotate: "-10deg" }],
    // opacity: 0.9
  },
  imgMovies: {
    width: width - 20,
    height: scale(180),
    borderRadius: 8,
    opacity: 0.7
  },
  txtCard: {
    zIndex: 100,
    fontFamily: fonts.roboto_medium,
    fontSize: 30,
    marginLeft: scale(30),
    color: colors.pinkOpacity
  },
  modalDialog: {
    height: scale(100),
    width: scale(335),
    alignSelf: "center",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  viewModalContainer: {
    alignItems: "center",
    borderRadius: 15,
    height: scale(200),
    backgroundColor: colors.white
  },
  line: {
    width: scale(333),
    backgroundColor: colors.grey,
    height: 1
  },
  txtModal: {
    textAlign: "center",
    marginVertical: scale(15),
    fontFamily: fonts.roboto_medium,
    fontSize: 17,
    color: colors.active
  }
});
