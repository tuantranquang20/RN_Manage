import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { moviesRequest } from "@app/redux/actions/index";
import ScreenComponent from "@app/components/ScreenComponent";
import { colors } from "@app/constants/Theme";
import { scale, verticalScale } from "react-native-size-matters";
import fonts from "@app/assets/fontsAsset";
import TextPrice from "@app/components/TextPrice";
import moment from "moment";

const ListProductScreen = () => {
  const disptach = useDispatch();
  const state = useSelector(state => state.moviesReducer);

  useEffect(() => {
    disptach(moviesRequest());
  }, []);
  const renderItemMov = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.itemContainer}>
        <Image
          source={{ uri: item.imgPath }}
          style={styles.imgItem}
          resizeMode={"stretch"}
        />
        <View style={styles.txtItemContainer}>
          <Text
            lineBreakMode={"tail"}
            numberOfLines={1}
            style={styles.titleMov}
          >
            {item.name}
          </Text>
          <TextPrice price={`Giá : ${item.price}`} style={styles.txt} />
          <Text style={styles.txt} lineBreakMode={"tail"} numberOfLines={1}>
            Công chiếu : {moment(item.timeStart).format("DD/MM/YYYY")}-
            {moment(item.timeEnd).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.txt} lineBreakMode={"tail"} numberOfLines={1}>
            Thời lượng : {item.timeMovies} phút
          </Text>
          <Text style={styles.txt} lineBreakMode={"tail"} numberOfLines={4}>
            Nội dung : {item.description}
          </Text>
          <Text style={styles.txt} lineBreakMode={"tail"} numberOfLines={2}>
            Phụ đề : {item.language}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderBody = () => {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItemMov}
        />
      </View>
    );
  };
  return (
    <ScreenComponent
      titleHeader={"Các phim hiện có"}
      disableScrollView={true}
      back={true}
      bgColor={colors.white}
      renderView={<View>{renderBody()}</View>}
    />
  );
};

export default ListProductScreen;

const styles = StyleSheet.create({
  itemContainer: {
    // minHeight: scale(245),
    height: scale(245),
    flexDirection: "row",
    paddingVertical: scale(10)
  },
  imgItem: {
    width: scale(150),
    height: scale(220),
    marginLeft: scale(20)
  },
  titleMov: {
    fontSize: 18,
    fontFamily: fonts.roboto_medium,
  },
  txt: {
    // flex : 1
    fontFamily: fonts.roboto_regular,
    fontSize: 15,
    marginTop: verticalScale(7)
  },
  txtItemContainer: {
    flex: 1,
    // padding: scale(12)
    paddingHorizontal : scale(12)
  }
});
