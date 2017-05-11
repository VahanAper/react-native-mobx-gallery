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
  }

  state = {
    width: null,
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
    const { image, store } = this.props;
    const uri = image.link.replace('http://', 'https://');

    return (
      <TouchableHighlight onPress={this.onImagePress} style={styles.fullscreen}>
        <Image
          source={{ uri }}
          style={[styles.backgroundImage, styles[store.orientation.toLowerCase()]]}
          onLayout={this.onImageLayout}
        >
          <Text style={styles.imageLabel}>{this.caption}</Text>
        </Image>
      </TouchableHighlight>
    );
  }
}

export default TouchableImage;
