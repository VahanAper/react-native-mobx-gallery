import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider, observer } from 'mobx-react';

import { LANDSCAPE, PORTRAIT } from './constants';
import Store from './store';

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

  onLayoutChange(event) {
    const { width, height } = event.nativeEvent.layout;
    const orientation = (width > height) ? LANDSCAPE : PORTRAIT;

    Store.changeOrientation(orientation);
  }

  render() {
    return (
      <Provider store={Store}>
        <View style={styles.container} onLayout={this.onLayoutChange}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('mobx_app', () => mobxApp);
