import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IconShowPass} from '@app/assets/svg/svg';

//custom warning messgase
function VInput(props) { 
  const {inputStyle, placeholder, onChangeText, value, ...rest} = props;
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={[styles.inputContainer, inputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  );
}

export default VInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: scale(40),
    padding: scale(5),
  },
});
