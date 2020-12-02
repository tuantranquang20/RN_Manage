import R from "@app/assets/R";
import { colors } from "@app/constants/Theme";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import {
  Calendar,
  CalendarList,
  LocaleConfig,
  CalendarMarkingProps,
  CalendarBaseProps,
  DateObject
} from "react-native-calendars";
import Modal from "react-native-modal";
const DATE_SELECTED = {
  FROM_DATE: 0,
  TO_DATE: 1
};
LocaleConfig.locales["vn"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ],
  monthNamesShort: [
    "Th 1.",
    "Th 2.",
    "Th 3",
    "Th 4",
    "Th 5",
    "Th 6",
    "Th 7.",
    "Th 8",
    "Th 9.",
    "Th 10.",
    "Th 11.",
    "Th 12."
  ],
  dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
};
LocaleConfig.defaultLocale = "vn";
const VCalendar = vProps => {
  const { type, fromDate, toDate, toDay, onDayPress, ...vRest } = vProps;
  //true : from
  //false : to
  const [marked, setMarketed] = useState({
    [type ? fromDate : toDate]: {
      color: colors.active,
      textColor: "white",
      startingDay: true,
      endingDay: true
    }
  });
  return (
    <Calendar
      markingType="period"
      markedDates={marked}
      monthFormat={"MMMM, yyyy"}
      onDayPress={day => {
        if (day.dateString < toDay) {
          Alert.alert(
            "Thông báo",
            "Ngày bắt đầu phải lớn hơn ngày hiện tại",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        } else {
          if (!type) {
            if (day.dateString < fromDate) {
              Alert.alert(
                "Thông báo",
                "Ngày kết thúc phải lớn hơn ngày bắt đầu!",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
              );
            } else {
              onDayPress(day);
              setMarketed({
                [day.dateString]: {
                  color: colors.active,
                  textColor: "white",
                  startingDay: true,
                  endingDay: true
                }
              });
            }
          } else {
            if (toDate == "") {
              onDayPress(day);
              setMarketed({
                [day.dateString]: {
                  color: colors.active,
                  textColor: "white",
                  startingDay: true,
                  endingDay: true
                }
              });
            } else {
              if (toDate < day.dateString) {
                Alert.alert(
                  "Thông báo",
                  "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                );
              } else {
                onDayPress(day);
                setMarketed({
                  [day.dateString]: {
                    color: colors.active,
                    textColor: "white",
                    startingDay: true,
                    endingDay: true
                  }
                });
              }
            }
          }
        }
      }}
      renderArrow={direction => (
        <Text style={{ fontSize: 18 }}>{direction == "left" ? "<" : ">"}</Text>
      )}
      firstDay={0}
      onPressArrowLeft={substractMonth => substractMonth()}
      onPressArrowRight={addMonth => addMonth()}
    />
  );
};

const VDatePicker = props => {
  const { changeFromDate, changeToDate, timeStart, timeEnd, ...rest } = props;
  const [state, setState] = useState({
    isVisible: false,
    showFromDate: true,
    showToDate: false,
    fromDate: null,
    toDate: null
  });
  const toggleModal = dateSelected => {
    setState({
      isVisible: !state.isVisible,
      showFromDate: dateSelected == DATE_SELECTED.FROM_DATE,
      showToDate: dateSelected == DATE_SELECTED.TO_DATE
    });
  };
  const fShowFromDate = () => {
    setState({
      ...state,
      showFromDate: true,
      showToDate: false
    });
  };
  const fShowToDate = () => {
    setState({
      ...state,
      showFromDate: false,
      showToDate: true
    });
  };
  const onPressFromDate = day => {
    changeFromDate(day);
  };
  const onPressToDate = day => {
    changeToDate(day);
  };
  const renderModal = () => {
    // const { dismiss, onSubmit } = this.props;
    const { isVisible, showFromDate, showToDate, fromDate, toDate } = state;
    const toDay = new Date().toJSON().substr(0, 10);
    return (
      <Modal
        isVisible={isVisible}
        avoidKeyboard
        onBackdropPress={() => {
          setState({ ...state, isVisible: !isVisible });
        }}
        onBackButtonPress={() => {
          setState({ ...state, isVisible: !isVisible });
        }}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={100}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
      >
        <View style={styles.contentStyle}>
          <TouchableOpacity
            onPress={() => fShowFromDate()}
            style={styles.buttonDrop}
          >
            <Text style={[showFromDate ? styles.styleTextSelected : {}]}>
              Từ ngày:
            </Text>
            <Text style={styles.textDate}>
              {/* {fromDate ? convertTimeStampToString(fromDate) : ""} */}
              {timeStart}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              paddingHorizontal: 5,
              paddingVertical: 4,
              borderRadius: 4,
              backgroundColor: colors.olive
            }}
            onPress={() =>
              setState(
                {...state, fromDate: "", toDate: "", isVisible: false },
                // () => onSubmit(this.state.fromDate, this.state.toDate)
                () => console.log("dc cua lo")
              )
            }
          >
            <Text style={{ color: "white" }}>Xoá tìm kiếm</Text>
          </TouchableOpacity> */}
          {showFromDate && (
            <VCalendar
              toDay={toDay}
              type={showFromDate}
              fromDate={fromDate || timeStart}
              toDate={toDate || timeEnd}
              maxDate={toDay}
              onDayPress={onPressFromDate}
            />
          )}
          <TouchableOpacity
            onPress={() => fShowToDate()}
            style={styles.buttonDrop}
          >
            <Text style={[showToDate ? styles.styleTextSelected : {}]}>
              Đến ngày:
            </Text>
            <Text style={styles.textDate}>
              {/* {toDate ? convertTimeStampToString(toDate) : ""} */}
              {timeEnd}
            </Text>
          </TouchableOpacity>
          {showToDate && (
            <VCalendar
              toDay={toDay}
              type={showFromDate}
              fromDate={fromDate || timeStart}
              toDate={toDate || timeEnd}
              maxDate={toDay}
              onDayPress={onPressToDate}
            />
          )}
          {/* <VButton
            label="Tìm kiếm"
            backgroundColor={theme.colors.primary}
            onPress={this.onSearch}
          /> */}
        </View>
      </Modal>
    );
  };
  return (
    <View style={[{ flexDirection: "row", width: width - 5, marginTop: 5 }]}>
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => toggleModal(DATE_SELECTED.FROM_DATE)}
      >
        <Image source={R.images.ic_calendar} style={styles.iconCalendar} />
        <Text style={styles.textDefault}>
          {timeStart ? timeStart : "Từ ngày"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container]}
        onPress={() =>
          !props.timeStart
            ? Alert.alert("Thông báo", "Chọn ngày bắt đầu trước!", [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ])
            : toggleModal(DATE_SELECTED.TO_DATE)
        }
      >
        <Image source={R.images.ic_calendar} style={styles.iconCalendar} />
        <Text style={styles.textDefault}>{timeEnd ? timeEnd : "Đến ngày"}</Text>
      </TouchableOpacity>
      {renderModal()}
    </View>
  );
};

export default VDatePicker;

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 5
  },
  buttonDrop: {
    margin: 10,
    flexDirection: "row"
  },
  textDate: {
    // alignContent: "center",
    // alignItems: "center",
    textAlign: "left",
    marginLeft: 15
  },
  container: {
    flex: 1,
    backgroundColor: "#ECECEC",
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    height: 48
  },
  containerSingleDate: {
    backgroundColor: "#ECECEC",
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 48
  },
  textDefault: {
    color: "#8D8C8C",
    fontFamily: R.fonts.roboto_regular,
    fontSize: 14,
    marginLeft: 10
  },
  iconCalendar: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginLeft: 8
  },
  styleTextSelected: {
    fontFamily: R.fonts.roboto_medium,
    fontSize: 16
  }
});
