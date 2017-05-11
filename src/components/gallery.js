import React, { Component } from 'react';

import TouchableImage from './touchable_image';

class Gallery extends Component {
  render() {
    const { image, store } = this.props;

    return (
      <TouchableImage
        image={{
          link: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1501a.jpg',
          title: 'New view of the Pillars of Creation',
        }}
      />
    );
  }
}

export default Gallery;
