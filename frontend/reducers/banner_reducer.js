import { merge } from 'lodash';
import { RECEIVE_ALL_BANNERS, RECEIVE_CURRENT_BANNER } from '../actions/banner_actions';

const _nullState = {
  currentBanner: 1,
  banners: {
    1: {header: '', tagline: '', title: ''}
  },
};

const BannerReducer = (state = _nullState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_BANNERS:
      return merge({}, state, { banners: action.banners });
    case RECEIVE_CURRENT_BANNER:
      return merge({}, state, action.currentBanner);
    default:
      return state;
  }
}

export default BannerReducer;
