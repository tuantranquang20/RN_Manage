import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import { scale } from "react-native-size-matters";
import fonts from "@app/assets/fontsAsset";
const { height, width } = Dimensions.get("window");

const ModalDialog = props => {
  const renderHeader = () => {
    const { onClose, title } = props;
    return (
      <>
        <View style={styles.headerModal}>
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            {/* <ArrowLeft color={'#000'} /> */}
          </TouchableOpacity>
          <Text style={[styles.textTitle]}>{title || "Thông báo"}</Text>
        </View>
        <View style={styles.line} />
      </>
    );
  };

  const {
    contentView,
    isVisible,
    backdrop,
    onClose,
    onModalHide,
    contentContainerStyle,
    renderH,
    containerStyle
  } = props;
  return (
    <Modal
      onModalHide={onModalHide}
      isVisible={isVisible}
      style={[containerStyle, { margin: 0 }]}
      useNativeDriver
      onBackdropPress={() => {
        if (backdrop) {
          onClose();
        }
      }}
    >
      <View style={[styles.contentStyle, contentContainerStyle]}>
        {renderH && renderHeader()}
        {contentView}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    width: width,
    backgroundColor: "white",
    borderRadius: scale(5),
    borderWidth: scale(1),
    borderColor: "#2E384D",
    height: scale(600)
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    // flex: 1,
    justifyContent: "flex-end"
  },
  line: {
    // width: '25%',
    width: width,
    height: scale(1),
    backgroundColor: "rgba(0,0,0,0.2)",
    marginTop: scale(5)
  },
  icClose: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
    marginBottom: scale(3)
  },
  textTitle: {
    fontSize: 16,
    fontFamily: fonts.roboto_medium,
    flex: 1,
    textAlign: "center",
    color: "#000",
    marginRight: scale(15),
    alignSelf: "center"
  },
  button: {
    flex: 1,
    borderColor: "grey",
    paddingVertical: 12
  },
  textCancel: {
    fontFamily: fonts.roboto_regular,
    fontSize: scale(16),
    lineHeight: scale(16),
    textAlign: "left",
    marginLeft: scale(10)
  },
  textSubmit: {
    fontFamily: fonts.roboto_medium,
    color: "green",
    fontSize: scale(16),
    textAlign: "right",
    marginRight: scale(10)
  },
  dropDownStyleHalfWidth: {
    width: width / 2 - 10,
    paddingVertical: scale(10)
  },
  headerModal: {
    flexDirection: "row",
    marginTop: scale(10),
    height: scale(50)
  },
  buttonClose: {
    position: "absolute",
    height: scale(40),
    width: scale(40),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },
  buttonPress: {
    position: "absolute",
    right: scale(20),
    top: scale(18),
    zIndex: 10
  }
});

export default ModalDialog;
