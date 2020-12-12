import React from 'react';
import { Text } from 'react-native';

const numberStringToCurrencyString = number => {
  return `${number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
};

const TextPrice = props => {
  const { price, style } = props;
  const money = numberStringToCurrencyString(price);

  return <Text style={style}>{money}</Text>;
};

export default TextPrice;
