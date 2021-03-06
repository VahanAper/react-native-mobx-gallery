import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';
import { Provider, observer } from 'mobx-react';

import { LANDSCAPE, PORTRAIT } from './constants';
import Store from './store';
import styles from './src/components/styles';
import Gallery from './src/components/gallery';

@observer
export default class mobxApp extends Component {
  constructor(props) {
    super(props);

    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  componentWillMount() {
    Store.fetchImages();
  }

  onLayoutChange(event) {
    const { width, height } = event.nativeEvent.layout;
    const orientation = (width > height) ? LANDSCAPE : PORTRAIT;

    Store.changeOrientation(orientation);
    Store.updateScreenSize(width, height);
  }

  render() {
    return (
      <Provider store={Store}>
        <View style={styles.container} onLayout={this.onLayoutChange}>
          <Gallery />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('mobx_app', () => mobxApp);
