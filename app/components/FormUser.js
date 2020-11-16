import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import R from '@app/assets/R';
import { colors } from '@app/constants/Theme';

export default function FormUser(props) {
  const {imagePath, title, isLast, onPress} = props;
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.function_block}>
          <Image
            style={styles.img_func}
            source={imagePath}
            resizeMode={'contain'}
          />
          <Text style={styles.txt_func}> {title}</Text>
          <Image style={styles.arrow} source={R.images.ic_arrow_right} />
        </View>
        {!isLast && <View style={styles.line} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  function_block: {
    flexDirection: 'row',
    // marginLeft: 30,
    // marginRight: 27,
    marginVertical: 12,
    alignItems: 'center',
  },
  img_func: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor : colors.blackOpacity
  },
  txt_func: {
    marginLeft: 17,
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    width: 10,
    height: 18,
    tintColor: 'black',
  },
  line: {
    // marginLeft: 30,
    // marginRight: 27,
    height: 0.5,
    backgroundColor: '#8B8B8B',
  },
});
