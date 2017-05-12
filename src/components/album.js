import React, { Component } from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './styles';
import TouchableImage from './touchable_image';
import Spinner from './spinner';

@inject('store') @observer
class Album extends Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
  }

  componentWillMount() {
    const { store, albumID } = this.props;

    store.fetchAlbum(albumID);
  }

  componentWillReceiveProps(newProps) {
    const { store, albumID } = newProps;

    store.fetchAlbum(albumID);
  }

  get dataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });

    return ds.cloneWithRows(toJS(this.album.images));
  }

  get album() {
    const { store, albumID } = this.props;

    return store.albums.get(albumID);
  }

  renderRow(img, caption) {
    const { store } = this.props;
    let height = store.screenSize.height;

    if (img.height < height) {
      height = img.height;
    }

    return (
      <TouchableImage
        image={img}
        caption={caption}
        height={height}
      />
    );
  }

  renderHeader() {
    return (
      <Text style={styles.header}>{this.album.title}</Text>
    );
  }

  render() {
    const album = this.album;

    if (album) {
      if (album.images.length > 1) {
        return (
          <View style={styles.fullscreen}>
            <ListView
              style={styles.fullscreen}
              dataSource={this.dataSource}
              renderRow={img => this.renderRow(img)}
              renderHeader={this.renderHeader}
            />
          </View>
        );
      }

      return this.renderRow(album.images[0], album.title);
    }

    return <Spinner />;
  }
}

export default Album;
