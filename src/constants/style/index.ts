import {StyleSheet} from 'react-native';
import {colors} from '../colors';

const globalStyle = StyleSheet.create({
  midShadow: {
    shadowColor: colors.babypink,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  darkAquaShadow: {
    shadowColor: colors.aqua,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default globalStyle;
