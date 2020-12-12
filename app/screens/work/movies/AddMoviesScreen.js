import R from "@app/assets/R";
import Button from "@app/components/Button";
import ModalDialog from "@app/components/ModalDialog";
import ScreenComponent from "@app/components/ScreenComponent";
import TextInput from "@app/components/TextInput";
import VDatePicker from "@app/components/VDatePicker";
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
const dataCategory = [
  "Phim hành động",
  "Phim viễn tưởng",
  "Phim phiêu lưu",
  "Phim tấu hài",
  "Phim võ thuật",
  "Phim kinh dị",
  "Phim bí ẩn-siêu nhiên",
  "Phim hồi hộp, gay cấn",
  "Phim thần thoại",
  "Phim hoạt hình",
  "Phim thể thao",
  "Phim chính kịch",
  "Phim tâm lý",
  "Phim tài liệu",
  "Phim gia đình",
  "Phim lãng mạng"
];
const dataTypeMov = ["2D", "3D"];

const AddMoviesScreen = () => {
  const [state, setState] = useState({
    nameMovies: "",
    priceMovies: "",
    descriptionMovies: "",
    noteMovies: "",
    typeMovies: [],
    authorsMovies: "",
    categoryMovies: [],
    timeMovies: "",
    timeStart: "",
    timeEnd: "",
    languageMovies: "",
    trailerMovies: "",
    err: false,
    isVisibleCategory: false, //handle multi select
    isVisibleTypeMov: false
  });
  const handleTextInput = key => value => {
    setState({ ...state, [key]: value });
  };
  const handleCheckContinue = () => {
    const {
      nameMovies,
      priceMovies,
      descriptionMovies,
      noteMovies,
      typeMovies,
      authorsMovies,
      categoryMovies,
      timeMovies,
      timeStart,
      timeEnd,
      languageMovies,
      trailerMovies
    } = state;
    setState({ ...state, err: true });
    if (
      nameMovies == "" ||
      priceMovies == "" ||
      descriptionMovies == "" ||
      noteMovies == "" ||
      typeMovies == [] ||
      authorsMovies == "" ||
      categoryMovies == [] ||
      timeMovies == "" ||
      timeStart == "" ||
      timeEnd == "" ||
      languageMovies == "" ||
      trailerMovies == ""
    ) {
      Alert.alert(
        "Thông báo",
        "Nhập đầy đủ các trường",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      NavigationUtil.navigate(SCREEN_ROUTER.ADD_IMAGE_MOVIES, {
        params: state
      });
    }
  };
  const handleTypeMov = () => {
    setState({ ...state, isVisibleTypeMov: true });
  };
  const handleCategory = () => {
    setState({ ...state, isVisibleCategory: true });
  };
  const handleClose = () => {
    setState({ ...state, isVisibleCategory: false, isVisibleTypeMov: false });
  };
  const renderHeaderCategory = () => {
    return (
      <View>
        <Text>Cate</Text>
      </View>
    );
  };
  const renderHeaderTypeMov = () => {
    return (
      <View>
        <Text>Type</Text>
      </View>
    );
  };

  //item Flat
  const renderItemCategory = ({ item }) => {
    const { categoryMovies } = state;
    const itemTick = categoryMovies.find(el => el == item);
    return (
      <TouchableOpacity
        style={styles.typeItem}
        onPress={() => {
          let newTypeCategory = [];
          if (categoryMovies?.includes(item)) {
            newTypeCategory = [...categoryMovies?.filter(e => e !== item)]; //trả về mảng mới có các phần tử khác item
          } else {
            newTypeCategory = [...categoryMovies, item];
          }
          setState({ ...state, categoryMovies: newTypeCategory });
        }}
      >
        <Text style={styles.txtItem}>{item}</Text>
        {itemTick && (
          <Image source={R.images.icon_check} style={styles.itemCheck} />
        )}
      </TouchableOpacity>
    );
  };
  const renderCategory = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataCategory}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItemCategory}
      />
    );
  };

  const renderItemTypeMov = ({ item }) => {
    const { typeMovies } = state;
    const itemTick = typeMovies.find(el => el == item);
    return (
      <TouchableOpacity
        style={styles.typeMov}
        onPress={() => {
          let newTypeTypeMov = [];
          if (typeMovies?.includes(item)) {
            newTypeTypeMov = [...typeMovies?.filter(e => e !== item)]; //trả về mảng mới có các phần tử khác item
          } else {
            newTypeTypeMov = [...typeMovies, item];
          }
          setState({ ...state, typeMovies: newTypeTypeMov });
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
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItemTypeMov}
      />
    );
  };
  const renderBody = () => {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <TextInput
            err={!state.nameMovies && state.err === true && true}
            label={"Tên phim"}
            defaultValue={state.nameMovies}
            onChangeText={handleTextInput("nameMovies")}
          />
          <TextInput
            err={!state.priceMovies && state.err === true && true}
            label={"Giá"}
            keyboardType="phone-pad"
            defaultValue={state.priceMovies}
            onChangeText={handleTextInput("priceMovies")}
          />
          <TextInput
            err={!state.descriptionMovies && state.err === true && true}
            label={"Nội dung phim"}
            multiline={true}
            defaultValue={state.descriptionMovies}
            onChangeText={handleTextInput("descriptionMovies")}
          />
          <TextInput
            err={!state.noteMovies && state.err === true && true}
            label={"Lưu ý"}
            defaultValue={state.noteMovies}
            onChangeText={handleTextInput("noteMovies")}
          />
          <TouchableOpacity onPress={handleCategory} style={styles.typeMov}>
            <Text style={[styles.txtType, { width: width - 100 }]}>
              Thể loại
            </Text>
            <Text numberOfLines={1} lineBreakMode={"tail"} style={{ flex: 1 }}>
              {state.categoryMovies.map(el => el)}
            </Text>
          </TouchableOpacity>
          <TextInput
            err={!state.authorsMovies && state.err === true && true}
            label={"Đạo diễn"}
            defaultValue={state.authorsMovies}
            onChangeText={handleTextInput("authorsMovies")}
          />
          <TouchableOpacity onPress={handleTypeMov} style={styles.typeMov}>
            <Text style={[styles.txtType, { width: width - 35 }]}>
              Định dạng phim
            </Text>
            <Text numberOfLines={1} lineBreakMode={"tail"} style={{ flex: 1 }}>
              {state.typeMovies.map(el => el)}
            </Text>
          </TouchableOpacity>
          <TextInput
            err={!state.timeMovies && state.err === true && true}
            label={"Thời gian phim ( phút )"}
            keyboardType="phone-pad"
            defaultValue={state.timeMovies}
            onChangeText={handleTextInput("timeMovies")}
          />
          <Text style={[styles.txtType, { marginVertical: scale(10) }]}>
            Thời gian phim
          </Text>
          <VDatePicker
            changeFromDate={dStart =>
              setState({ ...state, timeStart: dStart.dateString })
            }
            changeToDate={dEnd =>
              setState({ ...state, timeEnd: dEnd.dateString })
            }
            timeStart={state.timeStart}
            timeEnd={state.timeEnd}
          />
          <TextInput
            err={!state.languageMovies && state.err === true && true}
            label={"Ngôn ngữ"}
            defaultValue={state.languageMovies}
            onChangeText={handleTextInput("languageMovies")}
          />
          <TextInput
            err={!state.trailerMovies && state.err === true && true}
            label={"Trailer"}
            defaultValue={state.trailerMovies}
            onChangeText={handleTextInput("trailerMovies")}
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
      titleHeader={"Thêm phim"}
      back={true}
      // bounces={false}
      bgColor={colors.white}
      renderView={
        <View>
          {renderBody()}
          <ModalDialog
            backdrop
            contentContainerStyle={
              state.isVisibleCategory
                ? { height: scale(300) }
                : { height: scale(130) }
            }
            renderH={
              state.isVisibleCategory
                ? renderHeaderCategory()
                : renderHeaderTypeMov()
            }
            title={state.isVisibleCategory ? "Thể loại phim" : "Định dạng phim"}
            contentView={
              state.isVisibleCategory ? renderCategory() : renderTypeMov()
            }
            onClose={handleClose}
            isVisible={state.isVisibleCategory || state.isVisibleTypeMov}
          />
        </View>
      }
    />
  );
};

export default AddMoviesScreen;

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
