import React from 'react';
import {
  View,
  Image,
} from 'react-native';

import styles from './styles';
import loader from '../img/loading.gif';

const Spinner = () => (
  <View style={[styles.fullscreen, styles.centered]}>
    <Image
      source={loader}
      style={{ width: 100, height: 100 }}
    />
  </View>
);

export default Spinner;
