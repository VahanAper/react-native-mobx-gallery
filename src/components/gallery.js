import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import TouchableImage from './touchable_image';

@inject('store') @observer
class Gallery extends Component {
  render() {
    const { store } = this.props;

    if (!store.currentImage) {
      return null;
    }

    return (
      <TouchableImage image={store.currentImage} />
    );
  }
}

export default Gallery;
