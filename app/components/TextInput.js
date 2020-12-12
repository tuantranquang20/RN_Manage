import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";
import { scale } from "react-native-size-matters";

const TextInput = props => {
  const { onChangeText, label, defaultValue, err, ...rest } = props;
  return (
    <View>
      <TextField
        error={err && `Chưa nhập ${label}`}
        defaultValue={defaultValue}
        inputContainerStyle={styles.inputStyle}
        style={styles.txtInput}
        label={label}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  txtInput: {
    paddingHorizontal: scale(5)
  },
  inputStyle: {
    // marginLeft : 19
    // marginHorizontal: scale(5)
  }
});
