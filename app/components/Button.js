import {colors} from '@app/constants/Theme';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';

const Button = (props) => {
  const {title, containerStyle, styleTxt, onPress, children} = props;
  return (
    <TouchableOpacity
      style={[styles.containerButton, containerStyle]}
      onPress={onPress}>
      {children}
      <Text style={[styles.textTitle, styleTxt]}> {title} </Text>
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: colors.blue,
    // paddingVertical: verticalScale(14),
    minHeight: verticalScale(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(23),
  },
  textTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: verticalScale(15),
  },
});
