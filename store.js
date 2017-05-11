import { observable, action } from 'mobx';
import { PORTRAIT } from './constants';

class Store {
  @observable orientation = PORTRAIT;

  @action changeOrientation(orientation) {
    this.orientation = orientation;
  }
  @action previousImage() {
    console.log('previous');
  }
  @action nextImage() {
    console.log('next');
  }
}

export default new Store();
