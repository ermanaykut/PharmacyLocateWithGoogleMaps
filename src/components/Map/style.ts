import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  map: {
    height: height * 0.53,
  },
});

export default styles;