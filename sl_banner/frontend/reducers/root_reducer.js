import { combineReducers } from 'redux';
import BannerReducer from './banner_reducer';

export default combineReducers({
  banner: BannerReducer,
});
