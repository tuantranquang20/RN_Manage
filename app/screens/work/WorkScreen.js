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
          <Card style={styles.card1}>
            <Text style={styles.txtCard}>Phim mới</Text>
            <Image
              source={require("@app/assets/img/cinema_2.jpg")}
              style={styles.imgMovies}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleProduct()}>
          <Card style={styles.card1}>
            <Text style={styles.txtCard}>Sản phẩm</Text>
            <Image
              source={require("@app/assets/img/product.jpg")}
              style={styles.imgMovies}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.card}>
            <Text style={styles.txtCard}>Thông báo</Text>
            <Image
              source={require("@app/assets/img/ic_email.png")}
              style={styles.imgEmail}
            />
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  const closeModal = () => {
    setIsVisible(!isVisible);
  };
  const handleNavigate = () => {
    setIsVisible(!isVisible);
    NavigationUtil.navigate(SCREEN_ROUTER.ADD_MOVIES);
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
          onPress={() => handleNavigate(SCREEN_ROUTER.ADD_MOVIES)}
        >
          <Text style={styles.txtModal}>Xem các phim hiện có</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderViewProduct = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.txtModal}>Thêm sản phẩm mới</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => {}}>
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
    backgroundColor: colors.blueOpacity,
    width: width - 20,
    alignSelf: "center",
    height: scale(180),
    borderRadius: 8,
    justifyContent: "center",
    marginTop: scale(15)
  },
  imgEmail: {
    width: scale(120),
    height: scale(120),
    alignSelf: "center",
    transform: [{ rotate: "-10deg" }],
    opacity: 0.7
    // marginTop :
  },
  card1: {
    paddingHorizontal: 0,
    width: width - 20,
    alignSelf: "center",
    height: scale(180),
    borderRadius: 8,
    justifyContent: "center",
    marginTop: scale(15)
  },
  imgMovies: {
    width: width - 20,
    height: scale(180),
    borderRadius: 8,
    opacity: 0.7
  },
  txtCard: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    fontFamily: fonts.roboto_medium,
    fontSize: 30
    // color : colors.active
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
