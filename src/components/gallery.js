import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import TouchableImage from './touchable_image';
import Spinner from './spinner';
import Album from './album';

@inject('store') @observer
class Gallery extends Component {
  render() {
    const { store } = this.props;

    if (!store.currentImage) {
      return <Spinner />;
    }

    if (store.currentImage.is_album) {
      return (
        <Album albumID={store.currentImage.id} />
      );
    }

    return (
      <TouchableImage image={store.currentImage} />
    );
  }
}

export default Gallery;
