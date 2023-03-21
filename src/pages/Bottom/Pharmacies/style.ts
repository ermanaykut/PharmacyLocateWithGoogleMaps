import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  map: {
    height: height * 0.53,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    margin: 5,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.babypink,
  },
  stopPlayButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.babypink,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: colors.aqua,
    padding: 10,
    alignItems: 'center',
    margin: 5,
  },
});

export default styles;