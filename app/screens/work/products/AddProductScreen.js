import R from "@app/assets/R";
import Button from "@app/components/Button";
import ModalDialog from "@app/components/ModalDialog";
import ScreenComponent from "@app/components/ScreenComponent";
import TextInput from "@app/components/TextInput";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import { colors } from "@app/constants/Theme";
import NavigationUtil from "@app/navigation/NavigationUtil";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

//data Flat
const dataTypeMov = ["Đồ ăn", "Đồ uống"];

const AddProductScreen = () => {
  const [state, setState] = useState({
    name: "",
    price: "",
    description: "",
    idProduct: "",
    discount: "",
    idBranch: [],
    err: false,
    isVisibleCategory: false, //handle multi select
    isVisibleTypeMov: false
  });
  const handleTextInput = key => value => {
    setState({ ...state, [key]: value });
  };
  const handleCheckContinue = () => {
    const { name, price, description, idProduct, discount, idBranch } = state;
    setState({ ...state, err: true });
    if (
      name == "" ||
      price == "" ||
      description == "" ||
      idProduct == "" ||
      discount == "" ||
      idBranch == []
    ) {
      Alert.alert(
        "Thông báo",
        "Nhập đầy đủ các trường",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      NavigationUtil.navigate(SCREEN_ROUTER.ADD_IMAGE_PRODUCTS, {
        params: state
      });
    }
  };
  const handleTypeMov = () => {
    setState({ ...state, isVisibleTypeMov: true });
  };
  const handleClose = () => {
    setState({ ...state, isVisibleTypeMov: false });
  };
  const renderHeaderTypeMov = () => {
    return <View />;
  };

  const renderItemTypeMov = ({ item }) => {
    const { idBranch } = state;
    const itemTick = idBranch.find(el => el == item);
    return (
      <TouchableOpacity
        style={styles.typeMov}
        onPress={() => {
          let newTypeTypeMov = [];
          if (idBranch?.includes(item)) {
            newTypeTypeMov = [...idBranch?.filter(e => e !== item)]; //trả về mảng mới có các phần tử khác item
          } else {
            newTypeTypeMov = [...idBranch, item];
          }
          setState({ ...state, idBranch: newTypeTypeMov });
        }}
      >
        <Text>{item}</Text>
        {itemTick && (
          <Image source={R.images.icon_check} style={styles.itemCheck} />
        )}
      </TouchableOpacity>
    );
  };
  const renderTypeMov = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataTypeMov}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemTypeMov}
      />
    );
  };
  const renderBody = () => {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <TextInput
            err={!state.name && state.err === true && true}
            label={"Tên sản phẩm"}
            defaultValue={state.name}
            onChangeText={handleTextInput("name")}
          />
          <TextInput
            err={!state.idBranch && state.err === true && true}
            label={"Id sản phẩm"}
            defaultValue={state.idBranch}
            onChangeText={handleTextInput("idBranch")}
          />
          <TextInput
            err={!state.price && state.err === true && true}
            label={"Giá"}
            keyboardType="phone-pad"
            defaultValue={state.price}
            onChangeText={handleTextInput("price")}
          />
          <TextInput
            err={!state.discount && state.err === true && true}
            label={"Giảm giá ( % )"}
            keyboardType="phone-pad"
            defaultValue={state.discount}
            onChangeText={handleTextInput("discount")}
          />
          <TouchableOpacity onPress={handleTypeMov} style={styles.typeMov}>
            <Text style={[styles.txtType, { width: width - 60 }]}>
              Loại sản phẩm
            </Text>
            <Text numberOfLines={1} lineBreakMode={"tail"} style={{ flex: 1 }}>
              {state.idBranch.map(el => el)}
            </Text>
          </TouchableOpacity>
          <TextInput
            err={!state.description && state.err === true && true}
            label={"Nội dung sản phẩm"}
            multiline={true}
            defaultValue={state.description}
            onChangeText={handleTextInput("description")}
          />
          <Button
            containerStyle={styles.btn}
            title={"Tiếp tục"}
            onPress={handleCheckContinue}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  };
  return (
    <ScreenComponent
      titleHeader={"Thêm sản phẩm"}
      back={true}
      // bounces={false}
      bgColor={colors.white}
      renderView={
        <View>
          {renderBody()}
          <ModalDialog
            backdrop
            contentContainerStyle={{ height: scale(150) }}
            renderH={renderHeaderTypeMov()}
            title={"Loại sản phẩm"}
            contentView={renderTypeMov()}
            onClose={handleClose}
            isVisible={state.isVisibleTypeMov}
          />
        </View>
      }
    />
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  typeMov: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(15)
  },
  typeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(10)
  },
  itemCheck: {
    width: scale(15),
    height: scale(15)
  },
  txtType: {
    fontFamily: R.fonts.roboto_regular,
    fontSize: 16,
    color: colors.gray
  },
  btn: {
    marginVertical: scale(25),
    marginHorizontal: scale(15)
  },
  container: {
    marginHorizontal: scale(5)
  },
  txtItem: {
    fontSize: 16,
    fontFamily: R.fonts.roboto_regular,
    marginVertical: scale(5)
  }
});
