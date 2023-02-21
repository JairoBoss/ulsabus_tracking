import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../utils/colors';
import FONTS from '../utils/fonts';
import { scaleHeight } from '../utils/size';

const ButtonPrimary = (props) => {
  return (
    <TouchableOpacity
      disable={props.disable}
      activeOpacity={props.disable ? 1 : 0.7}
      onPress={props.onPress}
      style={[styles.buttonPrimacy, props.style]}>
      <Text style={[styles.txtTitle, props.titleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = ScaledSheet.create({
  buttonPrimacy: {
    height: scaleHeight(48),
    // borderRadius: scaleHeight(24),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.classicBlue,
    borderWidth: 2,
    borderColor: '#FFBBA8',
    borderRadius: 6,
    backgroundColor: '#fff7f1',
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Bold,
    fontSize: scaleHeight(16),
    textTransform: 'uppercase',
    color: '#5e5e5e',
  },
});
