import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {colors} from '@app/constants/Theme';
import {StyleSheet} from 'react-native';
export default function Loading(props) {
  const {color} = props;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SkypeIndicator color={color || colors.headerColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  textLoading: {
    fontSize: 13,
  },
});
