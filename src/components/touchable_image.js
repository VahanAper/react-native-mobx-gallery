import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import { inject, observer } from 'mobx-react';

import styles from './styles';

@inject('store') @observer
class TouchableImage extends Component {
  constructor(props) {
    super(props);

    this.onImageLayout = this.onImageLayout.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
    this.onImagePressIn = this.onImagePressIn.bind(this);
    this.onImagePressOut = this.onImagePressOut.bind(this);
  }

  state = {
    width: null,
    hideCaption: false,
  }

  onImagePress(event) {
    const { width } = this.state;
    const { store } = this.props;
    const X = event.nativeEvent.locationX;

    if (X < width / 2) {
      store.previousImage();
    } else {
      store.nextImage();
    }
  }

  onImagePressIn() {
    this.setState({ hideCaption: true });
  }

  onImagePressOut() {
    this.setState({ hideCaption: false });
  }

  onImageLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  }

  get caption() {
    const { caption, image } = this.props;

    return image.title || image.description || caption;
  }

  render() {
    const { image, store, height } = this.props;
    const uri = image.link.replace('http://', 'https://');
    const hideCaption = this.state.hideCaption ? styles.hiddenLabel : null;

    return (
      <TouchableHighlight
        style={styles.fullscreen}
        onPress={this.onImagePress}
        onPressIn={this.onImagePressIn}
        onPressOut={this.onImagePressOut}
      >
        <Image
          source={{ uri }}
          style={[
            styles.backgroundImage,
            styles[store.orientation.toLowerCase()],
            { height: height || null },
          ]}
          onLayout={this.onImageLayout}
        >
          {this.caption ? <Text style={[styles.imageLabel, hideCaption]}>{this.caption}</Text> : null}
        </Image>
      </TouchableHighlight>
    );
  }
}

export default TouchableImage;
