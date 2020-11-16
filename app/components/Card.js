import React, {Component} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
class Card extends Component {
  render() {
    const {style, children, ...rest} = this.props;
    return (
      <View style={[styles.container, style]} {...rest}>
        {children}
      </View>
    );
  }
}
export default Card;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 5},
    shadowColor: '#8B8B8B',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: Platform.OS == 'android' ? 3 : 0,
    borderColor: 'white',
    paddingHorizontal: 14,
  },
});
