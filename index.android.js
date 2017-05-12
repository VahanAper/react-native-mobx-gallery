import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import { Provider, observer } from 'mobx-react';

import { LANDSCAPE, PORTRAIT } from './constants';
import Store from './store';
import Gallery from './src/components/gallery';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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
