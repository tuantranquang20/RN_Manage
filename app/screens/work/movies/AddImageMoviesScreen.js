import ScreenComponent from "@app/components/ScreenComponent";
import { colors } from "@app/constants/Theme";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";

import ImageResizer from "react-native-image-resizer";
import ImagePicker from "react-native-image-picker";
import reactotron from "reactotron-react-native";
import Fire from "@app/constants/FirebaseConfig";
import { scale } from "react-native-size-matters";
import R from "@app/assets/R";
import Button from "@app/components/Button";
import { requestCreateMovie } from "@app/constants/Api";

const maxWidth = Dimensions.get("window").width;
const maxHeight = Dimensions.get("window").height;

const AddImageMoviesScreen = ({ navigation }) => {
  const [state, setState] = useState({
    img: null
  });
  const [source, setSource] = useState({});
  const params = navigation.getParam("params");

  const {
    authorsMovies: directors,
    categoryMovies: category,
    descriptionMovies: description,
    languageMovies: language,
    nameMovies: name,
    noteMovies: note,
    priceMovies: price,
    timeEnd,
    timeMovies,
    timeStart,
    trailerMovies: trailer,
    typeMovies
  } = params;

  const sendImage = async src => {
    try {
      const urlImage = await Fire.shared.uploadImage(src);
      const result = await requestCreateMovie({
        timeMovies,
        timeEnd,
        timeStart,
        directors,
        category: JSON.stringify(category).replace(/[.*+?^${}()|[\]\\"]/g, ""),
        description,
        language,
        name,
        note,
        price,
        trailer,
        typeMovies,
        imgPath: urlImage
      });
      console.log(result, "abcc");
    } catch (error) {
      console.log(error);
      reactotron.log("err upload image", error);
    } finally {
      console.log("aaa");
      // this.setState({ isImageUploading: false });
    }
  };
  //Android lỗi phần resize image
  const resizeImage = async (uri, actualWidth, actualHeight) => {
    try {
      const response = await ImageResizer.createResizedImage(
        uri,
        actualWidth,
        actualHeight,
        "JPEG",
        70,
        0,
        ""
      );
      setState({ ...state, img: response.uri });
      setSource({ uri: response.uri });
    } catch (error) {
      setSource({ uri: uri });
      setState({ ...state, img: uri });
      // sendImage(source);
      // console.log(error, "llõi");
    }
  };

  const handlePickImg = async () => {
    const options = {
      title: "Thêm ảnh xác nhận đơn hàng",
      cancelButtonTitle: "Huỷ",
      takePhotoButtonTitle: "Camera",
      chooseFromLibraryButtonTitle: "Thư viện ảnh",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      reactotron.log(response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        var actualWidth = response.width,
          actualHeight = response.height;
        var imgRatio = actualWidth / actualHeight;
        var maxRatio = maxHeight / maxHeight;
        if (actualHeight > maxHeight || actualWidth > maxWidth) {
          if (imgRatio < maxRatio) {
            imgRatio = maxHeight / actualHeight;
            actualWidth = parseInt(imgRatio * actualWidth);
            actualHeight = parseInt(maxHeight);
          } else if (imgRatio > maxRatio) {
            imgRatio = maxWidth / actualWidth;
            actualHeight = parseInt(imgRatio * actualHeight);
            actualWidth = parseInt(maxWidth);
          } else {
            actualHeight = maxHeight;
            actualWidth = maxWidth;
          }
        }
        var uri =
          Platform.OS === "android"
            ? response.uri
            : response.uri.replace("file://", "");
        resizeImage(uri, actualWidth, actualHeight);
      }
    });
  };
  const renderBody = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.txtUpload}>Tải lên ảnh nền phim</Text>
        <TouchableOpacity onPress={handlePickImg}>
          <Image source={require("@app/assets/img/add_mov.png")} />
        </TouchableOpacity>
        {state.img && (
          <Image
            source={{ uri: state.img }}
            style={{
              width: scale(250),
              height: scale(300),
              marginTop: scale(30)
            }}
            resizeMode={"contain"}
          />
        )}
      </View>
    );
  };
  const handleUpload = () => {
    if (Object.keys(source).length === 0) {
      Alert.alert(
        "Thông báo",
        "Thêm ảnh nền cho phim",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      sendImage(source);
    }
  };
  return (
    <ScreenComponent
      titleHeader={"Thêm phim"}
      back={true}
      bgColor={colors.white}
      renderView={
        <View>
          {renderBody()}
          <Button
            containerStyle={styles.btn}
            title={"Tiếp tục"}
            onPress={handleUpload}
          />
        </View>
      }
    />
  );
};

export default AddImageMoviesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  txtUpload: {
    marginVertical: scale(20),
    fontFamily: R.fonts.roboto_medium,
    fontSize: 16
  },
  btn: {
    marginTop: scale(20)
  }
});
