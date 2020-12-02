import R from "@app/assets/R";
import ScreenComponent from "@app/components/ScreenComponent";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Fire from "@app/constants/FirebaseConfig";
import { scale } from "react-native-size-matters";
import { GiftedChat } from "react-native-gifted-chat";

import ImageResizer from "react-native-image-resizer";
import ImagePicker from "react-native-image-picker";
import reactotron from "@app/debug/ReactotronConfig";
const maxWidth = Dimensions.get("window").width;
const maxHeight = Dimensions.get("window").height;

const ChatScreen = props => {
  const { userID, name, photo } = props.navigation.getParam("params");
  const userCurrent = props.navigation.getParam("userCurrent");
  // console.log(data);
  // console.log(data);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    Fire.shared.getConversation(2, userID, message => {
      setMessages(message?.data);
    });
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    Fire.shared.send(
      userCurrent?.userID, //ng gửi
      userID //ng nhận, mặc định là admin đi
    )(messages);
  }, []);
  const sendImage = async source => {
    try {
      const urlImage = await Fire.shared.uploadImage(source);
      let message = [
        {
          _id: Math.floor(new Date()),
          text: "",
          user: {
            avatar: userCurrent?.photo, //admin ?
            name: userCurrent?.name, //admin?
            _id: userCurrent?.userID
          }, //ng gửi
          createdAt: Math.floor(new Date()),
          image: urlImage
        }
      ];

      Fire.shared.send(userCurrent?.userID, userID)(message);
    } catch (error) {
      reactotron.log("err upload image", error);
    } finally {
      // this.setState({ isImageUploading: false });
    }
  };
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
      sendImage(response);
    } catch (error) {
      const source = { uri };
      sendImage(source);
      console.log(error);
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

        // this.setState({ isImageUploading: true });

        resizeImage(uri, actualWidth, actualHeight);
      }
    });
  };

  return (
    <ScreenComponent
      back
      titleHeader={name}
      disableScrollView={true}
      renderView={
        <GiftedChat
          placeholder="Nhập tin nhắn ..."
          messages={messages}
          inverted={false}
          timeFormat="HH:mm:ss"
          dateFormat="DD/MM/YYYY"
          onSend={onSend}
          user={{
            avatar: userCurrent?.photo, //admin ?
            name: userCurrent?.name, //admin?
            _id: userCurrent?.userID
          }}
          renderActions={() => (
            <TouchableOpacity
              style={{
                width: scale(40),
                height: scale(40),
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: scale(5)
              }}
              onPress={handlePickImg}
            >
              <Image
                resizeMode="contain"
                style={{ height: scale(25), width: scale(25) }}
                source={R.images.ic_pick_image}
              />
            </TouchableOpacity>
          )}
          // renderChatFooter={() =>
          //     <View>
          //         {this.state.isImageUploading &&
          //             <LottieView
          //                 style={{ height: 3, width: theme.dimension.width }}
          //                 source={require("../../assets/anims/progress_uploading.json")}
          //                 autoPlay
          //                 loop
          //                 resizeMode={'cover'}
          //             />}
          //     </View>}
        />
      }
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
